import React, { useState, useContext, useEffect } from 'react';
import BugContext from '../../context/bugs/bugContext';

const AddBugForm = () => {
  const bugContext = useContext(BugContext);
  const { addBugs, current, updateBug, clearCurrent } = bugContext;

  useEffect(() => {
    if (current !== null) {
      setBug(current);
    } else
      setBug({
        name: '',
        description: '',
        status: 'Submitted',
        severity: 'Medium',
      });
  }, [bugContext, current]);

  const [bug, setBug] = useState({
    name: '',
    description: '',
    status: 'Submitted',
    severity: 'Medium',
  });

  const { name, description, status, severity } = bug;

  const onChange = (e) => {
    setBug({ ...bug, [e.target.name]: e.target.value });
  };

  const clearAll = () => {
    clearCurrent();
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addBugs(bug);
    } else {
      updateBug(bug);
    }
  };

  return (
    <>
      <div
        className='card mt-5 text-center '
        style={{ width: '35rem', margin: 'auto' }}>
        <h1 className='text-primary'> {current ? 'Edit Bug' : ' Add bug'}</h1>
        <form className='card-body' onSubmit={onSubmit} id='form'>
          <h2>Name</h2>
          <input
            type='text'
            className='form-control'
            placeholder='Name'
            name='name'
            value={name}
            onChange={onChange}
          />
          <h3 style={{ textAlign: 'center' }}>Bug Description</h3>
          <textarea
            type='text'
            id='default'
            className='form-control'
            rows='3'
            placeholder='Minimum of 144 Characters'
            name='description'
            value={description}
            onChange={onChange}
          />
          <div className='form-group'>
            <label htmlFor='bug Status'>Bug Status</label>
            <select
              className='form-control'
              id='status'
              value={status}
              name='status'
              placeholder='Default is Submitted'
              onChange={onChange}>
              <option>Submitted</option>
              <option>Reviewing</option>
              <option>Resolving</option>
              <option>Resolved</option>
            </select>
          </div>
          <h5>Severity</h5>
          <div>
            <input
              type='radio'
              name='severity'
              value='low'
              checked={severity === 'low'}
              onChange={onChange}
            />
            <span className='badge badge-pill badge-dark'>Low </span> {''}
            <input
              type='radio'
              name='severity'
              value='medium'
              checked={severity === 'medium'}
              onChange={onChange}
            />
            <span className='badge badge-pill badge-primary'>Medium </span> {''}
            <input
              type='radio'
              name='severity'
              value='High'
              checked={severity === 'High'}
              onChange={onChange}
            />
            <span className='badge badge-pill badge-warning'>High </span>{' '}
            <input
              type='radio'
              name='severity'
              value='RedAlert'
              checked={severity === 'RedAlert'}
              onChange={onChange}
            />
            <span className='badge badge-pill badge-danger'> RedAlert </span>
          </div>
          <div>
            <button type='submit' className='btn btn-success mt-3'>
              {current ? 'Update bug' : 'Add Bug'}
            </button>
          </div>
          {current && (
            <div>
              <button className='btn btn-dark m-2' onClick={clearAll}>
                Clear
              </button>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default AddBugForm;
