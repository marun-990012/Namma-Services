import {IconBellFilled, IconInfoCircle, IconCheck, IconX, IconBan } from '@tabler/icons-react';

const mockNotifications = [
  {
    id: 1,
    title: 'Job Request Submitted',
    message: 'You have successfully requested to join the job "Plumbing Work".',
    type: 'info',
    createdAt: '2025-06-01T14:00:00Z',
  },
  {
    id: 2,
    title: 'Selected for Job',
    message: 'You’ve been selected to work on "Garden Cleaning".',
    type: 'success',
    createdAt: '2025-06-01T12:30:00Z',
  },
  {
    id: 3,
    title: 'Request Declined',
    message: 'Unfortunately, your request for "Electric Repair" was declined.',
    type: 'error',
    createdAt: '2025-06-01T10:15:00Z',
  },
  {
  id: 4,
  title: 'Request Rejected',
  message: 'Unfortunately, your request for "Electric Repair" was rejected.',
  type: 'rejected',
  createdAt: '2025-06-01T10:15:00Z',
}
];

const getIcon = (type) => {
  switch (type) {
  case 'info':
    return <IconInfoCircle className="text-blue-500" size={20} />;
  case 'success':
    return <IconCheck className="text-green-500" size={20} />;
  case 'error':
    return <IconX className="text-red-500" size={20} />;
  case 'rejected':
    return <IconX className="text-pink-500" size={20} />; // or use a different color/icon
  default:
    return <IconInfoCircle className="text-gray-500" size={20} />;
}

};

function Notification() {
  return (
    <div className="flex flex-col items-center p-6 pt-4 bg-gray-100 border-3 border-white shadow-sm rounded-xl w-full mb-3">
      <div className="w-full mb-4">
        <h2 className="flex items-center text-xl font-semibold text-gray-700">
          <IconBellFilled size={22} className="text-yellow-500 mr-2" />
          Notifications
        </h2>
      </div>

      <div className="w-full space-y-3 px-7">
  {mockNotifications.map(({ id, title, message, createdAt, type }) => (
    <div
      key={id}
      className="bg-white p-4 rounded-md shadow hover:shadow-md transition border-l-4"
      style={{
        borderColor:
          type === 'success'
            ? '#22c55e'
            : type === 'error'
            ? '#ef4444'
            : type === 'info'
            ? '#3b82f6'
            : type === 'rejected'
            ? '#ec4899' // pink-500 for rejected
            : '#d1d5db',
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
