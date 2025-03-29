// src/pages/Chat.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import NetworkBackground from '../components/NetworkBackground';
import ChatMessage from '../components/ChatMessage';
import SuggestionButton from '../components/SuggestionButton';
import { sendChatMessage } from '../services/api';
import Fernanda from '../assets/fernanda.png';

const Chat = () => {
  const [messages, setMessages] = useState([
    // Mensagem inicial da recrutadora
    {
      role: 'assistant',
      content: 'Olá! Eu sou Fernanda, recrutadora do DevClub com mais de 10 anos no mercado de tecnologia. Estou aqui para ajudar com dúvidas sobre carreira, LinkedIn, currículo ou processos seletivos. Como posso te ajudar hoje?',
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  
  // Sugestões de perguntas para o usuário
  const suggestions = [
    {
      title: 'Dicas para LinkedIn',
      questions: [
        'Como melhorar meu perfil do LinkedIn para atrair recrutadores?',
        'Quais elementos não podem faltar no meu LinkedIn?',
        'O que devo incluir no resumo do meu perfil?',
        'Como aumentar meu SSI no LinkedIn?'
      ]
    },
    {
      title: 'Sobre Currículo',
      questions: [
        'Como criar um currículo que se destaque para vagas de desenvolvedor?',
        'Quanto tempo de experiência devo colocar no currículo?',
        'Devo incluir uma foto no currículo?',
        'Como destacar projetos pessoais no currículo?'
      ]
    },
    {
      title: 'Entrevistas',
      questions: [
        'Como me preparar para uma entrevista técnica?',
        'Quais perguntas comportamentais são mais comuns?',
        'Como negociar salário em uma entrevista?',
        'Como lidar com o teste técnico?'
      ]
    },
    {
      title: 'Carreira Dev',
      questions: [
        'Como começar a carreira em programação sem experiência?',
        'Quais habilidades são mais valorizadas no mercado?',
        'Vale a pena fazer transição de carreira para programação?',
        'Como me posicionar para vagas remotas internacionais?'
      ]
    }
  ];

  // Rolar para o final da conversa quando novas mensagens chegarem
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Função para enviar mensagem
  const handleSendMessage = async (e) => {
    e?.preventDefault();
    
    if (!inputValue.trim() && (!e || e.type === 'submit')) return;
    
    const messageToSend = e?.currentTarget?.dataset?.question || inputValue;
    
    // Adicionar mensagem do usuário ao chat
    const userMessage = {
      role: 'user',
      content: messageToSend,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setError(null);
    
    try {
      // Criar histórico de mensagens para enviar ao backend
      const history = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));
      
      // Enviar mensagem para a API
      const response = await sendChatMessage(messageToSend, 'recruiter', history);
      
      if (response.success) {
        // Adicionar resposta ao chat
        const assistantMessage = {
          role: 'assistant',
          content: response.message,
          timestamp: new Date().toISOString()
        };
        
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        throw new Error(response.message || 'Erro ao enviar mensagem');
      }
    } catch (err) {
      console.error('Erro no chat:', err);
      setError('Desculpe, tive um problema ao processar sua mensagem. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
      scrollToBottom();
    }
  };
  
  // Lidar com clique em sugestão
  const handleSuggestionClick = (question) => {
    setInputValue(question);
    // Simular envio de formulário com a pergunta sugerida
    const event = { 
      preventDefault: () => {}, 
      currentTarget: { dataset: { question } } 
    };
    handleSendMessage(event);
  };

  return (
    <div className="min-h-screen flex flex-col text-text-light dark:text-text-dark transition-colors duration-300">
      <NetworkBackground />
      
      <Header />
      
      <main className="flex-grow flex flex-col">
        <div className="container mx-auto px-4 py-6 flex-grow flex flex-col">
          {/* Cabeçalho do Chat */}
          <div className="text-center mb-6 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-text-light dark:text-text-dark">
              Chat com a Recrutadora
            </h1>
            <p className="text-lg text-text-muted-light dark:text-text-muted-dark max-w-2xl mx-auto">
              Tire suas dúvidas sobre carreira, LinkedIn, currículo e processos seletivos
              diretamente com a Fernanda, nossa recrutadora especialista.
            </p>
          </div>
          
          {/* Interface do Chat */}
          <div className="bg-white/90 dark:bg-secondary/90 backdrop-blur-md rounded-lg shadow-xl p-4 md:p-6 flex-grow flex flex-col max-w-4xl mx-auto w-full animate-slide-up">
            {/* Cabeçalho do recrutador */}
            <div className="flex items-center p-3 bg-primary/10 dark:bg-primary-dark/20 rounded-lg mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden mr-3 border-2 border-primary">
                <img 
                  src={Fernanda} 
                  alt="Fernanda Recrutadora" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="font-semibold">Fernanda</h2>
                <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                  Recrutadora DevClub • Online
                </p>
              </div>
            </div>
            
            {/* Área de mensagens */}
            <div className="flex-grow overflow-y-auto mb-4 space-y-4 p-2">
              {messages.map((message, index) => (
                <ChatMessage
                  key={index}
                  message={message}
                  isLastMessage={index === messages.length - 1 && message.role === 'assistant'}
                />
              ))}
              
              {/* Indicador de digitação quando estiver carregando */}
              {isLoading && (
                <div className="flex items-start max-w-[80%]">
                  <div className="w-8 h-8 rounded-full overflow-hidden mr-2 flex-shrink-0">
                    <img 
                      src={Fernanda} 
                      alt="Fernanda" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="bg-gray-200 dark:bg-secondary-light p-3 rounded-lg rounded-tl-none">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 dark:bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 dark:bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 dark:bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Exibir erro, se houver */}
              {error && (
                <div className="bg-red-100 dark:bg-red-900/20 border-l-4 border-red-500 text-red-700 dark:text-red-300 p-3 rounded-r-md">
                  <p className="text-sm">{error}</p>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            {/* Formulário de envio de mensagem */}
            <form onSubmit={handleSendMessage} className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Digite sua mensagem..."
                className="flex-grow px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-primary dark:bg-secondary-light dark:text-white dark:border-gray-600"
                disabled={isLoading}
              />
              <button
                type="submit"
                className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-full transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading || !inputValue.trim()}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </form>
          </div>
          
          {/* Sugestões de perguntas */}
          <div className="max-w-4xl mx-auto w-full mt-8 mb-4">
            <h3 className="text-lg font-semibold mb-3 text-text-light dark:text-text-dark">
              Sugestões de perguntas:
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {suggestions.map((category, index) => (
                <div 
                  key={index} 
                  className="bg-white/90 dark:bg-secondary/90 backdrop-blur-md rounded-lg shadow-md p-5 animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <h4 className="font-medium text-primary dark:text-primary-light text-lg mb-3">
                    {category.title}
                  </h4>
                  <div className="space-y-3">
                    {category.questions.map((question, qIndex) => (
                      <SuggestionButton 
                        key={qIndex}
                        question={question}
                        onClick={() => handleSuggestionClick(question)}
                        disabled={isLoading}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Chat;