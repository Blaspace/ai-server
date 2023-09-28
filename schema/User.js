const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  phone: String,
  password: String,
  refreshtoken: String,
  plan: {
    type: String,
    default: "none",
  },
});

const Users = mongoose.model("Users", userSchema);

module.exports = Users;
