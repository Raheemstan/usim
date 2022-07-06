// import simage from '../stud3.webp'
import {Link} from 'react-router-dom';
import React, { useState } from 'react';
import Options from './options'
import Profile from './profile'
import Information from './information'
import Board from './board'
import Formbox from './formbox'
import Table from './table'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCamera} from '@fortawesome/free-solid-svg-icons'
import QrScanner from 'qr-scanner';
// import { QrReader } from 'react-qr-reader';

function Dashboard() {
    const [studdata, setStuddata] = useState(0)
    const [result, setResult] = useState(0)
    
  return (
    <div className='App'>
        <div className="container">
            <Board user="Admin"/>
            <div className='rectangle dash'>
                <div className='r-inner'>
                    {studdata === 0 ? <h2>Welcome Admin</h2> : <h2>Profile of Musa Taliban</h2>}
                    <div className='profile'>
                        {studdata === 0 ? 
                            <div className='cambox'>
                                <div className='clickscan'>
                                    <div>
                                        <FontAwesomeIcon icon={faCamera} className="camera"/>
                                        <p>Click to scan</p>
                                    </div>
                                </div>
                                <div className='ul'></div>
                                <div className='ur'></div>
                            </div> : 
                            <div className='prof'>
                                <Profile/>
                                <Information info="Medical">
                                    <Table />
                                </Information>
                                <Information info="Financial">
                                    <Table />
                                </Information>
                            </div>
                        }
                        <div className='bord'></div>
                        <div className='modules'>
                            <div className='ops'>
                                <Link to='/create'><Options  text="Create New Student" icon="create-new"/></Link>
                                <Link to='/newsession'><Options  text="Create New Session" icon="create-new"/></Link>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
  );
}

export default Dashboard;
