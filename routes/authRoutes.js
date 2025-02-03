const express = require("express");
const { adminLogin,addAdmin } = require("../controllers/authController");

const router = express.Router();

// @route   POST /api/admin/login
// @desc    Admin login
// @access  Public
router.post("/login", adminLogin);
router.post("/", addAdmin);

module.exports = router;
