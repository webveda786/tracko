const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const {signupCollection} = require('../model/database');

async function trainerLogin(req,res,next){
    try {
        let {username,password}=req.body;
        let data;
        if(isNaN(Number(username))){
            data=await signupCollection.findOne({trainermail:username,trainerpwd:password});
        }
        else{
            data=await signupCollection.findOne({trainermobile:username,trainerpwd:password})
        }
         if(data){
            res.json({error:false,message:"login successfully"})
         }
         else{
          return  res.json({error:true,message:"invalid usrname and password"})
         }
         console.log(data);
      
    } catch (error) {
        next(error)   
    }
} 

async function trainerSignup(req,res,next){
    try {
        console.log(req.body);
        let data=await signupCollection.create(req.body);
        console.log(data)
        res.json({error:false,message:"signup successfluly"})

    } catch (error) {
        next(error)
    }
}

module.exports={trainerLogin,trainerSignup}