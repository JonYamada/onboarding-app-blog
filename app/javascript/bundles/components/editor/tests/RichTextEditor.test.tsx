import renderer from 'react-test-renderer'
import RichTextEditor from '../RichTextEditor'

jest.mock('draft-js/lib/generateRandomKey', () => () => '123')

describe('RichTextEditor', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <RichTextEditor
        onChange={() => console.log(1)}
        onError={() => console.log(1)}
        wrapperId={1}
      />
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
