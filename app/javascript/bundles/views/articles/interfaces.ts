interface IArticleForm {
  article: IParams
  className?: string
}

interface IArticles {
  articles: Array<IListItemPreview>
  className?: string
  newArticlePath: string
}

interface IListItemPreview {
  content: string
  profileImg?: string
  title: string
}

interface IParams {
  title: string;
  content: string;
  user_id?: number;
}

export {
  IArticleForm,
  IArticles,
  IListItemPreview,
  IParams,
}
