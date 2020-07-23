import React from 'react';
import PageTitle from '../components/PageTitle';
import Login from '../components/Login';

const LoginPage = () =>
{
    // If user happens to arrive here and is already logged in, redirect them to inbox
    var ud = localStorage.getItem('user_data');
    if (ud) {
        window.location.href = '/inbox';
    }

    return(
        <div>
            <PageTitle />
            <Login />
        </div>
    );
};

export default LoginPage;
