const Vote = require("../models/vote");
const Term = require("../models/term");

const getVotesByChamberAndTerm = async (req, res) => {
  try {
    const { chamber } = req.query; // Example: ?chamber=senate or ?chamber=house

    // Build query filter
    const filter = {};
    if (chamber) {
      filter.chamber = chamber.toLowerCase(); // Ensure it's lowercase ('senate' or 'house')
    }

    // Fetch votes, populated with term info
    const votes = await Vote.find(filter)
      .populate("termID", "startYear endYear description congress") // Get term details
      .sort({ "termID.startYear": -1 }) // Sort by most recent term
      .exec();

    // Group votes by term
    const votesByTerm = votes.reduce((acc, vote) => {
      const termLabel = `${vote.termID.startYear} - ${vote.termID.endYear}`;
      if (!acc[termLabel]) {
        acc[termLabel] = [];
      }
      acc[termLabel].push({
        title: vote.title,
        description: vote.longDescription,
        chamber: vote.chamber,
      });
      return acc;
    }, {});

    res.json(votesByTerm);
  } catch (error) {
    console.error("Error fetching votes:", error);
    res.status(500).json({ message: "Failed to fetch votes", error });
  }
};

module.exports = { getVotesByChamberAndTerm };
