const mongoose = require("mongoose");

const AddictionProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  addictionType: {
    type: String,
    required: true
  },

  frequency: {
    type: String
  },

  duration: {
    type: String
  },

  triggers: {
    type: [String]
  },

  goal: {
    type: String
  }

}, { timestamps: true });

module.exports = mongoose.model("AddictionProfile", AddictionProfileSchema);