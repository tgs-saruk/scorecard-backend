const Admin = require("../models/admin");
const asyncHandler = require("../middlewares/asyncHandler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const responseHandler = require("../utils/responseHandler");

// Admin Login
exports.adminLogin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return responseHandler(
      res,
      400,
      false,
      "Please provide username and password."
    );
  }

  const admin = await Admin.findOne({ username });
  if (!admin || !(await bcrypt.compare(password, admin.password))) {
    return responseHandler(res, 401, false, "Invalid credentials.");
  }

  const token = jwt.sign(
    { id: admin._id, role: admin.role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );

  responseHandler(res, 200, true, "Login successful", { token });
});

// @desc    Add a new admin
// @route   POST /api/admin
// @access  Private (Only existing admins can add new admins)
exports.addAdmin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return responseHandler(res, 400, false, "Username and password are required.");
  }

  // Check if admin already exists
  const existingAdmin = await Admin.findOne({ username });
  if (existingAdmin) {
    return responseHandler(res, 400, false, "Admin with this username already exists.");
  }

  // Encrypt password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create new admin
  const newAdmin = await Admin.create({ username, password: hashedPassword });

  responseHandler(res, 201, true, "Admin added successfully", {
    id: newAdmin._id,
    username: newAdmin.username,
    role: newAdmin.role,
  });
});