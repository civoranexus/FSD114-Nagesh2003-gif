import React from 'react'
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Header from './components/header/Header'
import Home from './pages/home/Home'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Verify from './pages/auth/Verify'


const App = () => {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/courses' element={<div>Courses Page</div>} />
        <Route path='/about' element={<div>About Page</div>} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/verify' element={<Verify />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App