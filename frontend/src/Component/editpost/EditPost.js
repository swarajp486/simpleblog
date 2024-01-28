import {useContext, useEffect, useState} from "react";
import {Navigate, useParams} from "react-router-dom";
import Editor from "../Editor/Editor";
import { AuthContext } from "../../usercontext";

function EditPost() {
    const {id} = useParams();
    const [title,setTitle] = useState('');
    const [summary,setSummary] = useState('');
    const [content,setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect,setRedirect] = useState(false);
    const {token}=useContext(AuthContext)
  
    useEffect(() => {
      fetch(`http://localhost:4000/api/post/blog/${id}`)
      .then(res=>res.json())
      .then(postInfo=>{
        
        setTitle(postInfo.title);
        setContent(postInfo.content);
        setSummary(postInfo.summary);
      })
    }, [id]);
  
    async function updatePost(e) {
      e.preventDefault();
      const data = new FormData();
      data.set('title', title);
      data.set('summary', summary);
      data.set('content', content);
      data.set('id', id);
      data.set('token',token)
      if (files?.[0]) {
        data.set('file', files?.[0]);
      }
      
      await fetch('http://localhost:4000/api/post/blog', {
        method: 'PUT',
        body: data,
       
      }).then(res=>res.json())
      .then(data=>{
       
        setRedirect(true)
      }
      )
      
      
    }
  
    if (redirect) {
      return <Navigate to={`/blog/${id}`} />
    }
  
    return (
      <form onSubmit={updatePost}>
        <input type="title"
               placeholder={'Title'}
               value={title}
               onChange={e => setTitle(e.target.value)} />
        <input type="summary"
               placeholder={'Summary'}
               value={summary}
               onChange={e => setSummary(e.target.value)} />
        <input type="file"
               onChange={e => setFiles(e.target.files)} />
      
        <Editor onChange={setContent} value={content} />
        <button style={{marginTop:'5px'}}>Update post</button>
      </form>
    );
}

export default EditPost