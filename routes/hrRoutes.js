const express = require('express');
const jwt=require('jsonwebtoken');
const jwtBlacklist = require('jwt-blacklist')//(jwt);
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
          const fac = new faculties({
            
   
    "name": "civil"
    
        })
       const savedFaculty= await fac.save();
        res.json(savedFaculty);
        }
        
     catch (error) {
        res.status(500).json({error:error.message})
    }
});
router.route('/addDepartment').post(async(req,res)=>{
    try {
          const fac = new Departments({
            
   
    "name": "general4"
    
        })
       const myfac= await faculties.findOne({"name":"civil"});
       const dep =myfac.departments;
      // dep.push(fac);
       console.log(myfac);

       const savedFaculty= await myfac.save();
        res.json(savedFaculty);
        }
        
     catch (error) {
        res.status(500).json({error:error.message})
    }
});

//{"name":"H9",
//"type":"hall",
//"capacity":"500"
//}
