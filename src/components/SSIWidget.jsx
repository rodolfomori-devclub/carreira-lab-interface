// frontend/src/components/SSIWidget.jsx
import React from 'react';

const SSIWidget = ({ ssi }) => {
  // Calcular a porcentagem de completude do círculo
  const calculateCircleValue = (value) => {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    return ((100 - value) / 100) * circumference;
  };

  // Determinar a cor do SSI baseado no valor
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-blue-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  // Determinar a categoria do SSI
  const getScoreCategory = (score) => {
    if (score >= 80) return 'Excelente';
    if (score >= 60) return 'Bom';
    if (score >= 40) return 'Regular';
    return 'Precisa melhorar';
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      {/* SSI Score Principal */}
      <div className="flex flex-col md:flex-row items-center mb-8">
        <div className="relative mb-6 md:mb-0 md:mr-8">
          {/* Círculo SVG */}
          <svg width="120" height="120" viewBox="0 0 120 120" className="transform -rotate-90">
            {/* Círculo de fundo */}
            <circle
              cx="60"
              cy="60"
              r="40"
              fill="none"
              stroke="#e0e0e0"
              strokeWidth="10"
            />
            {/* Círculo de progresso */}
            <circle
              cx="60"
              cy="60"
              r="40"
              fill="none"
              stroke="#4F46E5"
              strokeWidth="10"
              strokeDasharray={2 * Math.PI * 40}
              strokeDashoffset={calculateCircleValue(ssi.score)}
              strokeLinecap="round"
            />
          </svg>
          
          {/* Número central */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-3xl font-bold ${getScoreColor(ssi.score)}`}>
              {ssi.score}
            </span>
          </div>
        </div>
        
        <div>
          <h3 className="text-2xl font-bold mb-2">
            Seu SSI: <span className={getScoreColor(ssi.score)}>{ssi.score}/100</span>
          </h3>
          <p className="text-gray-700">
            Categoria: <span className="font-medium">{getScoreCategory(ssi.score)}</span>
          </p>
          <p className="text-sm text-gray-500 mt-1">
            O LinkedIn considera um SSI acima de 70 como excelente para a maioria dos profissionais.
          </p>
        </div>
      </div>
      
      {/* Detalhamento */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow-sm">
          <h4 className="font-medium text-gray-700 mb-2">Marca Profissional</h4>
          <div className="flex items-center">
            <div className="w-full bg-gray-200 rounded-full h-4 mr-2">
              <div
                className="bg-blue-600 h-4 rounded-full"
                style={{ width: `${ssi.details.personalBrand}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium">{ssi.details.personalBrand}</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Estabeleça sua marca profissional publicando conteúdo e obtendo reconhecimento.
          </p>
        </div>
        
        <div className="bg-white p-4 rounded shadow-sm">
          <h4 className="font-medium text-gray-700 mb-2">Pessoas Certas</h4>
          <div className="flex items-center">
            <div className="w-full bg-gray-200 rounded-full h-4 mr-2">
              <div
                className="bg-green-600 h-4 rounded-full"
                style={{ width: `${ssi.details.findRightPeople}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium">{ssi.details.findRightPeople}</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Identifique e conecte-se com potenciais clientes e tomadores de decisão.
          </p>
        </div>
        
        <div className="bg-white p-4 rounded shadow-sm">
          <h4 className="font-medium text-gray-700 mb-2">Engajamento com Insights</h4>
          <div className="flex items-center">
            <div className="w-full bg-gray-200 rounded-full h-4 mr-2">
              <div
                className="bg-purple-600 h-4 rounded-full"
                style={{ width: `${ssi.details.engageInsights}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium">{ssi.details.engageInsights}</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Compartilhe conteúdo relevante e engage com o conteúdo da sua rede.
          </p>
        </div>
        
        <div className="bg-white p-4 rounded shadow-sm">
          <h4 className="font-medium text-gray-700 mb-2">Relacionamentos</h4>
          <div className="flex items-center">
            <div className="w-full bg-gray-200 rounded-full h-4 mr-2">
              <div
                className="bg-yellow-600 h-4 rounded-full"
                style={{ width: `${ssi.details.buildRelationships}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium">{ssi.details.buildRelationships}</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Fortaleça sua rede profissional conectando-se e engajando com pessoas-chave.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SSIWidget;