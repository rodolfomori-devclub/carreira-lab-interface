// frontend/src/components/SupportModal.jsx
import React, { useEffect } from 'react';

const SupportModal = ({ onClose }) => {
  // Fechar o modal com a tecla ESC
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay com fundo escurecido */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>
      
      {/* Conteúdo do modal */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        {/* Cabeçalho */}
        <div className="mb-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-gray-800">
              Não foi possível analisar seu perfil
            </h3>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Ícone de erro */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-600">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>
        
        {/* Mensagem */}
        <div className="text-center mb-6">
          <p className="text-gray-700 mb-3">
            Desculpe, não conseguimos acessar seu perfil LinkedIn no momento. 
            Isso pode ocorrer por vários motivos:
          </p>
          <ul className="text-left text-gray-600 list-disc pl-5 mb-4 space-y-1">
            <li>O perfil está configurado como privado</li>
            <li>Problemas na conexão com o LinkedIn</li>
            <li>Cookies desatualizados</li>
            <li>Seu perfil tem configurações de privacidade restritivas</li>
          </ul>
          <p className="text-gray-700">
            Por favor, entre em contato com nosso suporte para resolvermos isso.
          </p>
        </div>
        
        {/* Botões */}
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <a
            href="https://go.rodolfomori.com.br/suporte"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition text-center"
          >
            Contatar Suporte
          </a>
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupportModal;