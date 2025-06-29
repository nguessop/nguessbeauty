import React from 'react';

const Profile: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Profil
        </h1>
        <p className="text-gray-600">
          Gérez votre profil utilisateur
        </p>
      </div>
    </div>
  );
};

export default Profile;