import React, { useContext, Fragment } from 'react';
import BugContext from '../../context/bugs/bugContext';

const BugItem = ({ bug }) => {
  const bugsContext = useContext(BugContext);
  const { deleteBug, setCurrent } = bugsContext;

  const { _id, name, description, status, severity } = bug;

  const onDelete = () => {
    deleteBug(_id);
  };

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
        <div className='d-flex justify-content-around'>
          <button
            type='button'
            className='btn btn-primary'
            onClick={() => setCurrent(bug)}>
            Edit
          </button>
          <button type='button' className='btn btn-danger' onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default BugItem;
