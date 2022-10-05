import React, {useState, useEffect} from "react"
import {useNavigate} from 'react-router-dom'
import loader from '../load.gif'
// import image from '../s_image.jpg'
function Editform(props){
    // console.log(props.data);
    const nav = useNavigate()

    useEffect(() => {
        if(props){
            const {data:{qr_hash, firstname, surname, mat_no, school, department, level, course}} = props
            setQrhash(qr_hash)
            setFirstname(firstname)
            setSurname(surname)
            setMatno(mat_no)
            setSchool(school)
            setDepartment(department)
            setLevel(level)
            setCourse(course)
        }
        
    }, [props])
    const [qrhash, setQrhash] = useState('')
    const [firstname, setFirstname] = useState('')
    const [surname, setSurname] = useState('')
    const [matno, setMatno] = useState('')
    const [school, setSchool] = useState('')
    const [department, setDepartment] = useState('')
    const [level, setLevel] = useState('')
    const [course, setCourse] = useState('')
    const [load, setLoad] = useState(0);
    const [success, setSuccess] = useState(0);

    // console.log(props)
    
    const edited = () => {
        pushtrans()
        // nav('/profile')
     }
     const pushtrans = async () => {
        var axios = require('axios');
        var FormData = require('form-data');
        var data = new FormData();
        data.append('qr_hash', qrhash);
        data.append('firstname', firstname);
        data.append('mat_no', matno);
        data.append('surname', surname);
        data.append('school', school);
        data.append('department', department);
        data.append('level', level);
        data.append('course', course);

        var config = {
        method: 'post',
        url: 'http://127.0.0.1:8000/api/update',
        headers: { 
            'Accept': 'application/json', 
        },
        data : data
        };

        axios(config)
        .then(function (response) {
        console.log(response.data);
        const replaced = qrhash.replaceAll('/', '-');
        console.log(replaced)
        setLoad(0)
        setSuccess(1)
        window.setTimeout(function() {
            nav('../../prof/'+replaced)
        }, 5000)
        })
        .catch(function (error) {
        console.log(error);
        });

    }
    return(
        <div>
                <input type="text"  placeholder="Matriculation No." value={matno} onChange={(e)=>setMatno(e.target.value)}/>
                <input type="text"  placeholder="First name" value={firstname} onChange={(e)=>setFirstname(e.target.value)}/>
                <input type="text"  placeholder="Surname" value={surname} onChange={(e)=>setSurname(e.target.value)}/>
                <select onChange={(e)=>{setSchool(e.target.value)}}>
                    <option value={school}>{school}</option>
                    <option value="SICT">SICT</option>
                </select>
                <select onChange={(e)=>{setDepartment(e.target.value);}}>
                    <option value={department}>{department}</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="OTM">OTM</option>
                </select>
                <select onChange={(e)=>{setLevel(e.target.value);}}>
                    <option value={level}>{level}</option>
                    <option value="ND1">ND1</option>
                    <option value="HND1">HND1</option>
                </select>
                <select onChange={(e)=>{setCourse(e.target.value);}}>
                    <option value={course}>{course}</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Neuroscience">Neuroscience</option>
                </select>
                <input type="submit" value="Save " onClick={edited} /> 
                {load === 1 ?<img src={loader} alt="" className='loader'></img>:''}
                <div>{success === 1 ? <span style={{color:'green'}}>Successful Please wait...</span>: success === 2 ? <span style={{color:'red'}}>Fill all the fillables</span>: ''}</div>
        </div>
        
    )
}
export default Editform