import mongoose from "mongoose";

// Schema cho Tickets
const TicketsSchema = new mongoose.Schema(
  {
    flightId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Flights",
      required: false,
    },
    seatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seats",
      required: false,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Booked", "Canceled"],
      required: true,
    },
    luggageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Luggage",
      required: false,
    },
    img: {
      type: String,
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
  idAdmin:{
    type: String,
    required: false,
  }
  },
  { timestamps: true }
);

const Tickets = mongoose.model("Tickets", TicketsSchema);
export default Tickets;