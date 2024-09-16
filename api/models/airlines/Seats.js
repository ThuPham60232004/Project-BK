import mongoose from "mongoose";

const SeatsSchema = new mongoose.Schema(
  {
    flightId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Flights",
      required: true,
    },
    seatNumber: {
      type: Number,
      required: true,
    },
    seatClass: {
      type: String,
      enum: ["Economy", "Business", "First Class"],
      required: true,
    },
    isAvailable: {
      type: Boolean,
      required: true,
    },
    idAdmin:{
      type: String,
      required: false,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Seats", SeatsSchema);
