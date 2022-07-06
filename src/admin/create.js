import simage from '../stud2.jpg'
import {Link, useNavigate} from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import {useReactToPrint} from 'react-to-print'
import React from 'react';
import Profile from '../reusable/profile'
import Information from '../reusable/information'
import Formbox from '../reusable/formbox'
import axios from 'axios';
import Buttons from '../reusable/buttons'
import Board from '../reusable/board'
import Options from '../reusable/options'
import Table from '../reusable/table'
import QRCode from 'react-qr-code';
// import { QrReader } from 'react-qr-reader';

function Create() {
    const [logged, setLogged] = useState(0)
    const [data, setData] = useState([])
    const [studdata, setStuddata] = useState([])
    const [firstname, setFirstname] = useState([])
    const [middlename, setMiddlename] = useState([])
    const [lastname, setLastname] = useState([])
    const [school, setSchool] = useState([])
    const [department, setDepartment] = useState([])
    const [level, setLevel] = useState([])
    const [course, setCourse] = useState([])
    const [image, setImage] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [card, setCard] = useState()
    const [text, setText] = useState('');
    const componentRef = useRef();

    const nav = useNavigate()

    const print=useReactToPrint({
        content: () => componentRef.current
    })

    const populate = () => {
       const data = {
            'fname' : firstname,
            'mname' : middlename,
            'lname' : lastname,
            'school' : school,
            'dept' : department,
            'level' : level,
            'course' : course,
        }
        
        setData(data);
        setStuddata(data)
        localStorage.setItem('data' , JSON.stringify(data))
        if(setStuddata){
            
        }
        else{
            console.log('error');
        }

        nav('/profile')
    }
  return (
    <div className='App'>
        <div className="container">
            <Board user="Admin"/>
            <div className='rectangle dash'>
                <div className='r-inner'>
                {logged === 0 ? <h2>Create Student Profile</h2> : <h2>Profile of Musa Taliban</h2>}
                    <div className='profile'>
                        {logged === 0 ? 
                        <div className='noth'>Nothing to display</div> 
                        : 
                        <div className='prof'>
                            <Profile data={studdata} />
                            <div className='generate'>
                                <h2>Print ID below card</h2>
                            </div>
                            <div className='idcard' ref={componentRef}>
                                <QRCode
                                    size={256}
                                    style={{ height: "auto", maxWidth: "40%", width: "40%" }}
                                    value={middlename}
                                    viewBox={`0 0 256 256`}
                                />
                            </div>
                            <button onClick={()=>{print()}}>print</button>
                        </div>}
                        <div className='bord'></div>
                        {logged === 0 ? <div className='modular'>
                            <div className="box">
                                <div className="input">
                                    <h2>Create a Student</h2>
                                    <div className='inp'>
                                    <form>
                                        <input type="text"  placeholder="First name" onChange={(e)=>{setFirstname(e.target.value); console.log(firstname);}}/>
                                        <input type="text"  placeholder="Middle name" onChange={(e)=>{setMiddlename(e.target.value)}} />
                                        <input type="text"  placeholder="Last name" onChange={(e)=>{setLastname(e.target.value)}}/>
                                        <select onChange={(e)=>{setSchool(e.target.value)}}>
                                            <option value="">School</option>
                                            <option value="SICT">SICT</option>
                                        </select>
                                        <select onChange={(e)=>{setDepartment(e.target.value);}}>
                                            <option value="">Department</option>
                                            <option value="Computer Science">Computer Science</option>
                                            <option value="Office Technology Management">OTM</option>
                                        </select>
                                        <select onChange={(e)=>{setLevel(e.target.value);}}>
                                            <option value="">Level</option>
                                            <option value="ND1">ND1</option>
                                            <option value="HND1">HND1</option>
                                        </select>
                                        <input type="text"  placeholder="Course" onChange={(e)=>{setCourse(e.target.value)}}/>
                                        <input type="file"  placeholder="Course" onChange={(e)=>{setImage(e.target.files[0]);}}/>
                                        <input type="submit" value="Save " onClick={()=>{populate()}} />
                                    </form>
                                    </div>
                                </div>
                            </div>
                        </div>: 
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
