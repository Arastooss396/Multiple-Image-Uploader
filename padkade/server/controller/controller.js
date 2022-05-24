
const UploadModel = require('../model/shcema');
const fs = require("fs");


const os = require('os');
const path = require('path');


exports.home = async (req,res) =>{
    // console.time('geting data')
    const all_images = await UploadModel.find().lean()
    // console.timeEnd('geting data')
  
    res.render('main', {images : all_images});
}

exports.uploads=(req,res,next)=>{
    const files=req.files;

    if (!files){
        const error = new Error('Plese choose a file!');
        error.httpStatusCode=400;
        return next(error)
    }

// make a temp dir
let dir = './uploads2'
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
};
//save files with new names
let imgArray = files.map((file, index)=>{
    let img = fs.createReadStream(file.path)
    let temp = file.path.split('.')
    temp = temp[temp.length-1]
    let time = Date.now()
    let writeStream = fs.createWriteStream(dir+'/image-' + index + '-' + time + '.' + temp)
    img.pipe(writeStream)

    return {
        filename: files[index].originalname,
        contentType : files[index].mimetype,
        newFileName : 'image-' + index + '-' + time + '.' + temp
    };
})

//save the names into the dataase 
let result = imgArray.map((finalImg, index) => {  
    let newUpload = new UploadModel(finalImg);

    return newUpload
        .save()
        .then(()=>{
            return {msg: `${files[index].originalname} Uploaded Successfully...!`}
        })
        .catch(error=>{
            if(error){
                if(error.name === 'MongoError' && error.code === 11000){
                    return Promise.reject({error : `Duplicate ${files[index].originalname}.File Already exists!`})
                } 
                return Promise.reject({error:error.message || `Cannot Upload ${files[index].originalname} Something Missing! ` })
            }
        })
    
});



    Promise.all(result)
    .then(msg=>{
        res.redirect('/')
    })
    .catch(err=>{
        res.json(err);
    })
}

exports.delete =async(req,res,next)=>{
    console.log(req.body)
    //find files in database via id 
    let result = await UploadModel.findById(req.body.id)
    //fs.delete and remove the files
    fs.rmSync('./uploads2/'+result.newFileName)
    //find by id and delete the actual files on the server
    await UploadModel.findByIdAndDelete(id)
    res.redirect('/')
}