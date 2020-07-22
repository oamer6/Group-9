import React from 'react';
import { Link} from 'react-router-dom';

function PageTitle()
{
    var ud = localStorage.getItem('user_data');
    var isLogIn;

    if(ud)
    {
        isLogIn = true;
    }
    else
    {
        isLogIn = false;
    }

    const doLogout = event =>     
    {    
        event.preventDefault();        
        localStorage.removeItem("user_data");        
        window.location.href = '/user';    
    }; 

    return(
        <nav className="navbar navbar-expand-lg navbar-warning bg-warning">
            <h1>Morse Code Translator</h1>
            <div className="align-self-end ml-auto align-self-center">
            <Link to="/morsekey" className="btn btn-outline-alert font-weight-bold">{isLogIn ? 'Morse Code' : 'Home'}</Link>
            {!isLogIn ? <Link to="/inbox" className="btn btn-outline-alert font-weight-bold">Inbox</Link> : <Link to="/user" className="btn btn-outline-alert font-weight-bold">Login</Link>}
            {isLogIn ? <button type="button" id="logOutButton" className="btn btn-outline-primary font-weight-bold" onClick={doLogout}>Sign Out</button> : <Link to="/signup" className="btn btn-outline-alert font-weight-bold">Sign up</Link>}
            </div>
        </nav> 
    );
};

export default PageTitle;
