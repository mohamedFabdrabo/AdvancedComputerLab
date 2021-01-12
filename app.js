const express=require('express');
const mongoose=require('mongoose');

const AllStaffRoutes = require('./routes/StaffMembersRoutes');
const HrRoutes = require('./routes/HrRoutes');
const HODRoutes = require('./routes/HODRoutes');
const AllAcademicsRoutes = require('./routes/AcademicMembersRoutes'); 
const CourseCoordinatorRoutes = require('./routes/CourseCoordinatorRoutes'); 
const counter = require('./models/counter');
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/',AllStaffRoutes);
app.use('/',HrRoutes);
app.use('/',HODRoutes);
app.use('/Academics',AllAcademicsRoutes);
app.use('/coordinator',CourseCoordinatorRoutes);

/*try{
var newC = new counter({name:"rid"});
newC.save();
var newC = new counter({name:"sid"});
newC.save();
var newC = new counter({name:"hr"});
newC.save();
var newC = new counter({name:"ac"});
newC.save();
var newC = new counter({name:"cid"});
newC.save();
}catch(error)
{
    console.log("counters already created");
}*/


//app.listen(3000);

module.exports=app;


