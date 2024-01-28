import React, { useContext} from 'react'
import './header.css'
import { Link } from 'react-router-dom'

import { AuthContext } from '../../usercontext';

function Header() {
  const { token, updateToken,username} = useContext(AuthContext);




  return (
    <header>
    <Link to='/' className='logo'>MyBlog</Link>
    <nav>
    {token ? <>
              <Link to="/create">Create new post</Link>
              <Link to="/" className='logout' onClick={()=>updateToken(null)}>LogOut({username})</Link>
            </>:
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>}
      
      
      </nav>

  </header>
  )
}

export default Header