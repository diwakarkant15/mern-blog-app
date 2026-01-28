import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import About from '../src/pages/About'
import Dashboard from '../src/pages/Dashboard'
import Home from '../src/pages/Home'
import SignIn from '../src/pages/SignIn'
import SignUp from '../src/pages/SignUp'
import Projects from '../src/pages/Projects'
import Headers from './components/Headers'
import { Button } from 'flowbite-react'
import {FooterComp} from './components/Footer'

const App = () => {
  return (
    <BrowserRouter>
      <Headers />
      <Routes>
         <Route path='/' element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
      <FooterComp/>
    </BrowserRouter>
  )
}

export default App