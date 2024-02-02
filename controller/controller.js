const mongoose = require('mongoose');
const {studentRegCollection,questionCollection,placedStudentsCollection,addCandidatesCollection} = require('../model/database');

//^to insert students placement details

async function studentRegistration(req,res,next){

    try {
        let {batchcode,fullname,phone,email,joinedmonth,company,questions,testimonials,isPlaced}=req.body
        //!student deatils
       let studentData= await studentRegCollection.findOne({email:email});
       if(studentData)
       {
        await studentRegCollection.updateOne({email:email},{$push:{companies:company}})
       }
       else
       {
           await studentRegCollection.create({batchcode:batchcode,fullname:fullname,phone:phone,email:email,joinedmonth:joinedmonth,companies:[company]})
       }
       let companayData;
       //!company details with questions
       companayData=await questionCollection.findOne({company:company});
       if(companayData)
       {
        console.log(questions);
        for(let val of questions)
        await questionCollection.updateOne({company:company},{$push:{questions:val}})
       }
       else{
        await questionCollection.create({company:company,questions:questions})
       }
        
       //!student is placed or not
       if(isPlaced)
       {
        await placedStudentsCollection.create({fullname:fullname,company:company,testimonials:testimonials})
       }

        res.json({message:"regster successfluly"})
    } catch (error) {
        next(error)
    }
}


//^to get placed students data

async function placedStudents(req,res,next){
    try {
        let placedStudentData=await placedStudentsCollection.aggregate([{$sort:{createdAt:-1}},{$project:{fullname:1,company:1,testimonials:1}}]);
        res.json({error:false,data:placedStudentData})
    } catch (error) {
        next(error)
    }
}


//^to get questions based on companies
async function getQuestions(req,res,next){
    try {
        let search=new RegExp(`${req.params.cname}`)
        let questions=await questionCollection.aggregate([{$match:{company:search}},{$project:{company:1,questions:1}}])
        if(questions.length!=0)
        res.json({error:false,data:questions})
     else{
        res.json({error:true,data:"no compnany found"})
     }
    } catch (error) {
        next(error)
    }
}

//addcandidates
async function addCandidates(req,res,next){
   try {
    let cheack=await addCandidatesCollection.findOne({email:req.body.email})
    if(!cheack)
    {
        await addCandidatesCollection.create(req.body);
        res.json({error:false,message:"data added successfully"});
    }
    else{
        let newArray= await addCandidatesCollection.findOne({email:req.body.email},{completedcourses:1});
        newArray=[...newArray.completedcourses,...req.body.completedcourses];
        let set=new Set(newArray);
        newArray=Array.from(set);
        console.log(newArray)
       await addCandidatesCollection.updateOne({email:req.body.email},{$set:{completedcourses:newArray},$set:{rating:req.body.rating}})
        res.json({error:true,message:"data updated successfully"})
    }
   } catch (error) {
      next(error);
      console.log(error);
   }
}


//goodcandidates

async function goodCandidates(req,res,next){
    try {
        let filter=req.params.filter;
        let isYear=filter.startsWith("20");
        console.log(isYear);
        let students;
        if(isYear&&filter.length==4)
        {
           students=await addCandidatesCollection.find({yop:filter})
        }
        else{
             students=  await addCandidatesCollection.find({$or:[{name:filter},{email:filter},{mobile:filter},{degree:filter},{stream:filter},{per10:{$gte:filter}},{per12:{$gte:filter}},{perpg:{$gte:filter}},{perug:{$gte:filter}},{rating:filter}]})
        }
     
        res.json({error:false,students:students})
    } catch (error) {
        next(error)
    }
}
module.exports={studentRegistration,placedStudents,getQuestions,addCandidates,goodCandidates}