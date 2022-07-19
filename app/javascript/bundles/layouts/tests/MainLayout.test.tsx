import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import MainLayout from "../MainLayout";
import { buttonText } from "../../config/translations/en.json";

const initials = "JY";
const loginText = buttonText.login;

describe("MainLayout Component", () => {
  describe("Login and user initials / avatar buttons", () => {
    it("displays user initials when authenticated", async () => {
      render(
        <MainLayout children={<div />} initials={initials} isAuthenticated />
      );

      expect(await screen.queryByText(loginText)).not.toBeInTheDocument();
      expect(await screen.findByText(initials)).toBeInTheDocument();
    });

    it("displays login link when unauthenticated", async () => {
      render(
        <MainLayout
          children={<div />}
          initials={initials}
          isAuthenticated={false}
        />
      );

      expect(await screen.queryByText(initials)).not.toBeInTheDocument();
      expect(await screen.findByText(loginText)).toBeInTheDocument();
    });
  });
});
