const express = require('express');
const jwt=require('jsonwebtoken');
const jwtBlacklist = require('jwt-blacklist')//(jwt);
const courses = require('../models/course');
const AcademicMembers = require('../models/AcademicMemberModel');
const Departments = require('../models/DepartmentModel');
const requests = require('../models/request');
const slot = require('../models/slot');
const router = express.Router();
const Joi = require("joi");
const { response } = require('../app');
module.exports = router;
const auth=(req,res,next)=>{
    try {
        const token=req.header('auth-token');
        if(!token){
            return res.status(401).json({msg:"byo byo authority"});
        }
        
        const jwt_pass="sign";
        const verified=jwt.verify(token,jwt_pass);
        if(!verified){
            return res.status(401).json({msg:"byo byo not verified"});
        }

        // console.log(verified);
        req.user=verified.id;
        next();
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}
//functionality 1 add course instructor
router.route('/addInstructor/:name/:course').put(auth,async(req,res)=>{
    
    //router.post('/instructor',auth,async(req,res)=>{
    try {
        const token = req.header('auth-token'); 
        const token_id = jwt.verify(token,"sign").staffID;
        const user = await AcademicMembers.findOne({id:token_id}).catch(e => { console.error(e)});
        if(user.role!="HOD"){
        res.json("access denied")
            }   
        const depname = user.department;
        const mydepm = await Departments.findOne({name:depname});
        const mycourses= mydepm.courses;
        const mymembers=mydepm.academicmem;
        let mycourse;
        let myinstructor;
        mymembers.forEach((element, index,arr)=>{
            if(req.params.name==element.name){
                 myinstructor = element;}});

        mycourses.forEach((element, index,arr)=>{
                if(req.params.course==element.name){
                     mycourse = element;
                    element.instructors.push(myinstructor);     
                    element.academicMembers.push(myinstructor);
                }});
        
        if(!myinstructor){   
           res.json("no staff member with this name in your department");           
        }
         if(!mycourse){   
            res.json("no course with this name in your department");           
        }
                 console.log(mycourse);  
                 console.log(mydepm);        
      
                //const saveddep=mydepm.save();
                //const savedcos=mycourse.save();
               // const saveddep=mydepm.save();
                res.json();
 } 
    catch (error) {
        res.json({message:error})
    }
});

router.route('/deleteInstructor').put(auth,async(req,res)=>{
    
    //router.post('/instructor',auth,async(req,res)=>{
    try {
        const token = req.header('auth-token'); 
        const token_id = jwt.verify(token,"sign").staffID;
      
        let ouput;
       
       // if(token_id.substring(0,2).localeCompare("ac") == 0)
      //  if(AcademicMembers.find({id:token_id}).role.localeCompare("HOD"))
            output = await courses.findOneAndUpdate({name:req.params.name}, {instructors :null},{useFindAndModify: false});
           // const savedcourse= await ouput.save();
                //res.json(ouput);
              
        
        res.send(output);  
    } 
    catch (error) {
        res.json({message:error})
    }
});


//functionality 2 view staff in his department or per course 
router.route('/viewStaff/:name').get(auth,async(req,res)=>{
    
    try {const token = req.header('auth-token'); 
    const token_id = jwt.verify(token,"sign").staffID;
    const user = await AcademicMembers.findOne({id:token_id}).catch(e => { console.error(e)});
    if(user.role!="HOD"){
        res.json("access denied")
        }   
        const depname = user.department;
        const mydepm = await Departments.findOne({name:depname});
        let staff= mydepm.academicmem;
        let found =false
        if(req.params.name!="all"){
            mydepm.courses.forEach((mycourse, index,arr)=>{
                if(req.params.name==mycourse.name){
                staff=mycourse.academicMembers;
                found =true;
                    }
            });
        }
        if(req.params.name!="all"){
            if(!found)
            res.json("no course with this name in your department");
            else
            res.json(staff);

        }
        res.json(staff)
      
    } 
    catch (error) {
        res.status(500).json({error:error.message})
      // console.error(error)
       //process.exit(1)
    }

})


//functionality 3 View the day off of all the staff/ a single staff in his/her department
router.route('/viewDaysoff/:name').get(auth,async(req,res)=>{
    
    try {
        const token = req.header('auth-token'); 
        const token_id = jwt.verify(token,"sign").staffID;
        const user = await AcademicMembers.findOne({id:token_id}).catch();
        if(user.role!="HOD"){
            res.json("access denied")
            }   
        const depname = user.department;
        const mydepm = await Departments.findOne({name:depname});
        let staff= mydepm.academicmem;
        var days =[]
        let found =false;
        staff.forEach((member, index, arr) =>{ 
            const dayoff =member.dayoff;
            const name= member.name;
            if(req.params.name=="all"){
           days.push({name,dayoff});
        }
        else{
            if(req.params.name==member.name){
                found=true;
                days.push({name,dayoff});
        }
        }
        
        });
            
        if(req.params.name!="all"){
            if(!found)
            res.send("no staff member with this name in your department");
            else
            res.send(days[0]);

        }
        res.send(days);
      
    } 
    catch (error) {
        res.json({message:error})
    }
});



//functionality 4  View all the requests “change day off/leave” sent by staff members in his/her department.
router.route('/DayoffRequests').get(auth,async(req,res)=>{
    
    try {
       
        const token = req.header('auth-token'); 
        const token_id = jwt.verify(token,"sign").staffID;
        const user = AcademicMembers.findOne({id:token_id});
        const reqs= requests.filter((request) => request.type =='dayOffChange'&&request.state !='Cancelled' && request.sender.Department==user.Department);
        
       

        res.send(reqs);
      
    } 
    catch (error) {
        res.json({message:error})
    }
});

//functionality 5 Accept  a request

router.post('/AcceptDayoffRequests').get(auth,async(req,res)=>{
    
    try {
       
        const token = req.header('auth-token'); 
        const token_id = jwt.verify(token,"sign").staffID;
        const user = AcademicMembers.findOne({id:token_id});
        const request = equests.findOne({id:req.params.id});
        requests.findOneAndUpdate({id:req.params.id},{state:'Accepted'});
        request.sender.dayoff.dayoff=req.params.day;
      
    } 
    catch (error) {
        res.json({message:error})
    }
});


//functionality 6 Reject  a request
router.post('/RejectDayoffRequests').get(auth,async(req,res)=>{
    
    try {
       
        const token = req.header('auth-token'); 
        const token_id = jwt.verify(token,"sign").staffID;
        const user = AcademicMembers.findOne({id:token_id});
        const request = equests.findOne({id:req.params.id});
        requests.findOneAndUpdate({id:req.params.id},{state:'Rejected', reason:req.params.reason});      
    } 
    catch (error) {
        res.json({message:error})
    }
});


//functionality 7 view course coverage 
router.route('/courseCoverage/:name').get(auth,async(req,res)=>{
    try {
       
        const token = req.header('auth-token'); 
        const token_id = jwt.verify(token,"sign").staffID;
        const user = await AcademicMembers.findOne({id:token_id});
        if(user.role!="HOD"){
            res.json("access denied")
            }   
        const depname = user.department;
        const mydepm = await Departments.findOne({name:depname});
        let result ;
        let found =false;
        const mycourses= mydepm.courses;
        mycourses.forEach((mycourse, index, arr) =>{  
                 if(mycourse.name==req.params.name){
                    result = mycourse.coverage;
                    found = true
                 }
                  
        });
        if(found)
        res.json(req.params.name +" : "+result );  
        else
        res.json("course was not found in your department");
    } 
    catch (error) {
        res.json({message:error})
    } 
});


//funvtionality 8 view course assignments 
router.route('/courseAssignment').get(auth,async(req,res)=>{
    
    try {
        const token = req.header('auth-token'); 
        const token_id = jwt.verify(token,"sign").staffID;
        const course= courses.findOne({name:req.params.name});
        const view=[];
        const output =course.academicMembers.forEach((member, index, arr) =>{ 
            const slots=member.schedule.forEach((slot,index,arr)=>{
                if(slot.course==req.params.name){
                const day =slot.day;
                const name= member.name;
                const time= slot.timing;
                view.push({day,name,time});}
            })
            const day =member.dayoff;
            const name= member.name;
            });


        res.send(view);
      

        
      
              
        
        res.send(course.coverage);  
    } 
    catch (error) {
        res.json({message:error})
    }
});


/*router.route('/test').get(auth,async(req,res)=>{
    
   console.log("ooooooo")
});


 const loginSchema = Joi.object({
            email : Joi.string().email().required(),
            password : Joi.string().required()
        })
        const result = loginSchema.validate(req.body);
        if(result)
        {
            return res.json(result.error.details);
        }else{
            اكتب هنا .. كدا هو عدى تمام
        } */