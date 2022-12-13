const mongoose = require('mongoose');

const Categoryschema = mongoose.Schema({

    category_name:
    {
        type:String,
        required:true
    }
    
});

const category = mongoose.model('category',Categoryschema);
module.exports = category;
