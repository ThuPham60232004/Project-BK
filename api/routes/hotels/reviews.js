import express from "express";
import { createReview,getReviewByAdminId, getReview, getAllReviews, updateReview, 
    deleteReview, getReviewById, searchReviews } from "../../controllers/hotels/reviews.js";

const router = express.Router();

// Create a review
router.post("/", createReview);

// Get a single review
router.get("/user/:id", getReview);

// Get all reviews
router.get("/", getAllReviews);

// Update a review
router.put("/:id", updateReview);

// Delete a review
router.delete("/:id", deleteReview);

// Get a review by ID
router.get("/:id", getReviewById);

// Tìm kiếm đánh giá theo nhiều tiêu chí
router.get("/search", searchReviews);  // Route cho chức năng tìm kiếm

router.get("/hotelAdmin/:idAdmin", getReviewByAdminId);
export default router;
