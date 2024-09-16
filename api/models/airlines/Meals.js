import mongoose from "mongoose";

const MealsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false
    },
    description: {
      type: String,
      required: false
    },
    imageUrl: {
      type: String,
      required: false
    },
    price: {
      type: Number,
      required: false
    },
    availability: {
      type: String,
      enum: ["Available", "Not Available"],
      required: false
    },
    idAdmin:{
      type: String,
      required: false,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Meals", MealsSchema);
