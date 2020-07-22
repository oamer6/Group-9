import React, { useState } from 'react';
import { Link} from 'react-router-dom';

// const BASE_URL = 'localhost:5000';
const BASE_URL = 'https://mern-morse-code-translator.herokuapp.com';

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

        // Most of form validation is done by browser; we must check that passwords match
        if (loginPassword.value !== checkPassword.value) {
            setMessage('Passwords must match.');
            return;
        } else {
            setMessage('');
        }

        var js = '{' + 
            '"email":"' + email.value + 
            '","password":"' + loginPassword.value + 
            '","verifyPassword":"' + checkPassword.value + 
            '","userName":"' + username.value +
        '"}';

        try
        {
            // POST request using fetch with async/wait
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: js
            }
            const response = await fetch(BASE_URL + '/register', requestOptions);
            var res = await response.json();

            if (!res.ok)
            {
                setMessage(res.msg);
            }
            else
            {
                // var user = {firstName:res.firstName,lastName:res.lastName,id:res.id}
                // localStorage.setItem('user_data', JSON.stringify(user));

                setMessage('An email has been sent to ' + JSON.parse(js).email +'. Click the link in the email to activate your account.');
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
        <div id="registerDiv" className="container">
            <div className="jumbotron">
                <h4 id="inner-title">REGISTER YOUR ACCCOUNT</h4>
                <hr />
                <form className="align-center needs-validation" onSubmit={doRegister}>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" id="email" placeholder="name@email.com" ref={(c) => email = c} required></input>
                            <div className="invalid-feedback">
                                Email is missing.
                            </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="username">Username</label>
                            <input type="text" className="form-control" id="username" placeholder="username" ref={(c) => username = c} required></input>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="your super secret password" ref={(c) => loginPassword = c} minLength={5} required></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="checkPassword"> Retype Password</label>
                        <input type="password" className="form-control" id="checkPassword" placeholder="retype your super secret password" ref={(c) => checkPassword = c} minLength={5} required></input>
                    </div>
                
                    <div className="form-group-row">
                        <button type="submit" className="btn btn-outline-info">Register my account!</button>
                        <Link to="/user" id="textAfterButton" className="text-right">Already have an account?</Link>
                    </div>
                </form>
                <span id="registerResult">{message}</span>
            </div>
        </div>
    );
};

export default Register;