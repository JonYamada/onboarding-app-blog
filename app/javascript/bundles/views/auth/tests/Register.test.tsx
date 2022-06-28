import React from "react"
import "@testing-library/jest-dom"
import {render, screen} from "@testing-library/react"
import Register from "../Register"

describe("Register Form Component", () => {
  let firstNameInput: HTMLElement;
  let lastNameInput: HTMLElement;
  let emailInput: HTMLElement;
  let passwordInput: HTMLElement;
  let btnSubmit: HTMLElement;

  beforeEach(() => {
    render(<Register />);
    firstNameInput = screen.getByLabelText("first name");
    lastNameInput = screen.getByLabelText("last name");
    emailInput = screen.getByLabelText("email");
    passwordInput = screen.getByLabelText("password");
    btnSubmit = screen.getByRole("button", { name: /Submit/i });
  });

  describe("fields", () => {
    it("expects only 4 fields", () => {
      const textFields = screen.getAllByRole("textbox");
      const passwordField = screen.getAllByLabelText("password");
      const fields = [...textFields, ...passwordField];
      expect(fields).toHaveLength(4);
      fields.forEach((field) => expect(field).toBeInTheDocument());
    });
  });
});
