import {Link, useNavigate} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import {UserContext} from '../auth/usercontext';
import Buttons from '../reusable/buttons'
import Board from '../reusable/board'
import loader from '../load.gif'

function Create() {
    const value = useContext(UserContext)
    const {details:{name, authToken, authlev}}= value
    const nav = useNavigate()
    useEffect(() => {
        if (authToken === '' || parseInt(authlev) !== 1) {
            nav('/404');
        }
    }, [authToken])
    const [firstname, setFirstname] = useState([])
    const [matno, setMatno] = useState([])
    const [lastname, setLastname] = useState([])
    const [school, setSchool] = useState([])
    const [department, setDepartment] = useState([])
    const [level, setLevel] = useState([])
    const [course, setCourse] = useState([])
    const [image, setImage] = useState("")
    const [load, setLoad] = useState(0);
    const [success, setSuccess] = useState(0);
    const [hash, setHash] = useState(0)
    const populate = (e) => {
        e.preventDefault()
        setLoad(1)
        pushtrans()
        // nav('/profile', {usertoken:})
        // console.log('profile/'+hash)
    }
    const pushtrans = async () => {
        var axios = require('axios');
        var FormData = require('form-data');
        var data = new FormData();
        data.append('passport', image);
        data.append('firstname', firstname);
        data.append('mat_no', matno);
        data.append('surname', lastname);
        data.append('school', school);
        data.append('department', department);
        data.append('level', level);
        data.append('course', course);

        var config = {
        method: 'post',
        url: 'http://127.0.0.1:8000/api/add-student',
        headers: { 
            'Accept': 'application/json', 
        },
        data : data
        };

        axios(config)
        .then(function (response) {
        console.log(response.data.qr_hash);
        setHash(response.data.mat_no)
        setLoad(0)
        setSuccess(1)
        const replaced = response.data.qr_hash.replaceAll('/', '-');
        console.log(replaced)
        window.setTimeout(function() {
            nav('../prof/'+replaced)
        }, 5000)
        
        })
        .catch(function (error) {
        console.log(error);
        setLoad(0)
        setSuccess(2)
        });

    }
    
  return (
     
    <div className='App'>
        <div className="container">
            <Board user="Admin"/>
            <div className='rectangle dash'>
                <div className='r-inner'>
                <h2>Create Student Profile</h2>
                    <div className='profile'>
                    <div></div>
                        <div className='bord'></div>
                        <div className='modular'>
                            <div className="box">
                                <div className="input">
                                    <h2>Create a Student</h2>
                                    <div className='inp'>
                                    <form onSubmit={populate} encType='multipart/form-data'>
                                        <div><label>Matriculation Number</label>
                                        <input type="text"  placeholder="Matno" onChange={(e)=>{setMatno(e.target.value)}} /></div>
                                        <div style={{display:'grid', gridTemplateColumns:'repeat(2, auto)', justifyContent:'start', gap:'10px'}}>
                                        <div><label>First Name</label><input type="text"  placeholder="First name" onChange={(e)=>{setFirstname(e.target.value); console.log(firstname);}}/></div>
                                        <div><label>Last Name</label><input type="text"  placeholder="Last name" onChange={(e)=>{setLastname(e.target.value)}}/></div>
                                        <div><label>School</label>
                                        <select onChange={(e)=>{setSchool(e.target.value)}}>
                                            <option value="">School</option>
                                            <option value="SICT">SICT</option>
                                        </select></div>
                                        <div><label>Department</label>
                                        <select onChange={(e)=>{setDepartment(e.target.value);}}>
                                            <option value="">Department</option>
                                            <option value="Computer Science">Computer Science</option>
                                            <option value="OTM">OTM</option>
                                        </select></div>
                                        <div><label>Levels</label>
                                        <select onChange={(e)=>{setLevel(e.target.value);}}>
                                            <option value="">Level</option>
                                            <option value="ND1">ND1</option>
                                            <option value="HND1">HND1</option>
                                        </select></div>
                                        <div><label>Course</label>
                                        <select onChange={(e)=>{setCourse(e.target.value);}}>
                                            <option value="">Course</option>
                                            <option value="Computer Science">Computer Science</option>
                                            <option value="Neuroscience">Neuroscience</option>
                                        </select></div>
                                        <div><label>Profle image</label>
                                        <input type="file"  placeholder="Course" onChange={(e)=>{setImage(e.target.files[0]);}}/></div>
                                        {/*console.log(image)*/}
                                        </div>
                                        <input type="submit" value="Save " onClick={populate}/>
                                        {load === 1 ?<img src={loader} alt="" className='loader'></img>:''}
                                    </form>
                                    {success === 1 ? <span style={{color:'green'}}>Successful Please wait...</span>: success === 2 ? <span style={{color:'red'}}>Fill all the fillables</span>: ''}
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

export default Create;
