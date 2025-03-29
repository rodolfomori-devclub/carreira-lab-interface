// src/components/ChatMessage.jsx
import React from 'react';
import ReactMarkdown from 'react-markdown';
import Fernanda from '../assets/fernanda.png';

const ChatMessage = ({ message, isLastMessage }) => {
  // Verificar se é uma mensagem do assistente ou do usuário
  const isAssistant = message.role === 'assistant';
  
  // Formatar timestamp
  const formatTime = (timestamp) => {
    try {
      const date = new Date(timestamp);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      return '';
    }
  };

  return (
    <div 
      className={`flex items-start ${isAssistant ? '' : 'justify-end'} animate-fade-in`}
    >
      {/* Avatar (apenas para mensagens do assistente) */}
      {isAssistant && (
        <div className="w-8 h-8 rounded-full overflow-hidden mr-2 flex-shrink-0">
          <img 
            src={Fernanda} 
            alt="Fernanda" 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      {/* Conteúdo da mensagem */}
      <div 
        className={`relative group max-w-[80%] ${
          isAssistant 
            ? 'bg-gray-200 dark:bg-secondary-light text-text-light dark:text-text-dark rounded-lg rounded-tl-none' 
            : 'bg-primary text-white rounded-lg rounded-tr-none'
        } px-4 py-3 shadow-sm`}
      >
        {/* Conteúdo da mensagem com suporte a markdown para mensagens do assistente */}
        {isAssistant ? (
          <div className="prose dark:prose-invert prose-sm max-w-none">
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        ) : (
          <p>{message.content}</p>
        )}
        
        {/* Horário da mensagem */}
        <div className={`text-xs mt-1 ${
          isAssistant ? 'text-text-muted-light dark:text-text-muted-dark' : 'text-white/70'
        }`}>
          {formatTime(message.timestamp)}
        </div>
      </div>
      
      {/* Avatar do usuário (apenas para mensagens do usuário) */}
      {!isAssistant && (
        <div className="w-8 h-8 rounded-full overflow-hidden ml-2 bg-gray-300 dark:bg-gray-600 flex items-center justify-center flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;