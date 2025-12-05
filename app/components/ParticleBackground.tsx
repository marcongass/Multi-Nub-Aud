'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * BACKGROUND PARTICLES - Efecto de partículas animadas
 * Malla de red reactiva con partículas flotantes
 */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  connected: number[];
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isPresentation, setIsPresentation] = useState(false);
  const presentationRef = useRef(false);

  // Detectar preferencia de reducir movimiento + modo presentación
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const compute = (m?: boolean) => {
      const pres = !!document.body?.classList.contains('presentation');
      presentationRef.current = pres;
      setIsPresentation(pres);
      setIsReducedMotion(!!(m ?? mediaQuery.matches));
    };
    compute();
    const handler = (e: MediaQueryListEvent) => compute(e.matches);
    mediaQuery.addEventListener('change', handler);
    const presHandler = () => compute();
    window.addEventListener('presentation-mode-changed', presHandler as any);
    return () => {
      mediaQuery.removeEventListener('change', handler);
      window.removeEventListener('presentation-mode-changed', presHandler as any);
    };
  }, []);

  const initParticles = useCallback((width: number, height: number) => {
    const baseCount = Math.min(Math.floor((width * height) / 15000), 80);
    const particleCount = presentationRef.current ? Math.floor(baseCount * 0.35) : baseCount;
    const particles: Particle[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (presentationRef.current ? 0.25 : 0.5),
        vy: (Math.random() - 0.5) * (presentationRef.current ? 0.25 : 0.5),
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        connected: []
      });
    }
    
    particlesRef.current = particles;
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const particles = particlesRef.current;
    const mouse = mouseRef.current;

    // Limpiar canvas con fade
    ctx.fillStyle = presentationRef.current ? 'rgba(2, 6, 23, 0.25)' : 'rgba(2, 6, 23, 0.1)';
    ctx.fillRect(0, 0, width, height);

    // Actualizar y dibujar partículas
    particles.forEach((particle, i) => {
      // Movimiento
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Rebote en bordes
      if (particle.x < 0 || particle.x > width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > height) particle.vy *= -1;

      // Atracción al mouse (sutil)
      const dx = mouse.x - particle.x;
      const dy = mouse.y - particle.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (!presentationRef.current && dist < 200 && dist > 0) {
        particle.vx += (dx / dist) * 0.02;
        particle.vy += (dy / dist) * 0.02;
      }

      // Limitar velocidad
      const speed = Math.sqrt(particle.vx ** 2 + particle.vy ** 2);
      const maxSpeed = presentationRef.current ? 0.6 : 1;
      if (speed > maxSpeed) {
        particle.vx = (particle.vx / speed) * maxSpeed;
        particle.vy = (particle.vy / speed) * maxSpeed;
      }

      // Dibujar partícula
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      const gradient = ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, particle.size * 2
      );
      gradient.addColorStop(0, `rgba(16, 185, 129, ${particle.opacity})`);
      gradient.addColorStop(1, `rgba(6, 182, 212, 0)`);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Conexiones entre partículas cercanas
      particles.slice(i + 1).forEach((other, j) => {
        const dx2 = particle.x - other.x;
        const dy2 = particle.y - other.y;
        const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
        
        const maxDist = presentationRef.current ? 110 : 150;
        if (dist2 < maxDist) {
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(other.x, other.y);
          const lineOpacity = (1 - dist2 / maxDist) * (presentationRef.current ? 0.15 : 0.2);
          ctx.strokeStyle = `rgba(16, 185, 129, ${lineOpacity})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });
    });

    if (!isReducedMotion) {
      animationRef.current = requestAnimationFrame(animate);
    }
  }, [isReducedMotion]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || isReducedMotion) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles(canvas.width, canvas.height);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [initParticles, animate, isReducedMotion, isPresentation]);

  // Si se prefiere reducir movimiento o es presentación, mostrar fondo más sutil
  if (isReducedMotion) {
    return (
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.06) 0%, transparent 70%)'
        }}
        aria-hidden="true"
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
      aria-hidden="true"
    />
  );
}
