import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Register from "../Register";
import mockAxios from "jest-mock-axios";
import { getRoutes } from "../../../utils/RoutesConnector";
import { act } from "react-test-renderer";

jest.mock("../../../utils/RoutesConnector", () => {
  return {
    __esModule: true,
    getRoutes: jest.fn(() => ({
      users: {
        create: "/register",
      },
    })),
  };
});

describe("Register Form Component", () => {
  let firstNameInput: HTMLElement;
  let lastNameInput: HTMLElement;
  let emailInput: HTMLElement;
  let passwordInput: HTMLElement;
  let btnSubmit: HTMLElement;

  enum FIELDS {
    FIRST_NAME = "first_name",
    LAST_NAME = "last_name",
    EMAIL = "email",
    PASSWORD = "password",
  }

  beforeEach(() => {
    render(<Register />);
    firstNameInput = screen.getByLabelText("first name");
    lastNameInput = screen.getByLabelText("last name");
    emailInput = screen.getByLabelText("email");
    passwordInput = screen.getByLabelText("password");
    btnSubmit = screen.getByRole("button", { name: /Submit/i });
  });

  afterEach(() => {
    mockAxios.reset();
  });

  const populateFirstNameInput = (value: string = "Joe") =>
    fireEvent.input(firstNameInput, { target: { value } });

  const populateLastNameInput = (value: string = "Bloggs") =>
    fireEvent.input(lastNameInput, { target: { value } });

  const populateEmailInput = (value: string = "joe@bloggs.ie") =>
    fireEvent.input(emailInput, { target: { value } });

  const populatePasswordInput = (value: string = "password") =>
    fireEvent.input(passwordInput, { target: { value } });

  const clickSubmit = () => {
    act(() => {
      fireEvent.click(btnSubmit);
    });
  };

  const expectFormReset = async () => {
    expect(firstNameInput).toHaveValue("");
    expect(lastNameInput).toHaveValue("");
    expect(emailInput).toHaveValue("");
    expect(passwordInput).toHaveValue("");
  };

  describe("fields", () => {
    it("expects only 4 fields", () => {
      const textFields = screen.getAllByRole("textbox");
      const passwordField = screen.getAllByLabelText("password");
      const fields = [...textFields, ...passwordField];
      expect(fields).toHaveLength(4);
      fields.forEach((field) => expect(field).toBeInTheDocument());
    });
  });

  describe("validations", () => {
    const testNotBlank = async (field: string) => {
      const requiredValidationMessage = "can't be blank";
      await expectFormReset();
      const firstNameValue = field === FIELDS.FIRST_NAME ? "" : "Joe";
      const lastNameValue = field === FIELDS.LAST_NAME ? "" : "Bloggs";
      const emailValue = field === FIELDS.EMAIL ? "" : "joe@bloggs.ie";
      const passwordValue = field === FIELDS.PASSWORD ? "" : "password";

      populateFirstNameInput(firstNameValue);
      populateLastNameInput(lastNameValue);
      populateEmailInput(emailValue);
      populatePasswordInput(passwordValue);

      clickSubmit();

      await waitFor(() => {
        mockAxios.mockError({
          errors: { [field]: [requiredValidationMessage] },
        });
      });

      expect(mockAxios.post).toHaveBeenCalledWith(getRoutes()?.users?.create, {
        user: {
          first_name: firstNameValue,
          last_name: lastNameValue,
          email: emailValue,
          password: passwordValue,
        },
      });

      expect(
        await screen.findByText(requiredValidationMessage)
      ).toBeInTheDocument();
    };

    const testEmailValidation = async (message: string) => {
      await expectFormReset();

      populateFirstNameInput();
      populateLastNameInput();
      populateEmailInput("invalid email");
      populatePasswordInput();

      clickSubmit();

      await waitFor(() => {
        mockAxios.mockError({
          errors: { email: [message] },
        });
      });

      expect(mockAxios.post).toHaveBeenCalledWith(getRoutes()?.users?.create, {
        user: {
          first_name: "Joe",
          last_name: "Bloggs",
          email: "invalid email",
          password: "password",
        },
      });

      expect(await screen.findByText(message)).toBeInTheDocument();
    };

    it("throws error message if first name blank", async () => {
      await testNotBlank(FIELDS.FIRST_NAME);
    });

    it("throws error message if last name blank", async () => {
      await testNotBlank(FIELDS.LAST_NAME);
    });

    it("throws error message if email name blank", async () => {
      await testNotBlank(FIELDS.EMAIL);
    });

    it("throws error message if password blank", async () => {
      await testNotBlank(FIELDS.PASSWORD);
    });

    it("throws error message if email format is incorrect", async () => {
      await testEmailValidation("ensure you enter a valid email");
    });

    it("throws error message if email format is already taken", async () => {
      await testEmailValidation("has already been taken.");
    });
  });
});
