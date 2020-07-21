import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import MorseKeyPage from './pages/MorseKeyPage';
import RegisterPage from './pages/RegisterPage';
require("dotenv").config();


function App() {
  return (
    <Router >      
      <Switch>        
        <Route path="/user" exact>          
        <LoginPage />        
        </Route>
        <Route path="/signup" exact>          
        <RegisterPage />        
        </Route>         
        <Route path="/forgot" exact>          
        <ResetPasswordPage />        
        </Route>
        <Route path="/morsekey" exact>          
        <MorseKeyPage />        
        </Route>           
        <Redirect to="/morsekey" />      
        </Switch>      
    </Router>
  );
}

export default App;
