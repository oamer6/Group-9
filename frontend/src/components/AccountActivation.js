import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const BASE_URL = 'https://mern-morse-code-translator.herokuapp.com';

function AccountActivation({token})
{
    const [message,setMessage] = useState('');

    const doActivate = async event =>
    {
        event.preventDefault();

        try
        {
            // POST request using fetch with async/wait
            var js = '{"token": "' + token + '"}';
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: js
            };
            const response = await fetch(BASE_URL + '/activate', requestOptions);
            var res = await response.json();

            if (response.status !== 200)
            {
                setMessage(res.msg);
            }
            else
            {
                // var user = {firstName:res.firstName,lastName:res.lastName,id:res.id}
                // localStorage.setItem('user_data', JSON.stringify(user));
                setMessage('Your account has been activated. Click here to proceed to login');
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }
    };

    return(
        <div id="accActivationDiv" className="container jumbotron">
            <h3 id="urlToken">token = {token}</h3><br />
            <button onClick={doActivate}>Click me to activate account!</button>
            <Link to='/user' id="textAfterButton">{message}</Link>
        </div>
    );
};


export default AccountActivation;
