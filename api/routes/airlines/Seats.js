import express from "express";
import {createSeats,deleteSeats,getSeat,getSeats,updateSeats } from "../../controllers/airlines/Seats.js";
const router = express.Router();

router.post("/", createSeats);
router.delete("/deleteSeats/:id", deleteSeats);
router.get('/getSeat', getSeat);
router.get('/getSeats', getSeats );
router.put("/updateSeats", updateSeats);

export default router;
