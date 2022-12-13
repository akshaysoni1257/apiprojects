const mongoose = require('mongoose');
const category = require('./categorymodel');

const subCategoryschema = mongoose.Schema({

    sub_category_name:
    {
        type:String,
        required:true
    },
    category_name:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"category"
    }
    
});

const subcategory = mongoose.model('subcategory',subCategoryschema);
module.exports = subcategory;
