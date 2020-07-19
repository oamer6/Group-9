import React, { useState } from 'react';
import { Link} from 'react-router-dom';


//const BASE_URL = 'https://mern-morse-code-translator.herokuapp.com/';
const BASE_URL = 'http://localhost:5000';
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
        <div id="loginDiv">
            <form onSubmit={doLogin}>
	        <span id="inner-title">LOG IN</span><br />
	        <input type="email" id="email" placeholder="Email" ref={(c) => email = c}  /><br />
	        <input type="password" id="loginPassword" placeholder="Password" ref={(c) => loginPassword = c} /><br />
            <input type="submit" id="loginButton" className="buttons" value = "Log in" onClick={doLogin} />
            <Link to="/forgot">Forgot password?</Link>
            </form>
	        <span id="loginResult">{message}</span>
        </div>
    );
};

export default Login;