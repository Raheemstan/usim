import {Link, useNavigate} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import {UserContext} from '../auth/usercontext';
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
    const value = useContext(UserContext)
    const {details:{name, authToken, authlevel}}= value
    const nav = useNavigate()
    useEffect(() => {
        if (authToken === '' || authlevel !== 1) {
            nav('/404');
        }
    }, [authToken])
    
    const [studdata, setStuddata] = useState(0)
    const [session, setSession] = useState([])
    const [newsession, setNewsession] = useState([])
    const [newsess, setNewsess] = useState([])
    const [card, setCard] = useState(1)
    
    useEffect(()=>{
        listtrans()
    }, [])
    const pay = () => {
        pushtrans()
    }

    const listtrans = async () => {
            var axios = require('axios');
            var qs = require('qs');
            var config1 = {
              method: 'get',
              url: 'http://127.0.0.1:8000/api/list-session',
              headers: { 
                'Accept': 'application/json', 
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            };
        
            axios(config1)
            .then(function (response) {
                // console.log(response.data.prev)
                setSession(response.data.prev)
                setNewsession(response.data.now)
            })
            .catch(function (error) {
              console.log(error);
            });
    }
    const pushtrans = async () => {
        var axios = require('axios');
        var qs = require('qs');
        var data = qs.stringify({
            'session': newsess,
        });
        var config = {
        method: 'post',
        url: 'http://127.0.0.1:8000/api/new-session',
        headers: { 
            'Accept': 'application/json', 
            'Authorization': 'Bearer 1|ydWAPxwe0Z51t2g8EZKBolV1ujEliimp7pMYGWDT', 
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data : data
        };

        axios(config)
        .then(function (response) {
            console.log(response.data)
            setNewsession(response.data);
        })
        .catch(function (error) {
        console.log(error);
        });

    }

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
                        <div className='prof sess'>
                            <div >
                                <h3>Current Session</h3>
                                {newsession.map(({session}) => (
                                    <p >{session}</p>
                                ))}
                            </div>
                            <div>
                                <h4>Previous Sessions</h4>
                                {session.map(({session}) => (
                                    <p style={{color:'rgba(0,0,0,.4)'}}>{session}</p>
                                ))}
                            </div>
                        </div>}
                        <div className='bord'></div>
                        {studdata === 0 && card === 1 ? <div className='modular'>
                            <div className="box">
                                <div className="input">
                                    <h2>Create a New Session and Semester</h2>
                                    <div className='inp'>
                                        <input type="text"  placeholder="Session" onChange={(e)=>{setNewsess(e.target.value)}}/>
                                        <input type="text"  placeholder="Semester" disabled/>
                                        <input type="submit" value="Save " onClick={()=>{pay()}} />
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
