import React, { useState } from 'react';
import { Link } from 'react-router-dom';

//const BASE_URL = 'https://mern-morse-code-translator.herokuapp.com/';
const BASE_URL = 'http://localhost:5000';
function ResetPassword()
{
    var email;

    const [message,setMessage] = useState('');

    const doReset = async event =>
    {

        var js = '{"email":"' + email.value + '"}"';
        try
        {
            const response = await fetch(BASE_URL + '/reset',
            {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            var res = JSON.parse(await response.text());

            if(res.error)
            {
                setMessage('There is no account associated with this email');
            }
            else
            {
                setMessage('Check your email');
                window.location.href = '/user';
            }
        }
        catch (e)
        {
            alert(e.toString());
            return;
        }
    };
    return (
        <div id="resetDiv">
            <form onSubmit={doReset}>
	        <span id="inner-title">Reset password</span><br />
            <span id="inner-title">Enter the email address that is associated with your account</span><br />
	        <input type="text" id="email" placeholder="accountemail@email.com" ref={(c) => email = c}  /><br />
            <input type="submit" id="resetButton" className="buttons" value = "Send reset password link" onClick={doReset} />
            <Link to="/user">Cancel</Link>
            </form>
            <span id="resetResult">{message}</span>
        </div>
    );
};

export default ResetPassword;