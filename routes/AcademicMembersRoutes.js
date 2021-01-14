const express = require('express');
const mongoose= require('mongoose');
//const autoIncrement = require('mongoose-auto-increment');
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
const { promises } = require('fs');
const { date } = require('joi');
const { find, findOne } = require('../models/slot');
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
            console.log(verified.staffID.substring().substring(0,2));
            return res.status(401).json({msg:"This functionality is only allowed for academic members only"});
        }
        // console.log(verified);
        req.user=verified.id;
        next();
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}
router.route('/AllCourseSlots').get(auth,async(req,res)=>{
    try {
        const token = req.header('auth-token'); 
        const token_id = jwt.verify(token,"sign").staffID;
        let member = await AcademicMembers.findOne({member_id:token_id});
        let mem_courses = member.courses;
        let output = [];
        for(c of mem_courses)
        {
            let sl = await slots.find({_id:s,course:c,instructor:null});
            output.push.apply(output, sl);
        }
        res.send(output);
    } catch (error) {
        res.status(500).json({error:error.message})
    }
});

router.route('/viewSchedule').get(auth,async(req,res)=>{
    try {
        const token = req.header('auth-token'); 
        const token_id = jwt.verify(token,"sign").staffID;
        member = await AcademicMembers.findOne({member_id:token_id});
        const schedule = member.schedule;
        const Replacement = await requests.find({sender:member._id,state:'Accepted',type:'Replacement'});
        var Theschedule = []; 
        for(element of schedule)
        {
            console.log(element._id);
            const temp = await slots.findOne({_id:element._id});
            //console.log(temp);
            Theschedule.push(temp);
            //console.log(Theschedule);
        };
             
        //console.log(Theschedule);
        res.send(Theschedule);
      
        
        //res.send("There are Accepted Replacement : ")
        //res.send(Replacement);
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
});
router.route('/ViewReplacements').get(auth,async(req,res)=>{
    try {
        const token = req.header('auth-token'); 
        const token_id = jwt.verify(token,"sign").staffID;
        member = await AcademicMembers.findOne({member_id:token_id});
        const Replacements =await  requests.find({sender:member._id,type:'Replacement'});
        res.send(Replacements);
    } catch (error) {
        res.status(500).json({error:error.message})
    }
});

router.route('/SendReplacementRequest').post(auth,async(req,res)=>{// req.body.day
    try {
        const token = req.header('auth-token'); 
        const token_id = jwt.verify(token,"sign").staffID;
        member = await AcademicMembers.findOne({member_id:token_id});
        console.log(member);
        const current_course = await courses.findOne({_id:member.courses[0]});
        const course_members = current_course.academicMembers;//;       
        //console.log(course_members); 
        const newRequest =new requests({
            rid:req.body.rid,
            sender:member._id,
            receiver:[],
            senderComment:req.body.senderComment,
            state:'Pending',
            type:'Replacement',
            requested_day:req.body.day
        });
        for(element of course_members)
            {
            newRequest.receiver.push(element._id);
            }
            newRequest.save()
            res.send(newRequest);
        
    } catch (error) {
        res.status(500).json({error:error.message})
    }
});

router.route('/SendSlotLinkingRequest').post(auth,async(req,res)=>{// req.body {slot_id}
    try {
        const token = req.header('auth-token'); 
        const token_id = jwt.verify(token,"sign").staffID;
        const member = await AcademicMembers.findOne({member_id:token_id});
       const slot_id = req.body.slot_id;
        if(!slot_id)
            return res.status(401).json({msg:"invalid inputs"});
       const theslot = await slots.findOne({sid:slot_id});
        const course = await courses.findOne({_id:theslot.course});// not needed
        const coordinator = await course.coordinator;
        const tempID = new mongoose.Schema.Types.ObjectId(member._id);
        const newRequest =new requests({
            rid:req.body.rid,
            sender:member._id,
            receiver:[],
            senderComment:req.body.senderComment,
            state:'Pending',
            type:'Slot-linking',
            slot: theslot._id
        });
        console.log(member._id);
        console.log(tempID);
        newRequest.receiver.push(coordinator._id);
        //newRequest.sender = {_id:member._id};
        //newRequest.update({sender:member._id});
        console.log(newRequest.sender);
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
        const member = await AcademicMembers.findOne({member_id:token_id});
        const newDay = req.body.day;
        //const Thereason = req.body.reason;
        const HOD =await Departments.findOne({name:member.department}).HOD;
        const newRequest =new requests({
            sender:member._id,
            receiver:[],//HOD._id,
            state:'Pending',
            type:'dayOffChange',
            newDayoff: newDay,
            senderComment:req.body.senderComment
        });
        newRequest.receiver.push(HOD._id);
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
        const member = await AcademicMembers.findOne({member_id:token_id});
        let output;
        if(req.params.status.toLocaleLowerCase() === 'accepted')
            output = await requests.find({sender:member._id,state:'Accepted'});
        else if(req.params.status.toLocaleLowerCase() === 'pending')
            output =await  requests.find({sender:member._id,state:'Pending'});
        else if(req.params.status.toLocaleLowerCase() === 'rejected')
            output = await requests.find({sender:member._id,state:'Rejected'});
        else
            output = await requests.find({sender:member._id});

        res.send(output);
    } catch (error) {
        res.status(500).json({error:error.message})
    }
});

router.route('/SubmitLeaveRequest').post(auth,async(req,res)=>{// req.body {type, reason , day , duration}
    try {
        const token = req.header('auth-token'); 
        const token_id = jwt.verify(token,"sign").staffID;
        const member = await AcademicMembers.findOne({member_id:token_id});
        const dept_name = member.department;
        const Thedepartment = await Departments.findOne({name:dept_name});
        const TheHead_id = Thedepartment.HOD;
        const today = new date();
        //console.log("ffff");
        if(req.body.type.localeCompare("Annual") == 0 && req.body.day < today)
            return res.status(401).json({msg:"you can use annual leaves for only comming days"});
        if(req.body.type.localeCompare("Compensation") == 0 && !req.body.reason)
            return res.status(401).json({msg:"You need to specify the reason"});
          //  console.log("ffff");
        const newRequest =new requests({
            rid:req.body.rid,
            sender:member._id,
            receiver:[],
            senderComment:req.body.reason,
            state:'Pending',
            type:req.body.type,
            requested_day:req.body.day,
            duration:req.body.duration
        });
        //console.log(member._id);
        newRequest.receiver.push(TheHead_id);
        //console.log(newRequest.sender);
        await newRequest.save();
        res.send(newRequest);
    } catch (error) {
        res.status(500).json({error:error.message})
    }

});

router.route('/DeleteRequest').delete(auth,async(req,res)=>{ // req.body.request_id
    try {
        const token = req.header('auth-token'); 
        const token_id = jwt.verify(token,"sign").staffID;
        const member = await AcademicMembers.findOne({member_id:token_id});
        let r;
        r = await requests.findOne({rid:req.body.request_id});
        const todaydate = new Date();
        let deleted;//console.log(member);
        //console.log(r.sender);
        //console.log(member._id);
        if(r.sender.localeCompare(member._id) != 0)
            return res.status(401).json({msg:"Sorry you can not delete this request"}); 

        if(r.state == 'Pending' || r.requested_day < todaydate)
             deleted =  await requests.findOneAndDelete({rid:req.body.request_id});
        
        res.send("request deleted successfully !!");
    } catch (error) {
        res.status(500).json({error:error.message})
    }
});
module.exports = router;