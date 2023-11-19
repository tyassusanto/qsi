import React from 'react'
import Login from './Components/Login'
import Main from './Components/Main'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ReqAuth from './Common/ReqAuth'
import Auth from './Common/Auth'
import AddEmployee from './Components/AddEmployee'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={
            <ReqAuth><Login /></ReqAuth>
          } />
          <Route path='/' element={
            <Auth><Main /></Auth>
          } />
          <Route path='/AddEmployee' element={
            <Auth><AddEmployee /></Auth>
          } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
