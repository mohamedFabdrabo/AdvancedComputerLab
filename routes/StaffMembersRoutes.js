const express = require('express');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const AcademicMembers = require('../models/AcademicMemberModel');
const AttendanceRecords = require('../models/AttendanceRecords');
const Departments = require('../models/DepartmentModel');
const HRmembers = require('../models/HRModel');
const courses = require('../models/course');
const faculties = require('../models/facultyModel');
const locations = require('../models/location');
const requests = require('../models/request');
const slots = require('../models/slot');
const app = require('../app');
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
        //const matched=await bcrypt.compare(password,alreadyExist.password)
        //if(!matched){
           if(password!= alreadyExist.password){
            return res.status(400).json({msg:"wrong password"});
        }
        const jwt_pass="sign";

        const token=jwt.sign({id:alreadyExist._id,staffID:alreadyExist.id},jwt_pass);
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
/*
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
            id:"hr-3"
        });
        const savedUser=await newMember.save();
        
        res.json(savedUser);

    } catch (error) {
            res.status(500).json({error:error.message})
    }
})*/

router.route('/logout').post(auth,async(req,res)=>{
    try {
        const token = req.header('auth-token'); 
        jwt.destroy(token);

        res.send("logged out successfully");
    } catch (error) {
        res.status(500).json({error:error.message})
    }
});

router.route('/viewProfile').get(auth,async(req,res)=>{
    try {
        const token = req.header('auth-token'); 
        const token_id = jwt.verify(token,"sign").staffID;
       
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


module.exports = router;