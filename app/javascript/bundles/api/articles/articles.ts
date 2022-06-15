import {IParams} from '../../views/articles/interfaces'
import {client} from '../setup'
import {ARTICLES_PATH} from '../../constants/routes'

const createArticle = (params: IParams) => {
  // TODO add to current user when available
  params.user_id = 1
  return new Promise(((resolve, reject) => {
    client.post(ARTICLES_PATH, {article: params})
      .then(resolve)
      .catch(reject)
  }))
}

export {
  createArticle,
}
