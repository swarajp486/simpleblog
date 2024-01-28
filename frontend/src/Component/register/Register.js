import axios from 'axios'
import {React,useState }from 'react'

export default function Register() {
  const [username,setUsername]=useState('')
  const [password,setPassword]=useState('')
  const [email,setEmail]=useState('')

  const register=async (e)=>{
    e.preventDefault()
    try {
      const response=await axios.post('http://localhost:4000/api/post/register',{username,email,password})
     
     
      alert(response.data)

      
      
    } catch (error) {
      // Handle error message
      alert(error.response.data)
      console.error(error.response.data);
    }
  }
  return (
    <form className="register" onSubmit={register}>
      <h1>Register</h1>
      <input type="text"
             placeholder="username"
             value={username}
             onChange={e => setUsername(e.target.value)}/>
      <input type="text"
             placeholder="email"
             value={email}
             onChange={e => setEmail(e.target.value)}/>
      <input type="password"
             placeholder="password"
             value={password}
             onChange={e=> setPassword(e.target.value)}/>
      <button>Register</button>
    </form>
  )
}
