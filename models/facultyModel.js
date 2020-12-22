const mongoose=require('mongoose');
const Schema   = mongoose.Schema ;

const faculty = mongoose.Schema({
    name:{type:String,required:true,unique:true,sparse:true},
    departments:[{type:Schema.Types.ObjectId ,ref:"DM"}]
});

module.exports=mongoose.model("faculty",faculty);
