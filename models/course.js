const mongoose=require('mongoose');
const Schema   = mongoose.Schema ;



const CO=mongoose.Schema({
    name: {type:String,unique:true},
    cid:{type:String,required:true,unique:true,sparse:true},
    
    instructors:[{type:Schema.Types.ObjectId ,ref:"AM"}],
    coordinator:{type:Schema.Types.ObjectId ,ref:"AM"},
    academicMembers:[{type:Schema.Types.ObjectId ,ref:"AM"}],

    slots:[{type:Schema.Types.ObjectId ,ref:"slot"}],

    coverage:Number

    
});

module.exports=mongoose.model("CO",CO);
