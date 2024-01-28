
import 'react-quill/dist/quill.snow.css';
import {useContext, useState} from "react";
import {Navigate} from "react-router-dom";
import Editor from "../Editor/Editor";
import axios from 'axios';
import { AuthContext } from '../../usercontext';
import ReactQuill from 'react-quill/lib';


function CreatePost() {

  const [title,setTitle] = useState('');
  const [summary,setSummary] = useState('');
  const [content,setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect,setRedirect]=useState(false)
  const {token}=useContext(AuthContext)
 

  async function createNewPost(e) {
    e.preventDefault();
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set("token",token)
    data.set('file', files[0]);
try{

    await fetch('http://localhost:4000/api/post/blog', {
      method: 'POST',
      body: data,
    }).then(res=>res.json())
    .then(data=>{
      setRedirect(true)
    })
    
  } catch (error) {
    // Handle error message
   alert(error.response.data);

  }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }
   


  return (
    <form onSubmit={createNewPost}>
      <input type="title"
             placeholder={'Title'}
             value={title}
             onChange={e => setTitle(e.target.value)}
             />
      <input type="summary"
             placeholder={'Summary'}
             value={summary}
             onChange={e => setSummary(e.target.value)} 
              />
      <input type="file" onChange={e=>setFiles(e.target.files)}/>
   <Editor value={content} onChange={setContent}/>
      <button style={{marginTop:'5px'}}>Create post</button>
    </form>
  );
  
}

export default CreatePost