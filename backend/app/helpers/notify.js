import Notification from "../models/notification-model.js";

export const sendNotification = async ({ userId, title, message, type = "info" }) => {
  console.log('notification ')
  return await Notification.create({ userId, title, message, type });
};