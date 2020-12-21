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
const { route } = require('../app');
const facultyModel = require('../models/facultyModel');

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


router.route('/addLocation').post(auth,async(req,res)=>{
    try {
        console.log("fuck my fucking life")
       const token = req.header('auth-token'); 
        const token_id = jwt.verify(token,"sign").staffID;
        let output="nothing";   
        if(token_id.substring(0,2).localeCompare("hr") == 0)
            {output = await HRmembers.find({id:token_id});}
       else
       return res.status(400).json({msg:"You cannot do that you are not HR"});
       
            if(output=="nothing")
        return res.status(400).json({msg:"You cannot do that you are not HR"});
        let {nam,cap,typ,occ}=req.body;
        if(typeof occ != 'number'||typeof cap!='string'||typeof nam!='string'||typeof typ!='string'){
        return res.status(403).json({msg:"plz enter types correclty "});   
       }
       if(typ!=="office"&&typ!=="lab"&&typ!=="hall"&&typ!="tutorial"){
        return res.status(400).json({msg:"only valid types are hall , tutorial , lab ,office"});       
         }
        const loc = new locations(
              {name:nam,
                capacity:cap,
                type:typ,
                occupation:occ  
        })
       
        const saveLocation= await loc.save();
        res.json(saveLocation);
        }
        
     catch (error) {
        res.status(500).json({error:error.message})
    }
 
});


router.route('/delLocation').delete(auth,async(req,res)=>{
    try {
       console.log("are you gay")
        const token = req.header('auth-token'); 
         const token_id = jwt.verify(token,"sign").staffID;
         let {nam}=req.body;

         let output="nothing";   
         if(token_id.substring(0,2).localeCompare("hr") == 0){
             {output = await HRmembers.find({id:token_id});}
         }
        else{
        return res.status(400).json({msg:"You cannot do that you are not HR"});       
        }
        if(typeof nam!='string'){
            return res.status(403).json({msg:"plz enter types correclty "});   
           }
        console.log("fuck you")
        const deleted=await locations.findOneAndDelete({"name": nam});
        console.log("are you idiot")
       res.json(deleted);
    }
     catch (error) {
        res.status(500).json({error:error.message})
    }
 
});
router.route('/updateLocation').get(auth,async(req,res)=>{
    try {
        const token = req.header('auth-token'); 
         const token_id = jwt.verify(token,"sign").staffID;
         let {nam,cap,typ,occ}=req.body;
       
         let output="nothing";   
         if(token_id.substring(0,2).localeCompare("hr") == 0){
             {output = await HRmembers.find({id:token_id});}
         }  
         else
         return res.status(400).json({msg:"You cannot do that you are not HR"});
            if(output=="nothing")
        return res.status(400).json({msg:"You cannot do that you are not HR"});
        const filter = {"name":nam};
        const update = {"capacity":cap,"type":typ,"occuptation":occ};
       console.log("be kind plz")
       if(typ!=="office"&&typ!=="lab"&&typ!=="hall"&&typ!="tutorial"){
       return res.status(400).json({msg:"only valid types are hall , tutorial , lab ,office"});       
        }
        let result1=await locations.findOne(filter,{new: true});
        
        if(result1==null){
        return res.status(400).json({msg:"This location doesn't exist"});       
       }
         
       let result=await locations.findOneAndUpdate(filter,update,{new: true});
          res.send(result);
          console.log("fuck you as well")
    }
     catch (error) {
        res.status(500).json({error:error.message})
    }
});
router.route('/addFaculty').post(auth,async(req,res)=>{
    try {
      console.log("ya rab");
        const token = req.header('auth-token'); 
         const token_id = jwt.verify(token,"sign").staffID;
       
         let output="nothing";   
         if(token_id.substring(0,2).localeCompare("hr") == 0){
             {output = await HRmembers.find({id:token_id});}
         }  
         else
         return res.status(400).json({msg:"You cannot do that you are not HR"});
            if(output=="nothing")
        return res.status(400).json({msg:"You cannot do that you are not HR"});
      
      
        let{nam,department}=req.body;  
        const loc = new faculties(
              {name:nam,
              Departments:department
        })
        res.json(department);
       const savedFaculty= await loc.save();
        res.json(savedFaculty);
        }     
     catch (error) {
        res.status(500).json({error:error.message})
    }
});

router.route('/updateFaculty').get(auth,async(req,res)=>{
    try {
        const token = req.header('auth-token'); 
         const token_id = jwt.verify(token,"sign").staffID;
       
         let output="nothing";   
         if(token_id.substring(0,2).localeCompare("hr") == 0){
             {output = await HRmembers.find({id:token_id});}
         }  
         else
         return res.status(400).json({msg:"You cannot do that you are not HR"});
            if(output=="nothing")
        return res.status(400).json({msg:"You cannot do that you are not HR"});
        let {nam,newname,department}=req.body;
      console.log(department[0].courses);
        const filter = {"name":nam};
        
         const update = {"name":newname,"departments":[department]};
       console.log("be kind plz")
        let result1=await faculties.findOne(filter,{new: true});
            console.log(result1)
   
        if(result1==null){
        return res.status(400).json({msg:"This location doesn't exist"});       
         }
       
          let result=await faculties.findOneAndUpdate(filter,update,{new: true});
          res.send(result);
          console.log(result);
          console.log("fuck you as well")
        }

     catch (error) {
        res.status(500).json({error:error.message})
    }
});


router.route('/delFaculty').delete(auth,async(req,res)=>{
    try {
       console.log("are you gay")
        const token = req.header('auth-token'); 
         const token_id = jwt.verify(token,"sign").staffID;
         let {nam}=req.body;

         let output="nothing";   
         if(token_id.substring(0,2).localeCompare("hr") == 0){
             {output = await HRmembers.find({id:token_id});}
         }
        else{
        return res.status(400).json({msg:"You cannot do that you are not HR"});       
        }
        if(typeof nam!='string'){
            return res.status(403).json({msg:"plz enter types correclty "});   
           }
        const deleted=await faculties.findOneAndDelete({"name": nam});
        console.log("are you idiot")
       res.json(deleted);
    }
     catch (error) {
        res.status(500).json({error:error.message})
    }
 
});

router.route('/addDepart').post(auth,async(req,res)=>{
    try {
        const token = req.header('auth-token'); 
         const token_id = jwt.verify(token,"sign").staffID;
       
         let output="nothing";   
         if(token_id.substring(0,2).localeCompare("hr") == 0){
             {output = await HRmembers.find({id:token_id});}
         }  
         else
         return res.status(400).json({msg:"You cannot do that you are not HR"});
            if(output=="nothing")
        return res.status(400).json({msg:"You cannot do that you are not HR"});
      
      
        let{facname,nam,hod,cr,acd}=req.body;  

        const loc = (
            {name:nam,
                HOD:hod,
            courses:cr,
            academicmem:acd
      })
      const filter = {"name":facname};
     //const update = {"name":newname,"departments":[department]};
     
        let cc=await facultyModel.findOne(filter);
  //console.log(loc);
   //console.log(cc.departments) ;
   x=cc.departments;
   x.push(loc);  
        console.log(x);
   //   console.log(loc);
        let oldval={"departments":x}   
     const res=  await  facultyModel.updateOne(filter,oldval);
     res.json(res);
     
    }     
     catch (error) {
        res.status(500).json({error:error.message})
    }
});


module.exports = router;