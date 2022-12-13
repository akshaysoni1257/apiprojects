const Admin = require('../model/Adminmodel');

const order = require('../model/ordermodel');

const category = require('../model/categorymodel');

const subcategory = require('../model/subcategorymodel');

const jwtData = require('jsonwebtoken');

const fs = require('fs');

const path  = require('path');

module.exports.admindata = (req,res) =>{

    Admin.uploadedAvatar(req,res,(err)=>{

        if(err)
        {
            res.json({"Messege":"File Not Upload"});
            return false;
        }

        let avatar = "";
        if(req.file)
        {
            avatar = Admin.uploadPath+"/"+req.file.filename;
            Admin.create({

                name : req.body.name,
    
                email : req.body.email,
    
                password : req.body.password,
    
                confirmpassword : req.body.confirmpassword,
    
                Gender : req.body.Gender,
    
                City : req.body.City,
    
                avatar : avatar
    
            },(err,data)=>{
                if(err)
                {
                    res.json(err)
                    return false;
                }
                res.json({"Status":"1","messege":"All Data Add Succesfully"});
            });
            
        }
        else
        {
            res.json({"Messege":"File Not Upload"});
        }
       
    });
};

// Viewadmin
module.exports.viewadmin = (req,res) =>
{
    Admin.find({},(err,data)=>{
        if(err)
        {
            res.json(
                {
                    "status":"0",
                    "Messege" : "somtion Wrong"
                }
            )
        }
        res.json(
            {
                "status":"1",
                "Messege" : data
            }
        )
    })
}

module.exports.deleteadmin = (req,res) =>
{
    let id=req.query.id;
        Admin.findById(id,(err,data)=>{
            if(err)
            {
                res.json({"Messeg":"Record Not Match"});
                return false;
            }
            else
            {
                if(data)
                {
                    if(data.avatar)
                        {
                            fs.unlinkSync(path.join(__dirname,'../',data.avatar));
                        }
                        Admin.findByIdAndDelete(id,(err,data)=>{
                            if(err)
                            {
                                res.json({"Messege":"Data Not Delete"});
                                return false;
                            }
                            res.json({"messge" : "Data Deleted"});
                         });    
                } 
            }
        });
}

module.exports.updateadmin = (req,res) =>
{

    Admin.uploadedAvatar(req,res,(err)=>{

        if(err)
        {
            res.json({"Messege":"Image Not Upload"});
            return false;
        }

        let id = req.query.id;
        console.log(id);
        if(req.file)
        {

        Admin.findById(id,(err,data)=>{
            if(err)
            {
                res.json({"Messege":"record Not delete"});
                return false;
            }
            if(data.avatar)
            {
                fs.unlinkSync(path.join(__dirname,'../',data.avatar));
            }

            
                let avatar = Admin.uploadPath+"/"+req.file.filename;
                Admin.findByIdAndUpdate(id,{

                    name : req.body.name,
                    email : req.body.email,
                    password : req.body.password,
                    confirmpassword : req.body.confirmpassword,
                    Gender : req.body.Gender,
                    City : req.body.City,
                    avatar : avatar
            },(err,editdata)=>{
                if(err)
                {
                    res.json({"Messege":"Record Not Update"});
                    return false;
                }
                res.json({"Messege":"Record Updated"});
            });
            });
        }
        else{
            Admin.findById(id,(err,updata)=>{
                if(err)
                {
                    res.json({"Messege":"Id Not Found"});
                    return false;
                }

                let avatar = updata.avatar;

                Admin.findByIdAndUpdate(id,{
                    name : req.body.name,
                    email:req.body.email,
                    password:req.body.password,
                    confirmpassword : req.body.confirmpassword,
                    Gender : req.body.Gender,
                    City : req.body.City,
                    avatar : avatar
                },(err,updata)=>{
                        if(err)
                        {
                            res.json({"Messege":"Record Not Updated"});
                            return false;
                        }
                        res.json({"Messege":"Record Updated"});
                });
            });
        }    
    });
}

// Order Data In Mongo db Agreegate Funcations

module.exports.orderData = (req,res) =>
{
    order.aggregate([
        {
            $match : {$or:[{size:"small"},{size:"medium"},{price:"19"}]}
        },
        {
            $project :{
                
                name:1,
                size:1
            }
        },
        {
            $sort : {
                totalOrderValue : -1
            }
        }
        
    ],(err,order)=>
    {
        if(err)
        {
            console.log(err);
            return false;
        }
        res.json(order);
    });
}

// Add Category
module.exports.addcategory = (req,res) =>
{   
    category.create({
        
        category_name:req.body.category_name

    },(err,data)=>
    {
        if(err)
        {
            console.log(err);
            return false;
        }
        res.json({"status":"1","Messege":"Category Succesfully Add"});
    });
}

// Sub Category Add
module.exports.subcategory = (req,res) =>
{
    subcategory.create({

        sub_category_name:req.body.sub_category_name

    },(err,data)=>
    {
        if(err)
        {
            console.log(err);
            return false;
        }
        res.json({"status":"1","Messege":"subCategory Succesfully Add"});
    });
}

// View Category In Mongodb Aggregate
module.exports.viewsubcategory = (req,res) =>
{
    subcategory.aggregate([
        {
            $lookup:{
                from:"categories",
                localField:"category_name",
                foreignField:"id",
                as:"category"
            }
        }
    ],(err,data)=>
    {
        res.json({"status":"1","Messege":data});
    })
}

// Logindata
module.exports.logindata = (req,res)=>
{
                Admin.findOne({email:req.body.email},(err,admins)=>{
                if(err) 
                {
                    res.json(err);
                    return false;
                }
                if(!admins || admins.password != req.body.password)
                {
                    res.json({"Status":"0","messege":"Email & Password are incorrect"});
                }

                const token = jwtData.sign(admins.toJSON(),'khanak',{expiresIn:1000*60*60});
                return res.json({"Status":"1","Messege":token});
    });
}


