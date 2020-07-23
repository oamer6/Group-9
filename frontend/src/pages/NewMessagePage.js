import React from 'react';
import PageTitle from '../components/PageTitle';
import NewMessage from '../components/NewMessage';

const NewMessagePage = () =>
{
    // Make sure user is logged in
    var ud = localStorage.getItem('user_data');
    if (!ud) {
        window.location.href = '/user';
    }

    return(
        <div>
            <PageTitle />
            <NewMessage />
        </div>
    );
};

export default NewMessagePage;