const scoreSchema = new mongoose.Schema(
  {
    voteID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "vote",
      required: true,
    },
    memberID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "member",
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
