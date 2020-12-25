const express=require('express');
const mongoose=require('mongoose');

const AllStaffRoutes = require('./routes/StaffMembersRoutes');
const HrRoutes = require('./routes/forMytest');
const HODRoutes = require('./routes/HODRoutes');
const AllAcademicsRoutes = require('./routes/AcademicMembersRoutes'); 
const CourseCoordinatorRoutes = require('./routes/CourseCoordinatorRoutes'); 
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use('/',AllStaffRoutes);
app.use('/',HrRoutes);
app.use('/',HODRoutes);
app.use('/Academics',AllAcademicsRoutes);
app.use('/coordinator',CourseCoordinatorRoutes);

app.listen(3000);

module.exports=app;


