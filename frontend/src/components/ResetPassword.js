import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const BASE_URL = 'https://mern-morse-code-translator.herokuapp.com/';

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
        <div id="resetDiv" className="container">
            <div className="jumbotron">
                <form onSubmit={doReset}>
                <h5 id="inner-title">Reset password</h5><br />
                <div className="form-group">
                    <label for="email">Enter the email address that is associated with your account</label>
                    <input type="email" className="form-control" id="email" placeholder="name@email.com" ref={(c) => email = c}></input>
                </div>
                <input type="submit" id="resetButton" className="btn btn-warning" value = "Send reset password link" onClick={doReset} />
                <Link to="/user">Cancel</Link>
                </form>
                <span id="resetResult">{message}</span>
            </div>
        </div>
    );
};

export default ResetPassword;