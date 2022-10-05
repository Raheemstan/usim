import React from "react"
import { useState, useContext, useEffect } from "react"
import { UserContext } from "../auth/usercontext"
import {Link, useNavigate} from 'react-router-dom'
function Board({user}){
    const value = useContext(UserContext)
    const {details:{name, authlev}, setDetails}= value
    const nav = useNavigate()
    
    const destroy = () => {
        localStorage.removeItem('logs')
        setDetails({
            name:'',
            authlev:'',
            idnumber: ''
        })
        nav('/')
    }
    useEffect(() => {
        // localStorage.setItem('logs', JSON.stringify(details))
        const truth = localStorage.getItem('logs');
        console.log(truth)
        if(truth){
            const kept = JSON.parse(localStorage.getItem('logs'))
            const {credentials:{name, idnumber, level}} = kept
            const{ token } = kept
            // console.log(name)
            // console.log(token)
            console.log(level)
            setDetails({
                name:name,
                authlev:parseInt(level),
                idnumber: idnumber
            })
            if(level === undefined){
             
            console.log(level);
        }
        }
        else{
            console.log("empty")
            nav('/')
        }
        
    }, [])
    return(
        <div className='board'>
            <div className="button">
                <Link to='/dashboard'>
                    <div className="backbutton">
                        <p>HOME</p>
                    </div>
                </Link>
                <div className="backbutton" onClick={()=>nav(-1)}>
                    <p >BACK</p>
                </div>
                <div className="backbutton" onClick={destroy}>
                    <p >LOGOUT</p>
                </div>
                <h2 style={{textTransform:'uppercase'}}> {parseInt(authlev) === 1 ? "Admin" : parseInt(authlev) === 2 ? "Library" : parseInt(authlev) === 3 ? "Medical" : ''} Dashboard</h2>
            </div>
        </div>
    )
}
export default Board