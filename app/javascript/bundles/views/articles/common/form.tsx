import React, {useState} from 'react'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import {Box, Button, CircularProgress, Input} from '@mui/material'
import {EditorState} from 'draft-js'
import {Editor} from 'react-draft-wysiwyg'
import {ErrorMessage, Form, Formik} from 'formik'
import {IArticleForm} from '../interfaces'
import {buttonText, validations} from '../../../config/translations/en.json'
import {stateToHTML} from 'draft-js-export-html'
import parse from 'html-react-parser'

const defaultProps = {
  article: [],
  className: null,
  onSubmit: null,
}

const ArticleForm = ({article, className, loading, onSubmit: onSave}: IArticleForm) => {
  const [values, setValues] = useState<{ title: string, content: string }>({
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
                <label>Title</label>
                <Input
                  onChange={({target: {value: title}}) => setValues({...values, title})}
                  name='title'
                  type='text'
                />
                <ErrorMessage name='title' component='div'/>
              </Box>
              <Box>
                <label>Content</label>
                <Editor
                  editorState={editorState}
                  onEditorStateChange={editorState => {
                    setEditorState(editorState)
                    setValues({...values, content: stateToHTML(editorState.getCurrentContent())})
                  }}
                />
                <ErrorMessage name='content' component='div'/>
              </Box>
              {
                loading ? <CircularProgress/> :
                  <Button variant='contained' type='submit' disabled={loading}>
                    {buttonText.submit}
                  </Button>
              }
            </Form>
          )
        }
      </Formik>
    </Box>
  )
}

ArticleForm.defaultProps = defaultProps

export default ArticleForm
