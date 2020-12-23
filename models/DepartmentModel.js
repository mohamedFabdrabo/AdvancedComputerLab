const mongoose=require('mongoose');
const Schema   = mongoose.Schema ;
const DM=mongoose.Schema({
    name:{type:String,required:true,unique:true,sparse:true},
    HOD:{type:Schema.Types.ObjectId ,ref:"AM"},
    courses:[{type:Schema.Types.ObjectId ,ref:"CO"}],
    academicmem:[{type:Schema.Types.ObjectId ,ref:"AM"}]

});

module.exports=mongoose.model("DM",DM);
