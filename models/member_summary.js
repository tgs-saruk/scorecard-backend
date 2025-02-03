const mongoose = require("mongoose");

const memberSummarySchema = new mongoose.Schema(
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
    summary: { type: String, required: true },
  },
  { timestamps: true }
);

// Ensure a member cannot have multiple summaries for the same term
memberSummarySchema.index({ memberID: 1, termID: 1 }, { unique: true });

module.exports = mongoose.model("MemberSummary", memberSummarySchema);
