import React, { useState } from 'react';
import { Link} from 'react-router-dom';


const BASE_URL = 'https://mern-morse-code-translator.herokuapp.com/';

function Login()
{

    var email;
    var loginPassword;

    const [message,setMessage] = useState('');

    const doLogin = async event => 
    {
        event.preventDefault();

        var js = '{"email":"'
            + email.value
            + '","password":"'
            + loginPassword.value +'"}';

        try
        {    
            const response = await fetch(BASE_URL + '/login',
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            var res = JSON.parse(await response.text());

            if(res.error)
            {
                setMessage(res.error);
            }
            else if (res.status === 400)
            {
                setMessage(res.data);
            }
            else
            {
                var user = {firstName:res.firstName,lastName:res.lastName,id:res.id}
                localStorage.setItem('user_data', JSON.stringify(user));

                setMessage('');
                // change later to morsecode UI
                window.location.href = '/user';
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
            <h4 id="inner-title">LOG IN</h4><br />
            <form className="align-center" onSubmit={doLogin}>
                <div className="form-group">
                    <label for="email">Email</label>
                    <input type="email" className="form-control" id="email" placeholder="name@email.com" ref={(c) => email = c}></input>
                </div>
                <div className="form-group">
                    <label for="password">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="your super secret password" ref={(c) => loginPassword = c}></input>
                </div>
                <button type="submit" className="btn btn-outline-primary" onClick={doLogin}>Sign in</button>
                <Link to="/forgot">Forgot password?</Link>
                <Link to="/signup" className="btn btn-outline-info">New user? Sign Up</Link>
            </form>
	        <span id="loginResult">{message}</span>
            </div>
        </div>
    );
};

export default Login;