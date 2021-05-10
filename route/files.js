const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const File = require('../models/file');
const { v4: uuid4 } = require('uuid');

let storage=multer.diskStorage({
    destination:(req,file,cb) => cb(null,'uploadfile'),
    filename: (req,file,cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random()*1E9)}${path.extname(file.originalname)}`;
        cb(null,uniqueName);
    }
})

let upload = multer({
storage,
limit: {filesize: 1000000*100}
}).single('myfile');

router.post('/', async (req,res)=>{
    
    //store file 
    upload(req,res,async (err)=>{
        if(!req.file){
            return res.json({error:'All fields are required.'});
        }

        if(err){
            return res.status(500).send({error:err.message})
        }

    


    //store into database

    const file = new File({
        filename: req.file.filename,
        uuid: uuid4(),
        path: req.file.path,
        size:req.file.size

    });

    const response = await file.save();
    return res.json({file: `${process.env.APP_BASE_URL}/files/${response.uuid}`});
    //response

   });
});





module.exports = router;