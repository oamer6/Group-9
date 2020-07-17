import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ResetPasswordPage from './pages/ResetPasswordPage';


function App() {
  return (
    <Router >      
      <Switch>        
        <Route path="/user" exact>          
        <LoginPage />        
        </Route>        
        <Route path="/password" exact>          
        <ResetPasswordPage />        
        </Route>        
        <Redirect to="/user" />      
        </Switch>      
    </Router>
  );
}

export default App;
