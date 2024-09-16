import express from "express";
import {
  getAllDiscountCodes,
  applyDiscountCode,
  createDiscountCode,
  updateDiscountCode,
  deleteDiscountCode,
  getDiscountCodeById,
  searchDiscountCodes ,
  getDiscountCodeByAdminId
} from "../../controllers/hotels/discountController.js";

const router = express.Router();

// Get all valid discount codes
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

// Tìm kiếm mã giảm giá theo nhiều tiêu chí
router.get('/search', searchDiscountCodes);
router.get("/hotelAdmin/:idAdmin", getDiscountCodeByAdminId);
export default router;
