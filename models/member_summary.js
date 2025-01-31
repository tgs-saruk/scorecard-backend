const memberSummarySchema = new mongoose.Schema(
  {
    memberID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "members",
      required: true,
    },
    termID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "term",
      required: true,
    },
    congress: { type: String, required: true },
    summary: { type: String, required: true },
  },
  { timestamps: true }
);

MemberSummarySchema.index(
  { memberID: 1, termID: 1, congress: 1 },
  { unique: true }
);

module.exports = mongoose.model("memberSummary", memberSummarySchema);
