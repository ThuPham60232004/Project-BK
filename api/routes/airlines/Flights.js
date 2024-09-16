import express from "express";
import { createFlights,updateFlights,deleteFlights,getFlight,getFlights } from "../../controllers/airlines/Flights.js";
const router = express.Router();

router.post("/", createFlights);
router.put("/updateFlights", updateFlights);
router.delete('/deleteFlights', deleteFlights);
router.get('/getFlight ', getFlight );
router.get("/getFlights", getFlights);

export default router;