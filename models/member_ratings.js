const mongoose = require("mongoose");

const memberRatingSchema = new mongoose.Schema(
  {
    memberID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "member",
      required: true,
    },
    termID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "term",
      required: true,
    },
    SBARating: {
      type: String,
      enum: ["A", "B", "C", "D", "E", "F"],
      required: true,
    },
  },
  { timestamps: true }
);

// Ensure a member cannot have multiple ratings for the same term
memberRatingSchema.index({ memberID: 1, termID: 1 }, { unique: true });

module.exports = mongoose.model("memberRating", memberRatingSchema);
