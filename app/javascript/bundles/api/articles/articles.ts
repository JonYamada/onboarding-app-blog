import {IParams} from '../../views/articles/interfaces'
import {client} from '../setup'

const createArticle = (params: IParams) => {
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
