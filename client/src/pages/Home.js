import React, { Fragment, useEffect, useContext } from 'react';
import NewBug from '../components/bugs/newbug';
import AddBugForm from '../components/bugs/AddBugForm';
// import Login from '../layout/Login';
import AuthContext from '../context/Auth/authContext';

const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    console.log("user Logged Again")
    authContext.loadUser();
    //eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <div>
        {' '}
        <AddBugForm />{' '}
      </div>
      <div>
        {' '}
        <NewBug />
      </div>
    </Fragment>
  );
};

export default Home;
