const express = require('express');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const AcademicMembers = require('../models/AcademicMemberModel');
//const AttendanceRecords = require('./models/AttendanceRecords');
const Departments = require('../models/DepartmentModel');
const HRmembers = require('../models/HRModel');
const courses = require('../models/course');
const faculties = require('../models/facultyModel');
const locations = require('../models/location');
const requests = require('../models/request');
const slots = require('../models/slot');
const app = require('../app');
const { number } = require('joi');
var days_names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const router = express.Router();
const auth=(req,res,next)=>{
    try {
        const token=req.header('auth-token');
        if(!token){
            return res.status(401).json({msg:"byo byo authority"});
        }
        
        const jwt_pass="sign";
        const verified=jwt.verify(token,jwt_pass);
        if(!verified){
            return res.status(401).json({msg:"byo byo not verified, You need a valid token"});
        }

        // console.log(verified);
        req.user=verified.id;
        next();
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

router.route('/login').post(async(req,res)=>{
    try {
        let academic = true;   
        let {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({msg:"l2 undefined email or password"});
        }
        let alreadyExist=await AcademicMembers.findOne({email:email});
        if(!alreadyExist){
            academic = false;
            alreadyExist=await HRmembers.findOne({email:email});
            if(!alreadyExist)
            {
            return res.status(400).json({msg:"register first"});
            }
        }
        //const salt=await bcrypt.genSalt();
        //const passwordHashed=await bcrypt.hash(password,salt);
        const matched=await bcrypt.compare(password,alreadyExist.password);
        if(!matched){
            return res.status(400).json({msg:"wrong password"});
        }
        const jwt_pass="sign";

        const token=jwt.sign({id:alreadyExist._id,staffID:alreadyExist.member_id},jwt_pass);
        res.json({
                token,user:{
                id:alreadyExist._id,
                email:alreadyExist.email,
                name:alreadyExist.name
            }
        });

    } catch (error) {
        res.status(500).json({error:error.message})
    }
});

router.route('/register').post(async(req,res)=>{
    try {
        
        let {email,password,passwordCheck,displayName}=req.body;
        if(!email || !password){
            return res.status(400).json({msg:"l2 undefined"});
        }
        if(password!=passwordCheck){
            return res.status(400).json({msg:"not same password"});
        }
        if(password.length<5){
            return res.status(400).json({msg:"password is weak"});
        }
        
        const salt=await bcrypt.genSalt();
        const passwordHashed=await bcrypt.hash(password,salt);
        const newMember=new HRmembers({
            email:email,
            password:passwordHashed,
            name:displayName,
            id:"ac-1"
        });
        const savedUser=await newMember.save();
        
        res.json(savedUser);

    } catch (error) {
            res.status(500).json({error:error.message})
    }
})

router.route('/logout').post(auth,async(req,res)=>{
    try {
        const token = req.header('auth-token'); 
        jwt.destroy(token);

        res.send("logged out successfully");
    } catch (error) {
        res.status(500).json({error:error.message})
    }
});

router.route('/viewProfile').get(auth,async(req,res)=>{ // done
    try {
        const token = req.header('auth-token'); 
        const token_id = jwt.verify(token,"sign").staffID;
        console.log(token_id);
        console.log(token_id.substring(0,2));
        console.log(token_id.substring(0,2).localeCompare("hr"));
        let ouput;
        if(token_id.substring(0,2).localeCompare("hr") == 0)
            {output = await HRmembers.find({id:token_id});}
        if(token_id.substring(0,2).localeCompare("ac") == 0)
            {output = await AcademicMembers.find({id:token_id});}
        
        res.send(output);  
    } catch (error) {
        res.status(500).json({error:error.message})
    }
});

//Update Profile Route
router.route('/updateProfile').put(auth,async(req,res)=>{ // done
    try {
        const token = req.header('auth-token'); 
        const token_id = jwt.verify(token,"sign").staffID;
        //let fullProfile;
        let result;
        let newData;
        if(token_id.substring(0,2).localeCompare("hr") == 0)
            {
                console.log("hr");
                let {email,gender,officeLocation,salary}=req.body;
                //fullProfile = await HRmembers.findOne();
                newData = {
                email : email,
                gender: gender,
                officeLocation:officeLocation,
                salary : salary,
            }
            
            console.log("data is going to be updated");
             result=await HRmembers.findOneAndUpdate({member_id:token_id},{newData},{new: true});
        }
        else{ if(token_id.substring(0,2).localeCompare("ac") == 0)
            {let {email,gender}=req.body;
            //fullProfile = await AcademicMembers.findOne({member_id:token_id});
            newData = {
                email : email,
                gender: gender,
            }
            result=await AcademicMembers.findOneAndUpdate({member_id:token_id},newData,{new: true});
        }
        }
        if(result) 
            res.send(result+"Profile Updated Successfully");
        else
            res.send("update failed");
            //res.send();  
    } catch (error) {
        res.status(500).json({error:error.message})
    }

})

//Reset Password Route
router.route('/resetPassword').put(auth,async(req,res)=>{ // done
    try {
        const token = req.header('auth-token'); 
        const token_id = jwt.verify(token,"sign").staffID;
        //let fullProfile;
        let {newPassword,passwordCheck}=req.body;
        let result;
        if(!newPassword){
            return res.status(400).json({msg:"l2 undefined"});
        }
        if(newPassword.length<5){
            return res.status(400).json({msg:"password is weak"});
        }
        if(newPassword.localeCompare(passwordCheck)!= 0){
            return res.status(400).json({msg:"not same password"});
        }
        const salt=await bcrypt.genSalt();
        const passwordHashed=await bcrypt.hash(newPassword,salt);
        if(token_id.substring(0,2).localeCompare("hr") == 0)
           result=await HRmembers.findOneAndUpdate({member_id:token_id},{password: passwordHashed},{new: true});    
        
        if(token_id.substring(0,2).localeCompare("ac") == 0)
            result=await AcademicMembers.findOneAndUpdate({member_id:token_id},{password: passwordHashed},{new: true});     
        
        res.send("Password Updated Successfully");
        //res.send();  
    } catch (error) {
        res.status(500).json({error:error.message})
    }
});

// Sign In Route
router.route('/signIn').post(auth,async(req,res)=>{
    try {
        const token=req.header('auth-token');
        const token_id = jwt.verify(token,"sign").staffID;
        const dateIn= req.body.dateIn;
        let newData;
        newData = { time : dateIn,signIn :true };
        if(token_id.substring(0,2).localeCompare("ac") == 0)    
            result=await AcademicMembers.findOneAndUpdate({member_id:token_id},{$push : {attendanceRecord : newData}},{new: true});
        
        if(token_id.substring(0,2).localeCompare("hr") == 0)
            result=await HRmembers.findOneAndUpdate({member_id:token_id}, {$push : {attendanceRecord : newData}},{new: true});    
        res.send("Sign In Successfully");  
        //res.send(result);
    } catch (error) {
        res.status(500).json({error:error.message})
    }
});

// Sign Out Route
router.route('/signOut').post(async(req,res)=>{
    try {
        const token=req.header('auth-token');
        const token_id = jwt.verify(token,"sign").staffID;
        const dateOut= req.body.dateOut;
        let newData;
        newData = { time : dateOut,signIn :false };
        if(token_id.substring(0,2).localeCompare("ac") == 0)    
            result=await AcademicMembers.findOneAndUpdate({member_id:token_id},{$push : {attendanceRecord : newData}},{new: true});
        
        if(token_id.substring(0,2).localeCompare("hr") == 0)
            result=await HRmembers.findOneAndUpdate({member_id:token_id}, {$push : {attendanceRecord : newData}},{new: true});    
        res.send("Sign Out Successfully");  
        //res.send(result);
    } catch (error) {
        res.status(500).json({error:error.message})
    }
});

router.route('/ViewAttendance/:month').get(async(req,res)=>{
    try {
        const token=req.header('auth-token');
        const token_id = jwt.verify(token,"sign").staffID;
        let member;
        if(token_id.substring(0,2).localeCompare("hr") == 0)
            member = await HRmembers.findOne({member_id:token_id});
        else if(token_id.substring(0,2).localeCompare("ac") == 0)   
            member = await AcademicMembers.findOne({member_id:token_id});

        const attend = member.attendanceRecord;
       // console.log(req.params.month);
        if(req.params.month== ":")
            {
                //console.log("return attend");
                return res.send(attend);
            }    
        let signs = []; 
        //console.log(attend);
        for(element of attend)
        {
            console.log(req.params.month);
            if(req.params.month == (element.time.getMonth()+1))
              {
                console.log("pushed")
                signs.push(element);
              }  
        }
        //console.log("retrn signs");
        res.send(signs);
        //res.send();
    } catch (error) {
        res.status(500).json({error:error.message})
    }
});
router.route('/ViewMissingDays/:month').get(async(req,res)=>{
    try {
        const token=req.header('auth-token');
        const token_id = jwt.verify(token,"sign").staffID;
        let member;
        if(token_id.substring(0,2).localeCompare("hr") == 0)
            member = await HRmembers.findOne({member_id:token_id});
        else if(token_id.substring(0,2).localeCompare("ac") == 0)   
            member = await AcademicMembers.findOne({member_id:token_id});
            if(req.params.month== ":")
                return res.status(401).json({msg:"please specify the month"});
        
        const attend = member.attendanceRecord;
        var i;
        const dddd = new Date(2011,req.params.month,0);
        console.log(req.params.month);
        console.log(dddd);
        const monthDays = dddd.getDate();//return the number of days in the month
        var temp;
        var missingDays = 0;
        //console.log(monthDays);
        
        for(i = 1;i<=monthDays;i++)
        {
            //console.log(i);
            temp = attend.filter(function(element) {
                //console.log(element.time.getDate())
                let d = element.time;
                return  d.getDate() == i;
            });
            const daydate = new Date(2020,req.params.month,i).getDay();
            const dayname = days_names[daydate];
            if(temp.length == 0 && daydate != 5 && dayname.localeCompare(member.dayoff)!=0)
                missingDays++;

        }
        res.send(`The number of missing Days are : ${missingDays}`);
    
    } catch (error) {
        res.status(500).json({error:error.message})
    }
});


module.exports = router;