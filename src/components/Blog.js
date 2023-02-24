import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, setBlogs, user }) => {
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

  const handleLike = async () => {
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
      <div style={hideWhenVisible}>
        <div>
          {blog.title} <button onClick={toggleVisibility}>view</button>
        </div>
      </div>
      <div style={showWhenVisible}>
        <div>
          {blog.title} <button onClick={toggleVisibility}>hide</button>
        </div>
        <div>{blog.url}</div>
        <div>
          {blog.likes} <button onClick={handleLike}>like</button>
        </div>
        <div>{blog.author}</div>
        {button}
      </div>
    </div>
  );
};

export default Blog;
