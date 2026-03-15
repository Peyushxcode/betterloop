const mongoose = require("mongoose");

const DailyLogSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  date: {
    type: String,
    required: true
  },

  status: {
    type: String,
    enum: ["clean", "trigger", "relapse"],
    required: true
  },

  trigger: {
    type: String
  },

  notes: {
    type: String
  }

}, { timestamps: true });

module.exports = mongoose.model("DailyLog", DailyLogSchema);