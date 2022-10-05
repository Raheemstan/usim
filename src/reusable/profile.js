import React, {useEffect, useState} from "react"
import pass from '../11a.jpg'
import image from '../s_image.jpg'

function Profile({data, user}){
//console.log(props);

    const [use, setuse] = useState()
    const {firstname, surname, mat_no, department, passport, level, school, course} = data
    useEffect(()=>{
        listtrans()
    },[mat_no])
    const listtrans = async () => {
        var axios = require('axios');
        var qs = require('qs');
        console.log(mat_no)
        var data = qs.stringify({
            'mat_no':mat_no,
            'authlev':'1'
        });
        // start of config1
        var config1 = {
        method: 'post',
        url: 'http://127.0.0.1:8000/api/view-transaction',
        headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data : data
        };

        axios(config1)
        .then(function (response) {
        console.log(response.data)
            // setPaid(response.data)
            const location = response.data.find((each)=> parseInt(each.unit)===1)
            console.log(location)
            location !== undefined && mat_no ? setuse(1) : !location && mat_no ? setuse(0) : setuse('Checking Status...')
        })
        .catch(function (error) {
        console.log(error);
        });
    }
    return(
        <div>
        <div className="bio">
            <div className="passport">
                <img src={'http://127.0.0.1:8000/storage/'+ passport} alt="passport" />
            </div>
            <div className="biodata">
                <p><b>Name</b>          : {firstname+" "+surname}</p>
                <p><b>Matric No.</b>    : {mat_no}</p>
                <p><b>Department </b>   : {department}</p>
                <p><b>Level </b>        : {level}</p>
                <p><b>School</b>        : {school}</p>
                <p><b>Course</b>        : {course}</p>
            </div>
        </div>
        <div style={{marginBottom:'20px'}}>
            {user === 1 ? '' : 
                use === 0 ? <div style= {{backgroundColor:'#ffd6cf', color:'#9a4b4b', borderRadius:'4px', padding:'20px', marginTop:'20px', fontSize:'1em' }}>Not approved to use the {user===2?'Library':user===3?'Medical':''} services</div> : use === 1 ? <div style= {{backgroundColor:'#cfffcf', color:'#4b9a5f', border:'1px solid #cfffcf', borderRadius:'4px', padding:'20px', marginTop:'20px', fontSize:'1em'}}>Approved to use the {user===2?'Library':user===3?'Medical':''} services</div>:'Checking Status...'
            }
            </div>
        </div>
        
    )
}
export default Profile