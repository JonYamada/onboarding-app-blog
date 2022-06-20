import {IPathProps} from '../../api/interfaces'
import {RawDraftContentState} from 'draft-js'

interface IArticleForm extends Partial<IWithLoaderProps> {
  article?: IParams
  className?: string
  onSubmit?(values: IParams): void
  name?: string
  message?: string
}

interface IArticles {
  articles: Array<IListItemPreview>
  className?: string
  newPath?: string
  routes: IPathProps
}

interface IListItemPreview {
  content: string | object
  profileImg?: string
  title: string
}

interface IParams {
  content: string | RawDraftContentState;
  title: string;
  user_id?: number;
}

interface IWithLoaderProps {
  loading: boolean
  toggleLoading: (flag?: boolean) => void
}

export {
  IArticleForm,
  IArticles,
  IListItemPreview,
  IParams,
  IWithLoaderProps,
}
