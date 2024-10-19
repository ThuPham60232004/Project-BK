import express from "express";
import { createReview,getReviewByAdminId, getReview, getAllReviews, updateReview, 
    deleteReview, getReviewById,getReviewByIdclient,getAllReviewsclient} from "../../controllers/hotels/reviews.js";

const router = express.Router();

// Create a review
router.post("/", createReview);
// Get all reviews
router.get("/", getAllReviews);
router.get("/getReviewByIdclient", getReviewByIdclient);
router.get("/getAllReviewsclient", getAllReviewsclient);
// Get a single review
router.get("/user/:id", getReview);

// Update a review
router.put("/:id", updateReview);

// Delete a review
router.delete("/:id", deleteReview);

// Get a review by ID
router.get("/:id", getReviewById);



router.get("/hotelAdmin/:idAdmin", getReviewByAdminId);
export default router;
