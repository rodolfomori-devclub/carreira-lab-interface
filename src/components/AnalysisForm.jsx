// frontend/src/components/AnalysisForm.jsx
import React, { useState } from 'react';
import { analyzeProfile } from '../services/api';
import LoadingStages from './LoadingStages';
import SupportModal from './SupportModal';

const AnalysisForm = ({ objectives, isLoading, setIsLoading, setError, onSubmitSuccess }) => {
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [selectedObjective, setSelectedObjective] = useState('');
  const [urlError, setUrlError] = useState('');
  const [loadingNote, setLoadingNote] = useState('');
  const [showSupportModal, setShowSupportModal] = useState(false);
  
  // Validar URL do LinkedIn
  const validateLinkedInUrl = (url) => {
    // Regex simples para validar URL do LinkedIn
    const linkedinRegex = /^https?:\/\/(www\.)?linkedin\.com\/in\/[\w-]+\/?$/;
    return linkedinRegex.test(url);
  };

  // Handler para mudança de URL
  const handleUrlChange = (e) => {
    const url = e.target.value;
    setLinkedinUrl(url);
    
    if (url && !validateLinkedInUrl(url)) {
      setUrlError('Por favor, insira uma URL válida do LinkedIn (Ex: https://www.linkedin.com/in/seu-perfil)');
    } else {
      setUrlError('');
    }
  };

  // Handler para submissão do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar entrada
    if (!linkedinUrl) {
      setUrlError('A URL do LinkedIn é obrigatória');
      return;
    }
    
    if (!validateLinkedInUrl(linkedinUrl)) {
      setUrlError('Por favor, insira uma URL válida do LinkedIn (Ex: https://www.linkedin.com/in/seu-perfil)');
      return;
    }
    
    if (!selectedObjective) {
      setError('Por favor, selecione um objetivo profissional');
      return;
    }
    
    // Limpar erros e iniciar carregamento
    setError(null);
    setIsLoading(true);
    
    try {
      // Chamar API para análise
      const result = await analyzeProfile(linkedinUrl, selectedObjective);
      
      // Verificar se a resposta está no formato esperado
      if (result && result.success && result.data) {
        onSubmitSuccess(result);
      } else {
        throw new Error('Formato de resposta inválido do servidor');
      }
    } catch (error) {
      console.error('Erro ao analisar perfil:', error);
      
      // Verificar se é um erro de contactSupport
      if (error.contactSupport) {
        // Mostrar modal de suporte
        setShowSupportModal(true);
      } else {
        // Mostrar erro normal
        setError(error.message || 'Erro ao conectar com o servidor. Por favor, tente novamente.');
      }
    } finally {
      setIsLoading(false);
      setLoadingNote('');
    }
  };

  // Handler para fechar o modal de suporte
  const handleCloseSupportModal = () => {
    setShowSupportModal(false);
  };

  // Se estiver carregando, mostrar o componente de loading
  if (isLoading) {
    return <LoadingStages note={loadingNote} />;
  }

  return (
    <>
      <div className="bg-white dark:bg-secondary shadow-md rounded-lg p-6 mb-8 animate-fade-in transition-colors duration-300">
        <form onSubmit={handleSubmit}>
          {/* URL do LinkedIn */}
          <div className="mb-6">
            <label htmlFor="linkedin-url" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              URL do seu perfil LinkedIn
            </label>
            <input
              type="url"
              id="linkedin-url"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-secondary-light dark:text-white dark:border-gray-600 ${
                urlError ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-700'
              } transition-colors duration-300`}
              placeholder="https://www.linkedin.com/in/seu-perfil"
              value={linkedinUrl}
              onChange={handleUrlChange}
            />
            {urlError && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{urlError}</p>
            )}
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Insira o link completo para seu perfil público do LinkedIn
            </p>
          </div>

          {/* Seleção de Objetivo */}
          <div className="mb-8">
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Qual é o seu objetivo profissional?
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {objectives.map((objective) => (
                <div
                  key={objective.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all transform hover:scale-105 ${
                    selectedObjective === objective.id
                      ? 'border-primary bg-primary-light/10 dark:bg-primary-dark/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary-light'
                  } dark:text-gray-200 transition-colors duration-300`}
                  onClick={() => setSelectedObjective(objective.id)}
                >
                  <div className="flex items-center mb-2">
                    <input
                      type="radio"
                      name="objective"
                      id={`objective-${objective.id}`}
                      checked={selectedObjective === objective.id}
                      onChange={() => setSelectedObjective(objective.id)}
                      className="h-4 w-4 text-primary focus:ring-primary dark:bg-secondary-light"
                    />
                    <label 
                      htmlFor={`objective-${objective.id}`}
                      className="ml-2 font-medium text-gray-700 dark:text-gray-300"
                    >
                      {objective.name}
                    </label>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 pl-6">{objective.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Botão de Envio */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-8 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition transform hover:scale-105 hover:shadow-neon"
            >
              Analisar meu perfil
            </button>
          </div>
        </form>

        {/* Dica para usuários */}
        <div className="mt-8 bg-blue-50 dark:bg-secondary-light border-l-4 border-blue-400 dark:border-blue-500 p-4 text-sm text-blue-700 dark:text-blue-300 transition-colors duration-300">
          <h4 className="font-medium mb-1">Dica para melhores resultados:</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>Certifique-se de que seu perfil LinkedIn está público ou que você está logado.</li>
            <li>Quanto mais completo estiver seu perfil, mais detalhada será a análise.</li>
            <li>A análise pode levar até 1-2 minutos para ser concluída.</li>
            <li>Enquanto espera, aproveite para hidratar-se e se preparar para insights valiosos! 💡</li>
          </ul>
        </div>
      </div>
      
      {/* Modal de Suporte (quando necessário) */}
      {showSupportModal && (
        <SupportModal onClose={handleCloseSupportModal} />
      )}
    </>
  );
};

export default AnalysisForm;