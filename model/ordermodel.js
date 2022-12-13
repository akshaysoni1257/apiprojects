const mongoose = require('mongoose');


const orderschema = mongoose.Schema({

    id:
    {
        type:String,
        required:true
    },
    name:
    {
        type:String,
        required:true
    },
    size:
    {
        type:String,
        required:true
    },
    price:
    {
        type:Number,
        required:true
    },
    quantity:
    {
        type:Number,
        required:true
    },
    date:
    {
        type:Date,
        required:true
    },
});

const order = mongoose.model('order',orderschema);
module.exports = order;
