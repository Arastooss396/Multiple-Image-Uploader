const mongoose = require('mongoose');


const uploadSchema = new mongoose.Schema({
    _id : mongoose.Types.ObjectId,
    
    filename:{
        type:String,
        required:true
    },
    contentType:{
        type:String,
        required:true
    },
    
    
    newFileName:{
        type : String,
        required : true
    }
})



module.exports=UploadModel=mongoose.model('uploads', uploadSchema)