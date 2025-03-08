// frontend/src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap">
          {/* Logo e descrição */}
          <div className="w-full md:w-1/3 mb-8 md:mb-0">
            <Link to="/" className="flex items-center mb-4">
              <span className="text-indigo-400 text-xl font-bold">DevClub</span>
              <span className="ml-2 text-gray-300">LinkedIn Analyzer</span>
            </Link>
            <p className="text-gray-400 mb-4 pr-4">
              Impulsione sua carreira como desenvolvedor com análises inteligentes do seu perfil LinkedIn.
            </p>
          </div>
          
          {/* Links úteis */}
          <div className="w-full md:w-1/3 mb-8 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">Links Úteis</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/analysis" className="text-gray-400 hover:text-white transition">
                  Analisar Perfil
                </Link>
              </li>
              <li>
                <a 
                  href="https://www.linkedin.com/sales/ssi" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition"
                >
                  LinkedIn SSI
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contato */}
          <div className="w-full md:w-1/3">
            <h3 className="text-lg font-semibold mb-4">DevClub</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">
                <a 
                  href="https://devclub.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition"
                >
                  Website
                </a>
              </li>
              <li className="text-gray-400">
                <a 
                  href="https://github.com/devclub-community" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition"
                >
                  GitHub
                </a>
              </li>
              <li className="text-gray-400">
                <a 
                  href="https://linkedin.com/company/devclub" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Direitos autorais */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} DevClub. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;