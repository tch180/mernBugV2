import {
  GET_BUGS,
  ADD_BUGS,
  DELETE_BUGS,
  UPDATE_BUGS,
  BUG_ERROR,
  SET_CURRENT,
  CLEAR_CURRENT,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_BUGS:
      return {
        ...state,
        bugs: action.payload,
        loading: false,
      };
    case ADD_BUGS:
      return {
        ...state,
        bugs: [action.payload, ...state.bugs],
      };
    case UPDATE_BUGS:
      return {
        ...state,
        bugs: state.bugs.map((bug) =>
          bug._id === action.payload._id ? action.payload : bug
        ),
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case BUG_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case DELETE_BUGS:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
