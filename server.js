const express = require('express');
const cors = require('cors');
const rout = require('./Router/routes');
let app=express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use('/api',rout)
app.use((error,req,res,next)=>{
    res.json({error:true,message:error.message})
})
app.listen(4000,()=>{
    console.log("server started");
})