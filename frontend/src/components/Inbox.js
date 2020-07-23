import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const BASE_URL = 'https://mern-morse-code-translator.herokuapp.com';



function Inbox()
{
    const [texts, setTexts] = useState('');
    //var texts;
    var userObj = JSON.parse(localStorage.getItem('user_data'));
    const [message,setMessage] = useState('');

    const loadMessages = async event =>
    {
        event.preventDefault();
        try
        {
            // POST request using fetch with async/wait
            var js = `{"userName":"${userObj.username}"}`;
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: js
            };
            const response = await fetch(BASE_URL + '/displaymessage', requestOptions);
            var res = await response.json();
            console.log(res);

            if (response.status !== 200)
            {
                if (res.error) {
                    setMessage(res.error);
                } else if (res.msg) {
                    setMessage(res.msg);
                }
            }
            else
            {
                if (res.results.length > 0) {
                    var resultText = '';
                    for(var i = 0; i < res.results.length; i++)
                    {
                        resultText += 'From: ' + res.results[i].sender + '\nContent: '+ res.results[i].message + '\n';
                    }
                    setTexts(resultText);
                    console.log(texts);
                    // setTexts(
                
                        // // iterate thru results here
                        // })
                    // );
                    /*texts = res.map(text => {
                        let sender = text.sender;
                        let content = text.message;
                        let date = text.date;
                        return <span>From: {sender} at {date}. Content: {content}</span>
                    });*/
                    // texts = res.results.map((text, i) => {
                    //     return <li key={i}>From :{text.sender}, Content: {text.message}</li>
                    // })
 
                   // console.log(texts);
                } 
                else {
                    setMessage('You have no messages.');
                }
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
            <script>getMessages</script>
            <div className="jumbotron">
                <div className="navbar" id="inboxNavDiv">
                    <h2 id="inboxHeader">Inbox</h2>
                    <div className="align-self-end ml-auto">
                        <Link to="/newmessage" id="newMessageButton">
                            <button className="btn btn-outline-primary">+ New Message</button>
                        </Link>
                    </div>
                </div>
                <hr />
                <button className="btn btn-outline-secondary" onClick={loadMessages}>Load Messages</button>
                <p onLoad={loadMessages}>{texts}</p>  
                <p id="inboxResult">{message}</p>
            </div>
        </div>
    );
    
};

export default Inbox;
