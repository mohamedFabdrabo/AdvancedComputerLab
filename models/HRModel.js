const mongoose=require('mongoose');
const Schema   = mongoose.Schema ;
const locationModel = require('./location.js').schema;
autoIncrement = require('mongoose-auto-increment');

const connection =  mongoose.createConnection('mongodb+srv://mfathy19:mfathy19@cluster0.mfjyt.mongodb.net/f1?retryWrites=true&w=majority'
,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}
);
autoIncrement.initialize(connection);

const HR=mongoose.Schema({
    name: String,
    email:{type:String,required:true,unique:true,sparse:true},
    id:{type:String,unique:true,sparse:true},
    salary:Number,
    leaveBalance: Number,
    gender:String,
    count1:Number,
    role: {type:String,required:true},
    dayoff:String,
   
    password:{type:String,required:true,minlength:5},
    officeLocation:{type:Schema.Types.ObjectId ,ref:"location"},
    attendanceRecord:[{   time : {type : Date}, signIn : {type : Boolean} }] ,
  
});
HR.plugin(autoIncrement.plugin, {model:"HR",field: 'count1',startAt: 1});

module.exports=mongoose.model("HR",HR);

/*const leaves = mongoose.Schema({
    time : {type : Date},
    signIn : {type : Boolean}
});*/
/*leaves:[{ day:Date,
    LeaveType:{enum : ['Accidental','Maternity','Annual','Compensation','Sick']}}]*/