import {Link, useNavigate} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import {UserContext} from '../auth/usercontext';
import {useParams} from 'react-router-dom';
import Profile from '../reusable/profile'
import Buttons from '../reusable/buttons'
import Board from '../reusable/board'
import Editform from '../reusable/editform'
import Loader from '../reusable/loading';
// import { QrReader } from 'react-qr-reader';

function Edit() {
    const value = useContext(UserContext)
    const {details:{name, authToken, authlev}, setDetails}= value
    const nav = useNavigate()
    useEffect(() => {
        // localStorage.setItem('logs', JSON.stringify(details))
        const truth = localStorage.getItem('logs');
        if(truth !== undefined){
            const kept = JSON.parse(localStorage.getItem('logs'))
            const {credentials:{name, idnumber, level}} = kept
            const{ token } = kept
            console.log(name)
            console.log(token)
            setDetails({
                name:name,
                authlev:parseInt(level),
                idnumber: idnumber
            })
        }
        else{
            nav('/404');
        }
        
    }, [])
    
    const params = useParams() 
    const usertoken = params.usertoken.replaceAll('-', '/');
    console.log(usertoken)

    console.log(params)
    console.log(usertoken)
    const [studdata, setStuddata] = useState('')
    const [logged, setLogged] = useState(1)
    
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
                {logged === 0 ? <h2>Edit Student Profile</h2> : <h2>Student Profile</h2>}
                    <div className='profile'>
                        {logged === 0 ? 
                        <div className='noth'>Nothing to display</div> 
                        : 
                        <div className='prof'>
                        <Profile data={studdata} user={authlev}/>
                        </div>}
                        <div className='bord'></div>
                        {logged === 0 ? "": logged ===1 ?
                        <div className='modular'>
                            <div className="box">
                                <div className="input">
                                    <h2>Edit Student Details</h2>
                                    <div className='inp'>
                                    <Editform data={studdata} />
                                    </div>
                                </div>
                            </div>
                        </div> :
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

export default Edit;
