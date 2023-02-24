import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Login from "./components/Login";
import blogService from "./services/blogs";
import loginService from "./services/login";
import "./App.css";
import BlogForm from "./components/BlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

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
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };

  if (user === null) {
    return (
      <Login
        handleLogin={handleLogin}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        errorMessage={errorMessage}
      ></Login>
    );
  }

  return (
    <div>
      <h2>blogs</h2>

      <div>
        {`${user.name} logged in`} <button onClick={handleClick}>logout</button>
      </div>

      <br></br>

      <BlogForm blogs={blogs} setBlogs={setBlogs} />

      <br></br>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
