// frontend/src/pages/Analysis.jsx
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnalysisForm from '../components/AnalysisForm';
import AnalysisResult from '../components/AnalysisResult';
import NetworkBackground from '../components/NetworkBackground'; // Importando o componente adaptativo de background
import { fetchObjectives } from '../services/api';

// Estilos de animação flutuante
const floatingAnimationStyles = `
  @keyframes floating {
    0% {
      transform: translateY(0px) rotate(0deg);
    }
    25% {
      transform: translateY(-8px) rotate(1deg);
    }
    50% {
      transform: translateY(0px) rotate(0deg);
    }
    75% {
      transform: translateY(8px) rotate(-1deg);
    }
    100% {
      transform: translateY(0px) rotate(0deg);
    }
  }

  .floating-element {
    animation: floating 6s ease-in-out infinite;
    box-shadow: 0 10px 25px rgba(57, 255, 20, 0.3);
    transition: all 0.3s ease;
  }

  .floating-element:hover {
    animation-play-state: paused;
    transform: scale(1.05);
    box-shadow: 0 15px 30px rgba(57, 255, 20, 0.5);
  }
`;

const Analysis = () => {
  // Estados para objetivos, carregamento, resultado e erros
  const [objectives, setObjectives] = useState([
    // Objetivos padrão para não mostrar tela vazia durante carregamento
    {
      id: 'first_job',
      name: 'Primeiro Emprego',
      description: 'Otimizar seu perfil para conseguir seu primeiro emprego como desenvolvedor'
    },
    {
      id: 'career_upgrade',
      name: 'Upgrade de Carreira',
      description: 'Melhorar seu perfil para conseguir uma posição senior ou gerencial'
    },
    {
      id: 'international',
      name: 'Mercado Internacional',
      description: 'Adaptar seu perfil para oportunidades no mercado global'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState(null);

  // Buscar objetivos disponíveis ao carregar a página
  useEffect(() => {
    const loadObjectives = async () => {
      try {
        const data = await fetchObjectives();
        if (data && Array.isArray(data) && data.length > 0) {
          setObjectives(data);
        }
      } catch (err) {
        console.error('Erro ao carregar objetivos:', err);
        // Não exibir erro aqui pois estamos usando objetivos padrão
      }
    };

    loadObjectives();
  }, []);

  // Handler para submissão do formulário
  const handleSubmitAnalysis = (result) => {
    setAnalysisResult(result);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler para iniciar nova análise
  const handleNewAnalysis = () => {
    setAnalysisResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col text-text-light dark:text-text-dark transition-colors duration-300">
      {/* Adiciona os estilos de animação flutuante */}
      <style>{floatingAnimationStyles}</style>
      
      {/* Adicionando o background animado */}
      <NetworkBackground />
      
      <Header />

      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          {/* Título da página */}
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-text-light dark:text-text-dark">
              {analysisResult ? 'Resultado da Análise' : 'Analisar Perfil LinkedIn'}
            </h1>
            <p className="text-lg text-text-muted-light dark:text-text-muted-dark max-w-2xl mx-auto">
              {analysisResult
                ? 'Confira a análise personalizada do seu perfil LinkedIn e recomendações para alcançar seu objetivo.'
                : 'Descubra como melhorar seu perfil LinkedIn com análise baseada em IA para atingir seus objetivos profissionais.'}
            </p>
          </div>

          {/* Exibir erro, se houver */}
          {error && (
            <div className="bg-red-100 dark:bg-red-900/30 border-l-4 border-red-500 text-red-700 dark:text-red-300 p-4 mb-6 max-w-4xl mx-auto animate-slide-down" role="alert">
              <p className="font-medium">Ocorreu um erro:</p>
              <p>{error}</p>
            </div>
          )}

          {/* Conteúdo principal com background glassmorphism para melhor legibilidade */}
          <div className="max-w-4xl mx-auto animate-slide-up">
            {analysisResult ? (
              <div className="bg-white/90 dark:bg-secondary/90 backdrop-blur-md rounded-lg shadow-xl p-6">
                <AnalysisResult 
                  result={analysisResult} 
                  onNewAnalysis={handleNewAnalysis} 
                />
              </div>
            ) : (
              <div className="bg-white/90 dark:bg-secondary/90 backdrop-blur-md rounded-lg shadow-xl p-6">
                <AnalysisForm 
                  objectives={objectives}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  setError={setError}
                  onSubmitSuccess={handleSubmitAnalysis}
                />
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Analysis;