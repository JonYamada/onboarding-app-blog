import axios from "axios";
import { getRoutes } from "../utils/RoutesConnector";

export const client = axios.create({
  timeout: 1000,
});

export const routes = getRoutes();
