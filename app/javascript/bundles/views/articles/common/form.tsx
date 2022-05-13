import React from 'react'
import {Formik, Form, Field, ErrorMessage, FormikHelpers} from 'formik'
import {IArticleForm, IParams} from '../interfaces'
import {Box, Button} from '@mui/material'
import axios from 'axios'
import {createArticle} from '../../../api/articles/articles'

const defaultProps = {
  className: null
}

const ArticleForm = ({className}: IArticleForm) => {
  return (
    <div className={className}>
      <Formik
        initialValues={{title: '', content: ''}}
        validate={values => {
          const errors: Record<string, string> = {title: '', content: ''}
          if (!values.title) errors.title = 'Title Required'
          if (!values.content) errors.content = 'Content Required'

          Object.keys(errors).forEach(key => {
            if (!errors[key]) delete errors[key]
          })
          return errors
        }}
        onSubmit={(values: IParams, {setSubmitting, resetForm}: FormikHelpers<IParams>) => {
          // TODO add to current user when available
          values.user_id = 1
          createArticle(values)
            .then(resetForm)
            .catch(console.error)
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
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

ArticleForm.defaultProps = defaultProps

export default ArticleForm