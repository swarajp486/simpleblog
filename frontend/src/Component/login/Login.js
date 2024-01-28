import React, { useContext, useState } from 'react'
import axios from 'axios'

import { AuthContext } from '../../usercontext'
import { Navigate } from 'react-router-dom'

export default function Login() {
    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
    const [redirect,setredirect]=useState(false)
    const { updateToken,updateId,updateusername } = useContext(AuthContext);
 
    const login = async (e)=>{
      e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/api/post/login', { username, password });
      // Store token in local storage or other secure storage
      
      updateToken(response.data.token);
      updateId(response.data.id)
      updateusername(response.data.username)
      setredirect(true)
     
       
     
    
     
    } catch (error) {
      // Handle error message
     alert(error.response.data);
    }
    }

    if (redirect) {
      return <Navigate to={'/'} />
    }
  
  
  return (
    <form className="login" onSubmit={login} >
    <h1>Login</h1>
    <input type="text"
           placeholder="username"
           value={username}
           onChange={e => setUsername(e.target.value)}/>
    <input type="password"
           placeholder="password"
           value={password}
           onChange={e => setPassword(e.target.value)}/>
    <button>Login</button>
  </form>
  )
}
