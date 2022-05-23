interface IArticleForm extends Partial<IWithLoaderProps> {
  article?: IParams
  className?: string
  onSubmit?(values: IParams): any
}

interface IArticles {
  articles: Array<IListItemPreview>
  className?: string
  newArticlePath: string
}

interface IListItemPreview {
  content: string | object
  profileImg?: string
  title: string
}

interface IParams {
  title: string;
  content: string;
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
