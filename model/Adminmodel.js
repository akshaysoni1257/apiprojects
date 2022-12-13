const mongoose = require('mongoose');

const multer = require('multer');

const path = require('path');


const avatar_path = path.join("/uplodes/images");

const Adminschema = mongoose.Schema({

    name:
    {
        type:String,
        required:true
    },
    email:
    {
        type:String,
        required:true
    },
    password:
    {
        type:String,
        required:true
    },
    confirmpassword:
    {
        type:String,
        required:true
    },
    Gender:
    {
        type:String,
        required:true
    },
    City:
    {
        type:Array,
        required:true
    },
    avatar:
    {
        type:String,
        required:true
    }
});

const userstorage = multer.diskStorage({

    destination:(req,file,cb)=>{
        // cb(null,file.fieldnamepath.join(__dirname,'..',avatar_path));
        cb(null,path.join(__dirname,'..',avatar_path));
    },

    filename : (req,file,cb)=>{
        cb(null,file.fieldname+"-"+Date.now());
    }
});

Adminschema.statics.uploadedAvatar = multer({storage:userstorage}).single('avatar');
Adminschema.statics.uploadPath = avatar_path;


const Admin = mongoose.model('api',Adminschema);
module.exports = Admin;
