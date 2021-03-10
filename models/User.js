
const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
    },
    psw: {
      type: String,
      required: true,
    },
    createAt: {
      type: Date,
      required: true,
      default: new Date(),
    },
    modifyAt: {
      type: Date,
      required: true,
      default: new Date(),
    },
  });

const User = mongoose.model("User", userSchema);
module.exports = User