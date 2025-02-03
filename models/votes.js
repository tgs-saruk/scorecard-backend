const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema(
  {
    chamber: { type: String, enum: ["house", "senate"], required: true },
    title: { type: String, required: true },
    shortDescription: { type: String },
    longDescription: { type: String },
    url: { type: String },
    doc: { type: String },
    date: { type: Date },
    termID: { type: mongoose.Schema.Types.ObjectId, ref: "term" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("votes", voteSchema);
