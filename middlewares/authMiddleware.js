const jwt = require("jsonwebtoken");
const asyncHandler = require("./asyncHandler");
const responseHandler = require("../utils/responseHandler");

// Verify JWT Token
exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return responseHandler(res, 401, false, "Not authorized, no token provided.");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return responseHandler(res, 401, false, "Not authorized, token failed.");
  }
});

// Restrict to Admin Only
exports.adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return responseHandler(res, 403, false, "Access denied. Admins only.");
  }
  next();
};
