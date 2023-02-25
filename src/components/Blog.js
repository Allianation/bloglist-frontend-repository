import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, setBlogs, user, handleLike }) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleRemove = async () => {
    const message = `Remove blog ${blog.title} by ${blog.author}`;

    if (window.confirm(message)) {
      await blogService.remove(blog.id);
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    }
  };

  let button;
  if (user.username === blog.user.username) {
    button = <button onClick={handleRemove}>remove</button>;
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible} className="blogTitle">
        <div>
          {blog.title} <button onClick={toggleVisibility}>view</button>
        </div>
      </div>
      <div style={showWhenVisible} className="blogAll">
        <div>
          {blog.title} <button onClick={toggleVisibility}>hide</button>
        </div>
        <div>{blog.url}</div>
        <div>
          {blog.likes} <button onClick={() => handleLike(blog)}>like</button>
        </div>
        <div>{blog.author}</div>
        {button}
      </div>
    </div>
  );
};

export default Blog;
