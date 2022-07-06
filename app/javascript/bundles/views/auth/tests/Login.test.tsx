import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Login from "../Login";

describe("Login Form Component", () => {
  let emailInput: HTMLElement;
  let passwordInput: HTMLElement;
  let btnSubmit: HTMLElement;

  const populateEmailInput = (value: string = "joe@bloggs.ie") =>
    fireEvent.input(emailInput, { target: { value } });
  const populatePasswordInput = (value: string = "password") =>
    fireEvent.input(passwordInput, { target: { value } });
  const clickSubmit = () => fireEvent.click(btnSubmit);

  beforeEach(() => {
    render(<Login />);
    emailInput = screen.getByLabelText("email");
    passwordInput = screen.getByLabelText("password");
    btnSubmit = screen.getByRole("button", { name: /Submit/i });
  });

  describe("fields", () => {
    it("expects only 2 fields", () => {
      const textFields = screen.getAllByRole("textbox");
      const passwordField = screen.getAllByLabelText("password");
      const fields = [...textFields, ...passwordField];
      expect(fields).toHaveLength(2);
      fields.forEach((field) => expect(field).toBeInTheDocument());
    });
  });

  describe("validations", () => {
    const emailValidationMessage = "email can't be blank";
    const passwordValidationMessage = "password can't be blank";

    const queryEmailValidationMessage = () =>
      screen.queryByText(emailValidationMessage);
    const queryPasswordValidationMessage = () =>
      screen.queryByText(passwordValidationMessage);

    const findEmailValidationMessage = () =>
      screen.findByText(emailValidationMessage);
    const findPasswordValidationMessage = () =>
      screen.findByText(passwordValidationMessage);

    const expectFormReset = async () => {
      expect(await queryEmailValidationMessage()).not.toBeInTheDocument();
      expect(await queryPasswordValidationMessage()).not.toBeInTheDocument();

      expect(emailInput).toHaveValue("");
      expect(passwordInput).toHaveValue("");
    };

    it("throws validation message on submit if all input values are absent", async () => {
      await expectFormReset();
      clickSubmit();

      expect(await findEmailValidationMessage()).toBeInTheDocument();
      expect(await findPasswordValidationMessage()).toBeInTheDocument();
    });

    it("throws validation message on submit if email value is absent", async () => {
      await expectFormReset();

      populatePasswordInput();
      expect(passwordInput).toHaveValue();

      clickSubmit();

      expect(await findEmailValidationMessage()).toBeInTheDocument();
      expect(await queryPasswordValidationMessage()).not.toBeInTheDocument();
    });

    it("throws validation message on submit if password value is absent", async () => {
      await expectFormReset();

      populateEmailInput();
      expect(emailInput).toHaveValue();

      clickSubmit();

      expect(await queryEmailValidationMessage()).not.toBeInTheDocument();
      expect(await findPasswordValidationMessage()).toBeInTheDocument();
    });
  });
});
