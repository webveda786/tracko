const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/Tracker').then(()=>{
    console.log("database connected")
}).catch(()=>{
    console.log("error occured in database connection");
})
let signupSchema=new mongoose.Schema({
    trainername:{
        type:String,
        required:true
    },
    trainermail:{
        type:String,
        required:true
    },
    trainermobile:{
        type:Number,
        required:true
    },
    trainerpwd:{
        type:String,
        required:true
    },
    trainerdes:{
        type:String,
        required:true
    }
    
}, { timestamps: true })
let studeregSchema=new mongoose.Schema({
    batchcode:{
        type:String,
        required:true
    },
    fullname:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    joinedmonth:{
        type:String,
        required:true
    },
    companies:{
        type:Array,
        required:true
    }
}, { timestamps: true })
let questionSchema=new mongoose.Schema({
    company:{
        type:String,
        required:true
    },
    questions:{
        type:Array
    }
}, { timestamps: true })

let placedStudentsSchema=new mongoose.Schema({
        fullname:{
            type:String,
            required:true
        },
        company:{
            type:String,
            required:true
        },
        testimonials:{
            type:String
        }

}, { timestamps: true }) 
let AddCandidatesSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    degree:{
        type:String,
        required:true
    },
    stream:{
        type:String,
        required:true
    },
    yop:{
        type:String,
        required:true
    },
    perpg:{
        type:String,
        required:true
    },
    perug:{
        type:String,
        required:true
    },
    per12:{
        type:String,
        required:true
    },
    per10:{
        type:String,
        required:true
    },
    completedcourses:{
        type:Array,
    },
    rating:{
        type:String,
        required:true
    }

})
let signupCollection=mongoose.model('signupCollection',signupSchema)
let studentRegCollection=mongoose.model('studentregCollection',studeregSchema)
let questionCollection=mongoose.model('questionCollection',questionSchema)
let placedStudentsCollection=mongoose.model('placedStudentsCollection',placedStudentsSchema)
let addCandidatesCollection=mongoose.model('AddCandidatesCollection',AddCandidatesSchema)
module.exports={signupCollection,studentRegCollection,
    questionCollection,placedStudentsCollection,addCandidatesCollection};