import React from 'react'
import renderer from 'react-test-renderer'
import RichTextEditor from '../RichTextEditor'
import {EditorProps} from 'react-draft-wysiwyg'

jest.mock('draft-js/lib/generateRandomKey', () => () => '123')

describe('RichTextEditor', () => {
  interface IRichTextEditorProps {
    className?: string
    onChange: (htmlContent: string) => void
    onError: (errors: { isEmpty: boolean, message: string }) => void
    rest?: EditorProps,
  }

  const renderRichTextEditor = ({
                                  className,
                                  onChange = () => {},
                                  onError = () => {},
                                  wrapperId = 1
                                }: IRichTextEditorProps & EditorProps) =>
    (
      renderer
        .create(
          <RichTextEditor
            className={className}
            onChange={onChange}
            onError={onError}
            wrapperId={wrapperId}
          />
        )
        .toJSON()
    )

  it('renders correctly when required props provided only', () => {
    const tree = renderRichTextEditor({
      onChange: () => {},
      onError: () => {},
    })

    expect(tree).toMatchSnapshot()
  })

  it('renders correctly when both required and options props are provided', () => {
    const tree = renderRichTextEditor({
      className: 'editor class',
      onChange: () => {},
      onError: () => {},
      wrapperId: 2,
    })
    expect(tree).toMatchSnapshot()
  })
})
