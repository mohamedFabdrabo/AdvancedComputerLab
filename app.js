const express=require('express');
const mongoose=require('mongoose');

const AllStaffRoutes = require('./routes/StaffMembersRoutes');
<<<<<<< Updated upstream
const AllHRRoutes = require('./routes/HrRoutes');
=======
const AllHrRoutes = require('./routes/hrRoutes');
>>>>>>> Stashed changes

const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use('/',AllStaffRoutes);
<<<<<<< Updated upstream
app.use('/',AllHRRoutes);
=======
app.use('/hr',AllHrRoutes);
>>>>>>> Stashed changes

app.listen(3000);

module.exports=app;


