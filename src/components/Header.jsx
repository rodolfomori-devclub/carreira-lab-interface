// frontend/src/components/Header.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  // Função para verificar se o link está ativo
  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-indigo-600 text-2xl font-bold">DevClub</span>
              <span className="ml-2 text-gray-600">LinkedIn Analyzer</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className={`font-medium ${
                isActive('/') 
                  ? 'text-indigo-600' 
                  : 'text-gray-500 hover:text-indigo-600'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/analysis" 
              className={`font-medium ${
                isActive('/analysis') 
                  ? 'text-indigo-600' 
                  : 'text-gray-500 hover:text-indigo-600'
              }`}
            >
              Analisar Perfil
            </Link>
          </nav>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              type="button"
              className="text-gray-500 hover:text-indigo-600 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link 
                to="/" 
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive('/') 
                    ? 'bg-indigo-50 text-indigo-600' 
                    : 'text-gray-500 hover:bg-indigo-50 hover:text-indigo-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/analysis" 
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive('/analysis') 
                    ? 'bg-indigo-50 text-indigo-600' 
                    : 'text-gray-500 hover:bg-indigo-50 hover:text-indigo-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Analisar Perfil
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;