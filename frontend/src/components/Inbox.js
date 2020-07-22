import React, { useState } from 'react';
import { Link} from 'react-router-dom';

const BASE_URL = 'https://mern-morse-code-translator.herokuapp.com';

function Inbox()
{
    var _ud = localStorage.getItem('user_data');    
    var texts;
    var ud = JSON.parse(_ud);  
    var username = ud.userName;
    const [message,setMessage] = useState('');

    const checkMessage = async event =>
    {
        event.preventDefault();
        if(_ud === null)
        {
            setMessage('Please log in');
            return;
        }
 

        var js = '{' + '"userName":"' + username.value + '"}';

        try
        {
            // POST request using fetch with async/wait
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: js
            };
            const response = await fetch(BASE_URL + '/displaymessage', requestOptions);
            var res = await response.json();
            if(res.status === 400)
                setMessage('You must sign in to view your inbox');
            else if(res.status === 500)
                setMessage(res.error);
            else
            {
                if(res.length > 0)
                {
                    texts = res.map(text => {
                        let sender = text.sender;
                        let content = text.message;
                        let date = text.date;
                        return <span>From: {sender} at {date}. Content: {content}</span>
                    });
                }
                else
                    setMessage('You have no message at the moment.');
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        } 
    };
    return(
        <div id="inboxDiv" className="container">
            <div className="jumbotron">
                <ul>{texts}</ul> 
                <p id="inboxResult">{message}</p>
            </div>
        </div>
    );
};

export default Inbox;
