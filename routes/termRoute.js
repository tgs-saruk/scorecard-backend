const express = require("express");
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const {
  createTerm,
  getTerms,
  getTermById,
  updateTerm,
  deleteTerm,
} = require("../controllers/termController");

const router = express.Router();

// Create a new term (Admin only)
router.post("/", protect, adminOnly, createTerm);

// Get all terms (Public)
router.get("/", getTerms);

// Get a single term by ID (Public)
router.get("/:id", getTermById);

// Update a term (Admin only)
router.put("/:id", protect, adminOnly, updateTerm);

// Delete a term (Admin only)
router.delete("/:id", protect, adminOnly, deleteTerm);

module.exports = router;
