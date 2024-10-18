import bcrypt from 'bcryptjs';
import User from "../models/User.js";
import { sendEmail } from "../utils/email.js";
import crypto from 'crypto';

const resetCodes = new Map(); 

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "Không tìm thấy người dùng.",
      });
    }

    // Tạo mã xác thực sử dụng một lần
    const resetCode = crypto.randomBytes(3).toString('hex'); 
    const expirationTime = Date.now() + 5 * 60 * 1000; // Mã có hiệu lực trong 5 phút

    resetCodes.set(email, { resetCode, expirationTime });

    const emailSubject = "Mã đặt lại mật khẩu";
    const emailText = `Mã đặt lại mật khẩu sử dụng một lần của bạn là: ${resetCode}. Mã sẽ hết hạn sau 5 phút.`;

    await sendEmail(email, emailSubject, emailText);

    res.status(200).json({
      message: "Mã đặt lại mật khẩu đã được gửi đến email của bạn.",
    });
  } catch (error) {
    next(error);
  }
};
export const verifyResetCode = async (req, res, next) => {
  try {
    const { email, resetCode, newPassword } = req.body;

    // Kiểm tra xem email có tồn tại trong danh sách mã xác thực không
    if (!resetCodes.has(email)) {
      return res.status(400).json({
        message: "Mã xác thực không hợp lệ hoặc đã hết hạn."
      });
    }

    const { resetCode: storedCode, expirationTime } = resetCodes.get(email);

    // Kiểm tra mã xác thực và thời gian hết hạn
    if (resetCode !== storedCode) {
      return res.status(400).json({
        message: "Mã xác thực không đúng."
      });
    }

    if (Date.now() > expirationTime) {
      resetCodes.delete(email); // Xóa mã hết hạn
      return res.status(400).json({
        message: "Mã xác thực đã hết hạn."
      });
    }

    // Cập nhật mật khẩu mới cho người dùng
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "Không tìm thấy người dùng."
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(newPassword, salt);

    user.password = hashPass;
    await user.save();

    // Xóa mã xác thực sau khi sử dụng
    resetCodes.delete(email);

    res.status(200).json({
      message: "Mật khẩu đã được đặt lại thành công."
    });
  } catch (error) {
    next(error);
  }
};