// frontend/src/components/AnalysisResult.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import AnalysisNote from './AnalysisNote';

const AnalysisResult = ({ result, onNewAnalysis }) => {
  const [activeSection, setActiveSection] = useState('summary');
  const [parsedAnalysis, setParsedAnalysis] = useState({
    summary: '',
    strengths: [],
    weaknesses: [],
    recommendations: '',
    immediateActions: [],
    comparative: '',
    motivation: '',
    fullText: ''
  });

  // Processar o texto da análise para extrair seções
  useEffect(() => {
    if (result?.data?.analysis) {
      const fullText = result.data.analysis;
      
      try {
        // Extrair resumo (seção 1)
        const summaryMatch = fullText.match(/### 1\. Resumo Geral\n([^#]*)/);
        const summary = summaryMatch ? summaryMatch[1].trim() : '';
        
        // Extrair pontos fortes (seção 2)
        const strengthsMatch = fullText.match(/### 2\. Pontos Fortes\n([^#]*)/);
        const strengthsText = strengthsMatch ? strengthsMatch[1].trim() : '';
        
        // Extrair pontos a melhorar (seção 3)
        const weaknessesMatch = fullText.match(/### 3\. Oportunidades de Melhoria\n([^#]*)/);
        const weaknessesText = weaknessesMatch ? weaknessesMatch[1].trim() : '';
        
        // Extrair recomendações práticas (seção 4)
        const recommendationsMatch = fullText.match(/### 4\. Recomendações Práticas\n([^#]*)/);
        const recommendations = recommendationsMatch ? recommendationsMatch[1].trim() : '';
        
        // Extrair ações imediatas (seção 5)
        const actionsMatch = fullText.match(/### 5\. Ações Imediatas\n([^#]*)/);
        const actionsText = actionsMatch ? actionsMatch[1].trim() : '';
        
        // Extrair análise comparativa (seção 6)
        const comparativeMatch = fullText.match(/### 6\. Análise Comparativa\n([^#]*)/);
        const comparative = comparativeMatch ? comparativeMatch[1].trim() : '';
        
        // Extrair mensagem final (seção 7)
        const motivationMatch = fullText.match(/### 7\. Mensagem Final de Motivação\n([^#]*)/);
        const motivation = motivationMatch ? motivationMatch[1].trim() : '';
        
        // Extrair pontos fortes como lista
        const strengths = [];
        const strengthsRegex = /\*\*(\d+)\. ([^*]+)\*\*\n([^*]+)/g;
        let strengthMatch;
        while ((strengthMatch = strengthsRegex.exec(strengthsText)) !== null) {
          strengths.push({
            title: strengthMatch[2].trim(),
            description: strengthMatch[3].trim()
          });
        }
        
        // Extrair pontos fracos como lista
        const weaknesses = [];
        const weaknessRegex = /\*\*(\d+)\. ([^*]+)\*\*\n([^*]+)/g;
        let weaknessMatch;
        while ((weaknessMatch = weaknessRegex.exec(weaknessesText)) !== null) {
          weaknesses.push({
            title: weaknessMatch[2].trim(),
            description: weaknessMatch[3].trim()
          });
        }
        
        // Extrair ações imediatas como lista
        const immediateActions = actionsText
          .split('\n')
          .filter(line => line.trim().match(/^\d+\./))
          .map(line => line.trim());
        
        setParsedAnalysis({
          summary,
          strengths,
          weaknesses,
          recommendations,
          immediateActions,
          comparative,
          motivation,
          fullText
        });
        
      } catch (error) {
        console.error('Erro ao processar análise:', error);
        setParsedAnalysis({
          summary: 'Erro ao processar a análise. Consulte o texto completo abaixo.',
          strengths: [],
          weaknesses: [],
          recommendations: '',
          immediateActions: [],
          comparative: '',
          motivation: '',
          fullText: result.data.analysis
        });
      }
    }
  }, [result]);

  return (
    <div className="bg-white dark:bg-secondary shadow-md rounded-lg overflow-hidden transition-colors duration-300 animate-fade-in">
      {/* Cabeçalho do perfil */}
      <div className="bg-gradient-to-r from-primary to-primary-light dark:from-primary-dark dark:to-primary text-white p-6">
        <div className="flex items-center mb-4 animate-slide-up">
          {/* Imagem ou inicial do perfil */}
          <div className="h-16 w-16 rounded-full mr-4 bg-white/20 flex items-center justify-center text-white text-2xl font-bold animate-pulse-slow shadow-neon">
            {result?.data?.profile?.name?.charAt(0) || '?'}
          </div>
          <div>
            <h2 className="text-2xl font-bold">{result?.data?.profile?.name || 'Nome não disponível'}</h2>
            <p className="text-white/80">{result?.data?.profile?.headline || 'Título não disponível'}</p>
            {result?.data?.profile?.location && (
              <p className="text-white/70 text-sm">{result.data.profile.location}</p>
            )}
          </div>
        </div>
        
        {/* Badge de objetivo */}
        <div className="inline-block bg-white/10 backdrop-blur-xs px-3 py-1 rounded-full text-sm shadow-md animate-slide-up" style={{ animationDelay: '0.2s' }}>
          Objetivo: {getObjectiveText(result?.data?.objective)}
        </div>
      </div>
      
      {/* Exibir nota da análise, se houver */}
      {result?.data?.note && (
        <div className="px-6 pt-4">
          <AnalysisNote 
            note={result.data.note} 
            type={result.data.noteType || 'info'} 
          />
        </div>
      )}
      
      {/* Navegação entre seções */}
      <div className="border-b dark:border-secondary-light">
        <nav className="flex overflow-x-auto">
          <button
            className={`px-4 py-3 font-medium text-sm transition-colors duration-300 ${
              activeSection === 'summary' 
                ? 'border-b-2 border-primary dark:border-primary-light text-primary dark:text-primary-light' 
                : 'text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light'
            }`}
            onClick={() => setActiveSection('summary')}
          >
            Resumo
          </button>
          <button
            className={`px-4 py-3 font-medium text-sm transition-colors duration-300 ${
              activeSection === 'strengths' 
                ? 'border-b-2 border-primary dark:border-primary-light text-primary dark:text-primary-light' 
                : 'text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light'
            }`}
            onClick={() => setActiveSection('strengths')}
          >
            Pontos Fortes
          </button>
          <button
            className={`px-4 py-3 font-medium text-sm transition-colors duration-300 ${
              activeSection === 'weaknesses' 
                ? 'border-b-2 border-primary dark:border-primary-light text-primary dark:text-primary-light' 
                : 'text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light'
            }`}
            onClick={() => setActiveSection('weaknesses')}
          >
            Melhorias
          </button>
          <button
            className={`px-4 py-3 font-medium text-sm transition-colors duration-300 ${
              activeSection === 'actions' 
                ? 'border-b-2 border-primary dark:border-primary-light text-primary dark:text-primary-light' 
                : 'text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light'
            }`}
            onClick={() => setActiveSection('actions')}
          >
            Ações
          </button>
          <button
            className={`px-4 py-3 font-medium text-sm transition-colors duration-300 ${
              activeSection === 'recommendations' 
                ? 'border-b-2 border-primary dark:border-primary-light text-primary dark:text-primary-light' 
                : 'text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light'
            }`}
            onClick={() => setActiveSection('recommendations')}
          >
            Recomendações
          </button>
          <button
            className={`px-4 py-3 font-medium text-sm transition-colors duration-300 ${
              activeSection === 'full' 
                ? 'border-b-2 border-primary dark:border-primary-light text-primary dark:text-primary-light' 
                : 'text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light'
            }`}
            onClick={() => setActiveSection('full')}
          >
            Análise Completa
          </button>
        </nav>
      </div>
      
      {/* Conteúdo da seção ativa */}
      <div className="p-6 dark:text-white animate-fade-in">
        {activeSection === 'summary' && (
          <div>
            <h3 className="text-xl font-bold mb-4">Resumo da Análise</h3>
            
            {/* Seção de Notas/Pontuações se estiverem disponíveis */}
            {result?.data?.scores && (
              <div className="mb-6">
                <h4 className="font-semibold text-lg mb-3">Pontuações da Recrutadora</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(result.data.scores).map(([category, score], index) => {
                    // Determinar cor baseada na pontuação
                    const colorClass = score >= 8 
                      ? 'bg-green-50 dark:bg-green-900/20 border-green-500 dark:border-green-700 text-green-800 dark:text-green-300' 
                      : score >= 5 
                        ? 'bg-orange-50 dark:bg-orange-900/20 border-orange-500 dark:border-orange-700 text-orange-800 dark:text-orange-300'
                        : 'bg-red-50 dark:bg-red-900/20 border-red-500 dark:border-red-700 text-red-800 dark:text-red-300';
                    
                    return (
                      <div 
                        key={category} 
                        className={`border-l-4 p-3 rounded-md shadow-sm ${colorClass} transform transition-all duration-300 hover:scale-105 animate-slide-up`}
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium capitalize">
                            {category.replace(/_/g, ' ')}
                          </span>
                          <span className="text-lg font-bold">{score}/10</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            
            <div className="prose dark:prose-invert max-w-none">
              <ReactMarkdown>{parsedAnalysis.summary}</ReactMarkdown>
              
              {/* Mensagem motivacional */}
              {parsedAnalysis.motivation && (
                <div className="mt-6 border-t dark:border-gray-700 pt-4 animate-slide-up">
                  <h4 className="font-semibold text-lg mb-2">Mensagem Final</h4>
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 dark:border-yellow-600 p-4 italic text-yellow-800 dark:text-yellow-300 animate-fade-in">
                    <ReactMarkdown>{parsedAnalysis.motivation}</ReactMarkdown>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        
        {activeSection === 'strengths' && (
          <div>
            <h3 className="text-xl font-bold mb-4">Pontos Fortes</h3>
            {parsedAnalysis.strengths.length > 0 ? (
              <div className="space-y-6">
                {parsedAnalysis.strengths.map((strength, index) => (
                  <div 
                    key={index} 
                    className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 dark:border-green-700 p-4 rounded-r-md transform transition-all duration-300 hover:scale-102 animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <h4 className="font-semibold text-lg text-green-800 dark:text-green-300">{strength.title}</h4>
                    <p className="text-gray-700 dark:text-gray-300 mt-1">{strength.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="prose dark:prose-invert max-w-none">
                <ReactMarkdown>{parsedAnalysis.fullText.match(/### 2\. Pontos Fortes([^#]*)/)?.[1] || ''}</ReactMarkdown>
              </div>
            )}
            
            {/* Análise comparativa */}
            {parsedAnalysis.comparative && (
              <div className="mt-8 border-t dark:border-gray-700 pt-4 animate-slide-up">
                <h4 className="font-semibold text-lg mb-2">Análise Comparativa</h4>
                <div className="bg-gray-50 dark:bg-secondary-light p-4 rounded-md">
                  <ReactMarkdown>{parsedAnalysis.comparative}</ReactMarkdown>
                </div>
              </div>
            )}
          </div>
        )}
        
        {activeSection === 'weaknesses' && (
          <div>
            <h3 className="text-xl font-bold mb-4">Oportunidades de Melhoria</h3>
            {parsedAnalysis.weaknesses.length > 0 ? (
              <div className="space-y-6">
                {parsedAnalysis.weaknesses.map((weakness, index) => (
                  <div 
                    key={index} 
                    className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 dark:border-amber-700 p-4 rounded-r-md transform transition-all duration-300 hover:scale-102 animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <h4 className="font-semibold text-lg text-amber-800 dark:text-amber-300">{weakness.title}</h4>
                    <p className="text-gray-700 dark:text-gray-300 mt-1">{weakness.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="prose dark:prose-invert max-w-none">
                <ReactMarkdown>{parsedAnalysis.fullText.match(/### 3\. Oportunidades de Melhoria([^#]*)/)?.[1] || ''}</ReactMarkdown>
              </div>
            )}
          </div>
        )}
        
        {activeSection === 'actions' && (
          <div>
            <h3 className="text-xl font-bold mb-4">Ações Imediatas</h3>
            {parsedAnalysis.immediateActions.length > 0 ? (
              <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 dark:border-blue-700 p-4 rounded-r-md">
                <ul className="space-y-3">
                  {parsedAnalysis.immediateActions.map((action, index) => (
                    <li 
                      key={index} 
                      className="flex items-start transform transition-all duration-300 hover:scale-102 animate-slide-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0 shadow-md">
                        {index + 1}
                      </div>
                      <div className="mt-1 text-gray-700 dark:text-gray-300">{action.replace(/^\d+\.\s*/, '')}</div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="prose dark:prose-invert max-w-none">
                <ReactMarkdown>{parsedAnalysis.fullText.match(/### 5\. Ações Imediatas([^#]*)/)?.[1] || ''}</ReactMarkdown>
              </div>
            )}
          </div>
        )}
        
        {activeSection === 'recommendations' && (
          <div>
            <h3 className="text-xl font-bold mb-4">Recomendações Práticas</h3>
            <div className="prose dark:prose-invert max-w-none">
              <ReactMarkdown>{parsedAnalysis.recommendations}</ReactMarkdown>
            </div>
          </div>
        )}
        
        {activeSection === 'full' && (
          <div>
            <h3 className="text-xl font-bold mb-4">Análise Completa</h3>
            <div className="prose dark:prose-invert max-w-none">
              <ReactMarkdown>{parsedAnalysis.fullText}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
      
      {/* Seção SSI */}
      <div className="bg-gray-50 dark:bg-secondary-light p-6 border-t dark:border-secondary transition-colors duration-300">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0 md:mr-4">
            <h3 className="font-bold text-lg mb-1 text-gray-800 dark:text-white">Verifique seu LinkedIn SSI</h3>
            <p className="text-gray-600 dark:text-gray-300">
              O Social Selling Index (SSI) do LinkedIn mede o quanto você está utilizando os recursos da plataforma.
              Verificar e melhorar seu SSI pode aumentar significativamente sua visibilidade.
            </p>
          </div>
          <a 
            href="https://www.linkedin.com/sales/ssi"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-primary-light/30 dark:bg-primary-dark/30 text-primary dark:text-primary-light font-medium rounded-lg hover:bg-primary-light/50 dark:hover:bg-primary-dark/50 transition transform hover:scale-105 shadow-md whitespace-nowrap"
          >
            Verificar meu SSI
          </a>
        </div>
      </div>
      
      {/* Perfil analisado */}
      <div className="bg-gray-100 dark:bg-secondary-dark p-6 border-t dark:border-secondary-light transition-colors duration-300">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0 md:mr-4">
            <h3 className="font-bold text-lg mb-1 text-gray-800 dark:text-white">Ver perfil analisado</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Acesse seu perfil do LinkedIn para começar a implementar as melhorias sugeridas.
            </p>
          </div>
          <a 
            href={result?.data?.profile?.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition transform hover:scale-105 shadow-md hover:shadow-neon whitespace-nowrap"
          >
            Abrir meu perfil LinkedIn
          </a>
        </div>
      </div>
      
      {/* Botão para nova análise */}
      <div className="p-6 border-t dark:border-secondary-light text-center">
        <button
          onClick={onNewAnalysis}
          className="px-6 py-2 border-2 border-primary text-primary dark:border-primary-light dark:text-primary-light font-medium rounded-lg hover:bg-primary-light/10 dark:hover:bg-primary-dark/10 transition transform hover:scale-105 shadow-md"
        >
          Fazer nova análise
        </button>
      </div>
    </div>
  );
};

// Função auxiliar para obter texto do objetivo
function getObjectiveText(objectiveId) {
  const objectives = {
    'first_job': 'Primeiro Emprego como Desenvolvedor',
    'career_upgrade': 'Upgrade de Carreira',
    'international': 'Mercado Internacional',
    'ssi_improvement': 'Melhorar SSI'
  };
  
  return objectives[objectiveId] || objectiveId || 'Não especificado';
}

export default AnalysisResult;