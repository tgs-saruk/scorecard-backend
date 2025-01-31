const activitySchema = new mongoose.Schema(
  {
    chamberID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chamber",
      required: true,
    },
    title: { type: String, required: true },
    congress: { type: String, required: true },
    shortDescription: { type: String },
    longDescription: { type: String },
    url: { type: String },
    doc: { type: String },
    termID: { type: mongoose.Schema.Types.ObjectId, ref: "Term" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("activity", activitySchema);
