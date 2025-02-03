const mongoose = require("mongoose");

const termSchema = new mongoose.Schema(
  {
    startYear: {
      type: Number,
      required: true,
    },
    endYear: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    congress: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

// Auto-generate description before saving
termSchema.pre("save", function (next) {
  this.description = `${this.startYear}-${this.endYear}`;
  next();
});

module.exports = mongoose.model("term", termSchema);
