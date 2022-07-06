import simage from '../stud2.jpg'
import {Link} from 'react-router-dom';
import { useState, useEffect } from 'react';
import React from 'react';
import Profile from '../reusable/profile'
import Information from '../reusable/information'
import Formbox from '../reusable/formbox'
import Board from '../reusable/board'
import Buttons from '../reusable/buttons'
import Options from '../reusable/options'
import Table from '../reusable/table'
// import { QrReader } from 'react-qr-reader';

function Payment() {
    const [studdata, setStuddata] = useState([])
    const [payment, setPayment] = useState([])
    const [matno, setMatno] = useState('')
    const [rrr, setRrr] = useState('')
    const [purpose, setPurpose] = useState('')
    const [logged, setLogged] = useState(0)
    useEffect(()=>{
        get()
    }, [matno])
    const get = () => {
        const details = JSON.parse(localStorage.getItem('data'));
        setStuddata(details);
        const {mname} = studdata
        setMatno(mname)
        console.log(mname);
    }
   

    const pay = () => {
        const payload = {
            'matno' : matno,
            'rrr' : rrr,
            'purpose' : purpose,
        } 

        setPayment(payment => [...payment, payload]);
        
    }

  return (
    <div className='App'>
        <div className="container">
            <Board user="Admin"/>
            <div className='rectangle dash'>
                <div className='r-inner'>
                <h2>Payment History</h2>
                    <div className='profile'>
                        <div className='prof'>
                            <Profile data={studdata} />
                            <Information info="Breakdown of">
                                <Table info={payment} />
                            </Information>
                        </div>
                        <div className='bord'></div>
                        {console.log(payment)}
                            {logged === 0 ? <div className='modular'>
                        <div className="box">
                            <div className="input">
                                <h2>Acknowledge a payment</h2>
                                <div className='inp'>
                                    <input type="text"  placeholder="Matriculation Number" defaultValue={matno} disabled onChange={(e)=>{setMatno(e.target.value || {matno}); }}/>
                                    <input type="text"  placeholder="RRR/Teller no." onChange={(e)=>{setRrr(e.target.value);}}/>
                                    <select onChange={(e)=>{setPurpose(e.target.value);}}>
                                        <option value="">CHoose purpose</option>
                                        <option value="Medical">Medical</option>
                                        <option value="Library">Library</option>
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

export default Payment;
