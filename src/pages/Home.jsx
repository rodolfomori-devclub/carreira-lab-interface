// frontend/src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import FeatureCard from '../components/FeatureCard';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {
  const features = [
    {
      title: 'Primeiro Emprego',
      description: 'Receba feedback e recomendações personalizadas para conseguir seu primeiro emprego como programador.',
      icon: '👨‍💻',
      color: 'bg-blue-100',
    },
    {
      title: 'Upgrade de Carreira',
      description: 'Analise seu perfil para identificar pontos-chave para avançar para melhores oportunidades.',
      icon: '📈',
      color: 'bg-green-100',
    },
    {
      title: 'Mercado Internacional',
      description: 'Adapte seu LinkedIn para o mercado global e aumente suas chances de trabalhar no exterior.',
      icon: '🌎',
      color: 'bg-purple-100',
    },
    {
      title: 'Análise de SSI',
      description: 'Entenda seu Social Selling Index e como melhorá-lo para aumentar sua visibilidade na plataforma.',
      icon: '📊',
      color: 'bg-yellow-100',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />


      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Potencialize seu LinkedIn com IA
            </h1>
            <p className="text-xl mb-8">
              Análise inteligente do seu perfil LinkedIn para alavancar oportunidades 
              na área de desenvolvimento.
            </p>
            <Link 
              to="/analysis" 
              className="inline-block bg-white text-indigo-700 font-medium px-8 py-3 rounded-lg hover:bg-gray-100 transition duration-300"
            >
              Analisar meu perfil
            </Link>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Como podemos te ajudar
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Como funciona
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center mb-12">
              <div className="w-full md:w-1/3 mb-6 md:mb-0">
                <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 text-2xl font-bold mx-auto">
                  1
                </div>
              </div>
              <div className="w-full md:w-2/3">
                <h3 className="text-xl font-semibold mb-2">
                  Cole a URL do seu perfil LinkedIn
                </h3>
                <p className="text-gray-600">
                  Insira o link para o seu perfil LinkedIn completo para que possamos analisá-lo.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center mb-12">
              <div className="w-full md:w-1/3 mb-6 md:mb-0">
                <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 text-2xl font-bold mx-auto">
                  2
                </div>
              </div>
              <div className="w-full md:w-2/3">
                <h3 className="text-xl font-semibold mb-2">
                  Escolha seu objetivo profissional
                </h3>
                <p className="text-gray-600">
                  Selecione entre primeiro emprego, upgrade de carreira ou trabalho internacional.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-full md:w-1/3 mb-6 md:mb-0">
                <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 text-2xl font-bold mx-auto">
                  3
                </div>
              </div>
              <div className="w-full md:w-2/3">
                <h3 className="text-xl font-semibold mb-2">
                  Receba uma análise personalizada e acionável
                </h3>
                <p className="text-gray-600">
                  A IA do DevClub analisará seu perfil e fornecerá recomendações específicas 
                  para você alcançar seus objetivos.
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link 
              to="/analysis" 
              className="inline-block bg-indigo-600 text-white font-medium px-8 py-3 rounded-lg hover:bg-indigo-700 transition duration-300"
            >
              Começar agora
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Home;