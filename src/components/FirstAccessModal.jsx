// frontend/src/components/FirstAccessModal.jsx
import React, { useState, useEffect } from 'react';
import Fernanda from '../assets/fernanda.png'

const FirstAccessModal = ({ onClose }) => {
  // Verificar se é o primeiro acesso
  const [isFirstAccess, setIsFirstAccess] = useState(false);

  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem('visited');
    if (!hasVisitedBefore) {
      setIsFirstAccess(true);
      localStorage.setItem('visited', 'true');
    }
  }, []);

  if (!isFirstAccess) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay com fundo escurecido */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-xs animate-fade-in"
        onClick={onClose}
      ></div>
      
      {/* Conteúdo do modal */}
      <div className="relative bg-white dark:bg-secondary-dark rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-slide-up">
        {/* Cabeçalho */}
        <div className="sticky top-0 bg-gradient-to-r from-primary to-primary-light dark:from-primary-dark dark:to-primary text-secondary-dark dark:text-white px-6 py-4 flex justify-between items-center rounded-t-lg">
          <h3 className="text-2xl font-bold">
            Bem-vindo ao DevClub CarreiraLab!
          </h3>
          <button 
            onClick={onClose}
            className="text-secondary-dark dark:text-white hover:text-secondary hover:dark:text-gray-200 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Conteúdo */}
        <div className="p-6 dark:bg-secondary dark:text-white">
          <div className="flex flex-col md:flex-row items-center mb-6">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden mb-4 md:mb-0 md:mr-6 border-4 border-primary shadow-neon">
              {/* Placeholder para foto da Fernanda */}
              <img 
                src={Fernanda} 
                alt="Fernanda - DevClub Recrutadora"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "../assets/fernanda.png";
                }}
              />
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-2">
                Olá! Eu sou a Fernanda, sua Recrutadora DevClub.
              </h4>
              <p className="text-gray-700 dark:text-gray-300">
                Estou aqui para ajudar você a impulsionar sua carreira de desenvolvedor
                e conseguir as melhores oportunidades do mercado.
              </p>
            </div>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">No DevClub CarreiraLab, você encontrará:</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="cursor-pointer bg-gray-50 dark:bg-secondary-light p-4 rounded-lg border-l-4 border-primary transform transition-all hover:scale-105">
                <h5 className="font-medium mb-2">Análise de LinkedIn</h5>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Receba uma análise detalhada do seu perfil LinkedIn e recomendações para destacá-lo.
                </p>
              </div>
              
              <div className="cursor-pointer bg-gray-50 dark:bg-secondary-light p-4 rounded-lg border-l-4 border-primary transform transition-all hover:scale-105">
                <h5 className="font-medium mb-2">Chat com a Fernanda</h5>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Tire dúvidas sobre carreira, processos seletivos e currículo diretamente com a recrutadora.
                </p>
              </div>
              
              <div className="cursor-pointer bg-gray-50 dark:bg-secondary-light p-4 rounded-lg border-l-4 border-primary transform transition-all hover:scale-105">
                <h5 className="font-medium mb-2">Entrevistas Simuladas</h5>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Pratique suas habilidades de entrevista com feedbacks personalizados.
                </p>
              </div>
              
              <div className="cursor-pointer bg-gray-50 dark:bg-secondary-light p-4 rounded-lg border-l-4 border-primary transform transition-all hover:scale-105">
                <h5 className="font-medium mb-2">LabVagas</h5>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Vagas exclusivas e oportunidades selecionadas para desenvolvedores DevClub.
                </p>
              </div>
            </div>
            
            <p className="text-center font-medium text-gray-700 dark:text-gray-300 mt-4 animate-pulse-slow">
              Estou ansiosa para ajudar você a alcançar o próximo nível na sua carreira!
            </p>
          </div>
        </div>
        
        {/* Rodapé */}
        <div className="border-t border-gray-200 dark:border-secondary-light px-6 py-4 bg-gray-50 dark:bg-secondary-dark flex justify-center">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-primary hover:bg-primary-dark text-white font-medium rounded-md transition-colors duration-300 shadow-md hover:shadow-neon transform hover:scale-105"
          >
            Começar minha jornada
          </button>
        </div>
      </div>
    </div>
  );
};

export default FirstAccessModal;