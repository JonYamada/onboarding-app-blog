import React from 'react'
import {Formik, Form, Field, ErrorMessage, FormikHelpers} from 'formik'
import {IArticleForm, IParams} from '../interfaces'
import {Box, Button} from '@mui/material'
import {createArticle} from '../../../api/articles/articles'
import {toast} from 'react-hot-toast'
import ToastWrapper from '../../../components/toaster/ToastWrapper'
import {buttonText, toast as toastTranslations, validations} from '../../../config/translations/en.json'

const defaultProps = {
  className: null
}

const ArticleForm = ({className}: IArticleForm) => {
  return (
    <ToastWrapper className={className}>
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
        onSubmit={(values: IParams, {setSubmitting, resetForm}: FormikHelpers<IParams>) => {
          // TODO add to current user when available
          values.user_id = 1
          createArticle(values)
            .then(() => {
              resetForm()
              toast.success(toastTranslations.successSaved)
            })
            .catch(() => toast.error(toastTranslations.errorGeneric))
          setSubmitting(false)
        }}
      >
        {({isSubmitting}) => (
          <Form>
            <Box sx={{marginBottom: 1}}>
              <Field type='text' name='title'/>
              <ErrorMessage name='title' component='div'/>
            </Box>
            <Box>
              <Field as='textarea' name='content' rows={20}/>
              <ErrorMessage name='content' component='div'/>
            </Box>
            <Button variant='contained' type='submit' disabled={isSubmitting}>
              {buttonText.submit}
            </Button>
          </Form>
        )}
      </Formik>
    </ToastWrapper>
  )
}

ArticleForm.defaultProps = defaultProps

export default ArticleForm
