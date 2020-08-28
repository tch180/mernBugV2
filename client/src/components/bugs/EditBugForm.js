import React, { useContext, useEffect, useState } from 'react';
import BugContext from '../../context/bugs/bugContext';

const EditBugForm = () => {
  const bugsContext = useContext(BugContext);
  const { deleteBug, updateBug, current } = bugsContext;

  useEffect(() => {
    if (current !== null) {
      setUpdateBug(current);
    } else {
      setUpdateBug({
        name: '',
        description: '',
        status: '',
        severity: '',
      });
    }
  }, [bugsContext, current]);

  const onDelete = () => {
    deleteBug(_id);
  };

  const [bugs, setUpdateBug] = useState({
    name: '',
    description: '',
    status: '',
    severity: '',
  });

  const { _id, name, description, status, severity } = bugs;

  let modalId = _id.slice(1, 25);

  const onChange = (e) =>
    setUpdateBug({ ...bugs, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('submit clicked');
    // console.log(updateBug);
    updateBug(bugs);
  };
  // calling ^^ bugs here, causes the cast to objectID failed for value "undefined at path "_id" this could be due to the names not matching on the back end.
  // calling ^^ bug here, essentially just creates a new empty state. and resubmits the same info so no change is in the info is captured.
  // state is immutable.. using the spread operator will essentially create a "new state" but the values need to be the same, The issue right now is that I can not use the same values on the form
  // because that will break the onChange function, and not capture the change. Hit a brick wall here, Not sure how to move forward. I have reached out to a few ppl for some help 8/27/2020
  return (
    <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
      {/* // modal trigger */}
      <button
        data-target={'#' + modalId}
        type='button'
        className='btn btn-primary'
        data-toggle='modal'>
        Edit
      </button>{' '}
      *{/* MODAL  */}
      <form onSubmit={onSubmit} id='form'>
        <div
          className='modal fade'
          id={modalId}
          tabIndex='-1'
          aria-labelledby='editBugForm'
          aria-hidden='true'>
          <div className='modal-dialog  modal-dialog-centered  modal-xl '>
            <div className='modal-content p-3'>
              <div className='modal-header'>
                <h5 className='modal-title' id='editBugForm'>
                  {name}
                </h5>
                <div>
                  <span className='border border-primary rounded-pill m-3'>
                    {status}
                  </span>{' '}
                </div>
                <div>
                  <span className='border border-info rounded-pill'>
                    {severity}
                  </span>
                </div>
                <button
                  type='button'
                  className='close'
                  data-dismiss='modal'
                  aria-label='Close'>
                  <span aria-hidden='true'>&times;</span>
                </button>
              </div>
              <input
                placeholder={name}
                type='text'
                name='name'
                value={name}
                onChange={onChange}
                className='modal-body text-wrap form-control'
              />
              <h3>Bug Description</h3>
              <textarea
                type='text'
                id='Update Description'
                className='form-control'
                rows='6'
                placeholder={description}
                name='description'
                value={description}
                onChange={onChange}
              />
              {description}
              <div className='modal-footer justify-content-around'>
                <div className='form-group'>
                  <label htmlFor='bug Status'>Bug Status</label>
                  <select
                    className='form-control'
                    id='status'
                    value={status}
                    name='status'
                    onChange={onChange}>
                    <option>Submitted</option>
                    <option>Reviewing</option>
                    <option>Resolving</option>
                    <option>Resolved</option>
                  </select>
                </div>
                <div className='form-group'>
                  <label htmlFor='bug Severity'>Bug Severity</label>
                  <select
                    className='form-control'
                    id='severity'
                    value={severity}
                    name='severity'
                    onChange={onChange}>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Red Alert</option>
                  </select>
                </div>
                <button
                  type='button'
                  className='btn btn-secondary'
                  data-dismiss='modal'>
                  Close
                </button>
                <button type='submit' className='btn btn-success mt-3'>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditBugForm;
