const asyncHandler = require("../middlewares/asyncHandler");
const responseHandler = require("../utils/responseHandler");
const Vote = require("../models/votes");

// @desc    Create a new vote
// @route   POST /api/votes
// @access  Public or Private (depending on your use case)
const createVote = asyncHandler(async (req, res) => {
  const vote = await Vote.create(req.body);
  responseHandler(res, 201, "Vote created successfully", vote);
});

// @desc    Get all votes
// @route   GET /api/votes
// @access  Public
const getVotes = asyncHandler(async (req, res) => {
  const votes = await Vote.find();
  responseHandler(res, 200, "Votes retrieved successfully", votes);
});

// @desc    Get a single vote by ID
// @route   GET /api/votes/:id
// @access  Public
const getVoteById = asyncHandler(async (req, res) => {
  const vote = await Vote.findById(req.params.id);
  if (!vote) {
    return responseHandler(res, 404, "Vote not found");
  }
  responseHandler(res, 200, "Vote retrieved successfully", vote);
});

// @desc    Update a vote
// @route   PUT /api/votes/:id
// @access  Private (depends on auth implementation)
const updateVote = asyncHandler(async (req, res) => {
  const vote = await Vote.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!vote) {
    return responseHandler(res, 404, "Vote not found");
  }
  responseHandler(res, 200, "Vote updated successfully", vote);
});

// @desc    Delete a vote
// @route   DELETE /api/votes/:id
// @access  Private
const deleteVote = asyncHandler(async (req, res) => {
  const vote = await Vote.findByIdAndDelete(req.params.id);
  if (!vote) {
    return responseHandler(res, 404, "Vote not found");
  }
  responseHandler(res, 200, "Vote deleted successfully");
});

module.exports = { createVote, getVotes, getVoteById, updateVote, deleteVote };
