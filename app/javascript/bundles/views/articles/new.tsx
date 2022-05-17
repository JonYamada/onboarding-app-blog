import React, {useState} from 'react'
import ArticleForm from './common/form'
import {IParams} from './interfaces'
import {createArticle} from '../../api/articles/articles'
import {redirectTo} from '../../utils/nav'
import {toast as toastTranslations} from '../../config/translations/en.json'
import {toast} from 'react-hot-toast'

const defaultProps = {
  className: null
}

const NewArticle = ({className}: { article: IParams, className: string }) => {
  const [loading, setLoading] = useState(false)

  const handleSubmit = (values: IParams) => {
    setLoading(true)
    createArticle(values)
      .then(({request}) => {
        redirectTo(request?.responseURL, {
          toast: {
            message: toastTranslations.successSaved,
            type: 'success',
          }
        })
      })
      .catch(() => toast.error(toastTranslations.errorGeneric))
      .finally(() => setLoading(false))
  }

  return <ArticleForm onSubmit={handleSubmit} className={`new-article ${className}`}/>
}

NewArticle.defaultProps = defaultProps

export default NewArticle
