const mongoose = require("mongoose");
const { Schema } = mongoose;

const citySchema = new Schema(
  {
    city: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("city", citySchema);
