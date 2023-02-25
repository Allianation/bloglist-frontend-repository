import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";
import BlogForm from "./BlogForm";

test("BlogForm calls onSubmit", () => {
  const mockHandler = jest.fn();
  const component = render(<BlogForm handleSubmit={mockHandler} />);

  const title = component.container.querySelector("#title");
  const author = component.container.querySelector("#author");
  const url = component.container.querySelector("#url");

  const form = component.container.querySelector("form");

  fireEvent.change(title, {
    target: { value: "React patterns" },
  });
  fireEvent.change(author, {
    target: { value: "Michael Chan" },
  });
  fireEvent.change(url, {
    target: { value: "https://reactpatterns.com" },
  });

  component.debug();

  fireEvent.submit(form);

  expect(mockHandler.mock.calls).toHaveLength(1);

  expect(mockHandler.mock.calls[0][0]).toBe(
    "React patterns"
  );
  expect(mockHandler.mock.calls[0][1]).toBe(
    "Michael Chan"
  );
  expect(mockHandler.mock.calls[0][2]).toBe(
    "https://reactpatterns.com"
  );
});
