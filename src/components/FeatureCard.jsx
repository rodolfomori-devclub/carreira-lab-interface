// frontend/src/components/FeatureCard.jsx
import React from 'react';

const FeatureCard = ({ title, description, icon, color }) => {
  return (
    <div className="bg-white dark:bg-secondary-light rounded-lg shadow-md dark:shadow-secondary-dark/50 p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-lg dark:hover:shadow-secondary-dark/70 animate-fade-in">
      <div className={`w-12 h-12 ${color} dark:bg-opacity-30 rounded-lg flex items-center justify-center text-2xl mb-4 animate-pulse-slow`}>
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
};

export default FeatureCard;