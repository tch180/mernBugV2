import React, { useContext } from 'react';
import ArticleContext from '../../context/articles/articleContext';

const ArticleItem = ({ article }) => {
  const { name, description, date, _id, author } = article;

  const articleContext = useContext(ArticleContext);
  const { deleteArticle } = articleContext;

  const onDelete = () => {
    deleteArticle(_id);
  };

  return (
    <div className='card bg-light shadow p-5' style={{ marginTop: '15px' }}>
      <h2
        className='text-danger text-left'
        style={{ display: 'flex', justifyContent: 'space-between' }}>
        Issue: {name.toUpperCase()}
        {''}
        <span style={{ fontSize: '18px' }} className='badge badge-secondary'>
          {date.slice(0, 10)}
        </span>
      </h2>
      <h4>Description: {description}</h4>

      <h3 className='text-primary'>Author: {author}</h3>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
        }}>
        <button type='button' className='btn btn-info'>
          Edit
        </button>
        <button type='button' className='btn btn-danger' onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default ArticleItem;
