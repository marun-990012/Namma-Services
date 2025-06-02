import {IconBellFilled, IconInfoCircle, IconCheck, IconX, IconBan,IconAlertTriangle } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchNotifications,fetchUnreadCount,markNotificationsAsRead } from '../../redux/slices/notificationSlice';
import { useLocation } from 'react-router-dom';


const getIcon = (type) => {
  switch (type) {
  case 'info':
    return <IconInfoCircle className="text-blue-500" size={20} />;
  case 'success':
    return <IconCheck className="text-green-500" size={20} />;
  case 'error':
    return <IconX className="text-red-500" size={20} />;
  case 'warning':
    return <IconAlertTriangle className="text-yellow-500" size={20} />;
  case 'rejected':
    return <IconX className="text-pink-500" size={20} />; // or use a different color/icon
  default:
    return <IconInfoCircle className="text-gray-500" size={20} />;
}

};

function Notification() {
  const dispatch = useDispatch();
  const location = useLocation();
  const notificationData = useSelector((state) => state.notifications);

  useEffect(() => {
    // Always fetch unread count for bell icon etc.
    dispatch(fetchUnreadCount());

    // Check if user is on the notification page
    if (location.pathname === "/notifications") {
      dispatch(fetchNotifications()).then(() => {
        dispatch(markNotificationsAsRead());
      });
    }
  }, [location, dispatch]);
  return (
    <div className="flex flex-col items-center p-6 pt-4 bg-gray-100 border-3 border-white shadow-sm rounded-xl w-full mb-3">
      <div className="w-full mb-4">
        <h2 className="flex items-center text-xl font-semibold text-gray-700">
          <IconBellFilled size={22} className="text-yellow-500 mr-2" />
          Notifications
        </h2>
      </div>

      <div className="w-full space-y-3 px-7">
  {notificationData?.notifications?.map(({ id, title, message, createdAt, type }) => (
    <div
      key={id}
      className="bg-white p-4 rounded-md shadow hover:shadow-md transition border-l-4"
      style={{
        borderColor:
          type === 'success'
            ? '#22c55e' // green-500
            : type === 'error'
            ? '#ef4444' // red-500
            : type === 'info'
            ? '#3b82f6' // blue-500
            : type === 'warning'
            ? '#facc15' // yellow-400
            : type === 'rejected'
            ? '#ec4899' // pink-500
            : '#d1d5db', // gray-300 default
      }}
    >
      <div className="flex items-start gap-3">
        {getIcon(type)}
        <div className="flex-1">
          <p className="font-medium text-gray-800">{title}</p>
          <p className="text-sm text-gray-600">{message}</p>
          <p className="text-xs text-gray-400 mt-1">
            {new Date(createdAt).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  ))}
</div>

    </div>
  );
}

export default Notification;
