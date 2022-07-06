import React from "react"
import {Link, useNavigate} from 'react-router-dom'
function Board({user}){
    const navigate = useNavigate()
    // console.log(user);
    return(
        <div className='board'>
            <div className="button">
                <Link to='/dashboard'>
                    <div className="backbutton">
                        <p> HOME </p>
                    </div>
                </Link>
                <div className="backbutton" onClick={()=>navigate(-1)}>
                    <p > BACK</p>
                </div>
                <h2> {user} Dashboard</h2>
            </div>
        </div>
    )
}
export default Board