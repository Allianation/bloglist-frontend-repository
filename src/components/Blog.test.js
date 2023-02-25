import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import Blog from "./Blog";

const blog = {
  title: "React patterns",
  author: "Michael Chan",
  url: "https://reactpatterns.com",
  likes: 7,
  user: {
    username: "allianation",
  },
};

const user = {
  username: "allianation",
};

test("default view, can only see title", () => {
  const component = render(<Blog blog={blog} user={user} />);

  //component.debug();

  const blogTitle = component.container.querySelector(".blogTitle");
  expect(blogTitle).toBeDefined();
  expect(blogTitle).toBeVisible();
  expect(blogTitle).toHaveTextContent(`${blog.title}`);

  const blogAll = component.container.querySelector(".blogAll");
  expect(blogAll).not.toBeVisible();
});
