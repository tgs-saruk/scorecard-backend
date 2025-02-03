const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
  {
    chamber: {
      type: String,
      enum: ["house", "senate"],
      required: true,
    },
    name: { type: String, required: true },
    state: { type: String },
    party: {
      type: String,
      enum: ["democrat", "republican", "independent"],
      required: true,
    },
    district: { type: String },
    photo: { type: String },
    status: { type: String, enum: ["active", "former"], required: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("member", memberSchema);