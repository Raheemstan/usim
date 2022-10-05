import './App.css';
import React from 'react';
import {BrowserRouter, Routes, Route, useParams} from 'react-router-dom';
import Signin from './auth/signin'
import Signup from './auth/signup'
import Scan from './reusable/scan'
import Dashboard from './reusable/dashboard'
import Create from './admin/create'
import Payment from './admin/payment'
import Clearance from './admin/clearance'
import Edit from './admin/edit'
import Newsession from './admin/newsession'
import Prof from './admin/profile'

import PayLib from './library/payment'
import Borrow from './library/borrow'
import Medrec from './medical/medrec'
import Medpay from './medical/medpay'
import UsedContext from './auth/usercontext';
import Error from './reusable/404';

function App() {
  return (
    <UsedContext>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/scan" element={<Scan />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<Create />} />
        <Route path="edit" >
          <Route path=":usertoken" element={<Edit />} />
        </Route>
        <Route path="/payment/:usertoken" element={<Payment />} />
        <Route path="/clearance/:usertoken" element={<Clearance />} />
        <Route path="/newsession" element={<Newsession />} />
        <Route path="/404" element={<Error />} />
        <Route path="/prof/:usertoken" element={<Prof />} />

        {/* Library routes */}
        <Route path="/libpay/:usertoken" element={<PayLib />} />
        <Route path="/borrow/:usertoken" element={<Borrow />} />

        {/* Medical routes */}
        <Route path="/medical/:usertoken" element={<Medrec />} />
        <Route path="/medpay/:usertoken" element={<Medpay />} />
      </Routes>
  </BrowserRouter>
  </UsedContext>
  );
}

export default App;
