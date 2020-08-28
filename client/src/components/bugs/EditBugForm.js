import React, { useState, useContext, useEffect } from 'react';
import BugContext from '../../context/bugs/bugContext';

const EditBugForm = () => {
  const bugsContext = useContext(BugContext);
  const { updateBug, current } = bugsContext;

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

  const [currentBug, setUpdateBug] = useState({
    name: '',
    description: '',
    status: '',
    severity: '',
  });

  const { _id, name, description, status, severity } = currentBug;

  const onChange = (e) => {
    setUpdateBug({ ...currentBug, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    updateBug(currentBug);
  };
  //   useEffect(() => {
  //     setUpdateBug({
  //       updateId: _id,
  //       updateName: '',
  //       updateDescription: '',
  //       updateStatus: '',
  //       updateSeverity: '',
  //     });
  //   }, []);

  //   const [updateModalBug, setUpdateBug] = useState({
  //     updateId:'',
  //     updateName: '',
  //     updateDescription: '',
  //     updateStatus: '',
  //     updateSeverity: '',
  //   });

  //   const {
  //     updateName,
  //     updateDescription,
  //     updateStatus,
  //     updateSeverity,
  //   } = updateModalBug;
  //  useEffect(()=>{

  //  })

  //   const [bug, setUpdateBug] = useState({
  //     name: '',
  //     description: '',
  //     status: '',
  //     severity: '',
  //   });
  let modalId = _id.slice(1, 25);

  //   const onChange = (e) => {
  //     setUpdateBug({ ...bug, [e.target.name]: e.target.value });
  //   };
  //   const onSubmit = (e) => {
  //     e.preventDefault();
  //     updateBug(bug);
  //   };
  //   const { _id, name, description, status, severity } = bug;

  return (
    <div>
      <form onSubmit={onSubmit} id='form'>
        <div
          className='modal fade'
          id={modalId}
          tabIndex='-1'
          aria-labelledby='exampleModalLabel'
          aria-hidden='true'>
          <div className='modal-dialog  modal-dialog-centered  modal-xl '>
            <div className='modal-content p-3'>
              <div className='modal-header'>
                <h5 className='modal-title' id='exampleModalLabel'>
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
                // placeholder={description}
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
