import React from "react";
import { IAuthProps } from "./interface";

const CURRENT_USER_KEY = "currentUser";

export const AuthConnector = (props: IAuthProps) => {
  if (!!props.currentUser) {
    localStorage.setItem(
      CURRENT_USER_KEY,
      JSON.stringify({
        ...props.currentUser,
        initials: props.currentUserInitials || "",
      })
    );
  } else {
    localStorage.setItem(CURRENT_USER_KEY, "");
  }
  return () => <div />;
};

export const isLoggedIn = () => {
  return Object.keys(localStorage.getItem(CURRENT_USER_KEY) || {}).length > 0;
};

export const getCurrentUser = () => {
  const currentUser = localStorage.getItem(CURRENT_USER_KEY);
  if (!currentUser) return {};
  return JSON.parse(currentUser);
};
