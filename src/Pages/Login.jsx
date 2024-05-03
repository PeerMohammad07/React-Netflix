import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userAuth } from '../Context/AuthContext'


function Login() {

  const [checkbox,setCheckbox] = useState(true)
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const {user,Login} = userAuth()
  const navigate = useNavigate()

  const onSumbit =async (e) =>{
    e.preventDefault()
    try{
      await Login(email,password)
      navigate('/')
    }catch(err){
      console.log(err);
    }
  }



  return (
    <>
    <div className='w-full h-screen'>
      <img 
        className='hidden sm:block absolute w-full h-full object-cover'
        src="https://assets.nflxext.com/ffe/siteui/vlv3/4d7bb476-6d8b-4c49-a8c3-7739fddd135c/deecf71d-7a47-4739-9e1a-31b6b0d55be7/IN-en-20240429-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt="login" />
      <div className='bg-black/70 fixed top-0 left-0 w-full h-screen'/>
      <div className='fixed w-full px-4 py-24 z-20'>  
          <div className='max-w-[450px] h-[600px] mx-auto bg-black/80 rounded-lg'>
            <div className='max-w-[320px] mx-auto py-16'>
              <h1 className='text-3xl font-nsans-bold'>Login</h1>

              <form className='w-full flex flex-col py-16' onSubmit={onSumbit}>
                  <input className='p-3 my-2 bg-gray-700 rounded' type="email" placeholder='email' autoComplete='email' value={email} onChange={(e)=> setEmail(e.target.value)}/>
                  <input className='p-3 my-2 bg-gray-700 rounded' type="password" placeholder='password' autoComplete='current-password' value={password} onChange={(e)=> setPassword(e.target.value)}/>
                  <button className='bg-red-600 rounded py-3 my-6 font-nsans-bold '>Login</button>
                  <div className='flex justify-between items-center text-gray-600'>
                    <p>
                      <input type="checkbox" className='mr-2' checked={checkbox} onChange={()=> setCheckbox(!checkbox)}/>
                      Remember me
                    </p>
                    <p>Need Help?</p>
                  </div>
                  <p className='my-4'>
                    <span>New to netflix ?</span>
                    <Link to='/signup'>Sign up</Link>
                  </p>
              </form>
            </div>
          </div>
      </div>
    </div>
  </>
  )
}
export default Login
