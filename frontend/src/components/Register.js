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
        <div id="registerDiv" className="container">
            <div className="jumbotron">
                <h4 id="inner-title">REGISTER YOUR ACCCOUNT</h4><br />
                <form className="align-center" onSubmit={doRegister}>
                <div class="form-row">
                    <div className="form-group col-md-6">
                        <label for="email">Email</label>
                        <input type="email" className="form-control" id="email" placeholder="name@email.com" ref={(c) => email = c} required></input>
                        <div class="invalid-feedback">
                            Email is missing.
                        </div>
                    </div>
                    <div className="form-group col-md-6">
                        <label for="username">Username</label>
                        <input type="text" className="form-control" id="username" placeholder="username" ref={(c) => username = c}></input>
                    </div>
                </div>

                <div className="form-group">
                    <label for="password">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="your super secret password" ref={(c) => loginPassword = c}></input>
                </div>
                <div className="form-group">
                    <label for="checkPassword"> Retype Password</label>
                    <input type="password" className="form-control" id="checkPassword" placeholder="retype your super secret password" ref={(c) => checkPassword = c}></input>
                </div>
               
                <div className="form-group-row">
                    <button type="submit" className="btn btn-outline-warning" onClick={doRegister}>Register my account!</button>
                    <Link to="/user" className="text-right">Already have an account?</Link>
                </div>
                </form>
                <span id="registerResult">{message}</span>
            </div>
        </div>
    );
};

export default Register;