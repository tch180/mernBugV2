import React, { useState, useContext, useEffect, Fragment } from 'react';
import BugContext from '../../context/bugs/bugContext';

const BugItem = ({ bug }) => {
  const bugsContext = useContext(BugContext);
  const { deleteBug, updateBug, current } = bugsContext;

  const { _id, name, description, status, severity } = bug;

  useEffect(() => {
    setUpdateBug({
      updateName: '',
      updateDescription: '',
      updateStatus: '',
      updateSeverity: '',
    });
  }, [bugsContext]);

  const [bugs, setUpdateBug] = useState({
    updateName: '',
    updateDescription: '',
    updateStatus: '',
    updateSeverity: '',
  });
  const { updateName, updateSeverity, updateDescription, updateStatus } = bugs;

  const onDelete = () => {
    deleteBug(_id);
  };

  const onChange = (e) =>
    setUpdateBug({ ...bugs, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('submit clicked');
    console.log(updateBug);
    updateBug(bug);
    // calling ^^ bugs here, causes the cast to objectID failed for value "undefined at path "_id" this could be due to the names not matching on the back end.
    // calling ^^ bug here, essentially just creates a new empty state. and resubmits the same info so no change is in the info is captured.
    // state is immutable.. using the spread operator will essentially create a "new state" but the values need to be the same, The issue right now is that I can not use the same values on the form
    // because that will break the onChange function, and not capture the change. Hit a brick wall here, Not sure how to move forward. I have reached out to a few ppl for some help 8/27/2020
    console.log(bugs);
  };

  let modalId = _id.slice(1, 25);

  const statusType = {
    Submitted: 'badge-dark',
    Reviewing: 'badge-secondary',
    Resolving: 'badge-info',
    Resolved: 'badge-success',
  };
  const severityType = {
    low: 'badge-dark',
    Medium: 'badge-primary',
    High: 'badge-warning',
    RedAlert: 'badge-danger',
  };
  return (
    <Fragment>
      <div className='card bg-light shadow p-3' style={{ marginTop: '15px' }}>
        <h3 className='text-primary text-left'>
          {name}
          <hr />
          {''}
        </h3>
        <h4>{description}</h4>
        <h6>ID: {_id}</h6>
        <div
          className='p-3'
          style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h5>
            Status:{' '}
            <span className={`badge  ${statusType[status]}`}> {status}</span>
          </h5>
          <h5>
            Severity:{' '}
            <span className={`badge badge-pill ${severityType[severity]}`}>
              {severity}
            </span>
          </h5>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          {/* // modal trigger */}
          <button
            data-target={'#' + modalId}
            type='button'
            className='btn btn-primary'
            data-toggle='modal'>
            Edit
          </button>
          {/* MODAL  */}
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
                    name='updateDescription'
                    value={updateDescription}
                    onChange={onChange}
                  />
                  {description}
                  <div className='modal-footer justify-content-around'>
                    <div className='form-group'>
                      <label htmlFor='bug Status'>Bug Status</label>
                      <select
                        className='form-control'
                        id='status'
                        value={updateStatus}
                        name='updateStatus'
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
                        value={updateSeverity}
                        name='updateSeverity'
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
          <button type='button' className='btn btn-danger' onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default BugItem;
