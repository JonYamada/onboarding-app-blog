import { ILoginParams, IRegisterParams } from "../../views/auth/interfaces";
import { client, routes } from "../setup";

export const register = (params: IRegisterParams) => {
  return new Promise((resolve, reject) => {
    client
      .post(routes?.users?.create, { user: params })
      .then(resolve)
      .catch(reject);
  });
};

export const login = (params: ILoginParams) => {
  return new Promise((resolve, reject) => {
    client
      .post(routes?.sessions?.create, { user: params })
      .then(resolve)
      .catch(reject);
  });
};
