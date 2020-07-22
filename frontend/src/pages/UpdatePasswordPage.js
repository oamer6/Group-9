import React from 'react';
import { useParams } from 'react-router-dom';
import PageTitle from '../components/PageTitle';
import UpdatePassword from '../components/UpdatePassword';

const UpdatePasswordPage = () => 
{
    return(
        <div>
            <PageTitle />
            <UpdatePassword token={token} />
        </div>
    );
};

export default UpdatePasswordPage;
