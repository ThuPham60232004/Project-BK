import express from "express";
import { register, login, forgotPassword, resetPassword,registerAdmin} from "../controllers/auth.js";
import { sendMailController } from '../controllers/mail.js';
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post("/registerAdmin", registerAdmin);
router.post('/send-mail', sendMailController);

export default router;
