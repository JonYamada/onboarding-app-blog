import React, {useState} from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import {IArticleForm, IParams} from '../interfaces'
import {Box, Button, CircularProgress} from '@mui/material'
import {buttonText, validations} from '../../../config/translations/en.json'

const defaultProps = {
  article: [],
  className: null,
  onSubmit: null,
}

const ArticleForm = ({article, className, loading, onSubmit: onSave}: IArticleForm) => {
  const [initialValues, setInitialValues] = useState({title: '', content: ''})

  return (
    <div className={className}>
      <Formik
        initialValues={initialValues}
        onSubmit={(values: IParams) => onSave(values)}
        validate={values => {
          const errors: Record<string, string> = {title: '', content: ''}
          if (!values.content) errors.content = validations.requiredContent
          if (!values.title) errors.title = validations.requiredTitle

          Object.keys(errors).forEach(key => {
            if (!errors[key]) delete errors[key]
          })
          return errors
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
