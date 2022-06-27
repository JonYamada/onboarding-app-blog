import ReactOnRails from "react-on-rails";

// components
import ListItemPreview from "../bundles/components/list/ListItemPreview";
import { Toaster } from "react-hot-toast";

// hooks
import UseToast from "../bundles/hooks/useToast";

// views
import ArticleForm from "../bundles/views/articles/common/form";
import Articles from "../bundles/views/articles/index";
import NewArticle from "../bundles/views/articles/new";
import Register from "../bundles/views/auth/Register";
import SideNav from "../bundles/components/nav/SideNav";

import { RoutesConnector } from "../bundles/utils/RoutesConnector";
import { AuthConnector } from "../bundles/utils/AuthConnector";

ReactOnRails.register({
  ArticleForm,
  Articles,
  AuthConnector,
  ListItemPreview,
  NewArticle,
  Register,
  RoutesConnector,
  SideNav,
  Toaster,
  UseToast,
});
