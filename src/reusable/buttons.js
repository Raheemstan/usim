import React from "react"
import {Link} from "react-router-dom"
import Options from './options';
// import image from '../s_image.jpg'
function Buttons({toke, lev}){
    const token = toke.replaceAll('/', '-')
    return(
        <div >
                                {lev === 1 ? 
                                    <div className='ops'>
                                        <Link to={'../../payment/'+token}><Options  text="Payments" icon="bank-card"/></Link>
                                        <Link to={'../../edit/'+token}><Options  text="Edit Student Data" icon="archive"/></Link>
                                    </div> : lev === 2 ? 
                                    <div className='ops'>
                                        <Link to={'../../libpay/'+token}><Options  text="Payments" icon="bookmark"/></Link>
                                        <Link to={'../../borrow/'+token}><Options  text="Book borrowing" icon="bookmark"/></Link>
                                    </div> : lev === 3 ? 
                                    <div className='ops'>
                                        <Link to={'../../medpay/'+token}><Options  text="Payments" icon="bookmark"/></Link>
                                        <Link to={'../../medical/'+token}><Options  text="Medical record" icon="bookmark"/></Link>
                                    </div> : ''}
                                    {//<Link to='/dashboard'><Options  text="Archive Student" icon="archive"/></Link>
                                //<Link to={'../../clearance/'+token}><Options  text="Clearance" icon="bookmark"/></Link>
                                }
                            </div>
                                
                                
    )
}
export default Buttons