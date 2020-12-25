const mongoose=require('mongoose');
const Schema   = mongoose.Schema ;
//enum states = {Pending,Accepted,Rejecte,Cancelled}
var CounterSchema = mongoose.Schema({
    name:{type:String,unique:true},
    seq: { type: Number, default: 0 }
});
//var counter = mongoose.model('counter', CounterSchema);

module.exports=mongoose.model("counter",CounterSchema);
