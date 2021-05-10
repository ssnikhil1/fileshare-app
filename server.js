const express=require('express');
const path=require('path');
const app=express();
const PORT=process.env.PORT || 3000;
const files=require('./route/files');
const show= require('./route/show');
const connectDB=require('./config/db');
connectDB();

app.use(express.static('public'));
//Template engine
app.set('views',path.join(__dirname,'/views'));
app.set('view engine','ejs');
//Routes

app.use('/api/files',require('./route/files'));
app.use('/files', require('./route/show'));
app.use('/files/download',require('./route/download'));
app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`);
})

