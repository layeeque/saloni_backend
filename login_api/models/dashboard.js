var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var dashboardSchema = new Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  uploadfile: {
    otherDocs: {
      type: String,
      default: ''
    },
    profilePic: {
      type: String,
      default: ''

    },
    videoDocs: {
      type: String,
      default: ''

    }


  },

  personalDetails:{
    firstname:{
      type: String ,
      default: ''

    },
    lastname:{
      type: String ,
      default: ''
    },
    DOB:{
      type: String ,
      default: ''
    },
    email:{
      type: String ,
      default: ''
    },
    mobile:{
      type: String ,
      default: ''
    },
    permanentAddress:{
      type: String ,
      default: ''
    },
    currentAddress:{
      type: String ,
      default: ''
    }

  },
  educationDetails:{
    graduation: [{
      qualification: {
          type: String,
          default: '',
          
      },
      startDate: {
          type: String,
          default: '',
         
      },
      endDate: {
          type: String,
          default: '',
         
      },
      percentage: {
          type: String,
          default: '',
          
      }
  }],
  },
  
  feedBack: { type: String, default: '' }

});

var dashboardDetails = mongoose.model('dashboard', dashboardSchema);

module.exports = dashboardDetails;

