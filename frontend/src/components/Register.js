import React, { useState } from 'react';
import { Link} from 'react-router-dom';


const BASE_URL = 'https://mern-morse-code-translator.herokuapp.com/';

function Register()
{

    var email;
    var loginPassword;
    var checkPassword;
    var username;

    const [message,setMessage] = useState('');

    const doRegister = async event => 
    {
        event.preventDefault();

        var js = '{"email":"'
            + email.value
            + '","password":"'
            + loginPassword.value 
            + '","verifyPassword":"'
            + checkPassword.value 
            + '","userName":"'
            + username.value +'"}';

        try
        {    
            const response = await fetch(BASE_URL + '/register',
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            var res = JSON.parse(await response.text());

            if (res.status === 400)
            {
                setMessage(res.data);
            }
            else
            {
                // var user = {firstName:res.firstName,lastName:res.lastName,id:res.id}
                // localStorage.setItem('user_data', JSON.stringify(user));

                setMessage('Check your email to activate your account');
                // change later to morsecode UI
                //window.location.href = '/user';
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }    
    };

    return(
        <div id="registerDiv">
            <form onSubmit={doRegister}>
	        <span id="inner-title">Register</span><br />
	        <input type="email" id="email" placeholder="Email" ref={(c) => email = c}  /><br />
	        <input type="password" id="loginPassword" placeholder="Password" ref={(c) => loginPassword = c} /><br />
            <input type="password" id="checkPassword" placeholder="Retype Password" ref={(c) => checkPassword = c} /><br />
            <input type="text" id="username" placeholder="username" ref={(c) => username = c} /><br />
            <input type="submit" id="registerButton" className="buttons" value = "Register my account!" onClick={doRegister} />
            <Link to="/user">Already have an account?</Link>
            </form>
	        <span id="registerResult">{message}</span>
        </div>
    );
};

export default Register;