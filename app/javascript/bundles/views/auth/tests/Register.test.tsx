import React from "react"
import "@testing-library/jest-dom"
import {fireEvent, render, screen,} from "@testing-library/react"
import Register from "../Register"

describe("Register Form Component", () => {
  let firstNameInput: HTMLElement;
  let lastNameInput: HTMLElement;
  let emailInput: HTMLElement;
  let passwordInput: HTMLElement;
  let btnSubmit: HTMLElement;

  const populateFirstNameField = (value: string = "Bob") =>
    fireEvent.input(firstNameInput, { target: { value } });
  const populateLastNameField = (value: string = "McLast") =>
    fireEvent.input(lastNameInput, { target: { value } });
  const populateEmailField = (value: string = "bob@example.com") =>
    fireEvent.input(emailInput, { target: { value } });
  const populatePasswordField = (value: string = "my secret") =>
    fireEvent.input(passwordInput, { target: { value } });
  const clickSubmit = () => fireEvent.click(btnSubmit);

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

  describe("Validations", () => {
    const firstNameValidationMessage = "can't be blank";
    const lastNameValidationMessage = "can't be blank";
    const emailValidationMessage =
      "can't be blank. Ensure you enter a valid email";
    const emailUniqueValidationMessage = "has already been taken";
    const emailFormatValidationMessage = "Ensure you enter a valid email";
    const passwordValidationMessage = "can't be blank";

    const queryTitleValidationMessage = () =>
      screen.queryByText(firstNameValidationMessage);
    const queryLastValidationMessage = () =>
      screen.queryByText(lastNameValidationMessage);
    const queryEmailValidationMessage = () =>
      screen.queryByText(emailValidationMessage);
    const queryEmailUniqueValidationMessage = () =>
      screen.queryByText(emailUniqueValidationMessage);
    const queryEmailFormatValidationMessage = () =>
      screen.queryByText(emailFormatValidationMessage);
    const queryPasswordValidationMessage = () =>
      screen.queryByText(passwordValidationMessage);

    const findTitleValidationMessage = () =>
      screen.findByText(firstNameValidationMessage);
    const findLastValidationMessage = () =>
      screen.findByText(lastNameValidationMessage);
    const findEmailValidationMessage = () =>
      screen.findByText(emailValidationMessage);
    const findEmailUniqueValidationMessage = () =>
      screen.findByText(emailUniqueValidationMessage);
    const findEmailFormatValidationMessage = () =>
      screen.findByText(emailFormatValidationMessage);
    const findPasswordValidationMessage = () =>
      screen.findByText(passwordValidationMessage);

    it("expects first name validation thrown if absent", () => {});
    it("expects last name validation thrown if absent", () => {});
    it("expects email validation thrown if absent", () => {});
    it("expects email validation thrown if email is incorrect format", () => {});
    it("expects email validation thrown if email already exists", () => {});
    it("expects password validation thrown if absent", () => {});
  });
});
