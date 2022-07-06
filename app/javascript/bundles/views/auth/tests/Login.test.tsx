import React from "react"
import "@testing-library/jest-dom"
import {render} from "@testing-library/react"
import Login from '../Login'

describe("Login Form Component", () => {
  let x: HTMLElement;

  beforeEach(() => {
    render(<Login />);
  });

  describe("fields", () => {
    it("expects only 2 fields", () => {});
  });

  describe("validations", () => {
  });
});
