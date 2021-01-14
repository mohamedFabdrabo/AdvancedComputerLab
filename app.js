const express=require('express');
const mongoose=require('mongoose');

const AllStaffRoutes = require('./routes/StaffMembersRoutes');
const HrRoutes = require('./routes/HrRoutes');
const HODRoutes = require('./routes/HODRoutes');
const AllAcademicsRoutes = require('./routes/AcademicMembersRoutes'); 
const CourseCoordinatorRoutes = require('./routes/CourseCoordinatorRoutes'); 
const counter = require('./models/counter');
var cors = require("cors");
const corsOptions={
origin :
[
"http://localhost:5000",
"http://localhost:3000",
"http://127.0.0.1",
],
credentials : true,
exposedHeaders:["set-cookie"],
};

credentials:true
const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
//app.use(cors());

app.use('/',cors(corsOptions),AllStaffRoutes);
app.use('/',cors(corsOptions),HrRoutes);
app.use('/',cors(corsOptions),HODRoutes);
app.use('/Academics',cors(corsOptions),AllAcademicsRoutes);
app.use('/coordinator',cors(corsOptions),CourseCoordinatorRoutes);

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


<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> parent of 2c47eda... fathy-hashing-done
app.listen(3000);

>>>>>>> parent of 2c47eda... fathy-hashing-done
module.exports=app;


