import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './App.css'
import { BrowserRouter } from 'react-router-dom'

import React from 'react'

import Logo from '../components/templates/Logo'
import Nav from '../components/templates/Nav'
import Routes from './Routes'
import Footer from '../components/templates/Footer'

export default props =>
    <BrowserRouter>
        <div className="app">
            <Logo></Logo>
            <Nav></Nav>
            <Routes></Routes>
            <Footer></Footer>
        </div>
    </BrowserRouter>
    