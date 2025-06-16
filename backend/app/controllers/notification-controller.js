import Notification from "../models/notification-model.js";

const notificationController = {}

notificationController.listUnreadCount = async (req, res) => {
  try {
    // const { userId } = req.params;

    const unreadCount = await Notification.countDocuments({
      userId:req.userId,
      isRead: false,
    });

    res.status(200).json({ unreadCount });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


notificationController.getAll = async (req, res) => {
  try {
    // const { userId } = req.params;
    const notifications = await Notification.find({ userId:req.userId }).sort({ createdAt: -1 });
    res.status(200).json({ notifications });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


notificationController.markAsRead = async (req, res) => {

  try {
  
    await Notification.updateMany(
      { userId:req.userId, isRead: false },
      { $set: { isRead: true } }
    );

    res.status(200).json({ message: 'All notifications marked as read' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export default notificationController;