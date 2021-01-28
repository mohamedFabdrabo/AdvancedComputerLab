const express=require('express');
const mongoose=require('mongoose');
const path=require('path');

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

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
  });

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


//app.listen(3000);


module.exports=app;


