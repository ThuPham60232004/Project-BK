import express from "express";
import { createLuggageFee,deleteLuggageFee ,updateLuggageFee,getLuggageFee,getLuggageFees} from "../../controllers/airlines/LuggageFee.js";
const router = express.Router();

router.post("/", createLuggageFee);
router.delete("/deleteLuggageFee", deleteLuggageFee);
router.put('/updateLuggageFee', updateLuggageFee);
router.get('/getLuggageFee ', getLuggageFee );
router.get("/getLuggageFees", getLuggageFees);

export default router;