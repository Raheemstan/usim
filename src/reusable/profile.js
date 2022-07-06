import React from "react"
import pass from '../11a.jpg'
import image from '../s_image.jpg'
function Profile(props){
// console.log(props.data);
const {data:{fname, mname, lname, school, dept, level, course}} = props
    return(
        <div className="bio">
            <div className="passport">
                <img src={pass} alt="passport" />
            </div>
            <div className="biodata">
                <p>Name       : {fname+" "+lname}</p>
                <p>Matric No. : {mname}</p>
                <p>Dept       : {dept}</p>
                <p>Level      :{level}</p>
                <p>School     : {school}</p>
                <p>Course     : {course}</p>
            </div>
        </div>
    )
}
export default Profile