import React from 'react';
import {string} from 'prop-types';
import ArticleForm from './common/form'
import {IParams} from './interfaces'

const defaultProps = {
  className: null
}

const NewArticle = ({article, className}: { article: IParams, className: string }) => {
  return (
    <div className={`new-article ${className}`}>
      <ArticleForm article={article}/>
    </div>
  );
};

NewArticle.defaultProps = defaultProps

export default NewArticle;
