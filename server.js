//npm i express bcryptjs passport passport-local ejs express-ejs-layouts mongoose connect-flash express-session

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
var bodyParser = require("body-parser");
const User = require("./models/users");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//DB config
const db = require("./config/key").MongodbURI;

//connect Mongo
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("DB connected"))
  .catch(err => console.log(err));

//Bodyparse
app.use(express.urlencoded({ extended: false }));

// const DummyUsers = [];

// app.get("/users", (req, res, next) => {
//   res.status(200).json({ Users: DummyUsers });
// });

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/", require("./routes/users"));

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, console.log("Server running on ", PORT));

module.exports = app;
