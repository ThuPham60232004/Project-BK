// Schema cho Airplanes
import mongoose from "mongoose";

const AirplanesSchema = new mongoose.Schema(
  {
    registrationNumber: {
      type: String,
      unique: true,
      required: true, 
    },
    make: {
      type: String,
      required: false,
    },
    model: {
      type: String,
      required: false,
    },
    capacity: {
      type: Number,
      required: true,
    },
    range: {
      type: Number,
      required: false,
    },
    fuelCapacity: {
      type: Number,
      required: false,
    },
    lastMaintenanceDate: {
      type: String,
      required: true,
    },
    isOperational: {
      type: String,
      required: false,
    },
    idAdmin:{
      type: String,
      required: false,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Airplanes", AirplanesSchema);
