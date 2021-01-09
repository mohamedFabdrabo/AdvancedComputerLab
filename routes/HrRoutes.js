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
const Joi = require('joi'); 



const {addCourseValidation,addLocationValidation,deleteLocationValidation,af,af1,dp,dp1,dp2,dp3,dp4,dp5,dp6,dp7,dp8,dp9,dp10} =require('../validation/HrRoutesValidation');
const HRModel = require('../models/HRModel');
const AcademicMemberModel = require('../models/AcademicMemberModel');
const AttendanceRecords = require('../models/AttendanceRecords');
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


router.route('/addLocation').post(async(req,res)=>{
    try {
        console.log("fuck you too")
    
        const {error}=await addLocationValidation(req.body);
        
       if(error){
           
            return res.status(400).json(error.details[0].message);
        }
        /*
       const token = req.header('auth-token'); 
        const token_id = jwt.verify(token,"sign").staffID;
        let output="nothing";   
        if(token_id.substring(0,2).localeCompare("hr") == 0)
            {output = await HRmembers.find({id:token_id});}
       else
       return res.status(400).json({msg:"You cannot do that you are not HR"});
       
            if(output=="nothing")
        return res.status(400).json({msg:"You cannot do that you are not HR"});
       */
      
        let {nam,cap,typ,occ}=req.body;
        const loc = new locations(
              {name:nam,
                capacity:cap,
                type:typ,
                occupation:occ  
        })
        console.log(nam+" "+cap+" "+typ+" "+occ);
        const saveLocation= await loc.save();
        res.json(saveLocation);
        }
        
     catch (error) {
         console.log("hi")
        return  res.status(500).json({error:error.message})
    }
 
});


