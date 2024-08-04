const express = require("express");
const { register, login, refresh, logout } = require("../controllers/auth");
const loginLimiter = require("../middlewares/loginLimiter");
const { uploadFiles } = require("../middlewares/uploadFiles");

const router = express.Router();

router.post("/register", uploadFiles, register);
router.post("/login", loginLimiter, login);
router.post("/refresh", refresh);
router.post("/logout", logout);

module.exports = router;
