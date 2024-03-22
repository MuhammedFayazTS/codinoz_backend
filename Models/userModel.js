const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    unique: [true, "Email must be unique"],
    required: [true, "Email is required"],
  },
  phone: {
    type: Number,
    required: [true, "Phone is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  address: {
    type: String,
  },
  image: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
