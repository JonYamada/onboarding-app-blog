import ReactOnRails from 'react-on-rails'

// components
import ListItemPreview from '../bundles/components/list/ListItemPreview'
import {Toaster} from 'react-hot-toast'

// hooks
import UseToast from '../bundles/hooks/useToast'

//views
import ArticleForm from '../bundles/views/articles/common/form'
import Articles from '../bundles/views/articles/index.tsx'
import NewArticle from '../bundles/views/articles/new.tsx'

ReactOnRails.register({
  ArticleForm,
  Articles,
  ListItemPreview,
  NewArticle,
  Toaster,
  UseToast,
})
