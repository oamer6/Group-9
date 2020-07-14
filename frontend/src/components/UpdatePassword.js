import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const BASE_URL = 'https://mern-morse-code-translator.herokuapp.com/';

// reference to consider: https://itnext.io/password-reset-emails-in-your-react-app-made-easy-with-nodemailer-bb27968310d7
// UI for the update password link
function UpdatePassword()
{
    var loginName;
    var loginPassword;
    var confirmPassword;

    const [message,setMessage] = useState('');

    const doUpdatePassword = async event =>
    {
        event.preventDefault();

        var js = '{"email":"'
                + loginName.value
                + '","password":"'
                + loginPassword.value 
                + '","confirm_password":"'
                + confirmPassword.value + '"}';
        
        try {
            const response = await fetch(BASE_URL + 'api/updatePassword',
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            var res = JSON.parse(await response.text());

            setMessage(res.status());
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }
        // go back to login after successfully change password
        window.location.href = '/login';
    };

    return (
        <form onSubmit={doUpdatePassword}>
            <span id="inner-title">UPDATE YOUR PASSWORD</span><br />
	        <input type="text" id="loginName" placeholder="Username" ref={(c) => loginName = c}  /><br />
	        <input type="password" id="loginPassword" placeholder="Password" ref={(c) => loginPassword = c} /><br />
            <input type="password" id="confirmPassword" placeholder="Confirm password" ref={(c) => confirmPassword = c} /><br />
            <input type="submit" id="updateButton" class="buttons" value = "Update password" onClick={doUpdatePassword} />
        </form>
        <span id="changePasswordResult">{message}</span>
    );
};

export default UpdatePassword;