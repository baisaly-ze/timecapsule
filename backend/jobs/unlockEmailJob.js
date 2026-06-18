const cron = require("node-cron");
const Entry = require("../models/Entry");
const sendUnlockEmail = require("../utils/sendMail");

const startUnlockEmailJob = () => {
  cron.schedule("* * * * *", async () => {
    try {
      const now = new Date();

      const readyEnvelopes = await Entry.find({
        type: "envelope",
        status: { $in: ["locked", "ready"] },
        unlockDate: { $lte: now },
        sendEmail: true,
        emailSent: false,
      });
      for (const envelope of readyEnvelopes) {
        await sendUnlockEmail(envelope.userEmail, envelope.title);

        envelope.status = "ready";
        envelope.emailSent = true;

        await envelope.save();

        console.log(`Unlock email sent to ${envelope.userEmail}`);
      }
    } catch (err) {
      console.log("Email job error:", err.message);
    }
  });
};

module.exports = startUnlockEmailJob;
