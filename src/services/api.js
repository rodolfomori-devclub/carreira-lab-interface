// frontend/src/services/api.js
import axios from 'axios';

// Criar instância do axios com configurações base
const api = axios.create({
  // Garantir que a URL do backend esteja correta
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Busca os objetivos disponíveis para análise de perfil
 * @returns {Promise<Array>} Lista de objetivos
 */
export const fetchObjectives = async () => {
  try {
    const response = await api.get('/objectives');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar objetivos:', error);
    throw error;
  }
};

/**
 * Envia uma solicitação de análise de perfil LinkedIn ou verifica o status
 * @param {string} linkedinUrl - URL do perfil do LinkedIn
 * @param {string} objective - ID do objetivo selecionado
 * @param {string} [currentStage='default'] - Estágio atual do processo
 * @returns {Promise<Object>} Resultado da análise ou status atual
 */
export const analyzeProfile = async (linkedinUrl, objective, currentStage = 'default') => {
  try {
    // Mostrar mensagem de análise em andamento
    console.log(`${currentStage === 'default' ? 'Iniciando' : 'Verificando'} análise do perfil: ${linkedinUrl}`);
    
    // Carregar cookies do armazenamento local para enviá-los junto com a requisição
    // (normalmente seria gerenciado pelo backend, mas mantemos essa opção)
    const cookiesData = JSON.parse(localStorage.getItem('linkedin_cookies') || '[]');
    
    // Endpoint a ser chamado (diferente se for uma verificação de status)
    const endpoint = currentStage === 'default' ? '/scrape' : '/status';
    
    // Fazer a requisição ao backend
    const response = await api.post(endpoint, {
      profileUrl: linkedinUrl,
      objective,
      cookies: cookiesData.length > 0 ? cookiesData : undefined,
      stage: currentStage
    }, {
      // Timeout depende do estágio
      timeout: currentStage === 'default' ? 60000 : 10000 // 1 minuto para primeira chamada, 10s para verificações
    });
    
    // Verificar se a resposta contém status ou dados completos
    if (response.data) {
      if (response.data.status === 'analysis_complete' || (response.data.success && response.data.data?.analysis)) {
        console.log('Análise concluída com sucesso');
      } else if (response.data.status) {
        console.log(`Status atual: ${response.data.status}`);
      }
      
      // Retornar os dados completos
      return response.data;
    } else {
      throw new Error('Resposta inválida do servidor');
    }
  } catch (error) {
    console.error('Erro ao analisar perfil:', error);
    
    // Se o erro contiver informações sobre o estágio, retorná-las
    if (error.response?.data?.status === 'in_progress') {
      return {
        status: 'in_progress',
        stage: error.response.data.stage || currentStage,
        note: error.response.data.note || '',
        estimatedCompletion: error.response.data.estimatedCompletion
      };
    }
    
    // Extrair detalhes úteis do erro para exibição ao usuário
    let errorMessage = 'Erro ao analisar perfil.';
    
    if (error.response) {
      // Erro com resposta do servidor
      const statusCode = error.response.status;
      const serverError = error.response.data?.message || 'Erro desconhecido no servidor';
      
      errorMessage = `Erro ${statusCode}: ${serverError}`;
      console.error('Detalhes do erro:', error.response.data);
    } else if (error.request) {
      // Erro sem resposta (timeout, network issue)
      errorMessage = error.message || 'Erro de conexão com o servidor. Verifique sua internet ou tente novamente mais tarde.';
      
      // Mensagem específica para timeout
      if (error.code === 'ECONNABORTED') {
        errorMessage = 'A análise demorou mais do que o esperado. Por favor, tente novamente.';
      }
    }
    
    // Rethrow com mensagem mais informativa
    const enhancedError = new Error(errorMessage);
    enhancedError.originalError = error;
    throw enhancedError;
  }
};

/**
 * Verifica o status atual de uma análise em andamento
 * @param {string} analysisId - ID da análise em andamento
 * @returns {Promise<Object>} Status atual da análise
 */
export const checkAnalysisStatus = async (analysisId) => {
  try {
    const response = await api.get(`/status/${analysisId}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao verificar status da análise:', error);
    throw error;
  }
};

export default api;