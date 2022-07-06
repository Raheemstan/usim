// import simage from '../stud3.webp'
// import {Link} from 'react-router-dom';
import { useState } from 'react';
import React from 'react';
// import { QrReader } from 'react-qr-reader';

function Scan() {
    const [result, setResult] = useState('')
    const handleErrorWebCam = (error) => {
        console.log(error);
      }
    const handleScanWebCam = (result) => {
        if (result){
            console.log(result);
            setResult(result);
        }
    }

  return (
    <div className='App'>
        <div className="container">
            <div className='board'>LOGO</div>
            <div className='rectangle'>
                <div className='r-inner'>
                    <h2>Welcome, Ndubuisi</h2>
                    <div className='scanville'>
                        <div className='instruct'>
                            <div className='tops'> 
                                <h3>Scan</h3>
                                <p>the QR code on the card to proceed with the student</p>
                                <p>{result}</p>
                            </div>
                        </div>
                        <div className='cambox'>
                            <div className='ul'></div>
                            <div className='ur'></div>
                        </div>
                        
                    </div>
                </div>
            </div>

        </div>
    </div>
  );
}

export default Scan;
