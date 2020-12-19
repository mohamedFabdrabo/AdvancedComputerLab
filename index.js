const {app}=require('./app');
const mongoose = require('mongoose');
//app.use(express.json());
//app.use(express.urlencoded({extended:false}));

const connectionParams={
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
}
const url="mongodb+srv://mfathy19:mfathy19@cluster0.mfjyt.mongodb.net/f1?retryWrites=true&w=majority";


mongoose.connect(url,connectionParams).then(()=>{
    console.log("OKKK");
}).catch(()=>{
    console.log("error");
});

//app.listen(3000)

  