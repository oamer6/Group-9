import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ResetPasswordPage from './pages/ResetPasswordPage';


function App() {
  return (
    <Router >      
      <Switch>        
        <Route path="/" exact>          
        <LoginPage />        
        </Route>        
        <Route path="/reset" exact>          
        <ResetPasswordPage />        
        </Route>        
        <Redirect to="/" />      
        </Switch>      
    </Router>
  );
}

export default App;
