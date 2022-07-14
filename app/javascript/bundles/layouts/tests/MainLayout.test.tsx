import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import MainLayout from "../MainLayout";
import { act } from "react-test-renderer";
import mockAxios from "jest-mock-axios";
import { getRoutes } from "../../utils/RoutesConnector";

const initials = "JY";
const loginText = "Login";
const logoutText = "Logout";

jest.mock("../../utils/RoutesConnector", () => {
  return {
    __esModule: true,
    getRoutes: jest.fn(() => ({
      sessions: {
        create: "/login",
        destroy: "/logout",
      },
    })),
  };
});

describe("MainLayout", () => {
  describe("Login and avatar buttons", () => {
    const findLoginLink = async () =>
      await screen.findByRole("link", { name: loginText });
    const queryLoginLink = async () =>
      await screen.queryByRole("link", { name: loginText });
    const getLoginLink = async () =>
      await screen.getByRole("link", { name: loginText });

    const getBtnInitials = async () =>
      await screen.getByRole("button", { name: initials });
    const queryBtnInitials = async () =>
      await screen.queryByRole("button", { name: initials });

    const getBtnLogout = async () =>
      await screen.getByRole("menuitem", { name: logoutText });

    it("displays user initials when authenticated", async () => {
      render(
        <MainLayout children={<div />} initials={initials} isAuthenticated />
      );

      expect(await getBtnInitials()).toBeInTheDocument();
      expect(await queryLoginLink()).not.toBeInTheDocument();
    });

    it("displays login link when unauthenticated", async () => {
      render(
        <MainLayout
          children={<div />}
          initials={initials}
          isAuthenticated={false}
        />
      );

      expect(await queryBtnInitials()).not.toBeInTheDocument();
      expect(await getLoginLink()).toBeInTheDocument();
    });

    it("user avatar disappears when logout clicked", async () => {
      render(
        <MainLayout children={<div />} initials={initials} isAuthenticated />
      );

      const btnAvatar = await getBtnInitials();
      expect(btnAvatar).toBeInTheDocument();
      act(() => {
        fireEvent.click(btnAvatar);
      });

      const btnLogout = await getBtnLogout();
      expect(btnLogout).toBeInTheDocument();

      act(() => {
        fireEvent.click(btnLogout);
      });

      expect(mockAxios.delete).toHaveBeenCalledWith(
        getRoutes()?.sessions?.destroy
      );

      render(
        <MainLayout
          children={<div />}
          initials={initials}
          isAuthenticated={false}
        />
      );

      expect(btnAvatar).not.toBeInTheDocument();
      expect(await findLoginLink()).toBeInTheDocument();
    });
  });
});
