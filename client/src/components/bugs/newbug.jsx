import React, { useEffect, Fragment, useContext } from 'react';
//eslint-disable-next-line
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Spinner from '../../layout/Spinner.js';
import BugContext from '../../context/bugs/bugContext';
import BugItem from './BugItem';

const NewBug = () => {
  const bugContext = useContext(BugContext);

  const { getBugs, bugs, loading, bugsFiltered } = bugContext;

  useEffect(() => {
    getBugs();
    //eslint-disable-next-line
  }, []);

  if (bugs !== null && bugs.length === 0 && !loading) {
    return <h4>Please add a new bug </h4>;
  }
  return (
    <Fragment>
      <div>
        {bugs !== null && !loading ? (
          <div
            className='row p-5'
            style={{ display: 'flex', justifyContent: 'space-between' }}>
            {bugsFiltered !== null
              ? bugsFiltered.map((bug) => (
                  <div key={bug._id} timeout={500} className='item'>
                    <BugItem bug={bug} />
                  </div>
                ))
              : bugs.map((bug) => (
                  <div key={bug._id} timeout={500} className='item'>
                    <BugItem bug={bug} />
                  </div>
                ))}
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    </Fragment>
    //   <Fragment>
    //     {bugs !== null && !loading ? (
    //       <div
    //         className='row p-5'
    //         style={{
    //           display: 'flex',
    //           justifyContent: 'space-between',
    //         }}>
    //         {bugs.map((bug) => (
    //           <BugItem key={bug._id} bug={bug} />
    //         ))}
    //       </div>
    //     ) : (
    //       <Spinner />
    //     )}
    //   </Fragment>
    // );
  );
};

export default NewBug;
