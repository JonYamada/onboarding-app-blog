import React from 'react'
import ArticleForm from './common/form'
import MainLayout from '../../layouts/MainLayout'
import withLoader from '../../HOCs/withLoader'
import {IArticleForm, IParams} from './interfaces'
import {createArticle} from '../../api/articles/articles'
import {redirectTo} from '../../utils/nav'
import {toast as toastTranslations} from '../../config/translations/en.json'
import {toast} from 'react-hot-toast'

const defaultProps = {
  className: null,
  loading: false,
  toggleLoading: () => {
  },
}

const NewArticle = ({className, loading, toggleLoading}: IArticleForm) => {
  const handleSubmit = (values: IParams) => {
    if (toggleLoading) toggleLoading()
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
      .finally(() => {
        if (toggleLoading) toggleLoading(false)
      })
  }

  return (
    <MainLayout>
      <ArticleForm
        className={`new-article ${className}`}
        loading={loading}
        onSubmit={handleSubmit}
      />
    </MainLayout>
  )
}

NewArticle.defaultProps = defaultProps

export default withLoader(NewArticle)
