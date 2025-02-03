const Activity = require("../models/activity");
const Term = require("../models/term");

// Fetch Activities by Chamber and Term
const activityByChamberAndTerm = async (req, res) => {
  try {
    const { chamber, term } = req.query;

    // Build query object dynamically
    const query = {};

    // Filter by chamber if provided
    if (chamber && ["house", "senate"].includes(chamber.toLowerCase())) {
      query.chamber = chamber.toLowerCase();
    }

    // Filter by term if provided (e.g., "2023-2024")
    if (term) {
      const termDoc = await Term.findOne({ description: term });
      if (!termDoc) {
        return res.status(404).json({ message: "Term not found" });
      }
      query.termID = termDoc._id;
    }

    // Fetch activities with term and chamber filtering
    const activities = await Activity.find(query)
      .populate("termID", "description congress")  // Populates term details
      .sort({ createdAt: -1 });                    // Sort by latest activities

    res.status(200).json({ success: true, data: activities });
  } catch (error) {
    console.error("Error fetching activities:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = { activityByChamberAndTerm };
