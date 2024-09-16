import mongoose from "mongoose";

const discountCodeAirplaneSchema = new mongoose.Schema({
  code: { 
    type: String,
    required: true,
    unique: true 
  },
  discountType: { 
    type: String,
    enum: ['percentage', 'fixed'],
    required: true 
  },
  discountValue: {
    type: Number,
    required: false
  },
  startDate: {
    type: Date,
    required: false
  },
  expirationDate: {
    type: Date,
    required: false
  },
  amountDiscountCode: {
    type: Number,
    required: false
  },
  idAdmin: {
    type: String,
    required: false
  }
});

const DiscountCodeAirplane = mongoose.model('DiscountCodeAirplane', discountCodeAirplaneSchema);

export default DiscountCodeAirplane;