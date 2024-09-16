import express from "express";
import { createBookingTicket,updateBookingTicket,deleteBookingTicket,getBookingTicket,getBookingTickets } from "../../controllers/airlines/BookingTicket.js";
const router = express.Router();

router.post("/", createBookingTicket);
router.put("/updateBookingTicket", updateBookingTicket);
router.delete('/deleteBookingTicket', deleteBookingTicket);
router.get('/getBookingTicket ', getBookingTicket );
router.get("/getBookingTickets", getBookingTickets);

export default router;