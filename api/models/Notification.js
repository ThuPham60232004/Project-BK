import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    idAdmin:{
      type:String,
      required:false
    }
  },
  { timestamps: true }
);

export default mongoose.model("Notification", NotificationSchema);
