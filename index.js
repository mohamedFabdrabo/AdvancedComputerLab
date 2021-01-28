const app=require('./app');
const mongoose = require('mongoose');
//app.use(express.json());
//app.use(express.urlencoded({extended:false}));
//const autoIncrement = require('mongoose-auto-increment');
//const {app} = require('./app');
const dotenv = require('dotenv');
dotenv.config();

const connectionParams={
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
}

const PORT = process.env.PORT || 5000;

// process.env.DB_URL = "mongodb+srv://mfathy19:mfathy19@cluster0.mfjyt.mongodb.net/milestone1?retryWrites=true&w=majority"
// process.env.BB_URL_TEST = "mongodb+srv://mfathy19:mfathy19@cluster0.mfjyt.mongodb.net/fathytest?retryWrites=true&w=majority"

const url=process.env.BB_URL_TEST;



//mongoose.connect(process.env.BB_URL_TEST,connectionParams).then(()=>{
    mongoose.connect(url,connectionParams).then(()=>{

    console.log("Connection done !");
}).catch(()=>{
    console.log("error");
});

app.listen(PORT,()=>
{
    console.log(`Server listen at port ${PORT}`);
});
//autoIncrement.initialize(connection);

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
