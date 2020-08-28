import React, { useReducer } from 'react';
import axios from 'axios';
import ArticleContext from './articleContext';
import articlesReducer from './articlesReducer';
import {
  GET_ARTICLES,
  ADD_ARTICLES,
  DELETE_ARTICLE,
  UPDATE_ARTICLE,
  ARTICLES_ERROR,
  SET_CURRENT_ARTICLE,
  CLEAR_CURRENT_ARTICLE,
} from '../types';

const ArticlesState = (props) => {
  const initialState = {
    articles: [],
    currentArticle: null,
  };

  const [state, dispatch] = useReducer(articlesReducer, initialState);
  // Get All Articles
  const getArticles = async () => {
    try {
      const res = await axios.get('/api/articles');
      dispatch({ type: GET_ARTICLES, payload: res.data });
    } catch (err) {
      dispatch({ type: ARTICLES_ERROR, payload: err.response.msg });
    }
  };
  // ADD ARTICLE
  const addArticle = async (articles) => {
    const config = {
      headers: {
        'content-type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/api/articles', articles, config);
      dispatch({ type: ADD_ARTICLES, payload: res.data });
    } catch (err) {
      dispatch({ type: ARTICLES_ERROR, payload: err.response.msg });
    }
  };

  //UPDATE ARTICLE

  const updateArticle = async (articles) => {
    const config = {
      headers: {
        'content-type': 'application/json',
      },
    };
    try {
      const res = await axios.put(
        `/api/articles/${articles._id}`,
        articles,
        config
      );
      dispatch({ type: UPDATE_ARTICLE, payload: res.data });
    } catch (err) {
      dispatch({ type: ARTICLES_ERROR, payload: err.response.msg });
    }
  };

  const setCurrentArticle = (articles) => {
    dispatch({ type: SET_CURRENT_ARTICLE, payload: articles });
  };

  const clearCurrentArticle = () => {
    dispatch({ type: CLEAR_CURRENT_ARTICLE });
  };
  // DELETE ARTICLE !!!
  const deleteArticle = async (id) => {
    try {
      await axios.delete(`/api/articles/${id}`);
      dispatch({ type: DELETE_ARTICLE, payload: id });
    } catch (err) {
      dispatch({ type: ARTICLES_ERROR, payload: err.response.msg });
    }
    getArticles();
  };
  return (
    <ArticleContext.Provider
      value={{
        articles: state.articles,
        currentArticle: state.currentArticle,
        getArticles,
        deleteArticle,
        addArticle,
        updateArticle,
        setCurrentArticle,
        clearCurrentArticle,
      }}>
      {props.children}
    </ArticleContext.Provider>
  );
};

export default ArticlesState;
