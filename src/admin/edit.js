import simage from '../stud2.jpg'
import {Link} from 'react-router-dom';
import { useState, useEffect } from 'react';
import React from 'react';
import Profile from '../reusable/profile'
import Information from '../reusable/information'
import Formbox from '../reusable/formbox'
import Buttons from '../reusable/buttons'
import Board from '../reusable/board'
import Options from '../reusable/options'
import Table from '../reusable/table'
// import { QrReader } from 'react-qr-reader';

function Edit() {
    const [data, setData] = useState([])
    const [logged, setLogged] = useState(1)
    const [studdata, setStuddata] = useState([])
    const [card, setCard] = useState(1)
    const [idcard, setIdcard] = useState()
    const [firstname, setFirstname] = useState('')
    const [middlename, setMiddlename] = useState('')
    const [lastname, setLastname] = useState('')
    const [school, setSchool] = useState('')
    const [department, setDepartment] = useState('')
    const [level, setLevel] = useState('')
    const [course, setCourse] = useState('')
    const [image, setImage] = useState("")
    
    useEffect(()=>{
        const details = JSON.parse(localStorage.getItem('data'));
        setStuddata(details);
    }, [])
    const {fname, mname, lname, school:sch, dept, level:lev, course:cour} = studdata
    const edited = () => {
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
 
         console.log(studdata);    
     }
    
  return (
    <div className='App'>
        <div className="container">
            <Board user="Admin"/>
            <div className='rectangle dash'>
                <div className='r-inner'>
                {logged === 0 ? <h2>Edit Student Profile</h2> : <h2>Profile of {fname}</h2>}
                    <div className='profile'>
                        {logged === 0 ? 
                        <div className='noth'>Nothing to display</div> 
                        : 
                        <div className='prof'>
                            <Profile data={studdata}/>
                            <div className='idcard'>
                                <img src={idcard} alt=''></img>
                            </div>
                        </div>}
                        <div className='bord'></div>
                        {logged === 0 ? "": logged ===1 ?
                        <div className='modular'>
                            <div className="box">
                                <div className="input">
                                    <h2>Edit Student Details</h2>
                                    <div className='inp'>
                                        <input type="text"  placeholder="First name" defaultValue={fname} onChange={(e)=>setFirstname(e.target.value || fname)}/>
                                        <input type="text"  placeholder="Middle name" defaultValue={mname} onChange={(e)=>setMiddlename(e.target.value || mname)}/>
                                        <input type="text"  placeholder="Last name" defaultValue={lname} onChange={(e)=>setLastname(e.target.value || lname)}/>
                                        <input type="submit" value="Save " onClick={()=>{edited()}} />
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
