import { IParams } from "../../views/auth/interfaces";
import { client, routes } from "../setup";

export const register = (params: IParams) => {
  return new Promise((resolve, reject) => {
    client
      .post(routes.users.create, { user: params })
      .then(resolve)
      .catch(reject);
  });
};
