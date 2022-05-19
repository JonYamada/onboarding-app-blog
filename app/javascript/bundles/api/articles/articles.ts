import {IParams} from '../../views/articles/interfaces'
import {client} from '../setup'

const createArticle = (params: IParams) => {
  // TODO add to current user when available
  params.user_id = 1
  return new Promise(((resolve, reject) => {
    client.post('/articles', {article: params})
      .then(resolve)
      .catch(reject)
  }))
}

const deleteArticle = () => {
}

const updateArticle = () => {
}

export {
  createArticle,
  deleteArticle,
  updateArticle,
}
