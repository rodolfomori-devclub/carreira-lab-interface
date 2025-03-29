// src/components/SuggestionButton.jsx
import React from 'react';

const SuggestionButton = ({ question, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full text-left px-4 py-3 bg-gray-100 dark:bg-secondary-light hover:bg-primary-light/20 dark:hover:bg-primary-dark/20 text-text-light dark:text-text-dark rounded-md text-sm transition-colors duration-200 border border-transparent hover:border-primary dark:hover:border-primary-light disabled:opacity-50 disabled:cursor-not-allowed min-h-[60px] flex items-center"
      title={question}
    >
      <span className="line-clamp-2">{question}</span>
    </button>
  );
};

export default SuggestionButton;