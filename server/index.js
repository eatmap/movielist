require("dotenv").config();

const express = require("express"),
  helmet = require("helmet"),
  mongoose = require("mongoose"),
  cors = require("cors"),
  path = require("path");

/**
 * Setup connection to MongoDB
 */
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.log(err));

/**
 * Setup express with additional plugins
 */
const app = express();
app.use(helmet());
app.use(cors());

/**
 * Map all the routes for the application
 */
const apiRoutes = require("./routes");
app.use("/api", apiRoutes);

/**
 * If production, serve React build
 */
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("*", (req, res) => {
    res.status(404).json({ message: "Invalid endpoint" });
  });
}

module.exports = app;
