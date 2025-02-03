const express = require("express");
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const {
  createVote,
  getVotes,
  getVoteById,
  updateVote,
  deleteVote,
} = require("../controllers/voteController");

const router = express.Router();

// Create a new vote (Admin only)
router.post("/addvotes", createVote);

// Get all votes (Public)
router.get("/", getVotes);

// Get a single vote by ID (Public)
router.get("/:id", getVoteById);

// Update a vote (Admin only)
router.put("/:id", protect, adminOnly, updateVote);

// Delete a vote (Admin only)
router.delete("/:id", protect, adminOnly, deleteVote);

module.exports = router;
