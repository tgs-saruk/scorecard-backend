const scoreSchema = new mongoose.Schema(
  {
    voteID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vote",
      required: true,
    },
    memberID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },
    score: {
      type: String,
      enum: ["yes", "no", "absent", "neutral"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("score", scoreSchema);
