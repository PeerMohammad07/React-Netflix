import { createContext, useContext, useEffect, useState } from "react";
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged,signOut} from 'firebase/auth'
import { auth,db } from "../Services/firebase";
import {doc,setDoc} from 'firebase/firestore'

const AuthContext = createContext()

export function AuthContextProvider({children}){

  const [user,setUser] = useState({})

  useEffect(()=>{
    const unSubscribe = onAuthStateChanged(auth,(currentUser)=>{
      setUser(currentUser)
    })

    return ()=>{
      unSubscribe()
    }
  },[])

  function SignUp(email,password){
    createUserWithEmailAndPassword(auth,email,password)
    setDoc(doc(db,'users',email),{
      favShows:[],
    })
  }

  function Login(email,password){
    return signInWithEmailAndPassword(auth,email,password)
  }

  function LogOut(){
    return signOut(auth)
  }

  return (
    <AuthContext.Provider value={{user,LogOut,Login,SignUp}}>
      {children}
    </AuthContext.Provider>
  )
}


export function userAuth(){
  return useContext(AuthContext)
}