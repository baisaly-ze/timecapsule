const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    userEmail: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["note", "envelope"],
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    unlockDate: {
      type: Date,
      default: null,
    },

    status: {
      type: String,
      enum: ["note", "locked", "ready", "opened"],
      default: "note",
    },

    sendEmail: {
      type: Boolean,
      default: false,
    },

    emailSent: {
      type: Boolean,
      default: false,
    },

    emailSent: {
      type: Boolean,
      default: false,
    },

    openedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Entry", entrySchema);
