import React from 'react';
import PageTitle from '../components/PageTitle';
import AccountActivation from '../components/AccountActivation';
import { useParams } from 'react-router-dom';

const AccountActivationPage = () =>
{
    const { token } = useParams();
    
    return(
        <div>
            <PageTitle />
            <AccountActivation token={token} />
        </div>
    );
};

export default AccountActivationPage;
