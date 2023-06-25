const express = require("express");
const { createCity } = require("../controllers/city.controller");

const router = express.Router();

router.post("/create", createCity);

module.exports = router;
