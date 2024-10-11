import mongoose from "mongoose";

const UserActivitySchema = new mongoose.Schema(
  {
    userId: {
        type: String,
        required: true
    },
    pageUrl: {
      type: String,
      required: true,
    },
    timestamp: 
    {
      type: Date,
      default: Date.now,
    },
    duration: 
    {
      type: Number, 
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("UserActivity", UserActivitySchema);
