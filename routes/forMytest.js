const express = require('express');
const jwt=require('jsonwebtoken');
const AcademicMemberModel = require('../models/AcademicMemberModel');
const Departments = require('../models/DepartmentModel');
const faculties = require('../models/facultyModel');
const locations = require('../models/location');
const router = express.Router();
module.exports = router;
router.route('/addLocation').post(async(req,res)=>{
    try {
          const loc = new locations(
              {name:req.body.name,
               
                capacity:req.body.capacity,
                type:req.body.type,
                occupation:req.body.occupation  
        })
       const saveLocation= await loc.save();
        res.json(saveLocation);
        }
        
     catch (error) {
        res.status(500).json({error:error.message})
    }
});

router.route('/deleteLocation').delete(async(req,res)=>{
    try {
          const result= await locations.deleteOne({name:req.params.name});
          res.send(result);
    }
     catch (error) {
        res.status(500).json({error:error.message})
    }
});
router.route('/updateLocation').put(async(req,res)=>{
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

      
        const m =await AcademicMemberModel.find({member_id:"ac-15"})
        const n =await AcademicMemberModel.find({member_id:"ac-25"})
        const b =await AcademicMemberModel.find({member_id:"ac-27"})
        const dep =new Departments({name:"bio"})
        console.log(n)
        dep.academicmem.push(b)
        dep.academicmem.push(m)
        dep.academicmem.push(n)
        console.log(dep.academicmem)

        dep.save()
        res.json(dep);
        }
        
     catch (error) {
        res.status(500).json({error:error.message})
    }
});
router.route('/addDepartment').post(async(req,res)=>{
    try {



        }
        
     catch (error) {
        res.status(500).json({error:error.message})
    }
});


