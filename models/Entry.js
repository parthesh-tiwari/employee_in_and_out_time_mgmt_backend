const mongoose = require("mongoose");
const { Schema } = mongoose;

const entrySchema = new Schema(
  {
    name: {
      type: String,
      required: false,
      default: "",
    },

    employeeId: {
      type: mongoose.Types.ObjectId,
      required: true,
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
    type: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Entry = mongoose.model("Entry", entrySchema);

module.exports = Entry;
