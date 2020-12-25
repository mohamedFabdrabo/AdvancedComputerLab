const {app}=require('./app');
const mongoose = require('mongoose');
//app.use(express.json());
//app.use(express.urlencoded({extended:false}));
//const autoIncrement = require('mongoose-auto-increment');


const connectionParams={
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
}
const url="mongodb+srv://mfathy19:mfathy19@cluster0.mfjyt.mongodb.net/fathytest?retryWrites=true&w=majority";


mongoose.connect(url,connectionParams).then(()=>{
    console.log("OKKK");
}).catch(()=>{
    console.log("error");
});

//autoIncrement.initialize(connection);

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);