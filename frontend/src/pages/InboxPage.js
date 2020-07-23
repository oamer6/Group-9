import React from 'react';
import PageTitle from '../components/PageTitle';
import Inbox from '../components/Inbox';

const InboxPage = () =>
{
    // Make sure user is logged in
    var ud = localStorage.getItem('user_data');
    if (!ud) {
        window.location.href = '/user';
    }

    return(
        <div>
            <PageTitle />
            <Inbox />
        </div>
    );
};

export default InboxPage;