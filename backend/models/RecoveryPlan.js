const mongoose = require("mongoose");

const RecoveryPlanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  addictionType: {
    type: String
  },

  planSteps: {
    type: [String],
    default: []
  },

  goodHabit: {
    type: String
  },
  motivation: {
    type: String
  }

}, { timestamps: true });

module.exports = mongoose.model("RecoveryPlan", RecoveryPlanSchema);