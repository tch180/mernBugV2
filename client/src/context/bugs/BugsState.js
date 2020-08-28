import React, { useReducer } from 'react';
import axios from 'axios';
import BugContext from './bugContext';
import bugReducer from './bugReducer';

import {
  GET_BUGS,
  BUG_ERROR,
  DELETE_BUGS,
  UPDATE_BUGS,
  ADD_BUGS,
  SET_CURRENT,
} from '../types';

const BugState = (props) => {
  const initialState = {
    bugs: null,
    current: null,
    error: null,
  };

  const [state, dispatch] = useReducer(bugReducer, initialState);

  // Get all of the bugs
  const getBugs = async () => {
    try {
      const res = await axios.get('/api/bugs');
      dispatch({ type: GET_BUGS, payload: res.data });
    } catch (err) {
      dispatch({ type: BUG_ERROR, payload: err.response.msg });
    }
  };
  // ADD BUG
  const addBugs = async (bugs) => {
    const config = {
      headers: {
        'content-type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/api/bugs', bugs, config);
      dispatch({ type: ADD_BUGS, payload: res.data });
    } catch (err) {
      dispatch({ type: BUG_ERROR, payload: err.response.msg });
    }
  };

  //UPDATE BUG
  const updateBug = async (bugs) => {
    const config = {
      headers: {
        'content-type': 'application/json',
      },
    };
    try {
      const res = await axios.put(`/api/bugs/${bugs._id}`, bugs, config);
      console.log(bugs);
      dispatch({ type: UPDATE_BUGS, payload: res.data });
    } catch (err) {
      dispatch({ type: BUG_ERROR, payload: err.response.msg });
    }
  };

  //DELETE BUG
  const deleteBug = async (id) => {
    try {
      await axios.delete(`/api/bugs/${id}`);
      dispatch({ type: DELETE_BUGS, payload: id });
    } catch (err) {
      dispatch({ type: BUG_ERROR, payload: err.response.msg });
    }
    getBugs();
  };
  // set Current Bug
  const setCurrent = (bugs) => {
    dispatch({ type: SET_CURRENT, payload: bugs });
  };

  return (
    <BugContext.Provider
      value={{
        bugs: state.bugs,
        current: state.current,
        error: state.error,
        getBugs,
        deleteBug,
        addBugs,
        updateBug,
        setCurrent,
      }}>
      {props.children}
    </BugContext.Provider>
  );
};

export default BugState;
