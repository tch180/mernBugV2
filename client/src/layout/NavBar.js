import React, { useContext, Fragment } from 'react';
import AuthContext from '../context/Auth/authContext';

export const NavBar = (props) => {
  const authContext = useContext(AuthContext);

  const { isAuthenticated, logout, user } = authContext;

  const onLogout = () => {
    logout();
    console.log('user logged out ');
    props.history.push('/');
  };

  const authLinks = (
    <Fragment>
      <li className='nav-item'>
        <a className='nav-link' href='#!' onClick={onLogout}>
          <i
            style={{ backgroundColor: 'orangered', color: 'black' }}
            className='fas fa-sign-out-alt'></i>{' '}
          Logout
        </a>
      </li>
      <li className='nav-item'>
        <a className='nav-link' href='/KnowledgeBase'>
          <i
            style={{ backgroundColor: 'black', text: 'black' }}
            className='fas fa-book'></i>{' '}
          knowledgeBase
        </a>
      </li>
      <h4 className='navbar-brand' style={{ color: 'orangered' }}>
        Hello: {user && user.name}
      </h4>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li className='nav-item'>
        <a className='nav-link ' href='/'>
          <i className='fas fa-sign-in-alt'></i> Login
        </a>
      </li>
      <li className='nav-item'>
        <a className='nav-link' href='/register'>
          <i className='fas fa-user-plus'></i> Sign-up
        </a>
      </li>
    </Fragment>
  );

  return (
    <div>
      <ul className='nav bg-dark justify-content-center'>
        <a className='navbar-brand ' href='/Home'>
          <i
            style={{ backgroundColor: 'black', text: 'black' }}
            className='fas fa-bug'></i>{' '}
          SquashIT
        </a>
        <div style={{ display: 'inline-flex' }}>
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </ul>
    </div>
  );
};

export default NavBar;
