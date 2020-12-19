const express=require('express');
const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const AcademicMembers = require('./models/AcademicMemberModel');
//const AttendanceRecords = require('./models/AttendanceRecords');
const Departments = require('./models/DepartmentModel');
const HRmembers = require('./models/HRModel');
const courses = require('./models/course');
const faculties = require('./models/facultyModel');
const locations = require('./models/location');
const requests = require('./models/request');
const slots = require('./models/slot');

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

const connectionParams={
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
}
const url="mongodb+srv://mfathy19:mfathy19@cluster0.mfjyt.mongodb.net/f1?retryWrites=true&w=majority";


mongoose.connect(url,connectionParams).then(()=>{
    console.log("OKKK");
}).catch(()=>{
    console.log("error");
});


module.exports=app;


