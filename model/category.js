const mongoose = require('mongoose') // database connection

//attributes of database and create model
var Schema = mongoose.Schema;
const category = mongoose.model('Category', {   
     category_name: {
        type: String,
        trim: true
    },
    image: {
      type: String,
      trim: true
  }

  });

  module.exports = category