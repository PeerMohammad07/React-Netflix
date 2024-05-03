import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Profile from './Pages/Profile'
import Navbar from './Components/Navbar'
import { AuthContextProvider } from './Context/AuthContext'
import ProtectedRoute from './Components/ProtectedRoute'

function App() {
  return (
    <>
     <AuthContextProvider>
      <Navbar/>
      <Routes>
        <Route path="/" element={ <Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/Signup" element={<Signup/>} />
        <Route path="/Profile" element={<ProtectedRoute>
          <Profile/>
          </ProtectedRoute>} />
      </Routes>
     </AuthContextProvider>
    </>
  )
}

export default App
