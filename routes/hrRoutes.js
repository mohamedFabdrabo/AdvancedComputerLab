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
const DepartmentModel = require('../models/DepartmentModel');
const { update } = require('../models/course');
const { mquery } = require('mongoose');
const { required } = require('joi');
const {addCourseValidation} =require('../validation/HrRoutesValidation');
const HRModel = require('../models/HRModel');
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
        return  res.status(500).json({error:error.message})
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
        return  res.status(500).json({error:error.message})
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
        return res.status(500).json({error:error.message})
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
        return  res.status(500).json({error:error.message})
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
                departments:department
        })
        
       const savedFaculty=  await loc.save();
        res.json(savedFaculty);
        }     
     catch (error) {
        return  res.status(500).json({error:error.message})
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
        let {nam,newname}=req.body;
        const filter = {"name":nam};
        
         const update = {"name":newname};
       console.log("be kind plz")
        let result1=await faculties.findOne(filter,{new: true});
   
        if(result1==null){
        return res.status(400).json({msg:"This location doesn't exist"});       
         }
       
          let result=await faculties.findOneAndUpdate(filter,update,{new: true});
          res.send(result);
        }

     catch (error) {
        return   res.status(500).json({error:error.message})
    }
});


router.route('/delFaculty').delete(auth,async(req,res)=>{
    try {
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
       res.json(deleted);
    }
     catch (error) {
        return res.status(500).json({error:error.message})
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
      
      
        let{facname,nam}=req.body;  

        const loc = (
            {name:nam,
      })
      const filter = {"name":facname};
     
        let cc=await facultyModel.findOne(filter);
   console.log(cc);
   const dep = await new Departments({ "name": nam })
  cc.departments.push(dep);
  console.log(cc);
     
     dep.HOD=null;
     
     console.log(dep);
     console.log(dep.HOD);
        let oldval={"departments":cc}   
       await dep.save();
       await cc.save();
     res.send(cc.departments);
    }     
     catch (error) {
        return  res.status(500).json({error:error.message})
    }
});



router.route('/updateDepart').get(auth,async(req,res)=>{
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
      
        let{oldnam,newnam}=req.body;  
        const filter = {"name":oldnam};
        const update={"name":newnam}
        let cc=await DepartmentModel.findOneAndUpdate(filter,update,{new: true});
          console.log(cc);
          res.send(cc);
       
        
    }     
     catch (error) {
        return  res.status(500).json({error:error.message})
    }
});

router.route('/delDepart').delete(auth,async(req,res)=>{
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
        let{nam}=req.body;
        const filter = {"name":nam};
         
        const result=await (await DepartmentModel.findOne(filter))._id;
        console.log(result);
        const filter1 = {departments:{$in:[result]}};
     await  DepartmentModel.findOneAndDelete(filter); 
        const remove = {$pull :{departments:{$in:result}}};
      const rep=await facultyModel.updateMany(filter1,remove);
        console.log("surtur");
      

        console.log()
    
        res.send(rep);
    }     
     catch (error) {
     return   res.status(500).json({error:error.message})
    }
});

router.route('/addCourse').post(auth,async(req,res)=>{
    try {
      const {error1}=addCourseValidation(req.body);
        if(error1){
            return res.status(400).json(error1.details[0].message);
        }
        const token = req.header('auth-token'); 
         const token_id = jwt.verify(token,"sign").staffID;
       
         let output="nothing";   
         if(token_id.substring(0,2).localeCompare("hr") == 0){
             {output = await HRmembers.find({ccid:token_id});}
         }  
         else
         return res.status(400).json({msg:"You cannot do that you are not HR"});
            if(output=="nothing")
        return res.status(400).json({msg:"You cannot do that you are not HR"});
       
        let{depname,nam,id}=req.body;  
        const filter = {"name":depname};
      const dep=await DepartmentModel.findOne(filter)
      console.log(dep);
    
      const crs = await new courses({"name":nam,"cid":id})
      
    await dep.courses.push(crs);
     await dep.save();
     await crs.save();
  //console.log(dep);
  res.send(dep);
    }     
     catch (error) {
return res.status(500).json({error:error.message})
    }
});


router.route('/updateCourse').get(auth,async(req,res)=>{
    try {
     /*   const {error}=updateCourseValidation(req.body);
        if(error){
            return res.status(400).json(error.details[0].message);
        }*/
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
       
        let{oldid,newid,newname}=req.body;  
        const filter = {"cid":oldid};
        const update={"cid":newid,"name":newname}
        const dep=await courses.findOneAndUpdate(filter,update,{new: true});
        res.send(dep);
     
     // await dep.save();
   //  await crs.save();
  //console.log(dep);
  //res.send(dep);
    }     
     catch (error) {
        res.status(500).json({error:error.message})
    }
});

router.route('/delCourse').delete(auth,async(req,res)=>{
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
        let{id}=req.body;
        const filter = {"cid":id};
         
        const result= ( await courses.findOne(filter))._id;
        console.log(result);
        const filter1 = {courses:{$in:[result]}};
   // const val= await course.findOneAndDelete(filter); 
     //console.log(val)
       const remove = {$pull :{courses:{$in:result}}};
     let rep=await Departments.updateMany(filter1,remove);
        console.log("surtur");
     //   res.send(rep);
      
       rep= await courses.deleteMany(filter)
    
       // console.log()
    
        res.send(rep);
    }     
     catch (error) {
        res.status(500).json({error:error.message})
    }
});

router.route('/registerMem').post(auth,async(req,res)=>{
    try {
      const {error1}=addCourseValidation(req.body);
        if(error1){
            return res.status(400).json(error1.details[0].message);
        }
        const token = req.header('auth-token'); 
         const token_id = jwt.verify(token,"sign").staffID;
       
         let output="nothing";   
         if(token_id.substring(0,2).localeCompare("hr") == 0){
             {output = await HRmembers.find({ccid:token_id});}
         }  
         else
         return res.status(400).json({msg:"You cannot do that you are not HR"});
            if(output=="nothing")
        return res.status(400).json({msg:"You cannot do that you are not HR"});
   
        let{gender,name,email,salary,officeLocation,role,dayoff,department}=req.body; 
      const loc=await  locations.findOne(officeLocation);
      loc.occupation=1;
   console.log(AcademicMembers.count1)
     // console.log(loc);
      if(loc.occupation==loc.capacity){
        return res.status(400).json({msg:"Max Capacity in this room"}); 
      }
      await loc.save();
      console.log(role);
      if(role==="HR"){
          console.log("HI")
        const id1="HR-9999";

    const crs = await new HRModel({"id":id1,"gender":gender,"name":name,"email":email,
    "salary":salary,"password":123456,"officeLocation":loc._id,"role":role,
    "dayoff":"Saturday",
    })
    const saveLocation= await crs.save();
    res.send(saveLocation);
    
    

      }
else{

      console.log(department);
      const filter = {"name":department};
         
      const dep=await  Departments.findOne(filter);
      console.log(loc._id);
      const id1="AC-9999";
      const crs = await new AcademicMembers({"id":id1,"gender":gender,"name":name,"email":email,
    "salary":salary,"password":123456,"officeLocation":loc._id,"role":role,
    "dayoff":dayoff,"department":department
    })
    
     // console.log(dep.HOD);
      if(role=="HOD")
    dep.HOD=crs._id;
  // console.log(crs);
    await dep.save();
    const saveLocation= await crs.save();
    res.send(saveLocation);
    
    
}





  

      

    }     
     catch (error) {
return res.status(500).json({error:error.message})
    }
});




module.exports = router;