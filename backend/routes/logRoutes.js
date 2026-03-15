const express = require("express");
const DailyLog = require("../models/DailyLog");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// CREATE DAILY LOG
router.post("/create",authMiddleware, async (req, res) => {

  try {

    const { userId, date } = req.body;

    // ensure only one log per day
    const existingLog = await DailyLog.findOne({ userId, date });

    if (existingLog) {
      return res.status(400).json({ message: "Log already exists for today" });
    }

    const log = await DailyLog.create(req.body);

    res.json(log);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }

});


// GET USER LOGS
router.get("/:userId",authMiddleware, async (req, res) => {

  try {

    const logs = await DailyLog.find({
      userId: req.params.userId
    }).sort({ date: 1 });

    res.json(logs);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }

});

module.exports = router;