const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.MONGOURI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const db = mongoose.connection;

db.on("error", console.error("Connection failed"));
db.op("open", () => {
  console.log("Connected to MongoDB Atlas");
});

module.exports = db;