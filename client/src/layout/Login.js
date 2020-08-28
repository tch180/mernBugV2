import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../context/Auth/authContext';
import AlertContext from '../context/alert/alertContext';

const Login = (props) => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { setAlert } = alertContext;

  const { login, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/Home');
    }
    if (error === 'Invalid Creds') {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      alert('please enter email and password');
      setAlert('Please fill in all fields', 'danger');
    } else {
      login({ email, password });
      console.log('user logged in');
    }
  };

  return (
    <div
      onSubmit={onSubmit}
      className='card mt-5 shadow'
      style={{ width: '18rem', margin: 'auto' }}>
      <h1 className='card-title'>
        Account <span className='text=primary'>Login</span>
      </h1>
      <form className='card-body' onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='exampleInputEmail1'>Email address</label>
          <input
            className='form-control'
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            required
          />
          <small id='emailHelp' className='form-text text-muted'>
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className='form-group'>
          <label htmlFor='exampleInputPassword1'>Password</label>
          <input
            className='form-control'
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <button type='submit' value='login' className='btn btn-primary'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
