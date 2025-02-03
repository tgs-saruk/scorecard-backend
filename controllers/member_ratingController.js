const asyncHandler = require("../middlewares/asyncHandler");
const responseHandler = require("../utils/responseHandler");
const Term = require("../models/termModel");
const MemberRating = require("../models/memberRatingModel");


// @desc    Create a new member rating
// @access  Private/Admin
exports.createMemberRating = asyncHandler(async (req, res) => {
  const rating = await MemberRating.create(req.body);
  responseHandler(res, 201, "Member rating created successfully", rating);
});

// @desc    Get all member ratings
// @access  Public
exports.getMemberRatings = asyncHandler(async (req, res) => {
  const ratings = await MemberRating.find().populate("memberID termID");
  responseHandler(res, 200, "Member ratings retrieved successfully", ratings);
});

// @desc    Get a single member rating by ID
// @access  Public
exports.getMemberRatingById = asyncHandler(async (req, res) => {
  const rating = await MemberRating.findById(req.params.id).populate("memberID termID");
  if (!rating) {
    return responseHandler(res, 404, "Member rating not found");
  }
  responseHandler(res, 200, "Member rating retrieved successfully", rating);
});

// @desc    Update a member rating
// @access  Private/Admin
exports.updateMemberRating = asyncHandler(async (req, res) => {
  const rating = await MemberRating.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!rating) {
    return responseHandler(res, 404, "Member rating not found");
  }
  responseHandler(res, 200, "Member rating updated successfully", rating);
});

// @desc    Delete a member rating
// @access  Private/Admin
exports.deleteMemberRating = asyncHandler(async (req, res) => {
  const rating = await MemberRating.findByIdAndDelete(req.params.id);
  if (!rating) {
    return responseHandler(res, 404, "Member rating not found");
  }
  responseHandler(res, 200, "Member rating deleted successfully");
});
