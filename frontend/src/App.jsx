import React from 'react'
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Header from './components/header/Header'
import Home from './pages/home/Home'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Verify from './pages/auth/Verify'
import SiteFooter from './components/footer/footer'


const App = () => {
  return (
    <BrowserRouter>
     <div className="app-layout"></div>
    <Header/>
    <div className="page-content"></div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/courses' element={<div>Courses Page</div>} />
        <Route path='/about' element={<div>About Page</div>} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/verify' element={<Verify />} />
      </Routes>
      <SiteFooter />
    </BrowserRouter>
    
  )
}

export default App