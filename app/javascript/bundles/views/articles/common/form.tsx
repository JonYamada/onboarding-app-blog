import React, {useState} from 'react'
import Card from '../../../components/card/Card'
import LoadingButton from '@mui/lab/LoadingButton'
import RichTextEditor from '../../../components/editor/RichTextEditor'
import {Box, Input} from '@mui/material'
import {ErrorMessage, Form, Formik} from 'formik'
import {IArticleForm, IParams} from '../interfaces'
import {buttonText, form, validations} from '../../../config/translations/en.json'

const defaultProps = {
  article: [],
  className: null,
  onSubmit: null,
}

interface IErrors {
  content?: { isEmpty?: boolean, message?: string }
  title?: { isEmpty?: boolean, message?: string }
}

const ArticleForm = ({article, className, loading, onSubmit: onSave}: IArticleForm) => {
  const [errors, setErrors] = useState<IErrors>({
    content: {isEmpty: false, message: ''},
    title: {isEmpty: false, message: ''}
  })

  const [values, setValues] = useState<IParams>({content: '', title: ''})

  return (
    <Box className={className}>
      <Formik
        initialValues={values}
        onSubmit={() => {
          if (onSave) onSave(values)
        }}
        validate={() => {
          const formikErrors: Record<string, string> = {}

          if (!values.content || errors.content?.isEmpty) {
            setErrors({...errors, content: {...errors.content, message: validations.requiredContent}})
            formikErrors.content = validations.requiredContent
          }

          if (!values.title) {
            setErrors({...errors, title: {...errors.title, message: validations.requiredTitle}})
            formikErrors.title = validations.requiredTitle
          }

          return formikErrors
        }}
      >
        {({errors: formikErrors}) => (
          <Form>
            <Card>
              <Box sx={{mb: 1}}>
                <label htmlFor='title'>{form.label.title}</label>
                <Input
                  type='text'
                  error={!!formikErrors?.title}
                  id='title'
                  name='title'
                  onChange={({target: {value: title}}) => setValues({...values, title})}
                  sx={{width: '100%', marginBottom: 1}}
                />
                <ErrorMessage className='error-message' name='title' component='div'/>
              </Box>
              <Box sx={{mb: 1}}>
                <label htmlFor='content'>{form.label.content}</label>
                <RichTextEditor
                  ariaLabel='aria-editor'
                  className={`${!!formikErrors?.content && 'border-invalid'}`}
                  onChange={html => setValues({...values, content: html})}
                  onError={({isEmpty, message}) => setErrors({...errors, content: {isEmpty, message}})}
                />
                <ErrorMessage className='error-message' name='content' component='div'/>
              </Box>
            </Card>

            <LoadingButton
              type='submit'
              loading={loading}
              loadingPosition='center'
              sx={{mt: 1, float: 'right'}}
              variant='contained'
            >
              {buttonText.submit}
            </LoadingButton>
          </Form>
        )}
      </Formik>
    </Box>
  )
}

ArticleForm.defaultProps = defaultProps

export default ArticleForm
