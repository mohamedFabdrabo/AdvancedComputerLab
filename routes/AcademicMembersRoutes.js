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
        // console.log(verified);
        req.user=verified.id;
        next();
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

router.route('/viewSchedule').get(auth,async(req,res)=>{
    try {
        const token = req.header('auth-token'); 
        const token_id = jwt.verify(token,"sign").staffID;
        member = await AcademicMembers.find({id:token_id});
        const schedule = member.schedule;
        const Replacement = requests.find({sender:member._id,state:'Accepted',type:'Replacement'});
        res.send(schedule);
        res.send("There are Accepted Replacement : ")
        res.send(Replacement);
    } catch (error) {
        res.status(500).json({error:error.message})
    }
});
router.route('/ViewReplacements').get(auth,async(req,res)=>{
    try {
        const token = req.header('auth-token'); 
        const token_id = jwt.verify(token,"sign").staffID;
        member = await AcademicMembers.find({id:token_id});
        const Replacements = requests.find({sender:member,type:'Replacement'});
        res.send("The Replacement Requests : ")
        res.send(Replacement);
    } catch (error) {
        res.status(500).json({error:error.message})
    }
});

router.route('/SendSlotLinkingRequest').post(auth,async(req,res)=>{
    try {
        const token = req.header('auth-token'); 
        const token_id = jwt.verify(token,"sign").staffID;
        const member = await AcademicMembers.find({id:token_id});
       const slot_id = req.body.slot_id;
        const course = req.body.coursename;// not needed
        if(!slot_id || !course)
            return res.status(401).json({msg:"invalid inputs"});
        const coordinator = await course.find({name:course}).coordinator;

        const newRequest =new requests({
            sender:member._id,
            receiver:coordinator._id,
            state:'Pending',
            type:'Slot-linking',
            slot: await slots.find(slot_id),
        });
        await newRequest.save();
        res.send(newRequest);
    } catch (error) {
        res.status(500).json({error:error.message})
    }
});
router.route('/ChangeDayoffRequest').post(auth,async(req,res)=>{
    
    try {
        const token = req.header('auth-token'); 
        const token_id = jwt.verify(token,"sign").staffID;
        const member = await AcademicMembers.find({id:token_id});
        const newDay = req.body.day;
        const Thereason = req.body.day.reason;
        const HOD = Departments.find({name:member.department}).HOD;
        const newRequest =new requests({
            sender:member,
            receiver:HOD,
            state:'Pending',
            type:'Change-Dayoff',
            newDayoff: newDay,
            reason:Thereason
        });
        await newRequest.save();
        res.send(newRequest);
    } catch (error) {
        res.status(500).json({error:error.message})
    }
});

router.route('/ViewRequests/:status').get(auth,async(req,res)=>{
    try {
        const token = req.header('auth-token'); 
        const token_id = jwt.verify(token,"sign").staffID;
        const member = await AcademicMembers.find({id:token_id});
        let output;
        if(req.params.status.toLocaleLowerCase() === 'accepted')
            output = await requests.find({sender:member,state:'Accepted'});
        else if(req.params.status.toLocaleLowerCase() === 'pending')
            output =await  requests.find({sender:member,state:'Pending'});
        else if(req.params.status.toLocaleLowerCase() === 'rejected')
            output = await requests.find({sender:member,state:'Rejected'});
        else
            output = await requests.find({sender:member});

        res.send(output);
    } catch (error) {
        res.status(500).json({error:error.message})
    }
});
module.exports = router;

router.route('/DeleteRequest').delete(auth,async(req,res)=>{
    try {
        const token = req.header('auth-token'); 
        const token_id = jwt.verify(token,"sign").staffID;
        const member = await AcademicMembers.find({id:token_id});
        let r;
        r = await requests.findById(req.body.request);
        const todaydate = new Date();
        let deleted;
        if(r.state == 'Pending' || r.requested_day < todaydate)
             deleted =  await requests.findById(req.body.request);
        
    } catch (error) {
        res.status(500).json({error:error.message})
    }
});
module.exports = router;