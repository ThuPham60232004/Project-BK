import mongoose from "mongoose";

// Schema cho Flights
const FlightsSchema = new mongoose.Schema(
  {
    airlineID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Airlines",
      required: true,
    },
     airplaneId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Airplanes",
      required: true,
    },
    flightNumber: {
      type: String,
      required: true,
    },
    departureCity: {
      type: String,
      required: true,
    },
    arrivalCity: {
      type: String,
      required: true,
    },
    departureTime: {
      type: Date,
      required: true,
    },
    arrivalTime: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Scheduled", "Delayed", "Canceled"],
      required: true,
    },
    idAdmin:{
      type: String,
      required: false,
    }
  },
  { timestamps: true }
);

const Flights = mongoose.model("Flights", FlightsSchema);
export default Flights;
