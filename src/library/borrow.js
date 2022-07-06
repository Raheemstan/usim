import simage from '../stud2.jpg'
import {Link} from 'react-router-dom';
import { useState, useEffect } from 'react';
import React from 'react';
import Profile from '../reusable/profile'
import Information from '../reusable/information'
import Board from '../reusable/board'
import Table from '../reusable/btable'
// import { QrReader } from 'react-qr-reader';

function Borrow() {
    const [studdata, setStuddata] = useState([])
    const [borrowed, setborrowed] = useState([])
    const [matno, setMatno] = useState('')
    const [date, setDate] = useState('10/15/22')
    const [date2, setDate2] = useState('16/15/22')
    const [isbn, setIsbn] = useState('')
    const [logged, setLogged] = useState(0)
    useEffect(()=>{
        get()
    }, [matno])
    const get = () => {
        const details = JSON.parse(localStorage.getItem('data'));
        setStuddata(details);
        const {mname} = studdata
        setMatno(mname)
        console.log(mname);
    }
   

    const pay = () => {
        const payload = {
            'matno' : matno,
            'isbn' : isbn,
            'date1' : date,
            'date2' : date2
        } 

        setborrowed(borrowed => [...borrowed, payload]);
        
    }

  return (
    <div className='App'>
        <div className="container">
            <Board user="Library"/>
            <div className='rectangle dash'>
                <div className='r-inner'>
                <h2>Borrowing History</h2>
                    <div className='profile'>
                        <div className='prof'>
                            <Profile data={studdata} />
                            <Information info="Borrowing">
                                <Table info={borrowed}  />
                            </Information>
                        </div>
                        <div className='bord'></div>
                            {logged === 0 ? <div className='modular'>
                        <div className="box">
                            <div className="input">
                                <h2>Borrow a book</h2>
                                <div className='inp'>
                                    <input type="text"  placeholder="Matriculation Number" defaultValue={matno} disabled onChange={(e)=>{setMatno(e.target.value || {matno}); }}/>
                                    <input type="text"  placeholder="ISBN no." onChange={(e)=>{setIsbn(e.target.value);}}/>
                                    <input type="submit" value="Save " onClick={()=>pay()} />
                                </div>
                            </div>
                        </div>
                    </div>: 
                            <div className='modular'>
                            <div className="box">
                                <div className="input">
                                    <h2>Borrow a book</h2>
                                    <div className='inp'>
                                         <input type="text"  placeholder="Matriculation Number" defaultValue={matno} disabled onChange={(e)=>{setMatno(e.target.value || {matno}); }}/>
                                        <input type="text"  placeholder="ISBN no." onChange={(e)=>{setIsbn(e.target.value);}}/>
                                        <input type="submit" value="Save " onClick={()=>pay()} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        }
                    </div>
                </div>
            </div>

        </div>
    </div>
  );
}

export default Borrow;
