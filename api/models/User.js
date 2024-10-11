import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: false,
      unique: true,
    },
    email: {
      type: String,
      required: false,
      unique: true,
    },
    country: {
      type: String,
      required: false,
    },
    img: {
      type: String,
    },
    city: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required:true,
    },
    CCCD:{
      type:String,
      required:false
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ['system_admin', 'hotel_admin', 'user'],
      default: 'user'
    },
    passportNumber: {
      type: String,
      required: false,
    },
    passengerName: {
      type: String,
      required: false,
    },
    passwordResetToken: 
    { 
      type: String 
    },
    passwordResetExpires: 
    { 
      type: Date
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
