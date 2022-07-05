import React from "react";
import ArticleForm from "./common/form";
import MainLayout from "../../layouts/MainLayout";
import { IArticleForm, IParams } from "./interfaces";
import { createArticle } from "../../api/articles/articles";
import { redirectTo } from "../../utils/nav";
import { toast as toastTranslations } from "../../config/translations/en.json";
import { setToast } from "../../utils/toast";
import { toast } from "react-hot-toast";
import { IRailsContext } from "../../components/interfaces";
import {getCurrentUser} from '../../utils/AuthConnector'

const defaultProps = {
  className: null,
  loading: false,
  toggleLoading: () => {},
};

const NewArticle = (
  { className, loading, toggleLoading }: IArticleForm,
  railsContext: IRailsContext
) => {
  const { index: indexPath } = railsContext?.routes?.articles;
  return () => {
    const handleSubmit = (values: IParams) => {
      if (toggleLoading) toggleLoading();
      createArticle(getCurrentUser().id, values)
        .then(() => {
          if (indexPath) redirectTo(indexPath);
          setToast({
            message: toastTranslations.successSaved,
            type: "success",
          });
        })
        .catch(() => toast.error(toastTranslations.errorGeneric))
        .finally(() => {
          if (toggleLoading) toggleLoading(false);
        });
    };

    return (
      <MainLayout>
        <ArticleForm
          className={`new-article ${className}`}
          loading={loading}
          onSubmit={handleSubmit}
        />
      </MainLayout>
    );
  };
};

NewArticle.defaultProps = defaultProps;

export default NewArticle;
