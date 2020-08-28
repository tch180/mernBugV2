import React, { useContext, useRef, useEffect } from 'react';
import BugContext from '../../context/bugs/bugContext';

export const BugFilter = () => {
  const bugContext = useContext(BugContext);
  const text = useRef('');
  const { filterBugs, clearBugFilter, bugsFiltered } = bugContext;

  useEffect(() => {
    if (bugsFiltered === null) {
      text.current.value = '';
    }
  });

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterBugs(e.target.value);
    } else {
      clearBugFilter();
    }
  };
  return (
    <form className='form-inline my-2 my-lg-0'>
      <input
        ref={text}
        className='form-control outline-danger mr-sm-1'
        type='text'
        placeholder='Filter Bugs .... '
        aria-label='Search'
        onChange={onChange}
      />
    </form>
  );
};
export default BugFilter;
