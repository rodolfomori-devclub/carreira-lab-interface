// frontend/src/components/FeatureCard.jsx
import React from 'react';

const FeatureCard = ({ title, description, icon, color }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 transition-transform hover:transform hover:scale-105">
      <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center text-2xl mb-4`}>
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureCard;