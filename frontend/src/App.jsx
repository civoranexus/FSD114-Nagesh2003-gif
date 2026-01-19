import React from 'react'
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Header from './components/header/Header'
import Home from './pages/home/Home'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Verify from './pages/auth/Verify'
import SiteFooter from './components/footer/footer'
import About from './pages/about/About'
import Account from './pages/account/Account'
import { useAuth } from "./context/AuthContext";
import LoadingScreen from './components/loading/Loader'
import Courses from './pages/courses/Courses'
import CourseInfo from './pages/CourseInfo/CourseInfo'

const App = () => {
  const { authenticated, currentUser,initialLoading } =useAuth()
  return (
    <>
    {
      initialLoading ? (<LoadingScreen />) :
      (<BrowserRouter>
     <div className="app-layout"></div>
    <Header authenticated={authenticated} />
    <div className="page-content"></div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/courses' element={<Courses />} />
        <Route path='/register' element={authenticated?<Home />:<Register />} />
        <Route path='/login' element={authenticated?<Home />:<Login />} />
        <Route path='/verify' element={authenticated?<Home />:<Verify />} />
        <Route path='/about' element={<About />} />
         <Route
              path="/course/:id"
              element={authenticated ? <CourseInfo /> : <Login />}
            />
        <Route path='/account' element={authenticated?<Account currentUser={currentUser} />:<Login />} />
      </Routes>
      <SiteFooter />
    </BrowserRouter>)
  }
    </>
  )
}

export default App