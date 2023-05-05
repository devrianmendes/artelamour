import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { GlobalStorage } from '../Contexts/GlobalContext';

import Signin from '../Components/Pages/Signin/Signin';
import Signup from '../Components/Pages/Signup/Signup';

import PrivateRoute from './PrivateRoute';

import { ToastContainer } from 'react-toastify';

const Rotas = () => {
  return (
    <BrowserRouter>
      <GlobalStorage>
        <ToastContainer autoClose={2000} />
        <Routes>
            <Route path="/" element={<Signin />} />
            <Route path="/create" element={<Signup />} />
            <Route path="/dashboard" element={<PrivateRoute />} />
        </Routes>
      </GlobalStorage>
    </BrowserRouter>
  );
};

export default Rotas;
