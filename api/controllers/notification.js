import Notification from "../models/Notification.js";

// Gửi một thông báo mới
export const sendNotification = async (req, res) => {
  const { user, message } = req.body;

  try {
    const newNotification = new Notification({ user, message });
    await newNotification.save();
    res.status(201).json(newNotification);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Lấy thông báo của người dùng
export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.params.userId });
    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Đánh dấu một thông báo là đã đọc
export const markAsRead = async (req, res) => {
  try {
    const updatedNotification = await Notification.findByIdAndUpdate(
      req.params.id,
      { $set: { isRead: true } },
      { new: true }
    );
    res.status(200).json(updatedNotification);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Xóa một thông báo
export const deleteNotification = async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.status(200).json("Thông báo đã bị xóa.");
  } catch (err) {
    res.status(500).json(err);
  }
};
// Lấy tất cả các thông báo
export const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json(err);
  }
};
// Lấy một thông báo theo ID
export const getNotificationById = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).json("Không tìm thấy thông báo.");
    }
    res.status(200).json(notification);
  } catch (err) {
    res.status(500).json(err);
  }
};
// Tìm kiếm thông báo theo nhiều tiêu chí
export const searchNotifications = async (req, res) => {
  const { user, isRead, message, dateFrom, dateTo } = req.query;

  try {
    const query = {};

    if (user) query.user = user;
    if (isRead) query.isRead = isRead === 'true'; // Chuyển đổi chuỗi thành boolean
    if (message) query.message = { $regex: new RegExp(message, 'i') }; // Tìm kiếm theo phần của nội dung thông báo
    if (dateFrom || dateTo) {
      query.createdAt = {};
      if (dateFrom) query.createdAt.$gte = new Date(dateFrom);
      if (dateTo) query.createdAt.$lte = new Date(dateTo);
    }

    const notifications = await Notification.find(query).sort({ createdAt: -1 }); // Sắp xếp theo ngày tạo, mới nhất trước
    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json(err);
  }
};
export const getNotificationByAdminId = async (req, res, next) => {
  const idAdmin = req.params.idAdmin;
  try {
    const notifications = await Notification.find({ idAdmin });
    res.status(200).json(notifications);
  } catch (err) {
    console.error('Error fetching notifications:', err);
    res.status(500).json({ message: 'Server error' });
  }
};