import express from "express";
import { createMeals, updateMeals, deleteMeals, getMeal, getMeals } from "../../controllers/airlines/Meals.js";

const router = express.Router();

router.post("/", createMeals);
router.put("/:id", updateMeals);
router.delete("/:id", deleteMeals);
router.get("/getMeal/:id", getMeal);
router.get("/getMeals", getMeals);

export default router;
