import simage from '../stud2.jpg'
import {Link} from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import {useReactToPrint} from 'react-to-print'
import Profile from '../reusable/profile'
import Information from '../reusable/information'
import Formbox from '../reusable/formbox'
import axios from 'axios';
import Buttons from '../reusable/buttons'
import Board from '../reusable/board'
import Options from '../reusable/options'
import Table from '../reusable/table'
import QRCode from 'react-qr-code';
import pass from '../11a.jpg'

function Create() {
    const [logged, setLogged] = useState(1)
    const [data, setData] = useState([])
    const [studdata, setStuddata] = useState([])
    const [matno, setMatno] = useState('')
    const [card, setCard] = useState()
    const componentRef = useRef();
    const print=useReactToPrint({
        content: () => componentRef.current
    })

    useEffect(()=>{
        get()
    }, [matno])

    const get = () => {
        const details = JSON.parse(localStorage.getItem('data'));
        setStuddata(details);
        setMatno(details.mname)
        console.log(matno);
    }
    
  return (
    <div className='App'>
        <div className="container">
            <Board user="Admin"/>
            <div className='rectangle dash'>
                <div className='r-inner'>
                <h2>Profile of {studdata.fname}</h2>
                    <div className='profile'>
                        {logged === 0 ? 
                        <div className='noth'>Nothing to display</div> 
                        : 
                        <div className='prof'>
                            <Profile data={studdata} />
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
                                            <img src={pass} alt="passport" />
                                        </div>
                                        <div className='logos'>{studdata.fname +' '+studdata.lname}</div>
                                        <div className='logos'>{studdata.mname}</div>
                                        <div className='logos'>{studdata.dept}</div>
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
                                            value={matno}
                                            viewBox={`0 0 256 256`}
                                        />
                                        </div>
                                        
                                        </div>
                                </div>
                                
                            </div>
                            <button onClick={()=>{print()}} className="print">print</button>
                        </div>}
                        <div className='bord'></div>
                        {logged === 0 ? '': 
                        <div className='modules'>
                            <Buttons />
                        </div>
                        }
                            
                        
                    </div>
                </div>
            </div>

        </div>
    </div>
  );
}

export default Create;
