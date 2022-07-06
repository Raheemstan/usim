import simage from '../stud3.webp'
import React from 'react';
import {Link} from 'react-router-dom';
function Signin() {
  return (
    <div className='App'>
        <div className="main-container">
            <div className="img">
                <img src={simage} alt="" />
            </div>
            <div className="form">
                <div>
                    <h1>Sign In</h1>
                    <h2>Sign in to your account</h2>
                    <form>
                        <div>
                            <input type="text" placeholder="Email"></input>
                            <input type="text" placeholder="Password"></input>
                            <button className='signin'>Login</button>
                            <p>OR</p>

                            <Link to='/signup' className='signup' >Sign up</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Signin;
