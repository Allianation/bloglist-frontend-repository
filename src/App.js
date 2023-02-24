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
  const [loginVisible, setLoginVisible] = useState(false);

  const hideWhenVisible = { display: loginVisible ? "none" : "" };
  const showWhenVisible = { display: loginVisible ? "" : "none" };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
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
      setLoginVisible(false);
    } catch (error) {
      setErrorMessage(error.response.data.error);
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
        <button onClick={() => setLoginVisible(true)}>new blog</button>
      </div>

      <div style={showWhenVisible}>
        <BlogForm
          blogs={blogs}
          setBlogs={setBlogs}
          setSuccessMessage={setSuccessMessage}
          setErrorMessage={setErrorMessage}
          setLoginVisible={setLoginVisible}
        />
      </div>

      <br></br>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
