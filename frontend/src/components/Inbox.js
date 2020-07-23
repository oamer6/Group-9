import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';


const BASE_URL = 'https://mern-morse-code-translator.herokuapp.com';



function Inbox()
{
    var userObj = JSON.parse(localStorage.getItem('user_data'));
    const [message,setMessage] = useState('');
    const [messagesHTMLString, setHTMLString] = useState('');   // for return

    // Runs on page load (render)
    useEffect( () => {
        // First, define function we want to run
        async function loadMessages() 
        {
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

                        // Generate inbox messages
                        var thisHTMLString = '';
                        for (var i=0; i<res.results.length; i++) {
                            thisHTMLString += '\
                                <div class="container myCon0">\
                                    <h6 class="messageHeader"><b>From: </b><i>'+ res.results[i].sender +'</i></h6>\
                                    <p class="messageContentMorse"><b>Message: </b>'+ res.results[i].morse +'</p>\
                                    <p class="messageContentEnglish"><b>Translation: </b>'+ res.results[i].message +'</p>\
                                </div>\
                            ';
                        }
                        setHTMLString(thisHTMLString);
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

        // Call our newly defined function
        loadMessages();

    }, []);


    var testHTML = (
        <div id="inboxMessages">
            <div className="container myCon0">
                <h6 className="messageHeader"><b>From: </b><i>someusername</i></h6>
                <p className="messageContentMorse"><b>Message: </b>--. . -. --. . -.- ..- - .-. -..</p>
                <p className="messageContentEnglish"><b>Translation: </b>This doesn't translate to this whatsoever.This doesn't translate to this whatsoever.This doesn't translate to this whatsoever.</p>
            </div>
            <div className="container myCon0">
                <h6 className="messageHeader"><b>From: </b><i>someusername</i></h6>
                <p className="messageContentMorse"><b>Message: </b>--. . -. --. . -.- ..- - .-. -..</p>
                <p className="messageContentEnglish"><b>Translation: </b>This doesn't translate to this whatsoever.This doesn't translate to this whatsoever.This doesn't translate to this whatsoever.</p>
            </div>
            <div className="container myCon0">
                <h6 className="messageHeader"><b>From: </b><i>someusername</i></h6>
                <p className="messageContentMorse"><b>Message: </b>--. . -. --. . -.- ..- - .-. -..</p>
                <p className="messageContentEnglish"><b>Translation: </b>This doesn't translate to this whatsoever.This doesn't translate to this whatsoever.This doesn't translate to this whatsoever.</p>
            </div>
            <div className="container myCon0">
                <h6 className="messageHeader"><b>From: </b><i>someusername</i></h6>
                <p className="messageContentMorse"><b>Message: </b>--. . -. --. . -.- ..- - .-. -..</p>
                <p className="messageContentEnglish"><b>Translation: </b>This doesn't translate to this whatsoever.This doesn't translate to this whatsoever.This doesn't translate to this whatsoever.</p>
            </div>
        </div>
    );


    return(
        <div id="inboxDiv" className="container">
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
                <div>{ReactHtmlParser(messagesHTMLString)}</div>
                <p id="inboxResult">{message}</p>
            </div>
        </div>
    );
    
    
};

export default Inbox;
