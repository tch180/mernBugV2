import React, { useContext, useRef, useEffect } from 'react';
import ArticleContext from '../../context/articles/articleContext';

export const ArticlesFilter = () => {
  const articleContext = useContext(ArticleContext);
  const text = useRef('');
  const {
    articlesFiltered,
    clearTheArticlesFilter,
    filterArticles,
  } = articleContext;
  useEffect(() => {
    if (articlesFiltered === null) {
      text.current.value = '';
    }
  });
  const onChange = (e) => {
    if (text.current.value !== '') {
      filterArticles(e.target.value);
    } else {
      clearTheArticlesFilter();
    }
  };
  return (
    <form className='form-inline my-2 my-lg-0'>
      <input
        ref={text}
        className='form-control outline-danger mr-sm-1'
        type='text'
        placeholder='Search by Name or ID  '
        aria-label='Search'
        onChange={onChange}
      />
    </form>
  );
};
export default ArticlesFilter;
