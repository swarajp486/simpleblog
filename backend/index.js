const express=require('express')
const cors=require('cors')
const app=express()
const mongoose=require('mongoose')
const User = require('./models/userModel');
const Post=require('./models/postModel')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config()
app.use(cors())
app.use(express.json())
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });
const fs = require('fs');
app.use('/uploads',express.static(__dirname+'/uploads'))



const MONGODB='mongodb+srv://swarajp486:P3tlNmxYnHvewBzA@cluster0.efbhsd8.mongodb.net/'
mongoose
  .connect(MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connection successful");
    
  })
  .catch((e)=>console.log(e));




const port = process.env.PORT



app.post('/api/post/register',async (req,res)=>{

  try {
    const {username,email, password} = req.body;

    // Validate email format
    if (!/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).send('Invalid email format');
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).send('User already exists');

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({username,email, password: hashedPassword});

  
    res.status(200).send("Signup successful! Please login.");
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }

    
})


app.post('/api/post/login',async (req,res)=>{
  try {
    const { username, password } = req.body;

    const user = await User.findOne({username});
    if (!user) return res.status(404).send('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).send('Invalid password');

    // Generate JWT token
    const token = jwt.sign({id: user._id },process.env.JWT_SECRET);

    res.json({"token":token,"username":user.username,id:user._id});
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
}
)


app.post('/api/post/blog' ,uploadMiddleware.single('file'), async (req,res) => {
  
  try{
  const {originalname,path} = req.file;
  const parts = originalname.split('.');
  const ext = parts[parts.length - 1];
  
  const newPath = path+'.'+ext;
  fs.renameSync(path, newPath);
  const {title,summary,content,token} = req.body;
  jwt.verify(token,process.env.JWT_SECRET, async (err, user) => {
    if (err) return res.sendStatus(403);
  
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover:newPath,
      author:user.id
    });
    res.json(postDoc);
  });

 
  }catch(error){
    res.status(500).send('Internal server error');
  }
 

});


app.get('/api/post/blog',async (req,res)=>{
 const posts=await Post.find().populate('author',['username']).sort({createdAt:-1})
 .limit(20)
 res.json(posts)
})

app.get('/api/post/blog/:id',async (req,res)=>{
  const {id}=req.params
  const postDoc= await Post.findById({_id:id}).populate('author',['username'])
 
  res.json(postDoc)
})


app.put('/api/post/blog',uploadMiddleware.single('file'), async (req,res) => {
// res.json({test:5,fileIs:req.file} )
  let newPath = null;
  if (req.file) {
    const {originalname,path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    newPath = path+'.'+ext;
    fs.renameSync(path, newPath);
  }
  const {id,token,title,summary,content} = req.body;

  jwt.verify(token,process.env.JWT_SECRET,async (err,info) => {
    if (err) return res.sendStatus(403);
   
    const postDoc = await Post.findById({ _id:id});
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    
    
    if (!isAuthor) {
      return res.status(400).json('you are not the author');
    }
    const updatedFields = {
      title,
     summary,
      content,
      cover: newPath ? newPath : postDoc.cover,

    };
    const updatePost= await Post.findByIdAndUpdate(
      id,
      updatedFields,
      { new: true }
    );

  res.json(updatePost);
  });

  
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})