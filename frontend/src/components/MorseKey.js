import React from 'react';
import { Link} from 'react-router-dom';

function MorseKey ()
{
    return (
        <div className="jumbotron jumbotron-fluid">
            <div className="container">
                <h1 className="display-4">International Morse Key</h1>
                <div class="row">
                    <div class="col-sm-6">
                       <span className="text-lg font-weight-bold">Letters</span>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">A .-</li>
                                <li className="list-group-item">B -...</li>
                                <li className="list-group-item">C -.-.</li>
                                <li className="list-group-item">D -..</li>
                                <li className="list-group-item">E .</li>
                                <li className="list-group-item">F ..-.</li>
                                <li className="list-group-item">G --.</li>
                                <li className="list-group-item">H ....</li>
                                <li className="list-group-item">I ..</li>
                                <li className="list-group-item">J .---</li>
                                <li className="list-group-item">K -.-</li>
                                <li className="list-group-item">L .-..</li>
                                <li className="list-group-item">M --</li>
                                <li className="list-group-item">N -.</li>
                                <li className="list-group-item">O ---</li>
                                <li className="list-group-item">P .--.</li>
                                <li className="list-group-item">Q --.-</li>
                                <li className="list-group-item">R .-.</li>
                                <li className="list-group-item">S ...</li>
                                <li className="list-group-item">T -</li>
                                <li className="list-group-item">U ..-</li>
                                <li className="list-group-item">V ...-</li>
                                <li className="list-group-item">W .--</li>
                                <li className="list-group-item">X -..-</li>
                                <li className="list-group-item">Y -.--</li>
                                <li className="list-group-item">Z --..</li>
                            </ul>
                        </div>
                        <div class="col-sm-6">
                         <span className="text-lg font-weight-bold">Numbers</span>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">0 -----</li>
                                <li className="list-group-item">1 .----</li>
                                <li className="list-group-item">2 ..---</li>
                                <li className="list-group-item">3 ...--</li>
                                <li className="list-group-item">4 ....-</li>
                                <li className="list-group-item">5 .....</li>
                                <li className="list-group-item">6 -....</li>
                                <li className="list-group-item">7 --...</li>
                                <li className="list-group-item">8 ---..</li>
                                <li className="list-group-item">9 ----.</li>
                            </ul>
                        </div>
                        <div class="col-sm-6">
                         <span className="text-lg font-weight-bold">Special character</span>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">&  .-...</li>
                                <li className="list-group-item">'  .----.</li>
                                <li className="list-group-item">@  .--.-.</li>
                                <li className="list-group-item">)  -.--.-</li>
                                <li className="list-group-item">(   -.--.</li>
                                <li className="list-group-item">:   ---...</li>
                                <li className="list-group-item">,   --..--</li>
                                <li className="list-group-item">=  -...-</li>
                                <li className="list-group-item">!   -.-.--</li>
                                <li className="list-group-item">.   .-.-.-</li>
                                <li className="list-group-item">-   -....-</li>
                                <li className="list-group-item">+  .-.-.</li>
                                <li className="list-group-item">"   .-..-.</li>
                                <li className="list-group-item">?  ..--..</li>    
                                <li className="list-group-item">/  -..-.</li> 
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
    );
};
export default MorseKey;