import CreatePost from "./Component/createpost/CreatePost";
import EditPost from "./Component/editpost/EditPost";
import Home from "./Component/home/Home";
import Login from "./Component/login/Login";
import PostPage from "./Component/postPage/PostPage";

import Register from "./Component/register/Register";


export const routes=[
    {path:'/',element:<Home/>},
    {path:'/login',element:<Login/>},
    {path:'/register',element:<Register/>},
    {path:'/create',element:<CreatePost/>},
    {path:'/blog/:id',element:<PostPage/>},
    {path:'/edit/:id',element:<EditPost/>},


]