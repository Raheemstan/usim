import {Link, useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect} from 'react';
import { useContext } from 'react';
import {UserContext} from '../auth/usercontext';
import Profile from '../reusable/profile'
import Information from '../reusable/information'
import Formbox from '../reusable/formbox'
import Board from '../reusable/board'
import Buttons from '../reusable/buttons'
import Options from '../reusable/options'
import Table from '../reusable/table'
import Loader from '../reusable/loading';
// import { QrReader } from 'react-qr-reader';

function PayLib() {
    const value = useContext(UserContext)
    const {details:{name, authToken, authlev}}= value
    const nav = useNavigate()
    const params = useParams() 
    const usertoken = params.usertoken.replaceAll('-', '/');
    console.log(usertoken)

    const [studdata, setStuddata] = useState('')
    const [paid, setPaid] = useState([])
    const [matno, setMatno] = useState('')
    const [rrr, setRrr] = useState('')
    const [purpose, setPurpose] = useState('')
    const [sess, setSess] = useState('')
    const [logged, setLogged] = useState(0)
    
    useEffect(()=>{
        listtrans()
    }, [matno])

    useEffect(()=>{
        profile()
    },[])
    const profile = async () => {
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
                setStuddata(dat)
                setMatno(dat.mat_no)
            })
            .catch(function (error) {
              console.log(error);
            });
    }

    const pay = () => {
        pushtrans()
    }

    const listtrans = async () => {
            var axios = require('axios');
            var qs = require('qs');
            var data = qs.stringify({
                'mat_no':matno,
                'authlev':'2'
            });
            // start of config1
            var config1 = {
              method: 'post',
              url: 'http://127.0.0.1:8000/api/view-transaction',
              headers: { 
                'Accept': 'application/json', 
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              data : data
            };
        
            axios(config1)
            .then(function (response) {
                console.log(response.data)
                setPaid(response.data)
            })
            .catch(function (error) {
              console.log(error);
            });
    }
    const pushtrans = async () => {
        var axios = require('axios');
        var qs = require('qs');
        var data = qs.stringify({
        'teller_id': rrr,
        'mat_no': matno,
        'desc': purpose,
        'sess': '1',
        'unit':'2'
        });
        var config = {
        method: 'post',
        url: 'http://127.0.0.1:8000/api/transaction',
        headers: { 
            'Accept': 'application/json',  
        },
        data : data
        };

        axios(config)
        .then(function (response) {
            setPaid(paid => [...paid, response.data]);
        })
        .catch(function (error) {
        console.log(error);
        });

    }
  return (
    <div className='App'>
    {studdata === '' ? <Loader/> : ''}
        <div className="container">
            <Board user="Library"/>
            <div className='rectangle dash'>
                <div className='r-inner'>
                <h2>Payment History</h2>
                    <div className='profile'>
                        <div className='prof'>
                            <Profile data={studdata} user={authlev}/>
                            <Information info="Breakdown of">
                                <Table info={paid} />
                            </Information>
                        </div>
                        <div className='bord'></div>
                            {logged === 0 ? <div className='modular'>
                        <div className="box">
                            <div className="input">
                                <h2>Acknowledge a payment</h2>
                                <div className='inp'>
                                    <input type="text"  placeholder="Matriculation Number" defaultValue={matno} disabled onChange={(e)=>{setMatno(e.target.value || {matno}); }}/>
                                    <input type="text"  placeholder="RRR/Teller no." onChange={(e)=>{setRrr(e.target.value);}}/>
                                    <select onChange={(e)=>{setPurpose(e.target.value);}}>
                                        <option value="">CHoose purpose</option>
                                        <option value="Registration">Registration</option>
                                        <option value="Binding">Binding</option>
                                    </select>
                                    <input type="submit" value="Save " onClick={()=>pay()} />
                                </div>
                            </div>
                        </div>
                    </div>: 
                            <div className='modular'>
                            <div className="box">
                                <div className="input">
                                    <h2>Acknowledge a payment</h2>
                                    <div className='inp'>
                                        <input type="text"  placeholder="Matriculation Number" defaultValue={matno} disabled/>
                                        <input type="text"  placeholder="RRR/Teller no."/>
                                        <select>
                                            <option value="Medical">Medical</option>
                                            <option value="Library">Library</option>
                                        </select>
                                        <input type="submit" value="Save " onClick={()=>{setStuddata(1)}} />
                                    </div>
                                </div>
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

export default PayLib;
