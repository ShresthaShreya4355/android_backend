const mongoose = require('mongoose') // database connection

//attributes of database and create model
var Schema = mongoose.Schema;
var now = new Date();
const post = mongoose.model('Post', {   
    user_id: {
        type: Schema.ObjectId, 
        ref: 'User' 
        },
        
    title:{
          type:String,
          trim:true  
        },

    category_id:{
        type: Schema.ObjectId, 
        ref: 'Category' 
        },

    description: {
        type: String,
        trim: true
    },

    image: {
        type: String,
        trim: true
    },

    date:{
        type : Date, 
        default: now 
    }
  
    
  });
  

  module.exports = post