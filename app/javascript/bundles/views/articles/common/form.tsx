import React, {useState} from 'react'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import {Box, Input} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import {EditorState} from 'draft-js'
import {Editor} from 'react-draft-wysiwyg'
import {ErrorMessage, Form, Formik} from 'formik'
import {IArticleForm, IParams} from '../interfaces'
import {buttonText, form, validations} from '../../../config/translations/en.json'
import {stateToHTML} from 'draft-js-export-html'

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

  const [editorState, setEditorState] = useState(EditorState.createEmpty())

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
        {
          () => (
            <Form>
              <Box sx={{marginBottom: 1}}>
                <label>{form.label.title}</label>
                <Input
                  onChange={({target: {value: title}}) => setValues({...values, title})}
                  name='title'
                  type='text'
                />
                <ErrorMessage name='title' component='div'/>
              </Box>
              <Box>
                <label>{form.label.content}</label>
                <Editor
                  editorState={editorState}
                  onEditorStateChange={editorState => {
                    setEditorState(editorState)
                    setValues({...values, content: stateToHTML(editorState.getCurrentContent())})
                  }}
                />
                <ErrorMessage name='content' component='div'/>
              </Box>

              <LoadingButton type='submit' loading={loading} loadingPosition='center' variant='contained'>
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
