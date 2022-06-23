import axios from "axios";
import { getRoutes } from "../utils/routes";

export const client = axios.create({
  timeout: 1000,
});

export const routes = getRoutes();
