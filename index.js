const app=require('./app.js');

const PORT=1000;
app.listen(PORT,()=>{
    console.log(`This server is running on port ${PORT}`);
});