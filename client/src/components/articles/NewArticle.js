import React, { useEffect, useContext, useState } from 'react';
import AuthContext from '../../context/Auth/authContext';

import ArticleContext from '../../context/articles/articleContext';

const NewArticle = (props) => {
  const authContext = useContext(AuthContext);

  const { isAuthenticated, logout, user } = authContext;

  const articleContext = useContext(ArticleContext);
  const {
    addArticle,
    updateArticle,
    clearCurrentArticle,
    currentArticle,
    setCurrentArticle,
  } = articleContext;

  useEffect(() => {
    if (currentArticle !== null) {
      setArticle(currentArticle);
    } else
      setArticle({
        name: '',
        description: '',
        author: '',
      });
  }, [articleContext, currentArticle, setCurrentArticle]);

  const [article, setArticle] = useState({
    name: '',
    description: '',
    author: '',
  });

  const { name, description,  } = article;
  const author = user && user.name

  const clearAll = () => {
    clearCurrentArticle();
  };
  const onChange = (e) => {
    setArticle({
      ...article,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (currentArticle === null) {
      addArticle(article);
    } else {
      updateArticle(article);
    }
  };

  return (
    <>
      <div className='card mt-5' style={{ margin: 'auto' }}>
        <form className='card-body' onSubmit={onSubmit} id='form'>
          <h1 className='text-primary'>
            {currentArticle ? 'Edit Article' : 'Add Article'}
          </h1>
          <div>
            <label htmlFor='name'>Title:</label>

            <input
              type='text'
              className='form-control'
              name='name'
              value={name}
              onChange={onChange}
            />
          </div>
          <div>
            <label htmlFor='description'>Description:</label>
            <textarea
              type='text'
              className='form-control'
              rows='6'
              name='description'
              value={description}
              onChange={onChange}
            />
          </div>
          <div>
  <label htmlFor='author'>Author: {user && user.name}</label>
             <input
              type='text'
              className='form-control'
              name='author'
              value={author}
              // onChange={onChange}
              required
              disabled
            /> 
          </div>
          <div>
            <button type='submit' className='btn btn-success m-3'>
              {currentArticle ? 'Update Article' : 'Add Article'}
            </button>
            {currentArticle && (
              <button className='btn btn-dark m-3' onClick={clearAll}>
                Clear
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default NewArticle;
