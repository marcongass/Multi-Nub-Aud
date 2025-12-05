'use client';

import { useEffect, useState, useRef } from 'react';
import { CheckCircleIcon, WarningIcon, AlertIcon, AWSIcon, AzureIcon, GCPIcon } from './Icons';

/**
 * HEADER PREMIUM
 * Header con partículas animadas, paralaje y badge de estado del sistema
 */

interface SystemStatus {
  overall: 'operational' | 'degraded' | 'outage';
  aws: 'up' | 'degraded' | 'down';
  azure: 'up' | 'degraded' | 'down';
  gcp: 'up' | 'degraded' | 'down';
  lastUpdated: Date;
}

export default function PremiumHeader() {
  const [systemStatus, setSystemStatus] = useState<SystemStatus>({
    overall: 'operational',
    aws: 'up',
    azure: 'up',
    gcp: 'degraded',
    lastUpdated: new Date()
  });
  const [scrollY, setScrollY] = useState(0);
  const [time, setTime] = useState(new Date());
  const [presentation, setPresentation] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  // Efecto de paralaje
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reloj en tiempo real
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Simular actualizaciones de estado
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStatus(prev => ({
        ...prev,
        lastUpdated: new Date()
      }));
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  // Inicializar presentación desde body/localStorage
  useEffect(() => {
    const init = () => {
      try {
        const on = document.body.classList.contains('presentation');
        setPresentation(on);
      } catch {}
    };
    init();
    const handler = (e: any) => setPresentation(!!(e?.detail?.enabled));
    window.addEventListener('presentation-mode-changed', handler as any);
    return () => window.removeEventListener('presentation-mode-changed', handler as any);
  }, []);

  const togglePresentation = () => {
    try {
      // Usa helper global inyectado en layout si existe
      if (typeof (window as any).__togglePresentation === 'function') {
        (window as any).__togglePresentation();
      } else {
        const on = !document.body.classList.contains('presentation');
        if (on) {
          document.body.classList.add('presentation');
          document.body.setAttribute('data-presentation','true');
          localStorage.setItem('presentation','1');
        } else {
          document.body.classList.remove('presentation');
          document.body.removeAttribute('data-presentation');
          localStorage.removeItem('presentation');
        }
        window.dispatchEvent(new CustomEvent('presentation-mode-changed', { detail: { enabled: on } }));
      }
    } catch {}
  };

  const statusConfig = {
    operational: { color: '#10B981', text: 'Todos los Sistemas Operativos', Icon: CheckCircleIcon },
    degraded: { color: '#F59E0B', text: 'Degradación Parcial', Icon: WarningIcon },
    outage: { color: '#EF4444', text: 'Interrupción del Servicio', Icon: AlertIcon }
  };

  const providerStatus = {
    up: '#10B981',
    degraded: '#F59E0B',
    down: '#EF4444'
  };

  const currentStatus = statusConfig[systemStatus.overall];

  // Subcomponente: Línea de conexión animada entre proveedores
  const ConnectionLine = ({
    gradientFrom,
    gradientVia,
    gradientTo,
    dotColor,
    duration = 3,
    showDot = true
  }: {
    gradientFrom: string;
    gradientVia: string;
    gradientTo: string;
    dotColor?: string;
    duration?: number;
    showDot?: boolean;
  }) => (
    <div className="hidden md:block w-16 h-px relative" aria-hidden>
      <div
        className={`absolute inset-0 bg-gradient-to-r ${gradientFrom} ${gradientVia} ${gradientTo}`}
        style={{
          animation: `progress-gradient ${duration}s linear infinite`,
          backgroundSize: '200% 100%'
        }}
      />
      {showDot && dotColor && (
        <div
          className={`absolute top-1/2 left-1/2 w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2`}
          style={{ backgroundColor: dotColor, animation: 'bounce 1s ease-in-out infinite' }}
        />
      )}
    </div>
  );

  return (
    <header 
      ref={headerRef}
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, rgba(2, 6, 23, 0.95) 0%, rgba(15, 23, 42, 0.9) 100%)'
      }}
    >
      {/* Fondo con efecto de paralaje */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        {/* Grid de fondo */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
        
        {/* Círculos de luz */}
        <div 
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.4) 0%, transparent 70%)'
          }}
        />
        <div 
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, transparent 70%)'
          }}
        />
      </div>

      {/* Partículas flotantes decorativas */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-emerald-400/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float-particle ${10 + Math.random() * 20}s linear infinite`,
              animationDelay: `${Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      {/* Contenido del header */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
        {/* Top bar con estado y hora */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between mb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-4 w-full">
            {/* Badge de estado del sistema */}
            <div 
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm sm:justify-start"
              style={{
                background: `${currentStatus.color}15`,
                border: `1px solid ${currentStatus.color}40`
              }}
              role="status"
              aria-live="polite"
              title={`Estado del sistema: ${currentStatus.text}`}
            >
              <div 
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: currentStatus.color }}
              />
              <currentStatus.Icon size={16} color={currentStatus.color} />
              <span 
                className="text-sm font-medium"
                style={{ color: currentStatus.color }}
              >
                {currentStatus.text}
              </span>
            </div>

            {/* Estados de proveedores */}
            <div className="hidden md:flex items-center gap-3 px-3 py-1.5 rounded-lg bg-slate-800/50 border border-slate-700/50" title="Estado de proveedores">
              <div className="flex items-center gap-1.5" title="AWS Status">
                <AWSIcon size={16} color="#FF9900" />
                <div 
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: providerStatus[systemStatus.aws] }}
                />
              </div>
              <div className="w-px h-4 bg-slate-700" />
              <div className="flex items-center gap-1.5" title="Azure Status">
                <AzureIcon size={16} color="#0089D6" />
                <div 
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: providerStatus[systemStatus.azure] }}
                />
              </div>
              <div className="w-px h-4 bg-slate-700" />
              <div className="flex items-center gap-1.5" title="GCP Status">
                <GCPIcon size={16} color="#4285F4" />
                <div 
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: providerStatus[systemStatus.gcp] }}
                />
              </div>
            </div>
          </div>

          <div className="sm:hidden h-px w-full bg-slate-800" />

          {/* Hora UTC */}
          <div className="w-full flex items-center justify-between gap-3 sm:w-auto sm:text-right sm:ml-4 sm:pl-4 sm:border-l sm:border-slate-800/60">
            <p className="text-xs text-slate-500">UTC Time</p>
            <p className="text-lg font-mono text-slate-300">
              {time.toUTCString().slice(17, 25)}
            </p>
            <button
              type="button"
              onClick={togglePresentation}
              className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-colors ${presentation ? 'bg-emerald-600/20 text-emerald-300 border-emerald-600/40' : 'bg-slate-800/60 text-slate-300 border-slate-700 hover:bg-slate-700/60'}`}
              title="Alternar Modo Presentación"
            >
              {presentation ? 'Presentación: ON' : 'Presentación: OFF'}
            </button>
          </div>
        </div>

        {/* Título principal */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-900/20 border border-emerald-700/30 mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-medium text-emerald-400 uppercase tracking-wider">
              Monitoreo en Vivo Activo
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="gradient-text">Multi-Nube</span>
            <br />
            <span className="text-white">Auditoría de Cumplimiento</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg text-slate-400 leading-relaxed">
            Trazabilidad de datos de nivel empresarial en arquitecturas híbridas y multi-nube.
            <br className="hidden md:block" />
            <span className="text-slate-500">RGPD • Ley de IA • Soberanía • Confianza Cero</span>
          </p>
        </div>

        {/* Nubes interconectadas - Diagrama visual */}
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 py-6">
          {/* AWS */}
          <div className="group relative" role="img" aria-label="Proveedor AWS" tabIndex={0}>
            <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:border-orange-500/30 transition-all duration-300 hover:scale-105 cursor-pointer">
              <AWSIcon size={32} color="#FF9900" />
              <div className="pulse-ring" style={{ borderColor: '#FF9900', borderRadius: '16px' }} />
            </div>
            <p className="mt-2 text-xs text-center text-slate-500">AWS</p>
          </div>

          {/* Línea de conexión animada */}
          <ConnectionLine
            gradientFrom="from-orange-500"
            gradientVia="via-transparent"
            gradientTo="to-blue-500"
            dotColor="#22D3EE"
            duration={3}
            showDot
          />

          {/* Azure */}
          <div className="group relative" role="img" aria-label="Proveedor Azure" tabIndex={0}>
            <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:border-blue-500/30 transition-all duration-300 hover:scale-105 cursor-pointer">
              <AzureIcon size={32} color="#0089D6" />
              <div className="pulse-ring" style={{ borderColor: '#0089D6', borderRadius: '16px' }} />
            </div>
            <p className="mt-2 text-xs text-center text-slate-500">Azure</p>
          </div>

          {/* Línea de conexión animada */}
          <ConnectionLine
            gradientFrom="from-blue-500"
            gradientVia="via-transparent"
            gradientTo="to-blue-400"
            dotColor="#34D399"
            duration={3}
            showDot
          />

          {/* GCP */}
          <div className="group relative" role="img" aria-label="Proveedor GCP" tabIndex={0}>
            <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:border-blue-400/30 transition-all duration-300 hover:scale-105 cursor-pointer">
              <GCPIcon size={32} color="#4285F4" />
              {systemStatus.gcp === 'degraded' && (
                <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-amber-500 border-2 border-slate-900" />
              )}
            </div>
            <p className="mt-2 text-xs text-center text-slate-500">GCP</p>
          </div>

          {/* Línea de conexión animada */}
          <ConnectionLine
            gradientFrom="from-blue-400"
            gradientVia="via-transparent"
            gradientTo="to-slate-500"
            duration={3}
            showDot={false}
          />

          {/* On-Prem */}
          <div className="group relative" role="img" aria-label="Infraestructura On-Prem" tabIndex={0}>
            <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:border-slate-500/30 transition-all duration-300 hover:scale-105 cursor-pointer">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="4" width="18" height="5" rx="1" stroke="#6B7280" strokeWidth="1.5" />
                <rect x="3" y="10" width="18" height="5" rx="1" stroke="#6B7280" strokeWidth="1.5" />
                <rect x="3" y="16" width="18" height="4" rx="1" stroke="#6B7280" strokeWidth="1.5" />
                <circle cx="6" cy="6.5" r="1" fill="#6B7280" />
                <circle cx="6" cy="12.5" r="1" fill="#6B7280" />
                <circle cx="6" cy="18" r="1" fill="#6B7280" />
              </svg>
            </div>
            <p className="mt-2 text-xs text-center text-slate-500">On-Prem</p>
          </div>
        </div>

        {/* Métricas rápidas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mt-6">
          {[
            { label: 'Regiones', value: '12', sublabel: 'Activas' },
            { label: 'Flujos de Datos', value: '847', sublabel: 'Monitoreados' },
            { label: 'Cumplimiento', value: '94%', sublabel: 'Puntaje' },
            { label: 'Incidentes', value: '0', sublabel: 'Abiertos' }
          ].map((metric, i) => (
            <div 
              key={metric.label}
              className="text-center p-3 rounded-xl bg-slate-800/30 border border-slate-700/30 animate-stagger"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <p className="text-2xl font-bold text-white">{metric.value}</p>
              <p className="text-xs text-slate-500">
                {metric.label} <span className="text-emerald-500">• {metric.sublabel}</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Separador con gradiente */}
      <div className="h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
    </header>
  );
}
