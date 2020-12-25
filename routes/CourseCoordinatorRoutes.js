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
        //const member = await AcademicMembers.findOne({id:verified.staffID});

        // console.log(verified);
        req.user=verified.id;
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
        const member = await AcademicMembers.findOne({member_id:token_id});
        const thisCourse = await courses.findOne({coordinator:member._id});
        if(!thisCourse)
            return res.status(401).json({msg:"Sorry you are not course coordinator"});
        
        Slot_Linking_Requests = await requests.find({
            type:'Slot-linking',
            receiver:{_id:member._id} 
        });
        res.send(Slot_Linking_Requests);
    } catch (error) {
        res.status(500).json({error:error.message})
    }
});

router.route('/acceptSlotLinking').put(auth,async(req,res)=>{
    try {
        const token = req.header('auth-token'); 
        const token_id = jwt.verify(token,"sign").staffID;
        member = await AcademicMembers.findOne({member_id:token_id});
        const thisCourse = await courses.findOne({coordinator:member._id});
        if(!thisCourse)
            return res.status(401).json({msg:"Sorry you are not course coordinator"});
0
        Slot_Linking_Requests = await requests.findOneAndUpdate(
            {rid:req.body.request_id,type:'Slot-linking',state:'Pending',receiver:{_id:member._id}}
                ,{state:'Accepted'},
                {
                    returnOriginal: false
                  });

        //console.log(Slot_Linking_Requests);        
        if(!Slot_Linking_Requests) return res.status(401).json({msg:"request not found"});

        const sender_id = Slot_Linking_Requests.sender;
        const slot_id = Slot_Linking_Requests.slot;
        console.log(slot_id);
        const TheSender = await AcademicMembers.findOneAndUpdate({_id:sender_id},
            { $push: {schedule:{_id:slot_id}} });
        const updatedSlot = await slots.findOneAndUpdate({_id:slot_id},
            { instructor:TheSender._id});
        res.send(Slot_Linking_Requests);

    } catch (error) {
        res.status(500).json({error:error.message})
    }
});


router.route('/rejectSlotLinking').put(auth,async(req,res)=>{
    try {
        const token = req.header('auth-token'); 
        const token_id = jwt.verify(token,"sign").staffID;
        const member = await AcademicMembers.findOne({member_id:token_id});
        const thisCourse = await courses.findOne({coordinator:member._id});
        if(!thisCourse)
            return res.status(401).json({msg:"Sorry you are not course coordinator"});
        Slot_Linking_Requests = await requests.findOneAndUpdate(
            {rid:req.body.request_id,type:'Slot-linking',receiver:{_id:member._id},state:'Pending'}
                ,{state:'Rejected'},
                {
                    returnOriginal: false
                  });   
        res.send(Slot_Linking_Requests);
    } catch (error) {
        res.status(500).json({error:error.message})
    }
});

router.route('/AddSlot').post(auth,async(req,res)=>{
    try {
        const token = req.header('auth-token'); 
        const token_id = jwt.verify(token,"sign").staffID;
        const member = await AcademicMembers.findOne({member_id:token_id});
        const thisCourse = await courses.findOne({coordinator:member._id});
        if(!thisCourse)
            return res.status(401).json({msg:"Sorry you are not course coordinator"});
        //console.log("SYSOSOS");    
        const newSlot = new slots({
            course:req.body.course,
            sid:req.body.sid,//id to be done
            day:req.body.day,
            timing:req.body.timing,
            type:req.body.type,
            location:req.body.location
        });
        //console.log("SYSOSOS");
        await newSlot.save();
        res.send(newSlot);
        //console.log("SYSOSOS");
    } catch (error) {
        res.status(500).json({error:error.message})
    }
});

router.route('/deleteSlot').delete(auth,async(req,res)=>{
    try {
        const token = req.header('auth-token'); 
        const token_id = jwt.verify(token,"sign").staffID;
        const member = await AcademicMembers.findOne({member_id:token_id});
        const thisCourse = await courses.findOne({coordinator:member._id});
        if(!thisCourse)
            return res.status(401).json({msg:"Sorry you are not course coordinator"});

        const deleted = await slots.findOneAndDelete({
            sid:req.body.sid, 
        });
        res.send(deleted);
    } catch (error) {
        res.status(500).json({error:error.message})
    }
});
router.route('/updateSlot').put(auth,async(req,res)=>{   
    try {
        const token = req.header('auth-token'); 
        const token_id = jwt.verify(token,"sign").staffID;
        const member = await AcademicMembers.findOne({member_id:token_id});
        const thisCourse = await courses.findOne({coordinator:member._id});
        if(!thisCourse)
            return res.status(401).json({msg:"Sorry you are not course coordinator"});
        const updated = await slots.findOneAndUpdate({
            sid:req.body.sid,
        },
        {
            day:req.body.day,
            timing:req.body.timing,
            type:req.body.type,
            location:req.body.location
        },
        {
            returnOriginal: false
          });
        res.send(updated);
    } catch (error) {
        res.status(500).json({error:error.message})
    }
});

