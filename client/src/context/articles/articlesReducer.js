import {
  GET_ARTICLES,
  ADD_ARTICLES,
  DELETE_ARTICLE,
  UPDATE_ARTICLE,
  ARTICLES_ERROR,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_ARTICLES:
      return {
        ...state,
        articles: action.payload,
      };
    case ADD_ARTICLES:
      return {
        ...state,
        articles: [action.payload, ...state.articles],
      };
    case DELETE_ARTICLE:
      return {
        ...state,
      };
    default:
      return state;
  }
};
