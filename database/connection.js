const mongoose = require("mongoose");

const connection = async ()=>{
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('database connected successfully');
    } catch (error) {
      console.log(error);
    }
  }
  connection(); 
  