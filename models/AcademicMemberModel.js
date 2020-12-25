const mongoose=require('mongoose');
const Schema   = mongoose.Schema ;
//const mongoose = require('mongoose')
autoIncrement = require('mongoose-auto-increment');

const connection =  mongoose.createConnection('mongodb+srv://mfathy19:mfathy19@cluster0.mfjyt.mongodb.net/f1?retryWrites=true&w=majority'
,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}
);
autoIncrement.initialize(connection);

const slot = require('./slot.js').schema;
const AM = mongoose.Schema({
    name: String,
    gender:String,
    email:{type:String,required:true,unique:true,sparse:true},
    member_id: { type: String, unique: true, sparse: true },
    salary:Number,
    password:{type:String,required:true,minlength:5},
   officeLocation:{type:Schema.Types.ObjectId ,ref:"location"},
    attendanceRecord:[{   time : {type : Date}, signIn : {type : Boolean} }] ,
    role: {type:String,required:true},
    count1:Number,

    leaveBalance: Number,  
    accidental: { type: Number, default: 6 },
    
    dayoff:String,
    courses:[[{type:Schema.Types.ObjectId ,ref:"CO"}]],
    faculty:{type:String},
    department:{type:String},
    schedule:[slot],
    leaves: [{
        day: Date,
        LeaveType: String
    }]


});
AM.plugin(autoIncrement.plugin, {model:"AM",field: 'count1',startAt: 1});

module.exports = mongoose.model("AM", AM);
