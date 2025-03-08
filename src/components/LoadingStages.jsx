// frontend/src/components/LoadingStages.jsx
import React, { useState, useEffect } from 'react';

const LoadingStages = ({ note }) => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  
  // Frases divertidas que irão alternar
  const loadingPhrases = [
    "Nossa Recrutadora está lendo o seu perfil... 👀",
    "Agora ela está analisando cuidadosamente... 🧐",
    "Escrevendo uma Análise detalhada... 📝",
    "Últimas etapas, estamos quase prontos! 🚀",
    "Já bebeu água hoje? Não? Corre lá que eu já to terminando. 💧",
    "Encontrando os seus super poderes profissionais... 🦸‍♀️",
    "Calculando seu potencial de causar inveja nos recrutadores... 📊",
    "Verificando se seu perfil tem mais estrelas que o GitHub... ⭐",
    "Analisando se suas soft skills são tão boas quanto seu café... ☕",
    "Pedindo para a recrutadora caprichar na análise... ela é perfeccionista! 👩‍💼"
  ];

  // Alternar para a próxima frase a cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhraseIndex((prevIndex) => 
        (prevIndex + 1) % loadingPhrases.length
      );
    }, 5000);
    
    // Limpar intervalo quando componente for desmontado
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-8">
      {/* Animação de carregamento */}
      <div className="relative w-24 h-24 mb-6">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-200 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-t-4 border-indigo-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl">👩‍💼</span>
        </div>
      </div>
      
      {/* Frase de loading atual */}
      <div className="bg-indigo-100 text-indigo-800 px-5 py-3 rounded-full mb-4 text-center max-w-md transition-all duration-300 ease-in-out">
        <p className="font-medium">{loadingPhrases[currentPhraseIndex]}</p>
      </div>
      
      {/* Barra de progresso animada */}
      <div className="w-64 h-2 bg-gray-200 rounded-full mb-4 overflow-hidden">
        <div className="h-full bg-indigo-600 rounded-full animate-pulse"></div>
      </div>
      
      {/* Contador de tempo aproximado */}
      <p className="text-gray-500 text-sm mb-6">Tempo estimado: ~1 minuto</p>
      
      {/* Nota (se existir) */}
      {note && (
        <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-md text-sm text-yellow-800 max-w-md">
          <p className="font-medium mb-1">Nota:</p>
          <p>{note}</p>
        </div>
      )}
    </div>
  );
};

export default LoadingStages;