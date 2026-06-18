const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const entryRoutes = require("./routes/entryRoutes");
const startUnlockEmailJob = require("./jobs/unlockEmailJob");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/entries", entryRoutes);

app.get("/", (req, res) => {
  res.send("TimeCapsule backend is running");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    startUnlockEmailJob();

    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("FULL ERROR:");
    console.log(err);
  });