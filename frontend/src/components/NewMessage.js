import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const BASE_URL = 'https://mern-morse-code-translator.herokuapp.com';

function NewMessage()
{
    var userObj = JSON.parse(localStorage.getItem('user_data'));
    const [message,setMessage] = useState('');
    const [isTranslated, setIsTranslated] = useState(false);
    const [msgMorse, setMsgMorse] = useState('');

    var msgEnglish;
    var recipient;

    const doTranslate = async event =>
    {
        event.preventDefault();

        // Verify we have input
        if (!isTranslated && msgEnglish.value === '') {
            setMessage('Please enter a message to translate.');
            return;
        }

        try
        {
            // POST request using fetch with async/wait
            var js = `{"userName":"${userObj.username.value}","message":"${msgEnglish.value}"}`;
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: js
            };
            const response = await fetch(BASE_URL + '/storemessage', requestOptions);
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
                setMsgMorse(res.morse);
                setMessage('');
                setIsTranslated(true);
            }
        }
        catch (e)
        {
            alert(e.toString());
            return;
        }
    };

    const doSendMessage = async event =>
    {
        event.preventDefault();

        // Verify we have english and morse input
        if (isTranslated && (msgMorse === '' || msgEnglish.value === '')) {
            setMessage('Either the english or morse message is missing.');
            return;
        }

        try
        {
            // POST request using fetch with async/wait
            var js = `{
                "message":"${msgEnglish.value}",
                "morse":"${msgMorse}",
                "sender":"${userObj.username.value}",
                "receiver":"${recipient}"
            }`;
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: js
            };
            const response = await fetch(BASE_URL + '/sendmessage', requestOptions);
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
                setMessage('');
                window.location.href = '/inbox';
            }
        }
        catch (e)
        {
            alert(e.toString());
            return;
        }
    };

    return(
        <div id="newMsgDiv" className="container">
            <div className="jumbotron">
                <div className="navbar" id="newMsgNavDiv">
                    <h2 id="newMsgHeader">New Message</h2>
                    <div className="align-self-end ml-auto">
                        <Link to="/inbox" id="cancelButton">
                            <button className="btn btn-outline-secondary">Cancel</button>
                        </Link>
                    </div>
                </div>
                <hr />
                <form>
                    <div id="englishMsg" className="form-group">
                        <label htmlFor="englishMsgInput">English Message</label>
                        <textarea readOnly={isTranslated} id="englishMsgInput" className="form-control" rows={2} style={{minHeight:"40px"}} ref={(c) => msgEnglish = c} required></textarea>
                        <small hidden={isTranslated} id="englishMsgMuted" className="form-text text-muted">The english message must be translated to morse code before sending.</small>
                        <button disabled={isTranslated} id="englishMsgButton" className={isTranslated ? "btn btn-outline-secondary": "btn btn-outline-primary"} onClick={doTranslate}>Translate!</button>
                    </div>
                    {isTranslated ?
                        <div id="morseMsg" className="form-group">
                            <hr />
                            <label htmlFor="morseMsgInput">Morse Message</label>
                            <textarea id="morseMsgInput" className="form-control" rows={2} style={{minHeight:"40px"}} value={msgMorse} readOnly></textarea>
                            <br />
                            <label htmlFor="recipientInput">Recipient</label>
                            <input id="recipientInput" type="text" placeholder="enter recipient's username" className="form-control" ref={(c) => recipient = c} required></input>
                            <button id="sendMsgButton" className="btn btn-outline-primary" onClick={doSendMessage}>Send!</button>
                        </div>
                    :
                        <div />
                    }
                </form>
                
                <span id="newMsgResult" className="functionResult">{message}</span>
            </div>
        </div>
    );
};

export default NewMessage;
