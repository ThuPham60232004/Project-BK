import mongoose from "mongoose";
const AirlinesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,    },
    country: {
      type: String,
      required: true,
    },
    logoUrl: {
      type: String,
      required: true,
    },
    idAdmin: {
      type: String,
      required: false,
    }
  },
  { timestamps: true } 
);
export default mongoose.model("Airlines", AirlinesSchema);