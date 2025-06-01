import mongoose from 'mongoose';

const {Schema,model} = mongoose;

const notificationSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  type:String,
});

const Notification =  model('Notification', notificationSchema);
export default Notification;
