const mongoose = require('mongoose');
const Schema   = mongoose.Schema ;
const attendanceSchema = mongoose.Schema({
    records:[{
        time : {type : Date},
        signIn : {type : Boolean}
    }]
});


module.exports=mongoose.model("attendanceSchema",attendanceSchema);
