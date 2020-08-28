import React, { useEffect, useContext, useState } from 'react';
import ArticleContext from '../../context/articles/articleContext';
// import { Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';

const NewArticle = () => {
  const articleContext = useContext(ArticleContext);
  const { addArticle } = articleContext;

  // const [editorState, setEditorState] = useState(() =>
  //   EditorState.createEmpty()
  // );

  const [article, setArticle] = useState({
    name: '',
    description: '',
    author: '',
  });

  useEffect(() => {
    setArticle({
      name: '',
      description: '',
      author: '',
    });
  }, [articleContext]);

  const { name, description, author } = article;

  const onChange = (e) => {
    setArticle({
      ...article,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addArticle(article);
  };

  return (
    <>
      <div className='card mt-5' style={{ width: '22rem', margin: 'auto' }}>
        <form className='card-body' onSubmit={onSubmit} id='form'>
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
            <label htmlFor='author'>Author:</label>
            <input
              type='text'
              className='form-control'
              name='author'
              value={author}
              onChange={onChange}
            />
          </div>
          <button type='submit' className='btn btn-primary mt-3'>
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default NewArticle;
