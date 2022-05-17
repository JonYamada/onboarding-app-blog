import React, {useState} from 'react'
import {Formik, Form, Field, ErrorMessage, FormikHelpers} from 'formik'
import {IArticleForm, IParams} from '../interfaces'
import {Box, Button, CircularProgress} from '@mui/material'
import {createArticle} from '../../../api/articles/articles'
import {toast} from 'react-hot-toast'
import {buttonText, toast as toastTranslations, validations} from '../../../config/translations/en.json'
import {redirectTo} from '../../../utils/nav'

const defaultProps = {
  className: null
}

const ArticleForm = ({className}: IArticleForm) => {
  const [loading, setLoading] = useState(false)

  return (
    <div className={className}>
      <Formik
        initialValues={{title: '', content: ''}}
        validate={values => {
          const errors: Record<string, string> = {title: '', content: ''}
          if (!values.title) errors.title = validations.requiredTitle
          if (!values.content) errors.content = validations.requiredContent

          Object.keys(errors).forEach(key => {
            if (!errors[key]) delete errors[key]
          })
          return errors
        }}
        onSubmit={(values: IParams, {resetForm}: FormikHelpers<IParams>) => {
          // TODO add to current user when available
          setLoading(true)
          values.user_id = 1
          createArticle(values)
            .then(({request}) => {
              resetForm()
              redirectTo(request?.responseURL, {
                toast: {
                  message: toastTranslations.successSaved,
                  type: 'success',
                }
              })
            })
            .catch(() => toast.error(toastTranslations.errorGeneric))
            .finally(() => setLoading(false))
        }}
      >
        {() => (
          <Form>
            <Box sx={{marginBottom: 1}}>
              <Field type='text' name='title'/>
              <ErrorMessage name='title' component='div'/>
            </Box>
            <Box>
              <Field as='textarea' name='content' rows={20}/>
              <ErrorMessage name='content' component='div'/>
            </Box>
            {
              loading ? <CircularProgress/> :
                <Button variant='contained' type='submit' disabled={loading}>
                  {buttonText.submit}
                </Button>
            }
          </Form>
        )}
      </Formik>
    </div>
  )
}

ArticleForm.defaultProps = defaultProps

export default ArticleForm
