const mongoose=require('mongoose');
const mongoUri="mongodb://localhost:27017/inotebook";

const conectTomongo=()=>{
    mongoose.connect(mongoUri,()=>{
        console.log("Connected to mongoose Succesfully");
    })
}
module.exports=conectTomongo;