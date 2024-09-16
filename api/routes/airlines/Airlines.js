import express from "express";
import { createAirlines,deleteAirlines,updateAirlines,getAirline,getAirlines } from "../../controllers/airlines/Airlines.js";
const router = express.Router();

router.post("/", createAirlines);
router.delete("/deleteAirlines", deleteAirlines);
router.put('/updateAirlines', updateAirlines);
router.get('/getAirline ', getAirline );
router.get("/getAirlines", getAirlines);

export default router;