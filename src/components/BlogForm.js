import { useState } from "react";
import blogService from "../services/blogs";

const BlogForm = ({ blogs, setBlogs, setSuccessMessage, setErrorMessage }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const clearForm = () => {
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

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
      clearForm();
    } catch (error) {
      setErrorMessage(error.message);
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title: <input onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author: <input onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          url: <input onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;
