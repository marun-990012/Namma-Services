import express from 'express';
import authentication from '../../app/middlewares/user-authentication.js';
import notificationController from '../../app/controllers/notification-controller.js';

const notificationRoute = express.Router();

// api's for notification
notificationRoute.get('/list/unread/count',authentication,notificationController.listUnreadCount);
notificationRoute.get('/list/all',authentication,notificationController.getAll);
notificationRoute.put('/read',authentication,notificationController.markAsRead);

export default notificationRoute;