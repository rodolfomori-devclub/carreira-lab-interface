// src/components/Header.jsx (atualizado)
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  // Função para verificar se o link está ativo
  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white dark:bg-secondary shadow-sm transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-primary dark:text-primary-light text-2xl font-bold transition-colors">DevClub</span>
              <span className="ml-2 text-text-light dark:text-text-dark transition-colors">CarreiraLab</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`font-medium transition-colors ${
                isActive('/') 
                  ? 'text-primary dark:text-primary-light' 
                  : 'text-text-muted-light dark:text-text-muted-dark hover:text-primary dark:hover:text-primary-light'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/chat" 
              className={`font-medium transition-colors ${
                isActive('/chat') 
                  ? 'text-primary dark:text-primary-light' 
                  : 'text-text-muted-light dark:text-text-muted-dark hover:text-primary dark:hover:text-primary-light'
              }`}
            >
              Chat Recrutadora
            </Link>
            <Link 
              to="https://go.rodolfomori.com.br/suporte" 
              className="font-medium text-text-muted-light dark:text-text-muted-dark hover:text-primary dark:hover:text-primary-light transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Suporte
            </Link>
            <div className="ml-4">
              <ThemeToggle />
            </div>
          </nav>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <ThemeToggle />
            <button 
              type="button"
              className="ml-2 text-text-muted-light dark:text-text-muted-dark hover:text-primary dark:hover:text-primary-light transition-colors"
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
          <div className="md:hidden animate-slide-down">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link 
                to="/" 
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive('/') 
                    ? 'bg-primary-light/10 dark:bg-primary-dark/20 text-primary dark:text-primary-light' 
                    : 'text-text-muted-light dark:text-text-muted-dark hover:bg-primary-light/10 dark:hover:bg-primary-dark/20 hover:text-primary dark:hover:text-primary-light'
                } transition-colors`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/chat" 
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive('/chat') 
                    ? 'bg-primary-light/10 dark:bg-primary-dark/20 text-primary dark:text-primary-light' 
                    : 'text-text-muted-light dark:text-text-muted-dark hover:bg-primary-light/10 dark:hover:bg-primary-dark/20 hover:text-primary dark:hover:text-primary-light'
                } transition-colors`}
                onClick={() => setIsMenuOpen(false)}
              >
                Chat Recrutadora
              </Link>
              <Link 
                to="https://go.rodolfomori.com.br/suporte"
                className="block px-3 py-2 rounded-md text-base font-medium text-text-muted-light dark:text-text-muted-dark hover:bg-primary-light/10 dark:hover:bg-primary-dark/20 hover:text-primary dark:hover:text-primary-light transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
              >
                Suporte
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;