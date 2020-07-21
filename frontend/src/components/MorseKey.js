import React from 'react';
import '../App.css';    // custom css stylesheet

function MorseKey ()
{
    return (
    <div className="container">
        <div className="jumbotron">
            
                <h1 className="display-4">International Morse Key</h1>
                <hr />
                <div class="row">
                    <div class="col-sm-6">
                       <h4 className="text-lg font-weight-bold">Letters</h4>
                                <h5 className="text-lg text-monospace">A .-</h5>
                                <h5 className="text-lg text-monospace">B -...</h5>
                                <h5 className="text-lg text-monospace">C -.-.</h5>
                                <h5 className="text-lg text-monospace">D -..</h5>
                                <h5 className="text-lg text-monospace">E .</h5>
                                <h5 className="text-lg text-monospace">F ..-.</h5>
                                <h5 className="text-lg text-monospace">G --.</h5>
                                <h5 className="text-lg text-monospace">H ....</h5>
                                <h5 className="text-lg text-monospace">I ..</h5>
                                <h5 className="text-lg text-monospace">J .---</h5>
                                <h5 className="text-lg text-monospace">K -.-</h5>
                                <h5 className="text-lg text-monospace">L .-..</h5>
                                <h5 className="text-lg text-monospace">M --</h5>
                                <h5 className="text-lg text-monospace">N -.</h5>
                                <h5 className="text-lg text-monospace">O ---</h5>
                                <h5 className="text-lg text-monospace">P .--.</h5>
                                <h5 className="text-lg text-monospace">Q --.-</h5>
                                <h5 className="text-lg text-monospace">R .-.</h5>
                                <h5 className="text-lg text-monospace">S ...</h5>
                                <h5 className="text-lg text-monospace">T -</h5>
                                <h5 className="text-lg text-monospace">U ..-</h5>
                                <h5 className="text-lg text-monospace">V ...-</h5>
                                <h5 className="text-lg text-monospace">W .--</h5>
                                <h5 className="text-lg text-monospace">X -..-</h5>
                                <h5 className="text-lg text-monospace">Y -.--</h5>
                                <h5 className="text-lg text-monospace">Z --..</h5>
                        </div>
                        <div class="col-sm-6">
                         <h4 className="text-lg font-weight-bold">Numbers</h4>
                                <h5 className="text-lg text-monospace">0 -----</h5>
                                <h5 className="text-lg text-monospace">1 .----</h5>
                                <h5 className="text-lg text-monospace">2 ..---</h5>
                                <h5 className="text-lg text-monospace">3 ...--</h5>
                                <h5 className="text-lg text-monospace">4 ....-</h5>
                                <h5 className="text-lg text-monospace">5 .....</h5>
                                <h5 className="text-lg text-monospace">6 -....</h5>
                                <h5 className="text-lg text-monospace">7 --...</h5>
                                <h5 className="text-lg text-monospace">8 ---..</h5>
                                <h5 className="text-lg text-monospace">9 ----.</h5>
                         <h4 className="text-lg font-weight-bold">Special character</h4>
                                <h5 className="text-lg text-monospace">&  .-...</h5>
                                <h5 className="text-lg text-monospace">'  .----.</h5>
                                <h5 className="text-lg text-monospace">@  .--.-.</h5>
                                <h5 className="text-lg text-monospace">)  -.--.-</h5>
                                <h5 className="text-lg text-monospace">(   -.--.</h5>
                                <h5 className="text-lg text-monospace">:   ---...</h5>
                                <h5 className="text-lg text-monospace">,   --..--</h5>
                                <h5 className="text-lg text-monospace">=  -...-</h5>
                                <h5 className="text-lg text-monospace">!   -.-.--</h5>
                                <h5 className="text-lg text-monospace">.   .-.-.-</h5>
                                <h5 className="text-lg text-monospace">-   -....-</h5>
                                <h5 className="text-lg text-monospace">+  .-.-.</h5>
                                <h5 className="text-lg text-monospace">"   .-..-.</h5>
                                <h5 className="text-lg text-monospace">?  ..--..</h5>    
                                <h5 className="text-lg text-monospace">/  -..-.</h5> 
                        </div>
                         
                    </div>
                </div>
            </div>
    );
};
export default MorseKey;