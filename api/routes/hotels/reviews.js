import express from "express";
import { createReview,getReviewByAdminId, getReview, getAllReviews, updateReview, 
    deleteReview, getReviewById,getReviewByIdclient,getAllReviewsclient} from "../../controllers/hotels/reviews.js";

const router = express.Router();
router.post("/", createReview);
router.get("/", getAllReviews);
router.get("/getReviewByIdclient", getReviewByIdclient);
router.get("/getAllReviewsclient", getAllReviewsclient);
router.get("/user/:id", getReview);
router.put("/:id", updateReview);
router.delete("/:id", deleteReview);
router.get("/:id", getReviewById);
router.get("/hotelAdmin/:idAdmin", getReviewByAdminId);
export default router;
