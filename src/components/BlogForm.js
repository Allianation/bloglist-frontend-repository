import { useState } from "react";

const BlogForm = ({ setBlogVisible, handleSubmit }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const clearForm = () => {
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  const handleCancel = () => {
    setBlogVisible(false);
  };

  const addBlog = (event) => {
    event.preventDefault();
    handleSubmit(title, author, url);
    clearForm();
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:{" "}
          <input
            id="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:{" "}
          <input
            id="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:{" "}
          <input
            id="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id="create" type="submit">create</button>
        <button type="button" onClick={handleCancel}>
          cancel
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
