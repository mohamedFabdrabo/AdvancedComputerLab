const express = require('express');
const jwt=require('jsonwebtoken');
const jwtBlacklist = require('jwt-blacklist')//(jwt);
const courses = require('../models/course');
const AcademicMembers = require('../models/AcademicMemberModel');
const router = express.Router();
module.exports = router;
const auth=(req,res,next)=>{
    try {
        const token=req.header('auth-token');
        if(!token){
            return res.status(401).json({msg:"byo byo authority"});
        }
        
        const jwt_pass="sign";
        const verified=jwtBlacklist.verify(token,jwt_pass);
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
//router.route('/instructor').post("/:courseName",auth,async(req,res)=>{
    router.post('/instructor',auth,async(req,res)=>{
    try {
        const token = req.header('auth-token'); 
        const token_id = jwt.verify(token,"sign").staffID;
        console.log(token_id);
        console.log(token_id.substring(0,2));
        console.log(token_id.substring(0,2).localeCompare("hr"));
        let ouput;
       
        if(token_id.substring(0,2).localeCompare("ac") == 0)
        if(AcademicMembers.find({id:token_id}).role.localeCompare("HOD"))
            {output = await courses.findOneAndUpdate({name:req.params.name}, req.body, {new: true});
                
                }
        
        res.send(output);  
    } catch (error) {
        res.status(500).json({error:error.message})
    }
});