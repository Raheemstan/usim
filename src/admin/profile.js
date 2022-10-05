import {Link, useParams, useNavigate, parsePath} from 'react-router-dom';
import React, { useState, useEffect,  useRef } from 'react';
import { useContext } from 'react';
import {UserContext} from '../auth/usercontext';
import {useReactToPrint} from 'react-to-print'
import Profile from '../reusable/profile'
import Buttons from '../reusable/buttons'
import Board from '../reusable/board'
import QRCode from 'react-qr-code';
import Loader from '../reusable/loading';

const Prof = () => {
    const value = useContext(UserContext)
    const {details:{name, authToken, authlev}, setDetails}= value
    const nav = useNavigate()
    const params = useParams() 
    const usertoken = params.usertoken.replaceAll('-', '/');
    const [logged, setLogged] = useState(1)
    const [studdata, setStuddata] = useState('')
    const componentRef = useRef();
    const print=useReactToPrint({
        content: () => componentRef.current
    })
    useEffect(()=>{
        profile()
    },[])
   
    
    // useEffect(() => {
    //     if (authlev === undefined) {
    //         nav('/');
    //     }
    // }, [])
    const profile = () => {
            var axios = require('axios');
            var qs = require('qs');
            var data = qs.stringify({
                'qr_hash':usertoken
            });
        
            // start of config1
            var config1 = {
              method: 'post',
              url: 'http://127.0.0.1:8000/api/dashboard',
              headers: { 
                'Accept': 'application/json', 
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              data : data
            };
        
            axios(config1)
            .then(function (response) {
                const [dat] = response.data
                dat ? setStuddata(dat) : nav('/404')
            })
            .catch(function (error) {
              console.log(error);
            });
    }
    

  return (
    <div className='App'>
        {studdata === '' ? <Loader/> : ''}
        <div className="container">
            <Board/>
            <div className='rectangle dash'>
                <div className='r-inner'>
                <h2>Profile of {studdata.firstname+' '+studdata.surname}</h2>
                    <div className='profile'>
                        {logged === 0 ? 
                        <div className='noth'>Nothing to display</div> 
                        : 
                        <div className='prof'>
                            <Profile data={studdata} user={authlev}/>
                            
                            { parseInt(authlev)  === 1 ? 
                                <div>
                                    <div className='generate'>
                                        <h2>Print ID card below</h2>
                                    </div>
                                    <div className='idcard' ref={componentRef}>
                                        <div className='cad'>
                                            <div className='cont'>
                                                <div className='logo'>
                                                    <div></div>
                                                    <div>THE FEDERAL POLYTECHNIC, BIDA</div>
                                                </div>
                                                <div className='pass'>
                                                {console.log('http://127.0.0.1:8000/storage/'+ studdata.passport)}
                                                    <img src={'http://127.0.0.1:8000/storage/'+ studdata.passport} alt="passport" />
                                                </div>
                                                <div className='logos'>{studdata.firstname +' '+studdata.surname || ''}</div>
                                                <div className='logos'>{studdata.mat_no || ''}</div>
                                                <div className='logos'>{studdata.department || ''}</div>
                                                </div>
                                        </div>
                                        <div className='cad'>
                                            <div className='cont'>
                                                <div className='logo'>
                                                </div>
                                                <div className='logos'>Scan QR Code to verify identity</div>
                                                <div className='pass'>
                                                <QRCode
                                                    size={256}
                                                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                                    value={'http://localhost:3000/prof/'+usertoken}
                                                    viewBox={`0 0 256 256`}
                                                />
                                                </div>
                                                
                                                </div>
                                        </div>
                                    </div>
                                <button onClick={()=>{print()}} className="print">print</button>
                            </div>
                            : ''}
                        </div>}
                        <div className='bord'></div>
                        {logged === 0 ? '': 
                        <div className='modules'>
                            <Buttons toke={usertoken} lev={parseInt(authlev)}/>
                        </div>
                        }
                            
                        
                    </div>
                </div>
            </div>

        </div>
    </div>
  );
}

export default Prof;
