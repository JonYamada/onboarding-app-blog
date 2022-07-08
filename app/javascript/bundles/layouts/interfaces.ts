import { ReactNode } from "react";

interface IAuthLayoutProps {
  className?: string;
  children: ReactNode;
}

interface IMainLayoutProps {
  children: ReactNode;
  className?: string;
  initials?: string;
  isAuthenticated?: boolean;
}

export { IAuthLayoutProps, IMainLayoutProps };
