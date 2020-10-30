import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Switch, Link, Redirect } from 'react-router-dom';
import Home from './applications/Home'
import About from './applications/About'
import ProtectedPage from './applications/ProtectedPage'
import LogIn from './applications/LogIn'
import SignUp from './applications/SignUp'
import PasswordRecovery from './applications/PasswordRecovery_1'

export default function App() {
  return (
    <div>
      <Router>
        <Redirect to='/home'/>
        <Switch>
          <Route path='/home'>
            <Home />
          </Route>
          <Route path='/about'>
            <About />
          </Route>
          <Route path='/protectedpage'>
            <ProtectedPage />
          </Route>
          <Route path='/signup'>
            <SignUp />
          </Route>
          <Route path='/login'>
            <LogIn />
          </Route>
          <Route path='/passwordrecovery'>
            <PasswordRecovery />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}










