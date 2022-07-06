import React from "react"
import {Link} from "react-router-dom"
import Options from './options';
// import image from '../s_image.jpg'
function Buttons(){

    return(
        <div className='ops'>
                                <Link to='/payment'><Options  text="Acknowledge a Payment" icon="bank-card"/></Link>
                                <Link to='/edit'><Options  text="Edit Student Record" icon="archive"/></Link>
                                <Link to='/dashboard'><Options  text="Archive Student" icon="archive"/></Link>
                                <Link to='/clearance'><Options  text="Clearance" icon="bookmark"/></Link>
                                <Link to='/libpay'><Options  text="Acknowledge a payment{Library}" icon="bookmark"/></Link>
                                <Link to='/borrow'><Options  text="Book borrowing" icon="bookmark"/></Link>
                            </div>
    )
}
export default Buttons