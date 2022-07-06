import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import MainLayout from "../MainLayout";

describe("MainLayout Component", () => {
  let x: HTMLElement;

  beforeEach(() => {
    render(<MainLayout children={<div />} />);
  });

  describe("Login Icon", () => {
    it("displays user initials when authenticated", () => {});

    it("displays login link when unauthenticated", () => {});
  });
});
