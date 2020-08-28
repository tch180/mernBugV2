import React, { useEffect, Fragment, useContext } from 'react';
import ArticleContext from '../../context/articles/articleContext';
import ArticleItem from './ArticleItem';

const Article = () => {
  const articleContext = useContext(ArticleContext);
  const { getArticles, articles } = articleContext;

  useEffect(() => {
    getArticles();
    //eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      {articles.map((article) => (
        <ArticleItem key={article._id} article={article} />
      ))}
    </Fragment>
  );
};

export default Article;
