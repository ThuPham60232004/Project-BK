import express from "express";
import {createTickets,updateTickets,deleteTickets,getTicket,getTickets} from "../../controllers/airlines/Tickets.js";
const router = express.Router();

router.post("/", createTickets);
router.put("/updateTickets/:id", updateTickets);
router.delete('/deleteTickets', deleteTickets);
router.get("/getTicket/:id", getTicket);
router.get("/getTickets", getTickets);

export default router;