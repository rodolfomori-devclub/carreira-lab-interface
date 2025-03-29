import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FirstAccessModal from '../components/FirstAccessModal';
import NetworkBackground from '../components/NetworkBackground'; // Importando o novo componente
import Fernanda from '../assets/fernanda.png';

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

const HomeCarreiraLab = () => {
  const [showModal, setShowModal] = useState(true);
  
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="min-h-screen flex flex-col text-text-light dark:text-text-dark transition-colors duration-300">
      {/* Adiciona os estilos de animação flutuante */}
      <style>{floatingAnimationStyles}</style>
      
      {/* Adicionando o background animado */}
      <NetworkBackground />
      
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 flex-grow">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Conteúdo Principal */}
            <div className="text-center mb-16 animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-500 dark:from-primary-light dark:to-primary bg-clip-text text-transparent">
                DevClub CarreiraLab
              </h1>
              <p className="text-xl mb-8 text-text-light dark:text-text-dark">
                Seu laboratório completo para impulsionar sua carreira como desenvolvedor.
              </p>
            </div>
            
            {/* Seção da Fernanda */}
            <div className="flex flex-col md:flex-row items-center justify-center mb-16 animate-slide-up">
              <div className="w-48 h-48 rounded-full overflow-hidden mb-6 md:mb-0 md:mr-8 border-4 border-primary shadow-neon floating-element">
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
              <div className="md:max-w-md text-center md:text-left">
                <h2 className="text-2xl font-bold mb-3">
                  Fernanda, Recrutadora DevClub
                </h2>
                <p className="text-text-muted-light dark:text-text-muted-dark">
                  Com mais de 8 anos de experiência em recrutamento tech, estou aqui para 
                  ajudar você a desenvolver sua carreira, aprimorar seu perfil profissional 
                  e conquistar as melhores oportunidades do mercado.
                </p>
              </div>
            </div>
            
            {/* Botões de Serviço */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <a 
                href="https://entrevistaslab.devclub.com.br/" 
                className="bg-white dark:bg-secondary-light rounded-lg p-6 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 duration-300 border-2 border-transparent hover:border-primary group animate-slide-up"
                style={{ animationDelay: '0.3s' }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl mb-4 group-hover:shadow-neon transition-shadow animate-pulse-slow">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  Entrevistas com a Fernanda (NOVIDADE 🎁)
                </h3>
                <p className="text-text-muted-light dark:text-text-muted-dark">
                  Pratique para entrevistas técnicas e comportamentais com simulações realistas e receba 
                  feedbacks detalhados para melhorar seu desempenho.
                </p>
              </a>
              {/* Análise de LinkedIn */}
              <Link 
                // to="/analysis" 
                className="bg-white dark:bg-secondary-light rounded-lg p-6 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 duration-300 border-2 border-transparent hover:border-primary group animate-slide-up"
                style={{ animationDelay: '0.1s' }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl mb-4 group-hover:shadow-neon transition-shadow animate-pulse-slow">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  Análise de LinkedIn (Em Breve ⏳)
                </h3>
                <p className="text-text-muted-light dark:text-text-muted-dark">
                  Receba uma análise completa do seu perfil LinkedIn, identificando pontos fortes, 
                  oportunidades de melhoria e recomendações práticas para alcançar seus objetivos.
                </p>
              </Link>
              
              {/* Fale com a Fernanda */}
              <Link 
  to="/chat" 
  className="bg-white dark:bg-secondary-light rounded-lg p-6 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 duration-300 border-2 border-transparent hover:border-primary group animate-slide-up"
  style={{ animationDelay: '0.2s' }}
>
  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white text-2xl mb-4 group-hover:shadow-neon transition-shadow animate-pulse-slow">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
    </svg>
  </div>
  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
    Fale com a Fernanda
  </h3>
  <p className="text-text-muted-light dark:text-text-muted-dark">
    Tire suas dúvidas sobre carreira, processos seletivos, currículos e entrevistas.
    Conte com o apoio personalizado de uma recrutadora experiente.
  </p>
</Link>
              
              {/* Entrevistas com a Fernanda */}
    
              
              {/* LabVagas */}
              <a 
                href="#" 
                className="bg-white dark:bg-secondary-light rounded-lg p-6 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 duration-300 border-2 border-transparent hover:border-primary group animate-slide-up"
                style={{ animationDelay: '0.4s' }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-white text-2xl mb-4 group-hover:shadow-neon transition-shadow animate-pulse-slow">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  LabVagas (Em Breve ⏳)
                </h3>
                <p className="text-text-muted-light dark:text-text-muted-dark">
                  Acesse vagas exclusivas selecionadas especialmente para alunos do DevClub
                  e tenha suporte no processo de candidatura.
                </p>
              </a>
            </div>
            
            {/* Call to Action */}
            {/* <div className="text-center animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <p className="text-lg mb-4 text-text-light dark:text-text-dark">
                Pronto para alavancar sua carreira?
              </p>
              <Link 
                to="/analysis" 
                className="inline-block px-8 py-3 bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary text-white font-medium rounded-md transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-neon"
              >
                Começar agora
              </Link>
            </div> */}
          </div>
        </div>
      </section>
      
      <Footer />
      
      {/* Modal de Primeiro Acesso */}
      {showModal && <FirstAccessModal onClose={closeModal} />}
    </div>
  );
};

export default HomeCarreiraLab;