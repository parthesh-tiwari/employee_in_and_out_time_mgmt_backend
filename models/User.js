const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
      default: "",
    },
    username: {
      type: String,
      required: false,
      default: "",
    },
    employeeId: {
      type: String,
      required: false,
      default: "",
    },
    companyId: {
      type: String,
      required: false,
      default: "",
    },
    companyName: {
      type: String,
      required: false,
      default: "",
    },
    emailAddress: {
      type: String,
      required: false,
      default: "",
    },
    mobileNumber: {
      type: String,
      required: false,
      default: "",
    },
    password: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
