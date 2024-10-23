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
router.get('/:id', getDiscountCodeById);
router.post('/apply', applyDiscountCode);
router.post('/', createDiscountCode);
router.put('/:id', updateDiscountCode);
router.delete('/:id', deleteDiscountCode);
router.get("/hotelAdmin/:idAdmin", getDiscountCodeByAdminId);
export default router;
