const express = require("express");
const path = require("path");
const registerRouter = require("./routes/auth/register");
const loginRouter = require("./routes/auth/login");
require("./db");

const app = express();

const buildDir = "../client/build";
app.use(express.static(path.join(__dirname, buildDir)));

app.use(registerRouter);
app.use(loginRouter);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});