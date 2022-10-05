// import simage from '../stud3.webp'
import {Link, useNavigate} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import {UserContext} from '../auth/usercontext';
import Iframe from 'react-iframe'
import Options from './options'
import Profile from './profile'
import Information from './information'
import Board from './board'
import Table from './table'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCamera} from '@fortawesome/free-solid-svg-icons'
// import { QrReader } from 'react-qr-reader';

function Dashboard() {
    const value = useContext(UserContext)
    const {details:{name, authToken, authlev}, setDetails}= value
    const nav = useNavigate()
    useEffect(() => {
        if (authlev === undefined) {
            nav('/');
        }
    }, [])
    const [studdata, setStuddata] = useState(0)
    const [result, setResult] = useState(0)
    useEffect(() => {
        // localStorage.setItem('logs', JSON.stringify(details))
        const truth = localStorage.getItem('logs');
        if(truth){
            const kept = JSON.parse(localStorage.getItem('logs'))
            const {credentials:{name, idnumber, level}} = kept
            const{ token } = kept
            console.log(name)
            console.log(token)
            console.log(level)
            setDetails({
                name:name,
                authlev:parseInt(level),
                idnumber: idnumber
            })
            if(level){
            nav('/dashboard')
        }
        }
        
    }, [])
    console.log(authlev)
      
  return (
    <div className='App'>
        <div className="container">
            <Board user={authlev}/>
            {console.log(value.details.authlev)}
            <div className='rectangle dash'>
                <div className='r-inner'>
                    <h2>Welcome {name}</h2>
                    <div className='profile'>
                        
                            <div className='cambox'>
                                <div className='clickscan' onClick={()=>setStuddata(1)}>
                                    {studdata === 0 ? <div >
                                        <FontAwesomeIcon icon={faCamera} className="camera"/>
                                        <p >Click to scanner</p>
                                    </div>: 
                                        <div className='scanner' style={{border:'none'}}>
                                            {
                                                // <Iframe url="../../qr.html" width="400" height="400" style={{border:'1px solid white'}} allowfullscreen="" loading="lazy" allow="camera" referrerpolicy="no-referrer-when-downgrade"></Iframe>
                                            }
                                            <iframe src={process.env.PUBLIC_URL +" ../../qr2.html"} width={400} height={400} title='Scan eye'> border={0}</iframe>
                                        </div>
                                    }
                                </div>
                                <div className='ul'></div>
                                <div className='ur'></div>
                            </div> 
                        <div className='bord'></div>
                        <div className='modules'>
                            { authlev === 1 ? <div className='ops'>
                                <Link to='/create'><Options  text="Create New Student" icon="create-new"/></Link>
                                <Link to='/newsession'><Options  text="Create New Session" icon="create-new"/></Link>
                            </div> : ''}
                            
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
  );
}

export default Dashboard;
