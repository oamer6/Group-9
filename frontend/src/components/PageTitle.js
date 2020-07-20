import React from 'react';
import { Link} from 'react-router-dom';

function PageTitle()
{
    return(
        <nav className="navbar navbar-expand-lg navbar-warning bg-warning">
            <h1>Morse Code Translator</h1>
            <div className="align-self-end ml-auto">
            <Link to="/morsekey" className="btn btn-outline-alert font-weight-bold">Home</Link>
            <Link to="/user" className="btn btn-outline-alert font-weight-bold">Login</Link>
            <Link to="/signup" className="btn btn-outline-alert font-weight-bold">Sign up</Link>
            </div>
        </nav> 
    );
};

export default PageTitle;