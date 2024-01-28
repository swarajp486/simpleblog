import React, { createContext, useState } from 'react';

const AuthContext = createContext({
  token: '',
  setToken: () => {},
  loginid:'',
  setId:()=>{},
  username:'',
  setUsername:()=>{}


});

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loginid,setId]=useState('')
  const [username,setUsername]=useState('')

  const updateToken = (newToken) => {
    setToken(newToken);
    if(newToken===null){
      localStorage.removeItem('token')
    }else{
    localStorage.setItem('token', newToken);
    }
  };

  const updateId=(newId)=>{
    setId(newId)
  }
  const updateusername=(newusername)=>{
    setUsername(newusername)
  }

 

  return (
    <AuthContext.Provider value={{ token, updateToken,loginid,updateId,username,updateusername}}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider};
