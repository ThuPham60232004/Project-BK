import express from "express";
import {
  getAllDiscountCodes,
  applyDiscountCode,
  createDiscountCode,
  updateDiscountCode,
  deleteDiscountCode,
  getDiscountCodeById,
  getDiscountCodeByAdminId
} from "../../controllers/hotels/discountController.js";

const router = express.Router();

router.get('/', getAllDiscountCodes);

// Get discount code by ID
router.get('/:id', getDiscountCodeById);

// Apply discount code
router.post('/apply', applyDiscountCode);

// Create new discount code
router.post('/', createDiscountCode);

// Update discount code
router.put('/:id', updateDiscountCode);

// Delete discount code
router.delete('/:id', deleteDiscountCode);

router.get("/hotelAdmin/:idAdmin", getDiscountCodeByAdminId);
export default router;
