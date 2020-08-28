import React, { Fragment, useEffect, useContext } from 'react';
import Articles from '../../components/articles/Article';
import AuthContext from '../../context/Auth/authContext';
import NewArticle from '../../components/articles/NewArticle';

const ArticlesHome = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    //eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <div className='jumbotron  mt-5'>
        <h1 className='display-4 text-center'>Hey, Share the knowledge</h1>
        <p className='lead text-center'>
          Please Share how you fixed a bug, how to replicate it, if the fix was
          a real solution or just a bandaged
        </p>
        <hr className='my-4' style={{ color: 'orangered' }} />
      </div>
      <div
        className='row'
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          paddingTop: '5rem',
          paddingLeft: '50px',
        }}>
        <Articles />
      </div>
      <NewArticle />
    </Fragment>
  );
};

export default ArticlesHome;
