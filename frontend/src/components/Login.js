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
            const response = await fetch(BASE_URL + 'api/login',
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            var res = JSON.parse(await response.text());

            if( res.status == 400 )
            {
                alert(res.msg);
            }
            else
            {
                var user = {firstName:res.firstName,lastName:res.lastName,id:res.id}
                localStorage.setItem('user_data', JSON.stringify(user));

                setMessage('');
                window.location.href = '/login';
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
	        <input type="email" id="email" placeholder="Username/Email" ref={(c) => email = c}  /><br />
	        <input type="password" id="loginPassword" placeholder="Password" ref={(c) => loginPassword = c} /><br />
            <input type="submit" id="loginButton" class="buttons" value = "Log in" onClick={doLogin} />
            <Link to="/reset">Forgot password?</Link>
            </form>
	        <span id="loginResult">{message}</span>
        </div>
    );
};

export default Login;