import Notification from "../models/Notification.js";

export const sendNotification = async (req, res) => {
  const { user, message, idAdmin } = req.body; 

  try {
    const newNotification = new Notification({ user, message, idAdmin }); 
    await newNotification.save();
    res.status(201).json(newNotification);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.params.userId });
    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json(err);
  }
};

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

export const deleteNotification = async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.status(200).json("Thông báo đã bị xóa.");
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json(err);
  }
};

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
