const termSchema = new mongoose.Schema(
  {
    year: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("term", termSchema);
