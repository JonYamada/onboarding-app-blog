import React, {useState} from 'react'
import {EditorState} from 'draft-js'
import {Editor} from 'react-draft-wysiwyg'
import {stateToHTML} from 'draft-js-export-html'

const defaultProps = {
  className: null,
  onChange: null,
  rest: null,
}

interface IRichTextEditorProps {
  className?: string
  onChange: (htmlContent: string) => void
  rest?: object,
}

const RichTextEditor = ({className, onChange, rest}: IRichTextEditorProps) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  return (
    <Editor
      toolbar={{
        options: ['inline', 'blockType', 'fontSize', 'list', 'link', 'emoji', 'history'],
      }}
      {...rest}
      editorClassName={className}
      editorState={editorState}
      onEditorStateChange={editorState => {
        setEditorState(editorState)
        onChange(stateToHTML(editorState.getCurrentContent()))
      }}
    />
  )
}

RichTextEditor.defaultProps = defaultProps

export default RichTextEditor
