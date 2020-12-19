const mongoose = require('mongoose');

const signSchema = mongoose.Schema({
    time : {type : Date},
    signIn : {type : Boolean}
});


const daySchema = mongoose.Schema({
    dayNumber : {type:Number},
    name : {type:String},
    SignInOut :[signSchema]
});

const month = mongoose.Schema({
    year: Number,
    monthNumber :{type: Number},
    totalHours : {type :Number},
    days :[daySchema]
});
module.exports = mongoose.model("signSchema",signSchema);
module.exports = mongoose.model("daySchema",daySchema);
module.exports = mongoose.model("month",month);