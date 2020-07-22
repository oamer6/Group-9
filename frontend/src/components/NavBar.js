import React from 'react';
import { Link} from 'react-router-dom';

function NavBar()
{
    var _ud = localStorage.getItem('user_data');    
    var ud = JSON.parse(_ud);    
    var username= ud.userName;

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
            {/* <span>Welcome {username}</span> */}
            <Link to="/morsekey" className="btn btn-outline-alert font-weight-bold">Morse Code</Link>
            <Link to="/inbox" className="btn btn-outline-alert font-weight-bold">Inbox</Link>
            <button type="button" id="logOutButton" className="btn btn-outline-primary font-weight-bold" onClick={doLogout}>Sign Out</button>
            </div>
        </nav> 
    );
};

export default NavBar;