import React from "react";
import Notification from "./Notification";

const Login = ({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword,
  errorMessage
}) => {
  return (
    <>
      <h2>Log in to application</h2>

      {errorMessage && <Notification type="error" message={errorMessage} />}

      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  );
};

export default Login;
