const express = require("express");
const Entry = require("../models/Entry");

const router = express.Router();
router.post("/", async (req, res) => {
  try {
    const {
      userId,
      userEmail,
      type,
      title,
      content,
      unlockDate,
      sendEmail,
    } = req.body;

    if (!userId || !userEmail || !type || !title || !content) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    if (type === "envelope") {
      if (!unlockDate) {
        return res.status(400).json({
          message: "Unlock date is required",
        });
      }

      if (new Date(unlockDate) <= new Date()) {
        return res.status(400).json({
          message: "Unlock date must be in the future",
        });
      }
    }

    const entry = await Entry.create({
      userId,
      userEmail,
      type,
      title,
      content,
      unlockDate: type === "envelope" ? unlockDate : null,
      status: type === "note" ? "note" : "locked",
      sendEmail: type === "envelope" ? sendEmail : false,
    });

    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const now = new Date();

    await Entry.updateMany(
      {
        userId: req.params.userId,
        type: "envelope",
        status: "locked",
        unlockDate: { $lte: now },
      },
      {
        $set: { status: "ready" },
      }
    );

    const entries = await Entry.find({
      userId: req.params.userId,
    }).sort({ createdAt: -1 });

    res.json(entries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/open/:id", async (req, res) => {
  try {
    const entry = await Entry.findByIdAndUpdate(
      req.params.id,
      {
        status: "opened",
        openedAt: new Date(),
      },
      { new: true }
    );

    res.json(entry);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const entry = await Entry.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(entry);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Entry.findByIdAndDelete(req.params.id);
    res.json({ message: "Entry deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;