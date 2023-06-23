const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieSession = require("cookie-session");
const passportSetup = require("./passport");
const authRoute = require("./routes/auth");

const app = express();
dotenv.config();


app.use(
  cookieSession({
    name: "session",
    keys: ["test"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
  })
  );
  
app.use("/auth", authRoute);

const connect = () => {
  try {
    mongoose.connect(process.env.MONGO).then(() => console.log("DB connected"));
  } catch (error) {
    console.log(error);
  }
};

app.listen("8000", () => {
  connect();
  console.log("server connected");
});
