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
    const [card, setCard] = useState(1)
    const [payment, setPayment] = useState([])
    
    useEffect(()=>{
        const details = JSON.parse(localStorage.getItem('data'));
        setStuddata(details);
    }, [])
  return (
    <div className='App'>
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
                                <Table info={payment} />
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
                                            <h4>Departments not cleared yet</h4>
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
