import simage from '../stud2.jpg'
import {Link, useParams, useNavigate} from 'react-router-dom';
import { useState, useEffect } from 'react';
import React, { useContext } from 'react';
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

function Medpay() {
    const value = useContext(UserContext)
    const {details:{name, authToken, authlev}, setDetails}= value
    const nav = useNavigate()
    useEffect(() => {
        // localStorage.setItem('logs', JSON.stringify(details))
        const truth = localStorage.getItem('logs');
        if(truth){
            const kept = JSON.parse(localStorage.getItem('logs'))
            const {credentials:{name, idnumber, level}} = kept
            const{ token } = kept
            // console.log(name)
            // console.log(token)
            setDetails({
                name:name,
                authlev:parseInt(level),
                idnumber: idnumber
            })
            if(!level){
             nav('/404')
            //console.log(level);
        }
        }
        
    }, [])
    const params = useParams() 
    const usertoken = params.usertoken.replaceAll('-', '/'); 

    const [studdata, setStuddata] = useState('')
    const [payment, setPayment] = useState([])
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
                'authlev':'3'
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
        'desc': 'Medical',
        'sess': '1',
        'unit':'3'
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
            <Board user="Medical"/>
            <div className='rectangle dash'>
                <div className='r-inner'>
                <h2>Payment History</h2>
                    <div className='profile'>
                        <div className='prof'>
                            <Profile data={studdata}  user={authlev}/>
                            <Information info="Breakdown of">
                                <Table info={paid} />
                            </Information>
                        </div>
                        <div className='bord'></div>
                        <div className='modular'>
                        <div className="box">
                            <div className="input">
                                <h2>Acknowledge a payment</h2>
                                <div className='inp'>
                                    <input type="text"  placeholder="Matriculation Number" value={matno} disabled/>
                                    <input type="text"  placeholder="RRR/Teller no." onChange={(e)=>{setRrr(e.target.value);}}/>
                                    <input type="submit" value="Save " onClick={()=>pay()} />
                                </div>
                            </div>
                        </div>
                    </div>
                            
                        
                    </div>
                </div>
            </div>

        </div>
    </div>
  );
}

export default Medpay;
