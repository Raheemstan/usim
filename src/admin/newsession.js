import simage from '../stud2.jpg'
import {Link} from 'react-router-dom';
import { useState, useEffect } from 'react';
import React from 'react';
import Profile from '../reusable/profile'
import Information from '../reusable/information'
import Formbox from '../reusable/formbox'
import Backbutton from '../reusable/backbutton'
import Board from '../reusable/board'
import Buttons from '../reusable/buttons'
import Options from '../reusable/options'
import Table from '../reusable/table'
// import { QrReader } from 'react-qr-reader';

function Newsession() {
    const [studdata, setStuddata] = useState(0)
    const [card, setCard] = useState(1)
    
  return (
    <div className='App'>
        <div className="container">
            <Board user="Admin"/>
            <div className='rectangle dash'>
                <div className='r-inner'>
                <h2>Academic Session</h2> 
                    <div className='profile'>
                        {card === 0 ? 
                        <div className='noth'>Nothing to display</div> 
                        : 
                        <div className='prof'>
                            <div>Previous Sessions</div>
                            <div>Current Sessions</div>
                        </div>}
                        <div className='bord'></div>
                        {studdata === 0 && card === 1 ? <div className='modular'>
                            <div className="box">
                                <div className="input">
                                    <h2>Create a New Session and Semester</h2>
                                    <div className='inp'>
                                        <input type="text"  placeholder="Session"/>
                                        <input type="text"  placeholder="Semester"/>
                                        <input type="submit" value="Save " onClick={()=>{setStuddata(1)}} />
                                    </div>
                                </div>
                            </div>
                        </div>: 
                        <div className='modules'>
                            <div className='ops'>
                                <Link to='/create'><Options  text="Create New Student" icon="create-new"/></Link>
                                <Link to='/newsession'><Options  text="Create New Session" icon="create-new"/></Link>
                            </div>
                        </div>
                        }
                            
                        
                    </div>
                </div>
            </div>

        </div>
    </div>
  );
}

export default Newsession;
