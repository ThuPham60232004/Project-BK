import express from "express";
import { createReview,getReviewByAdminId, getReview, getAllReviews, updateReview, 
    deleteReview, getReviewById} from "../../controllers/hotels/reviews.js";

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



router.get("/hotelAdmin/:idAdmin", getReviewByAdminId);
export default router;
