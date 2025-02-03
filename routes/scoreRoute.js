const express = require("express");
const router = express.Router();
const scoreController = require("../controllers/scoreController");
const { verifyAdmin } = require("../middlewares/authMiddleware");

// Score Routes (with Admin Authentication for certain actions)
router.post("/scores", verifyAdmin, scoreController.createScore);
router.get("/scores", scoreController.getAllScores);
router.get("/scores/:id", scoreController.getScoreById);
router.put("/scores/:id", verifyAdmin, scoreController.updateScore);
router.delete("/scores/:id", verifyAdmin, scoreController.deleteScore);
router.get("/scores/filtered", scoreController.getFilteredScores);

module.exports = router;
