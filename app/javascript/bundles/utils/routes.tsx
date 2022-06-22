import React, { ReactNode } from "react";
import { IRailsContext } from "../components/interfaces";

const ROUTE_KEY = "routes";

export const RoutesConnector = (
  props: ReactNode,
  railsContext: IRailsContext
) => {
  localStorage.setItem(ROUTE_KEY, JSON.stringify(railsContext?.routes));
  return () => <div />;
};

export const getRoutes = () => {
  const routes = localStorage.getItem(ROUTE_KEY);
  if (!routes) return {};
  return JSON.parse(routes);
};
