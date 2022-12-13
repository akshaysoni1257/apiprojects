const express = require('express');

const port = 9080;

const app = express();

const path = require('path');   

const db = require('./config/mongoose');

const fs= require('fs');

const jwt = require('./config/passport-jwt-stretegy');

app.use('/uplodes',express.static(path.join("uplodes")));   


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));


app.use(express.urlencoded());


app.use('/',require('./routes'));

app.listen(port,(err)=>{
    if(err)
    {
        console.log("Server Not Start");
        return false;
    }
    console.log("Server Started On Port:="+port);
});
// Api Sum + Messege Print

// app.get('/',(req,res)=>{
//     let a=10, b=20;
//     let ans = a+b;

//     return res.json(
//         {
//             "Messege": "Hello World",
//             "Ans": ans
//         }
//     )
// });


