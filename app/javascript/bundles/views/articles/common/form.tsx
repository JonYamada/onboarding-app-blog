import React, {useState} from 'react'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import {Box, Input} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import {ErrorMessage, Form, Formik} from 'formik'
import {IArticleForm, IParams} from '../interfaces'
import {buttonText, form, validations} from '../../../config/translations/en.json'
import RichTextEditor from '../../../components/editor/RichTextEditor'
import Card from '../../../components/card/Card'

const defaultProps = {
  article: [],
  className: null,
  onSubmit: null,
}

const ArticleForm = ({article, className, loading, onSubmit: onSave}: IArticleForm) => {
  const [values, setValues] = useState<IParams>({
    content: '',
    title: '',
  })

  return (
    <Box className={className}>
      <Formik
        initialValues={values}
        onSubmit={() => {
          if (onSave) onSave(values)
        }}
        validate={() => {
          const errors: Record<string, string> = {title: '', content: ''}
          if (!values.content) errors.content = validations.requiredContent
          if (!values.title) errors.title = validations.requiredTitle

          Object.keys(errors).forEach(key => {
            if (!errors[key]) delete errors[key]
          })
          return errors
        }}
      >
        {({errors}) => (
          <Form>

            <Card>
              <Box sx={{mb: 1}}>
                <label>{form.label.title}</label>
                <Input
                  type='text'
                  error={!!errors.title}
                  name='title'
                  onChange={({target: {value: title}}) => setValues({...values, title})}
                  sx={{width: '100%', marginBottom: 1}}
                />
                <ErrorMessage className='error-message' name='title' component='div'/>
              </Box>
              <Box sx={{mb: 1}}>
                <label>{form.label.content}</label>
                <RichTextEditor
                  className={`${!!errors.content && 'border-invalid'}`}
                  onChange={html => setValues({...values, content: html})}
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
        )
        }
      </Formik>
    </Box>
  )
}

ArticleForm.defaultProps = defaultProps

export default ArticleForm
