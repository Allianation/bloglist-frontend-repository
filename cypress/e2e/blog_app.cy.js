describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/tests/reset");

    const user = {
      username: "root",
      password: "password",
      name: "root",
    };

    cy.request("POST", "http://localhost:3003/api/users/", user);

    cy.visit("http://localhost:3000");
  });

  it("login form is shown", function () {
    cy.contains("Log in to application");
    cy.contains("username");
    cy.contains("password");
    cy.contains("login");
  });

  describe("Login", function () {
    it("success with correct credentials", function () {
      cy.get("input:first").type("root");
      cy.get("input:last").type("password");
      cy.contains("login").click();

      cy.contains("root logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("input:first").type("root");
      cy.get("input:last").type("wrong");
      cy.contains("login").click();

      cy.get(".error")
        .should("contain", "invalid username or password")
        .and("have.css", "color", "rgb(132, 32, 41)")
        .and("have.css", "border-style", "solid");

      cy.get("html").should("not.contain", "root logged in");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.get("input:first").type("root");
      cy.get("input:last").type("password");
      cy.contains("login").click();
    });

    it("blog form is shown", function () {
      cy.contains("new blog").click();
      cy.contains("create new");
      cy.contains("title");
      cy.contains("author");
      cy.contains("url");
      cy.contains("create");
      cy.contains("cancel");
    });

    it("a blog can be created", function () {
      const blog = {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
      };
      cy.contains("new blog").click();
      cy.get("#title").type(blog.title);
      cy.get("#author").type(blog.author);
      cy.get("#url").type(blog.url);
      cy.get("#create").click();

      cy.get("html").should("contain", "React patterns");
      cy.get(".success")
        .should("contain", "a new blog React patterns by Michael Chan")
        .and("have.css", "color", "rgb(15, 81, 50)")
        .and("have.css", "border-style", "solid");
    });

    it("like a blog", function () {
      const blog = {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
      };
      cy.contains("new blog").click();
      cy.get("#title").type(blog.title);
      cy.get("#author").type(blog.author);
      cy.get("#url").type(blog.url);
      cy.get("#create").click();

      cy.contains("view").click();
      cy.contains("like").click();

      cy.contains("1");
    });
  });
});
