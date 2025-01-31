const chamberSchema = new mongoose.Schema(
  {
    name: { type: String, enum: ["house", "senate"], required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("chamber", chamberSchema);
