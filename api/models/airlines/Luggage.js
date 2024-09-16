import mongoose from "mongoose";

const LuggageSchema = new mongoose.Schema(
  {
    nameLuggage: {
      type: String,
      required: true,
    },
    weightChecked: {
      type: Number,
      required: false,
    },
    weightCarryOn: {
      type: Number,
      required: false,
    },
    type: {
      type: String,
      enum: ["inland", "international"],
    },
    idAdmin:{
      type: String,
      required: false,
    }
  },
  { timestamps: true }
);

const Luggage = mongoose.model("Luggage", LuggageSchema);

export default Luggage;  
