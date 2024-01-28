import React, { useEffect, useState } from 'react'
import Post from '../post/Post'

function Home() {
  const [posts,setPosts]=useState([])

  useEffect(()=>{
    fetch('http://localhost:4000/api/post/blog')
    .then(res=>res.json())
    .then(posts=>{
    
      setPosts(posts)
    })
  
  },[])
  return (
    <>
    {posts.length >0 && posts.map(post=>(<Post {...post}/>))}
    </>
  )
}

export default Home