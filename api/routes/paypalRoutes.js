import express from 'express';
import { createOrder } from '../controllers/paypal.js'; // Đảm bảo bạn có phần mở rộng ".js" nếu cần

const router = express.Router();

router.post('/api/paypal/create-order', async (req, res) => {
  const { amount } = req.body;
  try {
    const order = await createOrder(amount);
    res.json(order);
  } catch (error) {
    console.error("Tạo đơn hàng PayPal thất bại", error);
    res.status(500).send("Lỗi khi tạo đơn hàng PayPal");
  }
});

export default router;
