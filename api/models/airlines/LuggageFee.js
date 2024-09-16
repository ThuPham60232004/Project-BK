import mongoose from "mongoose";
const LuggageFeeSchema= new mongoose.Schema(
  {
    nameLuggage:{
      type:String,
      required:true
      
    },
    weightChecked:{
        type:Number,
        required:true
    },
     fee:{
        type:Number,
        required:true
    },
     departurePoint:{
        type:String,
        required:false
    },
    destination:{
        type:String,
        required:false
    },
    type:{
      type:String,
      enum:["inland","international"]
    },
    idAdmin:{
      type: String,
      required: false,
    }
  },
  { timestamps: true }
);
const LuggageFee = mongoose.model("LuggageFee", LuggageFeeSchema);
export default LuggageFee;
