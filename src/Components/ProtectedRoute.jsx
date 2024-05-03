import React from 'react'
import { userAuth } from '../Context/AuthContext'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
  const {user} = userAuth()
  if(!user){
    return <Navigate to="/" />
  }
  return children
}

export default ProtectedRoute
