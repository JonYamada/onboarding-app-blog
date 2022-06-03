import renderer from 'react-test-renderer'
import RichTextEditor from '../RichTextEditor'

jest.mock('draft-js/lib/generateRandomKey', () => () => '123')
describe('RichTextEditor', () => {
  it('renders correctly when required props provided only', () => {
    const tree = renderer.create(
      <RichTextEditor
        onChange={() => {}}
        onError={() => {}}
        wrapperId={1}
      />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders correctly when both required and options props are provided', () => {
    const tree = renderer.create(
      <RichTextEditor
        className='editor class'
        onChange={() => {}}
        onError={() => {}}
        wrapperId={2}
      />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
