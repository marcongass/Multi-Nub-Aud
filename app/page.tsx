'use client';

import dynamic from 'next/dynamic';

// Componentes con carga dinámica para optimizar el bundle
const ParticleBackground = dynamic(() => import('./components/ParticleBackground'), { ssr: false });
const PremiumHeader = dynamic(() => import('./components/PremiumHeader'), { ssr: false });
const ConceptCards = dynamic(() => import('./components/ConceptCards'), { ssr: false });
const TraceabilitySimulator = dynamic(() => import('./components/TraceabilitySimulator'), { ssr: false });
const MetricsDashboard = dynamic(() => import('./components/MetricsDashboard'), { ssr: false });
const AuditTimeline = dynamic(() => import('./components/AuditTimeline'), { ssr: false });
const AlertPanel = dynamic(() => import('./components/AlertPanel'), { ssr: false });
const ToastContainer = dynamic(
  () => import('./components/AlertPanel').then(mod => ({ default: mod.ToastContainer })), 
  { ssr: false }
);

/**
 * CLOUD AUDIT - MULTI-CLOUD COMPLIANCE DASHBOARD
 * 
 * Aplicación premium de auditoría de cumplimiento para arquitecturas
 * multi-cloud con visualización de trazabilidad en tiempo real.
 * 
 * Features:
 * - Paleta Esmeralda + Cyan + Gris Oscuro
 * - Glassmorphism y efectos premium
 * - Simulador de trazabilidad multi-cloud
 * - Dashboard de métricas de cumplimiento
 * - Timeline de auditoría
 * - Sistema de alertas
 * - Background con partículas reactivas
 * - WCAG AA compliant
 */

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 font-sans antialiased">
      {/* Background reactivo con partículas */}
      <ParticleBackground />
      
      {/* Header premium con estado del sistema */}
      <PremiumHeader />
      
      {/* Contenido principal */}
      <main className="relative z-10">
        {/* Sección: Conceptos clave de cumplimiento */}
        <section className="px-6 py-12 lg:py-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Marco de <span className="gradient-text">Cumplimiento</span>
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Controles de seguridad y cumplimiento empresarial en todos los proveedores de nube
              </p>
            </div>
            
            <ConceptCards />
          </div>
        </section>

        {/* Separador decorativo */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
        </div>

        {/* Sección: Simulador de Trazabilidad */}
        <section className="px-6 py-12 lg:py-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Simulador de <span className="gradient-text">Trazabilidad de Datos</span>
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Visualización en tiempo real de flujos de datos en infraestructura multi-nube 
                con verificación de cumplimiento y detección de anomalías
              </p>
            </div>
            
            <TraceabilitySimulator />
          </div>
        </section>

        {/* Separador decorativo */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
        </div>

        {/* Sección: Dashboard de Métricas y Timeline */}
        <section className="px-6 py-12 lg:py-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Panel de <span className="gradient-text">Auditoría</span>
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Métricas completas y registro de auditoría en tiempo real para una visibilidad total 
                de su estado de cumplimiento
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Dashboard de métricas - ocupa 2 columnas */}
              <div className="lg:col-span-2">
                <MetricsDashboard />
              </div>
              
              {/* Panel de alertas - ocupa 1 columna */}
              <div className="lg:col-span-1">
                <AlertPanel />
              </div>
            </div>
          </div>
        </section>

        {/* Separador decorativo */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
        </div>

        {/* Sección: Timeline de Auditoría */}
        <section className="px-6 py-12 lg:py-16">
          <div className="max-w-7xl mx-auto">
            <AuditTimeline />
          </div>
        </section>

        {/* Separador decorativo */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
        </div>

        {/* Sección: Información de arquitectura */}
        <section className="px-6 py-12 lg:py-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Card: Nube Soberana */}
              <div className="card-premium animate-fade-up">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth="1.5">
                      <path d="M4 6h16v12H4z" />
                      <path d="M4 6l8-3 8 3" />
                      <path d="M8 10v6M12 9v7M16 10v6" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white">Nube Soberana</h3>
                </div>
                <p className="text-sm text-slate-400 mb-4">
                  Despliegue cargas de trabajo en regiones específicas de la jurisdicción con residencia de datos garantizada 
                  y cumplimiento de regulaciones locales.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="status-badge info">Ley de Datos UE</span>
                  <span className="status-badge info">DORA</span>
                  <span className="status-badge info">NIS2</span>
                </div>
              </div>

              {/* Card: Interoperabilidad */}
              <div className="card-premium animate-fade-up" style={{ animationDelay: '100ms' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22D3EE" strokeWidth="1.5">
                      <circle cx="5" cy="12" r="3" />
                      <circle cx="19" cy="12" r="3" />
                      <circle cx="12" cy="5" r="3" />
                      <circle cx="12" cy="19" r="3" />
                      <path d="M8 12h8M12 8v8" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white">Interoperabilidad</h3>
                </div>
                <p className="text-sm text-slate-400 mb-4">
                  Portabilidad de datos fluida entre proveedores de nube con APIs estandarizadas 
                  y patrones de infraestructura agnósticos del proveedor.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="status-badge success">Portable</span>
                  <span className="status-badge success">APIs Estándar</span>
                </div>
              </div>

              {/* Card: Responsabilidad Compartida */}
              <div className="card-premium animate-fade-up" style={{ animationDelay: '200ms' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FBBF24" strokeWidth="1.5">
                      <path d="M12 2v20M2 12h20" />
                      <rect x="4" y="4" width="7" height="7" rx="1" />
                      <rect x="13" y="4" width="7" height="7" rx="1" />
                      <rect x="4" y="13" width="7" height="7" rx="1" />
                      <rect x="13" y="13" width="7" height="7" rx="1" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white">Responsabilidad Compartida</h3>
                </div>
                <p className="text-sm text-slate-400 mb-4">
                  Delineación clara de responsabilidades de seguridad entre proveedores de nube 
                  y su organización con garantías de SLA.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="status-badge warning">SLA 99.99%</span>
                  <span className="status-badge success">Documentado</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">CA</span>
            </div>
            <span className="text-slate-400 text-sm">
              Cloud Audit <span className="text-slate-600">v1.0</span>
            </span>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <span>Plataforma de Cumplimiento Multi-Nube</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline">Cumple WCAG AA</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline">Rendimiento 60fps</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Estado del Sistema: Operativo</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Sistema de toasts */}
      <ToastContainer />
    </div>
  );
}
