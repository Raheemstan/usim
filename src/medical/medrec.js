import simage from '../stud2.jpg'
import {useNavigate, useParams} from 'react-router-dom';
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
            console.log(name)
            console.log(token)
            setDetails({
                name:name,
                authlev:parseInt(level),
                idnumber: idnumber
            })
            if(!authlev){
             nav('/404')
            console.log(value);
        }
        }
        
    }, [])
    const params = useParams() 
    const usertoken = params.usertoken.replaceAll('-', '/');
    console.log(usertoken)
    const [studdata, setStuddata] = useState('')    
    const [success, setSuccess] = useState(0);
    const [matno, setMatno] = useState('')
    const [medrec, setmedrec] = useState('')
    const [exist, setexist] = useState(0)
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

    
    const listtrans = async () => {
            var axios = require('axios');
            var qs = require('qs');
            var data = qs.stringify({
                'mat_no':matno
            });
            // start of config1
            var config1 = {
              method: 'post',
              url: 'http://127.0.0.1:8000/api/medical-record',
              headers: { 
                'Accept': 'application/json', 
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              data : data
            };
        
            axios(config1)
            .then(function (response) {
                console.log(response.data)
                if(response.data){
                    setmedrec(response.data)
                    setexist(1)
                }
                
                
            })
            .catch(function (error) {
              console.log(error);
            });
    }
    
    const pushtrans = async () => {
        console.log(medrec)
        var axios = require('axios');
        var qs = require('qs');
        var data = qs.stringify(medrec);
        var config = {
        method: 'post',
        url: 'http://127.0.0.1:8000/api/medical',
        headers: { 
            'Accept': 'application/json',  
        },
        data : data
        };

        axios(config)
        .then(function (response) {
            console.log(response.data)
            setSuccess(1)
            setexist(1)
        })
        .catch(function (error) {
        console.log(error);
        });

    }
    const uptrans = async () => {
        console.log(medrec)
        var axios = require('axios');
        var qs = require('qs');
        var data = qs.stringify(medrec);
        var config = {
        method: 'post',
        url: 'http://127.0.0.1:8000/api/medical-update',
        headers: { 
            'Accept': 'application/json',  
        },
        data : data
        };

        axios(config)
        .then(function (response) {
            console.log(response.data)
            setSuccess(1)
            setexist(1)
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
                <h2>Medical record</h2>
                    <div className='profile'>
                        <div className='prof'>
                            <Profile data={studdata}  user={authlev}/>
                            <Information info="Medical">
                                <div className='medinfo'>
                                    <p><label>Weight</label>: {medrec.weight + 'kg'}</p>
                                    <p><label>Height</label>: {medrec.height + 'm'}</p>
                                    <p><label>Eye(Vision)</label>: {medrec.eye_vision}</p>
                                    <p><label>Blood Pressure</label>: {medrec.blood_press}</p>
                                    <p><label>RBC</label>: {medrec.hb}</p>
                                    <p><label>Genotype</label>: {medrec.genotype}</p>
                                    <p><label>HIV Status</label>: {medrec.hiv}</p>
                                    <p><label>WBC</label>: {medrec.wbc}</p>
                                    <p><label>Urine Microscopy</label>: {medrec.urine_microscopy}</p>
                                    <p><label>Urinalysis</label>: {medrec.urinalysis}</p>
                                    <p><label>Stool Microscopy</label>: {medrec.stool_microscopy}</p>
                                    <p><label>Skin Snip</label>: {medrec.kin_snip }</p>
                                    <p><label>Pregnancy</label>: {medrec.pregnancy }</p>
                                    <p><label>Recommendation</label>: {medrec.recomendation }</p>
                                </div>
                            </Information>
                        </div>
                        <div className='bord'></div>
                        <div className='modular'>
                            <div className="box">
                            { exist === 0 ?
                                <div className="input">
                                    <h2>Create medical record</h2>
                                    <div className='inp'>
                                        <label>Matriculation Number</label>
                                        <input type="text"  placeholder="Matriculation Number" value={matno} disabled/>
                                        <div style={{display:'grid', gridTemplateColumns:'repeat(2, auto)', justifyContent:'start', gap:'10px'}}>
                                            <div>
                                                <label>Weight</label>
                                                <input type="text"  placeholder="Weight"  onChange={(e)=>{setmedrec({...medrec, mat_no: matno, weight : e.target.value});}}/>
                                            </div>
                                            <div>
                                                <label>Height</label>
                                                <input type="text"  placeholder="Height" onChange={(e)=>{setmedrec({...medrec, height : e.target.value});}}/>
                                            </div>
                                            <div>
                                                <label>Eye(Vision)</label>
                                                <input type="text"  placeholder="Eye(Vision)" onChange={(e)=>{setmedrec({...medrec, eye_vision : e.target.value});}}/>
                                            </div>
                                            <div>
                                                <label>Blood Pressure</label>
                                                <input type="text"  placeholder="Blood pressure" onChange={(e)=>{setmedrec({...medrec, blood_press : e.target.value});}}/>
                                            </div>
                                            <div>
                                                <label>RBC</label>
                                                <input type="text"  placeholder="RBC" onChange={(e)=>{setmedrec({...medrec, hb : e.target.value});}}/>
                                            </div>
                                            <div>
                                                <label>Genotype</label>
                                                <input type="text"  placeholder="Genotype" onChange={(e)=>{setmedrec({...medrec, genotype : e.target.value});}}/>
                                            </div>
                                            <div>
                                                <label>HIV Status</label>
                                                <select onChange={(e)=>{setmedrec({...medrec, hiv : e.target.value});}}>
                                                    <option value=''>Status</option>
                                                    <option value='Positive'>Positive</option>
                                                    <option value='Negative'>Negative</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label>WBC</label>
                                                <input type="text"  placeholder="WBC" onChange={(e)=>{setmedrec({...medrec, wbc : e.target.value});}}/>
                                            </div>
                                            <div>
                                                <label>Urine Microscopy</label>
                                                <input type="text"  placeholder="Urine Microscopy" onChange={(e)=>{setmedrec({...medrec, urine_microscopy : e.target.value});}}/>
                                            </div>
                                            <div>
                                                <label>Urinalysis</label>
                                                <input type="text"  placeholder="Urinalysis" onChange={(e)=>{setmedrec({...medrec, urinalysis : e.target.value});}}/>
                                            </div>
                                            <div>
                                                <label>Stool Microscopy</label>
                                                <input type="text"  placeholder="Stool Microscopy" onChange={(e)=>{setmedrec({...medrec, stool_microscopy : e.target.value});}}/>
                                            </div>
                                            <div>
                                                <label>Skin snip</label>
                                                <input type="text"  placeholder="Skin snip" onChange={(e)=>{setmedrec({...medrec, kin_snip : e.target.value});}}/>
                                            </div>
                                            <div>
                                                <label>Pregnancy</label>
                                                <select onChange={(e)=>{setmedrec({...medrec, pregnancy : e.target.value});}}>
                                                    <option value=''>Status</option>
                                                    <option value='Positive'>Positive</option>
                                                    <option value='Negative'>Negative</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div>
                                                <label>Recommendation</label>
                                                <textarea rows={10} style={{width:'100%', margin:'10px 0', borderRadius:'5px', border:'1px solid grey'}} onChange={(e)=>{setmedrec({...medrec, recomendation : e.target.value, officer:'Mr Bamidele'});}}></textarea>
                                            </div>
                                        <input type="submit" value="Save " onClick={pushtrans} />
                                        {success === 1 ? <span style={{color:'green'}}>Successfully created</span>: success === 2 ? <span style={{color:'red'}}>Fill all the fillables</span>: ''}
                                    </div>
                                </div> :
                                <div className="input">
                                    <h2>Update medical record</h2>
                                    <div className='inp'>
                                        <label>Matriculation Number</label>
                                        <input type="text"  placeholder="Matriculation Number" value={matno} disabled/>
                                        <div style={{display:'grid', gridTemplateColumns:'repeat(2, auto)', justifyContent:'start', gap:'10px'}}>
                                            <div>
                                                <label>Weight</label>
                                                <input type="text"  placeholder="Weight" value={medrec.weight} onChange={(e)=>{setmedrec({...medrec, mat_no: matno, weight : e.target.value});}}/>
                                            </div>
                                            <div>
                                                <label>Height</label>
                                                <input type="text"  placeholder="Height" value={medrec.height} onChange={(e)=>{setmedrec({...medrec, height : e.target.value});}}/>
                                            </div>
                                            <div>
                                                <label>Eye(Vision)</label>
                                                <input type="text"  placeholder="Eye(Vision)" value={medrec.eye_vision} onChange={(e)=>{setmedrec({...medrec, eye_vision : e.target.value});}}/>
                                            </div>
                                            <div>
                                                <label>Blood Pressure</label>
                                                <input type="text"  placeholder="Blood pressure" value={medrec.blood_press} onChange={(e)=>{setmedrec({...medrec, blood_press : e.target.value});}}/>
                                            </div>
                                            <div>
                                                <label>RBC</label>
                                                <input type="text"  placeholder="RBC" value={medrec.hb} onChange={(e)=>{setmedrec({...medrec, hb : e.target.value});}}/>
                                            </div>
                                            <div>
                                                <label>Genotype</label>
                                                <input type="text"  placeholder="Genotype" value={medrec.genotype} onChange={(e)=>{setmedrec({...medrec, genotype : e.target.value});}}/>
                                            </div>
                                            <div>
                                                <label>HIV Status</label>
                                                <select  onChange={(e)=>{setmedrec({...medrec, hiv : e.target.value});}}>
                                                    <option value={medrec.hiv}>{medrec.hiv}</option>
                                                    <option value='Positive'>Positive</option>
                                                    <option value='Negative'>Negative</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label>WBC</label>
                                                <input type="text"  placeholder="WBC" value={medrec.wbc} onChange={(e)=>{setmedrec({...medrec, wbc : e.target.value});}}/>
                                            </div>
                                            <div>
                                                <label>Urine Microscopy</label>
                                                <input type="text"  placeholder="Urine Microscopy" value={medrec.urine_microscopy} onChange={(e)=>{setmedrec({...medrec, urine_microscopy : e.target.value});}}/>
                                            </div>
                                            <div>
                                                <label>Urinalysis</label>
                                                <input type="text"  placeholder="Urinalysis" value={medrec.urinalysis} onChange={(e)=>{setmedrec({...medrec, urinalysis : e.target.value});}}/>
                                            </div>
                                            <div>
                                                <label>Stool Microscopy</label>
                                                <input type="text"  placeholder="Stool Microscopy" value={medrec.stool_microscopy} onChange={(e)=>{setmedrec({...medrec, stool_microscopy : e.target.value});}}/>
                                            </div>
                                            <div>
                                                <label>Skin snip</label>
                                                <input type="text"  placeholder="Skin snip" value={medrec.kin_snip} onChange={(e)=>{setmedrec({...medrec, kin_snip : e.target.value});}}/>
                                            </div>
                                            <div>
                                                <label>Pregnancy</label>
                                                <select  onChange={(e)=>{setmedrec({...medrec, pregnancy : e.target.value});}}>
                                                    <option value={medrec.pregnancy}>{medrec.pregnancy}</option>
                                                    <option value='Positive'>Positive</option>
                                                    <option value='Negative'>Negative</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div>
                                                <label>Recommendation</label>
                                                <textarea rows={10} style={{width:'100%', margin:'10px 0', borderRadius:'5px', border:'1px solid grey', padding:'10px', boxSizing:'border-box'}} value={medrec.recomendation} onChange={(e)=>{setmedrec({...medrec, recomendation : e.target.value, officer:'Mr Bamidele'});}}></textarea>
                                            </div>
                                        <input type="submit" value="Save " onClick={uptrans} />
                                        {success === 1 ? <span style={{color:'green'}}>Successfully updated</span>: success === 2 ? <span style={{color:'red'}}>Fill all the fillables</span>: ''}
                                    </div>
                                </div>
                            }
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
