import {useNavigate, useParams} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import {UserContext} from '../auth/usercontext';
import Profile from '../reusable/profile'
import Information from '../reusable/information'
import Board from '../reusable/board'
import Table from '../reusable/btable'
import Loader from '../reusable/loading';
// import { QrReader } from 'react-qr-reader';

function Borrow() {
    const value = useContext(UserContext)
    const {details:{name, authToken, authlev}}= value
    const nav = useNavigate()
    const params = useParams() 
    const usertoken = params.usertoken.replaceAll('-', '/');
    console.log(usertoken)

    const [studdata, setStuddata] = useState('')
    const [borrowed, setBorrowed] = useState([])
    const [matno, setMatno] = useState('')
    const [date2, setDate2] = useState('')
    const [isbn, setIsbn] = useState('')
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
                console.log(dat)
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
                'mat_no':matno
            });
            // start of config1
            var config1 = {
              method: 'post',
              url: 'http://127.0.0.1:8000/api/lib-hist',
              headers: { 
                'Accept': 'application/json', 
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              data : data
            };
        
            axios(config1)
            .then(function (response) {
                console.log(response.data)
                setBorrowed(response.data)
            })
            .catch(function (error) {
              console.log(error);
            });
    }
    const pushtrans = async () => {
        var axios = require('axios');
        var qs = require('qs');
        var data = qs.stringify({
        'account_no': isbn,
        'mat_no': matno,
        'return_date': date2
        });
        var config = {
        method: 'post',
        url: 'http://127.0.0.1:8000/api/lib-new',
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
            setBorrowed(borrowed => [...borrowed, response.data]);
        })
        .catch(function (error) {
        console.log(error);
        });

    }
    const updatetrans = async () => {
        var axios = require('axios');
        var qs = require('qs');
        var data = qs.stringify({
        // 'id': id,
        'mat_no': matno
        });
        var config = {
        method: 'post',
        url: 'http://127.0.0.1:8000/api/lib-new',
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
            setBorrowed([response.data]);
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
                <h2>Borrowing History</h2>
                    <div className='profile'>
                        <div className='prof'>
                            <Profile data={studdata} user={authlev}/>
                            <Information info="Borrowing">
                            <div className="btable">
                            <div>
                                <table>
                                    <thead>
                                        <td>SN</td>
                                        <td>Book ISBN</td>
                                        <td>Date borrowed</td>
                                        <td>Date to return</td>
                                        <td>Status</td>
                                        <td>Update</td>
                                    </thead>
                                    {borrowed.map(({account_no, created_at, return_date, status},i)=>(
                                    <tbody>
                                        <td>{i+1}</td>
                                        <td>{account_no}</td>
                                        <td>{created_at.substr(0, 10)}</td>
                                        <td>{return_date}</td>
                                        <td>{status === 0 ? 'Pending' : 'Returned'}<input type="hidden" value={status}/></td>
                                        <td>{status === 1 ? <button disabled>Updated</button> : <button onClick={setBorrowed}>Update</button>}</td>
                                    </tbody>
                                    
                                    ))}
                                </table>
                            </div>
                        </div>
                            </Information>
                        </div>
                        <div className='bord'></div>
                            {logged === 0 ? <div className='modular'>
                        <div className="box">
                            <div className="input">
                                <h2>Borrow a book</h2>
                                <div className='inp'>
                                    <input type="text"  placeholder="Matriculation Number" defaultValue={matno} disabled onChange={(e)=>{setMatno(e.target.value || {matno}); }}/>
                                    <input type="text"  placeholder="ISBN no." onChange={(e)=>{setIsbn(e.target.value);}}/>
                                    <input type="date"  placeholder="Date to return" onChange={(e)=>{setDate2(e.target.value);}}/>
                                    <input type="submit" value="Save " onClick={()=>pay()} />
                                </div>
                            </div>
                        </div>
                    </div>: 
                            <div className='modular'>
                            <div className="box">
                                <div className="input">
                                    <h2>Borrow a book</h2>
                                    <div className='inp'>
                                         <input type="text"  placeholder="Matriculation Number" defaultValue={matno} disabled onChange={(e)=>{setMatno(e.target.value || {matno}); }}/>
                                        <input type="text"  placeholder="ISBN no." onChange={(e)=>{setIsbn(e.target.value);}}/>
                                        <input type="submit" value="Save " onClick={()=>pay()} />
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

export default Borrow;
