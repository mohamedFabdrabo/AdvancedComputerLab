const express=require('express');
const mongoose=require('mongoose');

const AllStaffRoutes = require('./routes/StaffMembersRoutes');
const AllHRRoutes = require('./routes/HrRoutes');

const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use('/',AllStaffRoutes);
app.use('/',AllHRRoutes);

app.listen(3000);

module.exports=app;


