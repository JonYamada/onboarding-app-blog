import {IParams} from '../../views/articles/interfaces'
import {client} from '../setup'

export const createArticle = (params: IParams) => {
  params.user_id = 1
  return new Promise(((resolve, reject) => {
    client.post('/articles', {article: params})
      .then(resolve)
      .catch(reject)
  }))
}
