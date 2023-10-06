const mongoose = require("mongoose")
const validator = require('validator');

const companySchema = new mongoose.Schema({
    companyName:{
        type:String,
        required:true
    },
    ownerName:{
        type:String,
        required:true
    },
    rollNo:{
        type:Number,
        required:true
    },
    ownerEmail:{
        type:String,
        required:true,
        validate:{
            validator: validator.isEmail,
            message: 'Not a valid email',
            isAsync: false
          }
    },
    accessCode:{
        type:String,
        required:true
    },
    isRegistered:{
        type:Boolean
    },
    clientID:{
        type:String
    },
    clientSecret:{
        type:String
    }
})

const Company = mongoose.model("Company", companySchema);

module.exports = Company;