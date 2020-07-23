import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const BASE_URL = 'https://mern-morse-code-translator.herokuapp.com';

// reference to consider: https://itnext.io/password-reset-emails-in-your-react-app-made-easy-with-nodemailer-bb27968310d7
// UI for the update password link
function UpdatePassword({token})
{
    var loginPassword;
    var confirmPassword;

    const [message,setMessage] = useState('');

    const doUpdatePassword = async event =>
    {
        event.preventDefault();

        if (loginPassword.value !== confirmPassword.value) {
            setMessage('Passwords must match.');
            return;
        } else {
            setMessage('');
        }

        // console.log(this.props.match.params.token);
        // token = this.props.match.params.token;

        var js = '{"token":"'
                + token
                + '","newPass":"'
                + loginPassword.value 
                + '"}';
        
        try {
            const response = await fetch(BASE_URL + '/updatePassword',
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
            var res = await response.json();

            if(response.status !== 200)
                setMessage(res.error);
            else
                setMessage('Your password has successfully changed!');
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }
        // go back to login after successfully change password
        //window.location.href = '/user';
    };

    return (
        <div id="passwordDiv" className="container">
            <div className="jumbotron">
                <h4 id="inner-title">UPDATE YOUR PASSWORD</h4>
                <hr />
            <form onSubmit={doUpdatePassword}>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="your super secret password" ref={(c) => loginPassword = c} minLength={5} required></input>
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" className="form-control" id="confirmPassword" placeholder="confirm your super secret password" ref={(c) => confirmPassword = c} minLength={5} required></input>
                </div>
                <button type="submit" className="btn btn-outline-success">Update Password</button>
            </form>
            <span id="changePasswordResult">{message}</span>
            <Link to='/user'>Click here to log in</Link>
            </div>
        </div>
    );
};

export default UpdatePassword;