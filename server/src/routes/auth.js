const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

router.post("", authController.login);
router.get("", authController.getCurrentUser);

module.exports = router;
