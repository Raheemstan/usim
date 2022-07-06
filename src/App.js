import './App.css';
import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Signin from './auth/signin'
import Signup from './auth/signup'
import Scan from './reusable/scan'
import Dashboard from './reusable/dashboard'
import Create from './admin/create'
import Payment from './admin/payment'
import Clearance from './admin/clearance'
import Edit from './admin/edit'
import Newsession from './admin/newsession'
import Profile from './admin/profile'

import PayLib from './library/payment'
import Borrow from './library/borrow'
import Medrec from './medical/medrec'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/scan" element={<Scan />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/clearance" element={<Clearance />} />
        <Route path="/newsession" element={<Newsession />} />
        <Route path="/profile" element={<Profile />} />

        {/* Library routes */}
        <Route path="/libpay" element={<PayLib />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/borrow" element={<Borrow />} />

        {/* Medical routes */}
        <Route path="/medical" element={<Medrec />} />
      </Routes>
  </BrowserRouter>
  );
}

export default App;
