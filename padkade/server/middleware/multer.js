const multer = require('multer');

//set storage
let storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,'uploads')
    },
    filename : function(req,file,cb){
        //image.jpg
        let ext = file.originalname.substring(file.originalname.lastIndexOf('.'));

        cb(null,file.fieldname+'-'+Date.now()+ext)
    }
})


module.exports =store = multer({storage : storage})