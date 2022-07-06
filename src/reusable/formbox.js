import React from "react"
// import image from '../s_image.jpg'
import Input from './input';
import Submit from './submit';
function Formbox(){

    return(
        <div className="box">
            <h2>Create a Student</h2>
            <div className="inp">
                <Input />
                <Input />
                <Input />
                <Input />
                <Input />
                <Submit />
            </div>
            
        </div>
    )
}
export default Formbox