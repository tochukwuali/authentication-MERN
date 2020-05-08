const express = require("express");
const connectDB = require("./config/dbConfig");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const passport = require("passport");
const users = require("./routes/UserRoute");
const cors = require("cors");

dotenv.config({ path: "./config/config.env" });

connectDB();

const app = express();

app.use(cors())

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

app.use("/api/v1/users", users);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server Running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

module.exports = app;
