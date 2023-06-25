const express = require("express")
const { login, register, logout } = require("../controllers/user.controller")

const router = express.Router()


router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)

module.exports = router