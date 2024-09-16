import mongoose from "mongoose";

const BookingTicketSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: false,
    },
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
    passengerName: {
      type: String,
      required:false,
    },
    passportNumber: {
      type: String,
      required: false,
    },
    bookingDate: {
      type: Date,
      required: false,
    },
    totalAmount: {
      type: Number,
      required: false,
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled"],
      required: true,
    },
    mealId: {
      type: String,
      required: false, 
    },
    luggageFeeId: {
      type: String,
      required: false, 
    },
    idAdmin: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("BookingTicket", BookingTicketSchema);
