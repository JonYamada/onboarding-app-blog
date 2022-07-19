import React from "react";
import "@testing-library/jest-dom";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import MainLayout from "../MainLayout";
import {act} from "react-test-renderer";
import mockAxios from "jest-mock-axios";
import {getRoutes} from "../../utils/RoutesConnector";
import {redirectTo} from "../../utils/nav";

const initials = "JY";
const loginText = "Login";
const logoutText = "Logout";
const mainPageUrl = '/articles'

jest.mock("../../utils/RoutesConnector", () => {
  return {
    __esModule: true,
    getRoutes: jest.fn(() => ({
      articles: {
        index: "/articles",
      },
      sessions: {
        create: "/login",
        destroy: "/logout",
      },
    })),
  };
});

jest.mock("../../utils/nav", () => {
  return {
    __esModule: true,
    redirectTo: jest.fn(),
  };
});

describe("MainLayout", () => {
  describe("Login and avatar buttons", () => {
    const findLoginLink = async () =>
      await screen.findByRole("link", {name: loginText});
    const queryLoginLink = async () =>
      await screen.queryByRole("link", {name: loginText});
    const getLoginLink = async () =>
      await screen.getByRole("link", {name: loginText});

    const getBtnInitials = async () =>
      await screen.getByRole("button", {name: initials});
    const queryBtnInitials = async () =>
      await screen.queryByRole("button", {name: initials});

    const getMenuItemLogout = async () =>
      await screen.getByRole("menuitem", {name: logoutText});

    it("displays user initials when authenticated", async () => {
      render(
        <MainLayout children={<div/>} initials={initials} isAuthenticated/>
      );

      expect(await getBtnInitials()).toBeInTheDocument();
      expect(await queryLoginLink()).not.toBeInTheDocument();
    });

    it("displays login link when unauthenticated", async () => {
      render(
        <MainLayout
          children={<div/>}
          initials={initials}
          isAuthenticated={false}
        />
      );

      expect(await queryBtnInitials()).not.toBeInTheDocument();
      expect(await getLoginLink()).toBeInTheDocument();
    });

    it("user avatar disappears when logout clicked", async () => {
      render(
        <MainLayout children={<div/>} initials={initials} isAuthenticated/>
      );

      const btnAvatar = await getBtnInitials();
      expect(btnAvatar).toBeInTheDocument();
      act(() => {
        fireEvent.click(btnAvatar);
      });

      const menuItemLogout = await getMenuItemLogout();
      expect(menuItemLogout).toBeInTheDocument();

      act(() => {
        fireEvent.click(menuItemLogout);
      });

      await waitFor(() => {
        mockAxios.mockResponse();
      });

      expect(mockAxios.delete).toHaveBeenCalledWith(
        getRoutes()?.sessions?.destroy
      );

      expect(redirectTo).toHaveBeenCalledWith(mainPageUrl);

      render(
        <MainLayout
          children={<div/>}
          initials={initials}
          isAuthenticated={false}
        />
      );

      expect(btnAvatar).not.toBeInTheDocument();
      expect(await findLoginLink()).toBeInTheDocument();
    });
  });
});
