import React, { useEffect, useRef } from 'react';
import { useTheme } from './ThemeProvider';

const NetworkBackground = () => {
  const canvasRef = useRef(null);
  const { darkMode } = useTheme(); // Obter o estado do tema
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let mouseX = 0;
    let mouseY = 0;
    
    // Configuração do canvas para preencher a tela inteira
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    // Redimensionar canvas quando a janela for redimensionada
    window.addEventListener('resize', setCanvasSize);
    setCanvasSize();
    
    // Rastrear posição do mouse
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
    
    // Definir cores com base no tema
    const backgroundColor = darkMode ? '#001021' : '#f8f9fa';
    const particleColor = darkMode ? '#39FF14' : '#37E359'; // Verde neon no dark, verde DevClub no light
    const lineOpacity = darkMode ? 0.4 : 0.2; // Linhas mais sutis no modo claro
    
    // Criar pontos
    const particlesArray = [];
    const numberOfParticles = darkMode ? 100 : 80; // Menos partículas no modo claro
    
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * (darkMode ? 2 : 1.5) + 1; // Partículas um pouco menores no modo claro
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.mouseDistance = 0;
      }
      
      update() {
        // Mover partículas
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Inverter direção se atingir as bordas
        if (this.x > canvas.width || this.x < 0) {
          this.speedX = -this.speedX;
        }
        if (this.y > canvas.height || this.y < 0) {
          this.speedY = -this.speedY;
        }
        
        // Calcular distância até o mouse
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        this.mouseDistance = Math.sqrt(dx * dx + dy * dy);
        
        // Adicionar uma leve atração ao mouse
        if (this.mouseDistance < 120) {
          this.x += dx * 0.005;
          this.y += dy * 0.005;
        }
      }
      
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();
      }
    }
    
    // Inicializar partículas
    const init = () => {
      particlesArray.length = 0; // Limpar array existente
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    };
    
    // Conectar partículas com linhas
    const connect = () => {
      const connectDistance = darkMode ? 120 : 100; // Distância de conexão menor no modo claro
      
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectDistance) {
            // Quanto mais próximos, mais opaca é a linha
            const opacity = 1 - (distance / connectDistance);
            ctx.strokeStyle = `rgba(${darkMode ? '57, 255, 20' : '55, 227, 89'}, ${opacity * lineOpacity})`;
            ctx.lineWidth = darkMode ? 0.5 : 0.3; // Linhas mais finas no modo claro
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    };
    
    // Função de animação
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      
      connect();
      animationFrameId = requestAnimationFrame(animate);
    };
    
    init();
    animate();
    
    // Limpar quando o componente for desmontado
    return () => {
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
      });
      cancelAnimationFrame(animationFrameId);
    };
  }, [darkMode]); // Re-executar efeito quando o tema mudar
  
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1,
        background: darkMode ? '#001021' : '#f8f9fa', // Cor de fundo baseada no tema
        pointerEvents: 'none' // Permite clicar em elementos acima do canvas
      }}
    />
  );
};

export default NetworkBackground;