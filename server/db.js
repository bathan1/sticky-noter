const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.MONGO_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", () => console.error("Connection failed"));
db.on("open", () => {
  console.log("Connected to MongoDB Atlas");
});

module.exports = db;