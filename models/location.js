const mongoose=require('mongoose');

const loc=mongoose.Schema({
    name: {type:String,required:true,unique:true},
    capacity:{type:String,required:true},
    type:{type:String,required:true},
    occuptation:Number
});

module.exports=mongoose.model("location",loc);
