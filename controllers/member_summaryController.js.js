const asyncHandler = require("../middlewares/asyncHandler");
const responseHandler = require("../utils/responseHandler");

const MemberSummary = require("../models/memberSummaryModel");
// @desc    Create a new member summary
// @access  Private/Admin
exports.createMemberSummary = asyncHandler(async (req, res) => {
  const summary = await MemberSummary.create(req.body);
  responseHandler(res, 201, "Member summary created successfully", summary);
});

// @desc    Get all member summaries
// @access  Public
exports.getMemberSummaries = asyncHandler(async (req, res) => {
  const summaries = await MemberSummary.find().populate("memberID termID");
  responseHandler(
    res,
    200,
    "Member summaries retrieved successfully",
    summaries
  );
});

// @desc    Get a single member summary by ID
// @access  Public
exports.getMemberSummaryById = asyncHandler(async (req, res) => {
  const summary = await MemberSummary.findById(req.params.id).populate(
    "memberID termID"
  );
  if (!summary) {
    return responseHandler(res, 404, "Member summary not found");
  }
  responseHandler(res, 200, "Member summary retrieved successfully", summary);
});

// @desc    Update a member summary
// @access  Private/Admin
exports.updateMemberSummary = asyncHandler(async (req, res) => {
  const summary = await MemberSummary.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  if (!summary) {
    return responseHandler(res, 404, "Member summary not found");
  }
  responseHandler(res, 200, "Member summary updated successfully", summary);
});

// @desc    Delete a member summary
// @access  Private/Admin
exports.deleteMemberSummary = asyncHandler(async (req, res) => {
  const summary = await MemberSummary.findByIdAndDelete(req.params.id);
  if (!summary) {
    return responseHandler(res, 404, "Member summary not found");
  }
  responseHandler(res, 200, "Member summary deleted successfully");
});
