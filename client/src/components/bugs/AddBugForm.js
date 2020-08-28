import React, { useState, useContext, useEffect } from 'react';
import BugContext from '../../context/bugs/bugContext';

const AddBugForm = () => {
  const bugContext = useContext(BugContext);
  const { addBugs } = bugContext;

  useEffect(() => {
    setBug({
      name: '',
      description: '',
      status: 'Submitted',
      severity: 'Medium',
    });
  }, [bugContext]);

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

  const onSubmit = (e) => {
    e.preventDefault();
    addBugs(bug);
  };

  return (
    <>
      <div
        className='card mt-5 text-center '
        style={{ width: '22rem', margin: 'auto' }}>
        <h1 className='text-primary'>Add-Bug</h1>
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
            id='Description'
            className='form-control'
            rows='3'
            placeholder='Minimum of 144 Characters'
            name='description'
            value={description}
            onChange={onChange}></textarea>
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
            <div>
              <button type='submit' className='btn btn-success mt-3'>
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddBugForm;