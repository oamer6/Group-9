import React, { useState } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import '../App.css';    // custom css stylesheet

const BASE_URL = 'https://mern-morse-code-translator.herokuapp.com';

function Login()
{
    var email;
    var loginPassword;
    var success;

    const [message,setMessage] = useState('');

    const doLogin = async event => 
    {
        event.preventDefault();

        if (email.value === '') {
            setMessage("Please enter your email address");
            return;
        } else if (loginPassword.value === '') {
            setMessage("Please enter your password");
            return;
        } else {
            setMessage("");
        }

        var js = '{"email":"'
            + email.value
            + '","password":"'
            + loginPassword.value +'"}';

        try
        {
            // POST request using fetch with async/wait
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: js
            }
            const response = await fetch(BASE_URL + '/login', requestOptions);
            var res = await response.json();
            console.log(res);
            
            if(response.status !== 200)
            {
                if (res.error) {
                    setMessage(res.error);
                } else if (res.msg) {
                    setMessage(res.msg);
                }
                success = false;
                return;
            }
            else
            {
                var user = {username:res.userName, email: res.email, id:res.id}
                localStorage.setItem('user_data', JSON.stringify(user));

                setMessage('');
                // change to morsecode UI
                window.location.href = '/inbox';
  
                
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }    
    };

    return(
        <div id="loginDiv" className="container">
            <div className="jumbotron">
                <h4 id="inner-title">LOG IN</h4>
                <hr />
                <form className="align-center" onSubmit={doLogin}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control" id="email" placeholder="name@email.com" ref={(c) => email = c} required></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="your super secret password" ref={(c) => loginPassword = c} minLength={5} required></input>
                    </div>
                    <button type="submit" className="btn btn-outline-primary">Sign in</button>
                    <Link to="/forgot" id="textAfterButton">Forgot password?</Link>
                    <br />
                    <Link to="/signup" className="btn btn-outline-info my0">New user? Sign Up</Link>
                </form>
                <p id="loginResult">{message}</p>
            </div>
        </div>
    );
};

export default Login;
