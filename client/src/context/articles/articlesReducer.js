import {
  GET_ARTICLES,
  ADD_ARTICLES,
  DELETE_ARTICLE,
  UPDATE_ARTICLE,
  ARTICLES_ERROR,
  SET_CURRENT_ARTICLE,
  CLEAR_CURRENT_ARTICLE,
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
    case UPDATE_ARTICLE:
      return {
        ...state,
        articles: state.articles.map((article) =>
          article._id === action.payload._id ? action.payload : article
        ),
      };
    case SET_CURRENT_ARTICLE:
      return {
        ...state,
        currentArticle: action.payload,
      };
    case CLEAR_CURRENT_ARTICLE:
      return {
        ...state,
        currentArticle: null,
      };
    case DELETE_ARTICLE:
      return {
        ...state,
        loading: false,
      };
    case ARTICLES_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
