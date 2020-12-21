const express=require('express');
const mongoose=require('mongoose');

const AllStaffRoutes = require('./routes/StaffMembersRoutes');
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< Updated upstream
const AllHRRoutes = require('./routes/HrRoutes');
=======
const AllHrRoutes = require('./routes/hrRoutes');
>>>>>>> Stashed changes

=======
>>>>>>> parent of e7733f6... s
=======
>>>>>>> parent of e7733f6... s
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use('/',AllStaffRoutes);
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< Updated upstream
app.use('/',AllHRRoutes);
=======
app.use('/hr',AllHrRoutes);
>>>>>>> Stashed changes

=======
>>>>>>> parent of e7733f6... s
=======
>>>>>>> parent of e7733f6... s
app.listen(3000);

module.exports=app;


