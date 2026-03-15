const express = require("express");
const RecoveryPlan = require("../models/RecoveryPlan");
const AddictionProfile = require("../models/AddictionProfile");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// GENERATE PLAN
router.post("/generate/:userId",authMiddleware, async (req, res) => {

  try {

    const profile = await AddictionProfile.findOne({
      userId: req.params.userId
    });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    let planSteps = [];
    let goodHabit = "";

    // Simple rule-based plan
    if (profile.addictionType === "social media") {

      planSteps = [
        "Limit social media usage to 30 minutes per day",
        "Avoid phone usage after 10 PM",
        "Replace scrolling time with reading"
      ];

      goodHabit = "Read 10 pages of a book daily";

    } else if (profile.addictionType === "gaming") {

      planSteps = [
        "Restrict gaming to weekends",
        "Remove games from phone",
        "Replace gaming with outdoor activity"
      ];

      goodHabit = "30 minute daily walk";

    } else {

      planSteps = [
        "Avoid triggers",
        "Stay accountable",
        "Replace addiction time with a productive habit"
      ];

      goodHabit = "Daily journaling";
    }

    const plan = await RecoveryPlan.create({
      userId: req.params.userId,
      addictionType: profile.addictionType,
      planSteps,
      goodHabit
    });

    res.json(plan);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }

});


// GET USER PLAN
router.get("/:userId",authMiddleware, async (req, res) => {

  try {

    const plan = await RecoveryPlan.findOne({
      userId: req.params.userId
    });

    res.json(plan);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }

});

module.exports = router;