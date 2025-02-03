// routes/senatorRoutes.js
const express = require("express");
const SenatorController = require("../controllers/SenatorController");

const router = express.Router();

// Route to get senator details with terms, votes, activities, and scores
router.get("/senators/:senatorId", SenatorController.getSenatorDetails);

module.exports = router;
