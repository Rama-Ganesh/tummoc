const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const cookieSession = require("cookie-session");
const passportSetup = require("./passport");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user.route");
const cityRoute = require("./routes/city.route");

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

const connect = () => {
  try {
    mongoose.connect(process.env.MONGO).then(() => console.log("DB connected"));
  } catch (error) {
    console.log(error);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single("file");

app.post("/api/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).send("Successfully uploaded");
  });
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use("/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/cities", cityRoute);

app.listen("8000", () => {
  connect();
  console.log("server connected");
});
