const express = require("express");
const path = require("path");
require("./db");

const app = express();

const buildDir = "../client/build";
app.use(express.static(path.join(__dirname, buildDir)));

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});