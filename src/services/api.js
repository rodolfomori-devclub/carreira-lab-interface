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

// Adicionar ao arquivo src/services/api.js

/**
 * Envia uma mensagem para o chatbot e recebe uma resposta
 * @param {string} message - Mensagem do usuário
 * @param {string} role - Papel do assistente (por padrão 'recruiter')
 * @param {Array} history - Histórico de mensagens anterior
 * @returns {Promise<Object>} Resposta do chatbot
 */
export const sendChatMessage = async (message, role = 'recruiter', history = []) => {
  try {
    // Fazer a requisição ao backend
    const response = await api.post('/chat', {
      message,
      role,
      history
    });
    
    return response.data;
  } catch (error) {
    console.error('Erro ao enviar mensagem para o chat:', error);
    
    // Extrair detalhes úteis do erro para exibição ao usuário
    let errorMessage = 'Erro ao processar sua mensagem.';
    
    if (error.response) {
      // Erro com resposta do servidor
      const statusCode = error.response.status;
      const serverError = error.response.data?.message || 'Erro desconhecido no servidor';
      
      errorMessage = `Erro ${statusCode}: ${serverError}`;
    } else if (error.request) {
      // Erro sem resposta (timeout, network issue)
      errorMessage = error.message || 'Erro de conexão com o servidor. Verifique sua internet ou tente novamente mais tarde.';
      
      // Mensagem específica para timeout
      if (error.code === 'ECONNABORTED') {
        errorMessage = 'A resposta demorou mais do que o esperado. Por favor, tente novamente.';
      }
    }
    
    // Rethrow com mensagem mais informativa
    throw {
      message: errorMessage,
      originalError: error
    };
  }
};

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
 * Envia uma solicitação de análise de perfil LinkedIn
 * @param {string} linkedinUrl - URL do perfil do LinkedIn
 * @param {string} objective - ID do objetivo selecionado
 * @returns {Promise<Object>} Resultado da análise
 */
export const analyzeProfile = async (linkedinUrl, objective) => {
  try {
    // Mostrar mensagem de análise em andamento
    console.log(`Iniciando análise do perfil: ${linkedinUrl} para objetivo: ${objective}`);
    
    // Fazer a requisição ao backend
    const response = await api.post('/scrape', {
      profileUrl: linkedinUrl,
      objective
    }, {
      // Aumentar o timeout para permitir scraping + análise GPT (5 minutos)
      timeout: 300000
    });
    
    // Log de sucesso
    console.log('Análise concluída com sucesso');
    
    return response.data;
  } catch (error) {
    console.error('Erro ao analisar perfil:', error);
    
    // Verificar se é um erro que requer contato com o suporte
    if (error.response?.data?.contactSupport === true) {
      throw {
        message: error.response.data.message || 'Erro no acesso ao LinkedIn. Por favor, contate o suporte.',
        contactSupport: true
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
    throw {
      message: errorMessage,
      originalError: error
    };
  }
};

export default api;