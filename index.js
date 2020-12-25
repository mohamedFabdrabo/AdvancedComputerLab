const app=require('./app');
const mongoose = require('mongoose');
//app.use(express.json());
//app.use(express.urlencoded({extended:false}));
//const autoIncrement = require('mongoose-auto-increment');
//const {app} = require('./app');
//const dotenv = require('dotenv');
//dotenv.config();

const connectionParams={
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
}
const url="mongodb+srv://mfathy19:mfathy19@cluster0.mfjyt.mongodb.net/fathytest?retryWrites=true&w=majority";

//mongoose.connect(process.env.BB_URL_TEST,connectionParams).then(()=>{
    mongoose.connect(url,connectionParams).then(()=>{

    console.log("Connection done !");
}).catch(()=>{
    console.log("error");
});

app.listen(process.env.PORT,()=>
{
    console.log(`Server listen at port ${process.env.PORT}`);
});
//autoIncrement.initialize(connection);

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
