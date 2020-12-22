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
const DepartmentModel = require('../models/DepartmentModel');
const { RSA_NO_PADDING } = require('constants');
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
        if(verified.staffID.substring().substring(0,2).localeCompare("ac") != 0)
        {
            return res.status(401).json({msg:"This functionality is only allowed for academic members only"});
        }
        const member = await AcademicMembers.findOne({id:verified.staffID});
        const thisCourse = await courses.find({coordinator:member});
        if(!thisCourse)
        return res.status(401).json({msg:"Sorry you are not course coordinator"});
        // console.log(verified);
        req.user=verified.id;
        req.TheCourse = thisCourse;
        next();
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}
module.exports = router;
    

router.route('/viewSlotLinking').get(auth,async(req,res)=>{
    try {
        const token = req.header('auth-token'); 
        const token_id = jwt.verify(token,"sign").staffID;
        member = await AcademicMembers.find({id:token_id});
        Slot_Linking_Requests = await requests.find({type:'Slot-linking',receiver:member});
        res.send(Slot_Linking_Requests);
    } catch (error) {
        res.status(500).json({error:error.message})
    }
});

router.route('/viewSlotLinking').get(auth,async(req,res)=>{
    try {
        const token = req.header('auth-token'); 
        const token_id = jwt.verify(token,"sign").staffID;
        member = await AcademicMembers.find({id:token_id});
        
        
    } catch (error) {
        res.status(500).json({error:error.message})
    }
});
