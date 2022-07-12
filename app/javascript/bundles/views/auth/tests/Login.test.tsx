import React from "react";
import "@testing-library/jest-dom";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import mockAxios from "jest-mock-axios";
import Login from "../Login";
import {act} from "react-test-renderer";
import {getRoutes} from "../../../utils/RoutesConnector";
import {Toaster} from "react-hot-toast";

// react-hot-toast throws error without this
global.window.matchMedia = (query) => ({
  addEventListener: () => {},
  addListener: () => {},
  dispatchEvent: () => false,
  matches: false,
  media: query,
  onchange: null,
  removeEventListener: () => {},
  removeListener: () => {},
});

jest.mock("../../../utils/RoutesConnector", () => {
  return {
    __esModule: true,
    getRoutes: jest.fn(() => ({
      sessions: {
        create: "/login",
      },
    })),
  };
});

describe("Login Form Component", () => {
  let emailInput: HTMLElement;
  let passwordInput: HTMLElement;
  let btnSubmit: HTMLElement;

  const populateEmailInput = (value: string = "joe@bloggs.ie") =>
    fireEvent.input(emailInput, {target: {value}});

  const populatePasswordInput = (value: string = "password") =>
    fireEvent.input(passwordInput, {target: {value}});

  const clickSubmit = () => {
    act(() => {
      fireEvent.click(btnSubmit);
    });
  };

  afterEach(() => {
    mockAxios.reset();
  });

  beforeEach(() => {
    render(<Login/>);
    render(<Toaster/>);

    emailInput = screen.getByLabelText("email");
    passwordInput = screen.getByLabelText("password");
    btnSubmit = screen.getByRole("button", {name: /Submit/i});
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
    const authenticationFailedMessage = "Authentication failed.";
    const fallbackErrorMessage = "Oops, something went wrong";

    const emailValidationMessage = "email can't be blank";
    const passwordValidationMessage = "password can't be blank";

    const queryEmailValidationMessage = () =>
      screen.queryByText(emailValidationMessage);
    const queryPasswordValidationMessage = () =>
      screen.queryByText(passwordValidationMessage);
    const queryAuthenticationFailedMessage = () =>
      screen.queryByText(authenticationFailedMessage);

    const findEmailValidationMessage = () =>
      screen.findByText(emailValidationMessage);
    const findPasswordValidationMessage = () =>
      screen.findByText(passwordValidationMessage);
    const findAuthenticationFailedMessage = () =>
      screen.findByText(authenticationFailedMessage);

    const expectFormReset = async () => {
      expect(await queryEmailValidationMessage()).not.toBeInTheDocument();
      expect(await queryPasswordValidationMessage()).not.toBeInTheDocument();

      expect(emailInput).toHaveValue("");
      expect(passwordInput).toHaveValue("");
    };

    it("toasts error on invalid authentication credentials", async () => {
      const wrongPassword = "wr0ng pa$$word";
      expect(await queryAuthenticationFailedMessage()).not.toBeInTheDocument();

      await expectFormReset();

      populateEmailInput();
      populatePasswordInput(wrongPassword);

      clickSubmit();

      await waitFor(() => {
        mockAxios.mockError({
          response: {data: {errors: authenticationFailedMessage}},
        });
      });

      expect(mockAxios.post).toHaveBeenCalledWith(getRoutes().sessions.create, {
        user: {
          email: "joe@bloggs.ie",
          password: wrongPassword,
        },
      });

      expect(await findAuthenticationFailedMessage()).toBeInTheDocument();
    });

    it("throws fallback error if error is unknown", () => {});

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
