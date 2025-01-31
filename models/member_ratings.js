const memberRatingSchema = new mongoose.Schema(
  {
    memberID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },
    termID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "term",
      required: true,
    },
    congress: { type: String, required: true },
    SBARating: {
      type: String,
      enum: ["A", "B", "C", "D", "E", "F"],
      required: true,
    },
  },
  { timestamps: true }
);

memberRatingSchema.index(
  { memberID: 1, termID: 1, congress: 1 },
  { unique: true }
);

module.exports = mongoose.model("memberRating", memberRatingSchema);
