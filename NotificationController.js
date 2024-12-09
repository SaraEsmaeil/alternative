const Notification = require('../models/notificationModel');

// Create a new notification
const createNotification = async (req, res) => {
  const { userId, message, type } = req.body;
  try {
    const notification = await Notification.create({ userId, message, type });
    res.status(201).json({ message: 'Notification created successfully', notification });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create notification', error: error.message });
  }
};

// Get all notifications for a user
const getNotifications = async (req, res) => {
  const { userId } = req.params;
  try {
    const notifications = await Notification.find({ userId }).sort({ timestamp: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve notifications', error: error.message });
  }
};

// Mark a notification as read
const markAsRead = async (req, res) => {
  const { id } = req.params;
  try {
    const notification = await Notification.findByIdAndUpdate(
      id,
      { read: true },
      { new: true }
    );
    res.status(200).json({ message: 'Notification marked as read', notification });
  } catch (error) {
    res.status(500).json({ message: 'Failed to mark notification as read', error: error.message });
  }
};

module.exports = { createNotification, getNotifications, markAsRead };
