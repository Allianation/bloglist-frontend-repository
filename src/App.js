import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import loginService from "./services/login";
import "./App.css";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [blogVisible, setBlogVisible] = useState(false);

  const hideWhenVisible = { display: blogVisible ? "none" : "" };
  const showWhenVisible = { display: blogVisible ? "" : "none" };

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      blogs.sort((a, b) => {
        if (a.likes === b.likes) {
          return 0;
        }
        if (a.likes > b.likes) {
          return -1;
        }
        return 1;
      });
      setBlogs(blogs);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleClick = () => {
    window.localStorage.clear();
    setUser(null);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedAppUser", JSON.stringify(user));
      blogService.setToken(user.token);

      setUser(user);
      setUsername("");
      setPassword("");
      setBlogVisible(false);
    } catch (error) {
      setErrorMessage(error.response.data.error);
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };

  const handleLike = async (blog) => {
    const newBlogInfo = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    };

    await blogService.update(blog.id, newBlogInfo);
    const blogs = await blogService.getAll();
    setBlogs(blogs);
  };

  const handleSubmit = async (title, author, url) => {
    const newBlog = {
      title: title,
      author: author,
      url: url,
    };

    try {
      const response = await blogService.create(newBlog);
      setBlogs(blogs.concat(response));
      setSuccessMessage(`a new blog ${title} by ${author} added`);
      setTimeout(() => setSuccessMessage(null), 5000);
      setBlogVisible(false);
    } catch (error) {
      setErrorMessage(error.message);
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };

  if (user === null) {
    return (
      <LoginForm
        handleLogin={handleLogin}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        errorMessage={errorMessage}
      />
    );
  }

  return (
    <div>
      <h2>blogs</h2>

      {successMessage && (
        <Notification type="success" message={successMessage} />
      )}

      {errorMessage && <Notification type="error" message={errorMessage} />}

      <div>
        {`${user.name} logged in`} <button onClick={handleClick}>logout</button>
      </div>

      <br></br>

      <div style={hideWhenVisible}>
        <button onClick={() => setBlogVisible(true)}>new blog</button>
      </div>

      <div style={showWhenVisible}>
        <BlogForm setBlogVisible={setBlogVisible} handleSubmit={handleSubmit} />
      </div>

      <br></br>

      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          setBlogs={setBlogs}
          user={user}
          handleLike={handleLike}
        />
      ))}
    </div>
  );
};

export default App;
