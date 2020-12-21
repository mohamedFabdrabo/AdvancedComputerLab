const {app}=require('./app');
const mongoose = require('mongoose');
//app.use(express.json());
//app.use(express.urlencoded({extended:false}));

const connectionParams={
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
}
const url="mongodb+srv://mfathy19:mfathy19@cluster0.mfjyt.mongodb.net/f1?retryWrites=true&w=majority";


mongoose.connect(url,connectionParams).then(()=>{
    console.log("OKKK");
}).catch(()=>{
    console.log("error");
});

//app.listen(3000)
/*
const x= require('./models/AcademicMemberModel.js');//academic member
const newMember= new x({
    email:"test@email.com",
    password:"mypass",
    id: "ac-5"
}).save();
//const MemberSaved =  newMember.save();*/
/*const deps = require('./models/DepartmentModel');
const x= require('./models/AcademicMemberModel.js');//academic member

const mydep =deps.findOne({name:"cs"});
mydep.HOD=x.findOne({name:"myHOD"});*/

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);