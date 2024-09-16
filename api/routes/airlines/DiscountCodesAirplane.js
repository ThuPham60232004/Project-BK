import express from "express";
import {
  createDiscountCodesAirplane,
  updateDiscountCodesAirplane,
  deleteDiscountCodesAirplane,
  getDiscountCodeAirplane,
  getDiscountCodesAirplanes,
  applyDiscountCodeAirplane
} from "../../controllers/airlines/DiscountCodesAirplane.js";

const router = express.Router();

router.post("/", createDiscountCodesAirplane);
router.put("/updateDiscountCodesAirplane/:id", updateDiscountCodesAirplane);
router.delete('/deleteDiscountCodesAirplane/:id', deleteDiscountCodesAirplane);
router.get('/getDiscountCodeAirplane/:id', getDiscountCodeAirplane);
router.get("/getdiscountCodesAirplanes", getDiscountCodesAirplanes);
router.post('/applyDiscountCodeAirplane', applyDiscountCodeAirplane);

export default router;
