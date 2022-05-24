import ReactOnRails from 'react-on-rails'

// components
import HelloWorld from '../bundles/HelloWorld/components/HelloWorld.tsx'
import ListItemPreview from '../bundles/components/list/ListItemPreview'
import {Toaster} from 'react-hot-toast'

// hooks
import UseToast from '../bundles/hooks/useToast'

//views
import ArticleForm from '../bundles/views/articles/common/form'
import Articles from '../bundles/views/articles/index.tsx'
import NewArticle from '../bundles/views/articles/new.tsx'

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  ArticleForm,
  Articles,
  HelloWorld,
  ListItemPreview,
  NewArticle,
  Toaster,
  UseToast,
})
