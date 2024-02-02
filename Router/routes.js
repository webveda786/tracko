const express = require('express');
const {placedStudents,studentRegistration,getQuestions,addCandidates,goodCandidates} = require('../controller/controller');
const {trainerLogin,trainerSignup} = require('../auth/auth');
let rout=express.Router();
rout.post('/trainerlogin',trainerLogin)
rout.post('/trainersignup',trainerSignup)
rout.get('/placedstudents',placedStudents)
rout.post('/studentregistration',studentRegistration)
rout.get('/getquestions/:cname',getQuestions)
rout.post('/addcandidates',addCandidates)
rout.get('/goodcandidates/:filter',goodCandidates);

module.exports=rout;