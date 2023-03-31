const mongoose = require("mongoose");


const EmployesSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    }, 
    email: {
      type: String,
      require: true,
      unique: true,
    },
    age: {
      type: String,
      require: true,
    },
    phone:{
      type: String,
      require: true,
    },
    address:{
      type: String,
      require: true,
  },
},
  {
    timeTamps: true,
  }
);

module.exports = mongoose.model("Employe",EmployesSchema);
