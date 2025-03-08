// frontend/src/components/CookieInstructionsModal.jsx
import React, { useEffect } from 'react';

const CookieInstructionsModal = ({ onClose, onCookiesExtracted }) => {
  // Adicionar listener para fechar o modal com ESC
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [onClose]);

  // Código de extração de cookies para copiar
  const extractionCode = `
// Função que extrai os cookies essenciais do LinkedIn
function extractLinkedInCookies() {
  // Criar um elemento de texto para facilitar a cópia
  const textArea = document.createElement('textarea');
  textArea.value = document.cookie;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  document.body.removeChild(textArea);
  
  console.log("✅ Cookies do LinkedIn copiados com sucesso!");
  console.log("Volte para a aplicação e cole-os no campo indicado.");
}

// Executar a função
extractLinkedInCookies();
  `.trim();

  // Função para copiar o código para a área de transferência
  const copyCode = () => {
    navigator.clipboard.writeText(extractionCode);
    alert("Código copiado! Agora cole-o no Console do navegador quando estiver no LinkedIn.");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay com fundo escurecido */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>
      
      {/* Conteúdo do modal */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Cabeçalho */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-800">
            Extrair Cookies do LinkedIn - Método Simplificado
          </h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Instruções simplificadas */}
        <div className="px-6 py-4">
          <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800">
            <p className="font-medium">Método simplificado em 3 passos:</p>
          </div>
          
          <ol className="space-y-6">
            <li className="flex">
              <div className="flex-shrink-0 mr-4">
                <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold">
                  1
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-2">Acesse o LinkedIn</h4>
                <p className="text-gray-600 mb-2">
                  Certifique-se de que você está conectado à sua conta do LinkedIn em outra aba.
                </p>
                <a 
                  href="https://www.linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                  Abrir LinkedIn em nova aba
                </a>
              </div>
            </li>
            
            <li className="flex">
              <div className="flex-shrink-0 mr-4">
                <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold">
                  2
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-2">Abra o Console do navegador</h4>
                <p className="text-gray-600 mb-3">
                  Com a página do LinkedIn aberta, pressione:
                </p>
                <ul className="list-disc ml-5 mb-3 space-y-1">
                  <li><strong>No Windows/Linux:</strong> F12 e clique na aba "Console"</li>
                  <li><strong>No Mac:</strong> Option+Command+J</li>
                </ul>
                <p className="text-sm text-gray-500 mb-2">
                  Uma janela de desenvolvedor será aberta na parte inferior ou lateral do seu navegador.
                </p>
                <div className="bg-gray-100 p-3 rounded-md mb-4">
                  <img 
                    src="https://i.imgur.com/BDZiLrw.png" 
                    alt="Console do navegador" 
                    className="w-full rounded border border-gray-300" 
                  />
                </div>
              </div>
            </li>
            
            <li className="flex">
              <div className="flex-shrink-0 mr-4">
                <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold">
                  3
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-2">Cole e execute o código</h4>
                <p className="text-gray-600 mb-3">
                  Copie o código abaixo, cole-o no Console e pressione Enter:
                </p>
                <div className="relative">
                  <div className="bg-gray-800 text-gray-100 p-3 rounded-lg mb-3 overflow-x-auto text-sm font-mono">
                    {extractionCode}
                  </div>
                  <button 
                    onClick={copyCode}
                    className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded text-xs"
                  >
                    Copiar
                  </button>
                </div>
                <p className="text-gray-600 mb-3">
                  Após executar o código, todos os seus cookies do LinkedIn serão copiados para a área de 
                  transferência automaticamente.
                </p>
                <p className="text-gray-600">
                  Volte para esta janela e cole os cookies no campo indicado.
                </p>
              </div>
            </li>
          </ol>
        </div>
        
        {/* Rodapé do modal */}
        <div className="border-t px-6 py-4 bg-gray-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition"
          >
            Entendi
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieInstructionsModal;