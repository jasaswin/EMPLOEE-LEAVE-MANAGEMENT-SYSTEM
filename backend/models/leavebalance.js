
const mongoose = require("mongoose");

const leaveBalanceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    vacation: {
      type: Number,
      default: 12
    },

    sick: {
      type: Number,
      default: 8
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("LeaveBalance", leaveBalanceSchema);
