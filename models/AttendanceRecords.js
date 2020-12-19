const mongoose = require('mongoose');
const month = mongoose.Schema({
    year: Number,
    monthNumber :{type: Number},
    totalHours : {type :Number},
    days :[daySchema]
});
                                              //adding year maybe
const daySchema = mongoose.Schema({
    dayNumber : {type:Number},
    name : {type:String},
    SignInOut :[signSchema]
});

const signSchema = mongoose.Schema({
    time : {type : Date},
    signIn : {type : Boolean}
});

module.exports = mongoose.model("month","month");
module.exports = mongoose.model("daySchema","daySchema");
module.exports = mongoose.model("signSchema","SignSchema");
