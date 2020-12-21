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

router.route('/addLocation1').post(auth,async(req,res)=>{
    try {
        console.log("weoo")
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
router.put('/:name',async(req,res)=>{
    try {
          const result= await locations.findOneAndUpdate({name:req.params.name},req.body,{new:true});
          res.send(result);
    }
     catch (error) {
        res.status(500).json({error:error.message})
    }
});
router.route('/viewLocations').get(async(req,res)=>{
    try {
          const result= await locations;
          res.send(result);
    }
     catch (error) {
        res.status(500).json({error:error.message})
    }
});
router.route('/addFaculty').post(async(req,res)=>{
    try {
          const loc = new faculties(
              {name:req.body.name,
              Departments:req.body.Departments 
        })
       const savedFaculty= await loc.save();
        res.json(savedFaculty);
        }
        
     catch (error) {
        res.status(500).json({error:error.message})
    }
});
module.exports = router;

//{"name":"H9",
//"type":"hall",
//"capacity":"500"
//}