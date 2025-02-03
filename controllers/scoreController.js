const Score = require("../models/scoreModel");
const asyncHandler = require("../middlewares/asyncHandler");
const responseHandler = require("../utils/responseHandler");

// @desc    Create a new score
// @route   POST /api/scores
// @access  Private (Admin only)
exports.createScore = asyncHandler(async (req, res) => {
  const { voteID, memberID, score } = req.body;

  // Validate required fields for score creation
  if (!voteID || !memberID || !score) {
    return responseHandler(res, 400, false, "Vote ID, Member ID, and Score are required.");
  }

  // Check if the score value is valid
  const validScores = ["yes", "no", "absent", "neutral"];
  if (!validScores.includes(score)) {
    return responseHandler(res, 400, false, "Invalid score value. It must be one of 'yes', 'no', 'absent', or 'neutral'.");
  }

  const newScore = await Score.create({
    voteID,
    memberID,
    score,
  });

  responseHandler(res, 201, true, "Score created successfully", newScore);
});

// @desc    Get all scores
// @route   GET /api/scores
// @access  Public
exports.getAllScores = asyncHandler(async (req, res) => {
  const scores = await Score.find().populate("voteID").populate("memberID");

  responseHandler(res, 200, true, "Scores fetched successfully", scores);
});

// @desc    Get score by ID
// @route   GET /api/scores/:id
// @access  Public
exports.getScoreById = asyncHandler(async (req, res) => {
  const score = await Score.findById(req.params.id).populate("voteID").populate("memberID");

  if (!score) {
    return responseHandler(res, 404, false, "Score not found");
  }

  responseHandler(res, 200, true, "Score fetched successfully", score);
});

// @desc    Update score details
// @route   PUT /api/scores/:id
// @access  Private (Admin only)
exports.updateScore = asyncHandler(async (req, res) => {
  const { voteID, memberID, score } = req.body;

  if (!voteID || !memberID || !score) {
    return responseHandler(res, 400, false, "Vote ID, Member ID, and Score are required.");
  }

  // Check if the score value is valid
  const validScores = ["yes", "no", "absent", "neutral"];
  if (!validScores.includes(score)) {
    return responseHandler(res, 400, false, "Invalid score value. It must be one of 'yes', 'no', 'absent', or 'neutral'.");
  }

  const updatedScore = await Score.findByIdAndUpdate(req.params.id, { voteID, memberID, score }, { new: true })
    .populate("voteID")
    .populate("memberID");

  if (!updatedScore) {
    return responseHandler(res, 404, false, "Score not found");
  }

  responseHandler(res, 200, true, "Score updated successfully", updatedScore);
});

// @desc    Delete a score
// @route   DELETE /api/scores/:id
// @access  Private (Admin only)
exports.deleteScore = asyncHandler(async (req, res) => {
  const deletedScore = await Score.findByIdAndDelete(req.params.id);

  if (!deletedScore) {
    return responseHandler(res, 404, false, "Score not found");
  }

  responseHandler(res, 200, true, "Score deleted successfully");
});

// @desc    Get scores filtered by voteID or memberID
// @route   GET /api/scores/filtered
// @access  Public
exports.getFilteredScores = asyncHandler(async (req, res) => {
  const { voteID, memberID } = req.query;
  let filter = {};

  if (voteID) filter.voteID = voteID;
  if (memberID) filter.memberID = memberID;

  const scores = await Score.find(filter).populate("voteID").populate("memberID");

  responseHandler(res, 200, true, "Filtered scores fetched successfully", scores);
});
