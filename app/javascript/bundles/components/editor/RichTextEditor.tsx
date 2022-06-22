import React, {useEffect, useState} from 'react'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import translations from '../../config/translations/en.json'
import {EditorState} from 'draft-js'
import {Editor, EditorProps} from 'react-draft-wysiwyg'
import {stateToHTML} from 'draft-js-export-html'

const defaultProps = {
  className: null,
  onChange: null,
  onError: {},
  rest: null,
}

interface IRichTextEditorProps {
  className?: string
  onChange: (htmlContent: string) => void
  onError: (errors: { isEmpty: boolean, message: string }) => void
}

const RichTextEditor = ({className, onChange, onError, ...rest}: IRichTextEditorProps & EditorProps): JSX.Element => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [errors, setErrors] = useState({isEmpty: false, message: ''})
  const [submitTouched, setSubmitTouched] = useState(false)

  useEffect(() => {
    const form = document.getElementsByTagName('form')
    if (form.length > 0) {
      form[0].addEventListener('submit', () => {
        if (submitTouched) validate()
        setSubmitTouched(true)
      })
    }
    onError(errors)
  }, [editorState])

  const htmlContent = stateToHTML(editorState.getCurrentContent())

  const extractHTMLTextContent = (html: string) => {
    return new DOMParser().parseFromString(html, 'text/html').documentElement.textContent
  }

  const validate = () => {
    const isEmpty = extractHTMLTextContent(htmlContent)?.trim().length === 0
    setErrors({
      ...errors,
      isEmpty,
      message: isEmpty ? translations.validations.requiredContent : '',
    })
  }

  return (
    <Editor
      editorStyle={{padding: '0 5px', minHeight: 300}}
      toolbar={{
        options: ['inline', 'blockType', 'fontSize', 'list', 'link', 'emoji', 'history'],
      }}
      {...rest}
      editorClassName={className}
      editorState={editorState}
      onEditorStateChange={editorState => {
        if (submitTouched) validate()
        setEditorState(editorState)
        onChange(htmlContent)
      }}
    />
  )
}

RichTextEditor.defaultProps = defaultProps

export default RichTextEditor
