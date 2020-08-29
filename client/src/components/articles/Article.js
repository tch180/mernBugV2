import React, { useEffect, Fragment, useContext } from 'react';
import ArticleContext from '../../context/articles/articleContext';
import ArticleItem from './ArticleItem';
import ArticlesFilter from '../articles/ArticlesFilter';
import Spinner from '../../layout/Spinner.js';

const Article = () => {
  const articleContext = useContext(ArticleContext);
  const { getArticles, articles, articlesFiltered, loading } = articleContext;

  useEffect(() => {
    getArticles();
    //eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <div
        className='search m-1'
        style={{ display: 'flex', justifyContent: 'center' }}>
        <h3>Search:</h3>
        <span className=' m-1'>
          <ArticlesFilter />
        </span>
      </div>
      <div>
        {articles !== null && !loading ? (
          <div
            className='row p-5'
            style={{ display: 'flex', justifyContent: 'space-between' }}>
            {articlesFiltered !== null
              ? articlesFiltered.map((article) => (
                  <div key={article._id} timeout={500} className='item'>
                    <ArticleItem article={article} />
                  </div>
                ))
              : articles.map((article) => (
                  <div key={article._id} timeout={500} className='item'>
                    <ArticleItem article={article} />
                  </div>
                ))}
          </div>
        ) : (
          <Spinner />
        )}
      </div>

      {/* <div>
     
        <ArticlesFilter />
      </div>
      {articles.map((article) => (
        <ArticleItem key={article._id} article={article} />
      ))} */}
    </Fragment>
  );
};

export default Article;
