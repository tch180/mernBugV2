import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

// Pages
import Home from './pages/Home';
import Articles from './pages/knowledgeBase/articles';

//Components
import NavBar from './layout/NavBar';
import Login from './layout/Login';
import Register from './layout/Register';
//eslint-disable-next-line
import Alerts from './layout/Alerts';
//states
import BugState from './context/bugs/BugsState';
import ArticlesState from './context/articles/ArticlesState';
import AuthState from './context/Auth/AuthState';
import AlertState from './context/alert/AlertState';
// Auth Token
import setAuthToken from './utils/SetAuthToken';

// Private Route
import PrivateRoute from './components/routing/PrivateRoute';
function App() {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  return (
    <AuthState>
      <BugState>
        <ArticlesState>
          <AlertState>
            <Router>
              <Fragment>
                <NavBar />
                <div className='App'>
                  <Alerts />
                  <Switch>
                    <PrivateRoute exact path='/' component={Login} />
                    <Route path='/register' component={Register} />
                    <PrivateRoute path='/KnowledgeBase' component={Articles} />
                    <PrivateRoute path='/Home' component={Home} />
                  </Switch>
                </div>
              </Fragment>
            </Router>
          </AlertState>
        </ArticlesState>
      </BugState>
    </AuthState>
  );
}

export default App;