router.route('/delLocation').delete(async(req,res)=>{
        try {
            const {error}=await deleteLocationValidation(req.query);
            
            if(error){
               
                return res.status(400).json(error.details[0].message);
            }
            /*
        const token = req.header('auth-token'); 
         const token_id = jwt.verify(token,"sign").staffID;

         let output="nothing";   
         if(token_id.substring(0,2).localeCompare("hr") == 0){
             {output = await HRmembers.find({id:token_id});}
         }
        else{
        return res.status(400).json({msg:"You cannot do that you are not HR"});       
        }
        */
       let {nam}=req.query;
console.log(nam);
        const deleted=await locations.findOneAndDelete({"name": nam});
        console.log(deleted)
      
        if(deleted==null){
            return res.status(400).json({msg:"location already deleted"});
           }
        res.json(deleted);
      
    }
     catch (error) {
        return res.status(500).json({error:error.message})
    }
 
});
router.route('/updateLocation').get(async(req,res)=>{
    try {
        const {error}=await addLocationValidation(req.query);
        
        if(error){
           
            return res.status(400).json(error.details[0].message);
        }
        /*const token = req.header('auth-token'); 
         const token_id = jwt.verify(token,"sign").staffID;
       
         let output="nothing";   
         if(token_id.substring(0,2).localeCompare("hr") == 0){
             {output = await HRmembers.find({id:token_id});}
         }  
         else
         return res.status(400).json({msg:"You cannot do that you are not HR"});
            if(output=="nothing")
        return res.status(400).json({msg:"You cannot do that you are not HR"});
        */
       let {nam,cap,typ,occ}=req.query;
      
        
        const filter = {"name":nam};
        const update = {"capacity":cap,"type":typ,"occuptation":occ};
     let result1=await locations.findOne(filter,{new: true});
         if(typ!=="office"&&typ!=="lab"&&typ!=="hall"&&typ!="tutorial"){
       return res.status(400).json({msg:"only valid types are hall , tutorial , lab ,office"});    
          }  
     if(result1==null){
            console.log("be kind plz")
    
        return res.status(400).json({msg:"This location doesn't exist"});       
       }
         
       let result=await locations.findOneAndUpdate(filter,update,{new: true});
          res.send(result);
    }
     catch (error) {
        return  res.status(500).json({error:error.message})
    }
});
router.route('/addFaculty').post(auth,async(req,res)=>{
    try {
        const {error}=await af(req.body);
        
        if(error){
           
            return res.status(400).json(error.details[0].message);
        }

      /*  console.log("ya rab");
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
      */
      
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
            const {error}=await af1(req.body);
            
            if(error){
               
                return res.status(400).json(error.details[0].message);
            }
    
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
        const {error}=await deleteLocationValidation(req.body);
            
        if(error){
           
            return res.status(400).json(error.details[0].message);
        }
    
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
            const {error}=await dp(req.body);
                
            if(error){
               
                return res.status(400).json(error.details[0].message);
            }
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
         const {error}=await dp1(req.body);
                
         if(error){
            
             return res.status(400).json(error.details[0].message);
         }
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

        const {error}=await deleteLocationValidation(req.body);
            
        if(error){
           
            return res.status(400).json(error.details[0].message);
        }
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
        
        const {error}=await addCourseValidation(req.body);
        
        if(error){
           
            return res.status(400).json(error.details[0].message);
         
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
      const {error}=dp2(req.body);
        if(error){
            return res.status(400).json(error.details[0].message);
        }
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
        const {error}=dp3(req.body);
        if(error){
            return res.status(400).json(error.details[0].message);
        }
       
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
    const {error}=dp4(req.body);
    if(error){
        return res.status(400).json(error.details[0].message);
    }
        
   try{     
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
        
       let{gender,name,email,salary,officeLocation,role,dayoff,department,ar}=req.body; 
      const loc=await  locations.findOne(officeLocation);
    // console.log(loc);
      if(loc.occupation==loc.capacity){
        return res.status(400).json({msg:"Max Capacity in this room"}); 
      }
      loc.occupation++;
      await loc.save();
      if(role==="HR"){
          console.log("HI");

    const crs = await new HRModel({"gender":gender,"name":name,"email":email,
    "salary":salary,"password":123456,"officeLocation":loc._id,"role":role,
    "dayoff":"Saturday","attendanceRecord":ar
    })
    const saveLocation= await crs.save();
    let z=crs.count1;
    console.log(z);
    const x="hr-"+z;
    crs.member_id=x;
    const saveLocation1= await crs.save();
    
    res.send(saveLocation1);
    
    

      }
else{

      console.log(department);
      const filter = {"name":department};
         
      const dep=await  Departments.findOne(filter);
      const crs = await new AcademicMembers({"gender":gender,"name":name,"email":email,
    "salary":salary,"password":123456,"officeLocation":loc._id,"role":role,
    "dayoff":dayoff,"department":department,"attendanceRecord":ar
    })

 
      if(role=="HOD"){
        dep.HOD=crs._id;
      }
    else{
        dep.AcademicMembers=crs._id;
    }
  if(dep!=null)     
  await dep.save();
    const saveLocation= await crs.save();
    const z=crs.count1;
    const x="ac-"+z;
    crs.member_id=x;
    const saveLocation1= await crs.save();
    
    res.send(saveLocation1);

}
   }
   catch (error) {
    res.status(500).json({error:error.message})
}
});


router.route('/updateMem').get(auth,async(req,res)=>{
    const {error}=dp5(req.body);
    if(error){
        return res.status(400).json(error.details[0].message);
    }

        
    try{     
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
         
        let{id,email,officeLocation,role,dayoff}=req.body; 
        if(id.substring(0,2).localeCompare("hr") == 0&&dayoff!="Saturday"){
            return res.status(400).json({msg:"You cannot change your day off"});
         
        }
        if(role=="HR"){
            const filter = {"member_id":id};
            const acm=await HRModel.findOne(filter);
            console.log(acm);
            const filter1 = {"name":officeLocation};
            let loc1=await locations.findOne(filter1);
           const loc2=loc1._id;
    
            if(acm.officeLocation+""!==loc2+""){
                const filter2 = {"_id":acm.officeLocation};
                let loc=await locations.findOne(filter2);
               if(loc1.occupation+""===""+loc1.capacity){
                return res.status(400).json({msg:"This room is full"});
               }
               else{
                   
                   loc.occupation-=1;
                   loc1.occupation+=1;
                   await loc1.save();
                   await loc.save();
                   
                   const update = {"member_id":id,"email":email,"officeLocation":loc1._id,"role":role,"dayoff":dayoff};
                
                   const result1=await HRModel.findOneAndUpdate(filter,update);
                   res.send(result1);
           
               }
            }
            else{
             
                const update = {"member_id":id,"email":email,"officeLocation":loc1._id,"role":role,"dayoff":dayoff};
               
             const result1=await HRModel.findOneAndUpdate(filter,update);
                console.log(result1);
                  res.send(result1);
            }
            

        }
        const filter = {"member_id":id};
        const acm=await AcademicMemberModel.findOne(filter);
        console.log(acm);
        const filter1 = {"name":officeLocation};

        let loc1=await locations.findOne(filter1);
       const loc2=loc1._id;
        console.log(acm.officeLocation);
        console.log(loc2);
        
        if(acm.officeLocation+""!==loc2+""){
            const filter2 = {"_id":acm.officeLocation};
            let loc=await locations.findOne(filter2);
            console.log(loc1.occupation);
            console.log(loc1.capacity);
           if(loc1.occupation+""===""+loc1.capacity){
            return res.status(400).json({msg:"This room is full"});
           }
           else{
               
               loc.occupation-=1;
               loc1.occupation+=1;
               await loc1.save();
               await loc.save();
               
               const update = {"member_id":id,"email":email,"officeLocation":loc1._id,"role":role,"dayoff":dayoff};
            
               const result1=await AcademicMemberModel.findOneAndUpdate(filter,update);
               res.send(result1);
       
           }
        }
        else{
            const update = {"member_id":id,"email":email,"officeLocation":loc1._id,"role":role,"dayoff":dayoff};
           
         const result1=await AcademicMemberModel.findOneAndUpdate(filter,update);
            console.log(result1);
              res.send(result1);
        }
        
    
    }
        catch (error) {
            return res.status(500).json({error:error.message})
        }
         
});


router.route('/delMem').delete(auth,async(req,res)=>{
    const {error}=dp6(req.body);
    if(error){
        return res.status(400).json(error.details[0].message);
    }
 
    try{     
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
         
        let{id}=req.body; 
        if(id.substring(0,2).localeCompare("hr")==0){
         
            
            const filter2 = {"member_id":id};
         const acm=await HRModel.findOne(filter2)
         if(acm==null){
            return res.status(400).json({msg:"user was deleted"});
         }
         const filter3 = {"_id":acm.officeLocation};
         const loc=await locations.findOne(filter3);
         loc.occupation-=1;
        await loc.save();
        const result=await HRModel.findOneAndDelete(filter2)  
       // console.log(acm);
       // console.log(loc);
         res.send(result);
    
        }
          else{
            const filter2 = {"member_id":id};
         const acm=await AcademicMemberModel.findOne(filter2)
         if(acm==null){
            return res.status(400).json({msg:"user was deleted"});
         }
         const filter3 = {"_id":acm.officeLocation};
         const loc=await locations.findOne(filter3);
         loc.occupation-=1;
         const filter = {"name":acm.department};

         const dep=await  DepartmentModel.findOne(filter);
        console.log(dep);
        await loc.save();
        const result=await AcademicMemberModel.findOneAndDelete(filter2)
         
       // console.log(acm);
       // console.log(loc);
         res.send(result);
    
    }
        }
        catch (error) {
            return res.status(500).json({error:error.message})
        }
         
});

router.route('/addsignup').post(auth,async(req,res)=>{
        
        
    try{    
        const {error}=dp7(req.body);
    if(error){
        return res.status(400).json(error.details[0].message);
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
         
         
        let{staffid,rec}=req.body; 
        const filter3 = {"member_id":staffid};
        if(staffid.substring(0,2).localeCompare("hr")==0){
        let xx=await HRModel.findOne(filter3)
       console.log(xx);
       console.log(xx.attendanceRecord)
        xx.attendanceRecord.push(rec);
       
       res.send(xx.attendanceRecord);
       await xx.save(); 
        }
        else{
            let xx=await AcademicMemberModel.findOne(filter3)
            xx.attendanceRecord.push(rec);
            res.send(xx.attendanceRecord);
            await xx.save(); 
        }

    
    
    }
        catch (error) {
                return res.status(500).json({error:error.message})
        }
         
});

router.route('/viewattandence').get(auth,async(req,res)=>{
        
        
    try{     
      
         
        const {error}=dp6(req.body);
    if(error){
        return res.status(400).json(error.details[0].message);
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
         
         
         let{id}=req.body; 
         const filter3 = {"member_id":id};
         if(id.substring(0,2).localeCompare("hr")==0){
         console.log(id);
            let xx=await HRModel.findOne(filter3)
            console.log(xx);
            res.send(xx.attendanceRecord);    
        
        }
         else{
            let xx=await AcademicMemberModel.findOne(filter3)
            res.send(xx.attendanceRecord);    
         }

        
    }
        catch (error) {
                return res.status(500).json({error:error.message})
        }
         
});



router.route('/updateSalary').get(auth,async(req,res)=>{
        
        
    try{     
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
        let{id,salary1}=req.body; 
        const filter3 = {"member_id":id};
        
        if(id.substring(0,2).localeCompare("hr")==0){
        let crs=await HRModel.findOne(filter3);
        console.log(crs);
        crs.salary=salary1;
        const result=   await crs.save();   
        res.send(result);    
    }
        else{
            let crs=await AcademicMemberModel.findOne(filter3);
            crs.salary=salary1;
         const result=   await crs.save();   
        res.send(result);
        }

    }
    catch (error) {
        return res.status(500).json({error:error.message})
}
 

     
});


module.exports = router;