const asyncHandler = require("../middlewares/asyncHandler");
const responseHandler = require("../utils/responseHandler");
const Term = require("../models/termModel");

// @desc    Create a new term
// @access  Private/Admin
exports.createTerm = asyncHandler(async (req, res) => {
  const term = await Term.create(req.body);
  responseHandler(res, 201, "Term created successfully", term);
});

// @desc    Get all terms
// @access  Public
exports.getTerms = asyncHandler(async (req, res) => {
  const terms = await Term.find();
  responseHandler(res, 200, "Terms retrieved successfully", terms);
});

// @desc    Get a single term by ID
// @access  Public
exports.getTermById = asyncHandler(async (req, res) => {
  const term = await Term.findById(req.params.id);
  if (!term) {
    return responseHandler(res, 404, "Term not found");
  }
  responseHandler(res, 200, "Term retrieved successfully", term);
});

// @desc    Update a term
// @access  Private/Admin
exports.updateTerm = asyncHandler(async (req, res) => {
  const term = await Term.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!term) {
    return responseHandler(res, 404, "Term not found");
  }
  responseHandler(res, 200, "Term updated successfully", term);
});

// @desc    Delete a term
// @access  Private/Admin
exports.deleteTerm = asyncHandler(async (req, res) => {
  const term = await Term.findByIdAndDelete(req.params.id);
  if (!term) {
    return responseHandler(res, 404, "Term not found");
  }
  responseHandler(res, 200, "Term deleted successfully");
});
