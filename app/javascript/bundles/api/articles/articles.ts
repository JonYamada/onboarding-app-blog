import {IParams} from "../../views/articles/interfaces"
import {client, routes} from "../setup"

export const createArticle = (id: number, params: IParams) => {
  params.user_id = id;
  return new Promise((resolve, reject) => {
    client
      .post(routes.articles.create, { article: params })
      .then(resolve)
      .catch(reject);
  });
};
