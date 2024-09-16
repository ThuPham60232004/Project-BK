import express from "express";
import {createAirplanes,updateAirplanes,deleteAirplanes,getAirplane,getAirplanes} from "../../controllers/airlines/Airplanes.js";
const router = express.Router();

router.post("/", createAirplanes);
router.put("/updateAirplanes", updateAirplanes);
router.delete('/deleteAirplanes', deleteAirplanes);
router.get('/getAirplane ', getAirplane );
router.get("/getAirplanes", getAirplanes);

export default router;