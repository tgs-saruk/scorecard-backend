// controllers/SenatorController.js
const Member = require("../models/member");
const Term = require("../models/term");
const Vote = require("../models/vote");
const Activity = require("../models/activity");
const Score = require("../models/score");

class SenatorController {
  // Fetch Senator Details with Terms, Votes, Activities, and Scores
  static async getSenatorDetails(req, res) {
    try {
      const { senatorId } = req.params;

      // Fetch Senator Details
      const senator = await Member.findById(senatorId);
      if (!senator) return res.status(404).json({ message: "Senator not found" });

      // Fetch Terms
      const terms = await Term.find({ _id: senator.termID });

      // Fetch Votes
      const votes = await Vote.find({ termID: { $in: terms.map(term => term._id) } });

      // Fetch Scores for Votes
      const voteScores = await Score.find({ memberID: senatorId, voteID: { $in: votes.map(v => v._id) } });

      // Calculate Vote Score
      const voteScore = voteScores.filter(score => score.score === "yes").length;

      // Fetch Activities
      const activities = await Activity.find({ termID: { $in: terms.map(term => term._id) } });

      // Fetch Scores for Activities (assuming activities have similar scoring)
      const activityScores = await Score.find({ memberID: senatorId, voteID: { $in: activities.map(a => a._id) } });

      // Response Structure
      const response = {
        senator: {
          name: senator.name,
          party: senator.party,
          photo: senator.photo,
          sbaRating: senator.sbaRating,
          status: senator.status,
        },
        terms,
        votes: votes.map(vote => {
          const voteScoreObj = voteScores.find(score => score.voteID.toString() === vote._id.toString());
          return {
            title: vote.title,
            shortDescription: vote.shortDescription,
            longDescription: vote.longDescription,
            url: vote.url,
            doc: vote.doc,
            date: vote.date,
            score: voteScoreObj ? voteScoreObj.score : "absent",
          };
        }),
        voteScore,
        activities: activities.map(activity => {
          const activityScoreObj = activityScores.find(score => score.voteID.toString() === activity._id.toString());
          const term = terms.find(term => term._id.toString() === activity.termID.toString());
          return {
            title: activity.title,
            shortDescription: activity.shortDescription,
            longDescription: activity.longDescription,
            url: activity.url,
            doc: activity.doc,
            congressTime: term ? term.congress : "Unknown Congress",
            score: activityScoreObj ? activityScoreObj.score : "neutral",
          };
        }),
        activityScore,
      };

      res.status(200).json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  }
}

module.exports = SenatorController;
