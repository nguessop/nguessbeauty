import React from 'react';

const Notifications: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Notifications
        </h1>
        <p className="text-gray-600">
          Gérez vos notifications
        </p>
      </div>
    </div>
  );
};

export default Notifications;