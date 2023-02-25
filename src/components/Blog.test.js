import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";
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

test("click view button, can see blog detail", () => {
  const component = render(<Blog blog={blog} user={user} />);

  const buttonView = component.getByText("view");
  fireEvent.click(buttonView);

  const blogAll = component.container.querySelector(".blogAll");
  expect(blogAll).toBeVisible();
  expect(blogAll).not.toHaveStyle("display: none");
});
