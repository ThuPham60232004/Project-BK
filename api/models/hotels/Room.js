import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discountPrice: {
    type: Number,
    required: false,
  },
  taxPrice: {
    type: Number,
    required: false,
  },
  maxPeople: {
    type: Number,
    required: true,
  },
  images: [String],
  category: {
    type: String,
    enum: ['Phòng Hạng Sang', 'Phòng Tổng Thống', 'Phòng Thường'], 
    required: true,
  },
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Review"
  }],
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  numberOfReviews: {
    type: Number,
    default: 0,
  },
  availability: [{
    date: Date,
    isBooked: Boolean, 
  }],
  idAdmin: {
    type: String,
    required: false,
  }
});

const Room = mongoose.model("Room", RoomSchema);

export default Room;
