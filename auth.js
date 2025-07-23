const express = require("express");
const router = express.Router();
const { loginDoctor, registerDoctor } = require("../controllers/authController");

router.post("/login", loginDoctor);
router.post("/register-doctor", registerDoctor);

module.exports = router;
