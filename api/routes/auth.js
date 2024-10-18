import express from "express";
import { register, login,registerAdmin} from "../controllers/auth.js";
import { forgotPassword, verifyResetCode } from '../controllers/forgotPassword.js';
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post('/verifyResetCode', verifyResetCode);
router.post("/registerAdmin", registerAdmin);
router.post("/forgotPassword", forgotPassword);
export default router;
