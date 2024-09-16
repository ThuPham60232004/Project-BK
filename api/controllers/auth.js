import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.js';
import { sendMail } from '../helpers/sendMail.js';

dotenv.config();

// User registration
export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(200).send("Người dùng đã được tạo.");
  } catch (err) {
    next(err);
  }
};
export const registerAdmin = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
      role: 'hotel_admin',
      isAdmin:true
    });

    await newUser.save();
    res.status(200).send("Người dùng đã được tạo.");
  } catch (err) {
    next(err);
  }
};
// User login
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "Không tìm thấy người dùng!"));

    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordCorrect) return next(createError(400, "Sai mật khẩu hoặc tên người dùng!"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, token, isAdmin });
  } catch (err) {
    next(err);
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT, { expiresIn: '1h' });
    const resetLink = `http://example.com/reset-password?token=${token}`;

    await sendMail({
      to: email,
      subject: 'Password Reset Request',
      template: 'template',
      templateVars: { name: user.name, resetLink },
    });

    res.json({ message: 'Password reset token generated and sent to user email' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const token = req.query.token;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({
      _id: decodedToken.id,
      passwordResetToken: token,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid or expired password reset token' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    const mailOptions = {
      from: process.env.EMAIL,
      to: user.email,
      subject: 'Password Reset Confirmation',
      html: `<p>Your password has been successfully reset.</p>`,
    };

    await sendMail(mailOptions);
    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};