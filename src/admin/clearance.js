import simage from '../stud2.jpg'
import {Link, useParams} from 'react-router-dom';
import { useState, useEffect } from 'react';
import React from 'react';
import Profile from '../reusable/profile'
import Information from '../reusable/information'
import Formbox from '../reusable/formbox'
import Board from '../reusable/board'
import Buttons from '../reusable/buttons'
import Options from '../reusable/options'
import Table from '../reusable/table'
import Loader from '../reusable/loading';
// import { QrReader } from 'react-qr-reader';

function Payment() {
    const params = useParams() 
    const usertoken = params.usertoken.replaceAll('-', '/');
    console.log(usertoken)
    const [studdata, setStuddata] = useState('')
    const [matno, setMatno] = useState('')
    const [card, setCard] = useState(1)
    const [paid, setPaid] = useState([])
    useEffect(()=>{
        profile()
    },[])
    useEffect(()=>{
        listtrans()
    },[matno])
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
                console.log(dat)
                setStuddata(dat)
                setMatno(dat.mat_no)
            })
            .catch(function (error) {
              console.log(error);
            });
    }
    const listtrans = async () => {
        var axios = require('axios');
        var qs = require('qs');
        var data = qs.stringify({
            'mat_no': matno,
            'authlev':'1'
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
  return (
    <div className='App'>
    {studdata === '' ? <Loader/> : ''}
        <div className="container">
            <Board user="Admin"/>
            <div className='rectangle dash'>
                <div className='r-inner'>
                <h2>Clearance</h2>
                    <div className='profile'>
                        {card === 0 ? 
                        <div className='noth'>Nothing to display</div> 
                        : 
                        <div className='prof'>
                            <Profile data={studdata}/>
                            <Information info="Breakdown of Financial">
                                <Table info={paid} />
                            </Information>
                        </div>}
                        <div className='bord'></div>
                        {card === 0 ? "": 
                            <div className='modular'>
                            <div className="box">
                                <div className="input">
                                    <h2>Status summary</h2>
                                    <div className='summary'>
                                        <div>
                                        <h3 className='stat'>Not Cleared Yet</h3>
                                            <h4>Departments/Units not cleared yet</h4>
                                            <p>Library</p>
                                            <p>Medical</p>
                                            <p>Kindly clear the above outstanding to proceed with your clearance</p>
                                        </div>
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

export default Payment;
