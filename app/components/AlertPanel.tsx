'use client';

import { useState, useEffect, useCallback } from 'react';
import { AlertIcon, InfoIcon, WarningIcon, CheckCircleIcon, CloseIcon, SovereigntyIcon, EncryptionIcon } from './Icons';

/**
 * SISTEMA DE ALERTAS Y TOASTS
 * Notificaciones animadas con diferentes niveles de severidad
 */

type AlertSeverity = 'info' | 'success' | 'warning' | 'critical' | 'breach' | 'sovereignty';

interface Alert {
  id: string;
  severity: AlertSeverity;
  title: string;
  message: string;
  timestamp: Date;
  nature?: 'incidente' | 'pedagogica';
  why?: string;
  dismissible?: boolean;
  autoClose?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// Configuración de colores y estilos por severidad
const severityConfig: Record<AlertSeverity, {
  bg: string;
  border: string;
  text: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  pulse?: boolean;
}> = {
  info: {
    bg: 'rgba(6, 182, 212, 0.1)',
    border: 'rgba(6, 182, 212, 0.3)',
    text: '#22D3EE',
    icon: InfoIcon
  },
  success: {
    bg: 'rgba(16, 185, 129, 0.1)',
    border: 'rgba(16, 185, 129, 0.3)',
    text: '#34D399',
    icon: CheckCircleIcon
  },
  warning: {
    bg: 'rgba(245, 158, 11, 0.1)',
    border: 'rgba(245, 158, 11, 0.3)',
    text: '#FBBF24',
    icon: WarningIcon
  },
  critical: {
    bg: 'rgba(239, 68, 68, 0.15)',
    border: 'rgba(239, 68, 68, 0.4)',
    text: '#F87171',
    icon: AlertIcon,
    pulse: true
  },
  breach: {
    bg: 'rgba(124, 45, 18, 0.2)',
    border: 'rgba(239, 68, 68, 0.5)',
    text: '#FCA5A5',
    icon: EncryptionIcon,
    pulse: true
  },
  sovereignty: {
    bg: 'rgba(124, 58, 237, 0.15)',
    border: 'rgba(124, 58, 237, 0.4)',
    text: '#A78BFA',
    icon: SovereigntyIcon,
    pulse: true
  }
};

// Alertas de ejemplo para demo
const sampleAlerts: Omit<Alert, 'id' | 'timestamp'>[] = [
  {
    severity: 'sovereignty',
    title: 'Alerta de Soberanía',
    message: 'Intento de transferencia de datos a US-EAST-1 bloqueado. Los datos PII deben permanecer en la jurisdicción de la UE según el Art. 44 del RGPD.',
    nature: 'incidente',
    why: 'Evita multa por transferencia internacional sin base legal.',
    dismissible: true,
    autoClose: 15000
  },
  {
    severity: 'critical',
    title: 'Alta Latencia Detectada',
    message: 'La latencia entre regiones excedió el umbral de 200ms entre EU-West-1 y Azure West Europe.',
    nature: 'incidente',
    why: 'Afecta SLA y puede provocar pérdida de datos en replicación.',
    dismissible: true,
    action: { label: 'Ver Detalles', onClick: () => console.log('View details') }
  },
  {
    severity: 'warning',
    title: 'Certificado Expirando',
    message: 'El certificado TLS para api.service.eu expirará en 14 días. Programe la renovación.',
    nature: 'incidente',
    why: 'Expone a ataques MITM y caída de servicio.',
    dismissible: true,
    autoClose: 10000
  },
  {
    severity: 'success',
    title: 'Respaldo Completado',
    message: 'Respaldo diario cifrado al sitio de recuperación completado exitosamente. 2.4TB transferidos.',
    nature: 'pedagogica',
    why: 'Ejemplo de mensaje esperado para evidencias positivas.',
    dismissible: true,
    autoClose: 5000
  },
  {
    severity: 'info',
    title: 'Mantenimiento Programado',
    message: 'Mantenimiento de la región Azure West Europe programado para el 7 de Dic, 02:00-04:00 UTC.',
    nature: 'pedagogica',
    why: 'Sirve como plantilla de comunicación preventiva.',
    dismissible: true
  },
  {
    severity: 'breach',
    title: 'Incidente de Seguridad',
    message: 'Múltiples intentos de autenticación fallidos detectados desde rango de IP sospechoso. Cuenta bloqueada.',
    nature: 'incidente',
    why: 'Señal temprana de ataque de fuerza bruta; requiere revisión.',
    dismissible: false,
    action: { label: 'Investigar', onClick: () => console.log('Investigate') }
  }
];

// Componente Toast individual
function Toast({ 
  alert, 
  onDismiss 
}: { 
  alert: Alert; 
  onDismiss: (id: string) => void;
}) {
  const [isExiting, setIsExiting] = useState(false);
  const config = severityConfig[alert.severity];
  const IconComponent = config.icon;

  const handleDismiss = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => onDismiss(alert.id), 300);
  }, [alert.id, onDismiss]);

  // Auto-close timer
  useEffect(() => {
    if (alert.autoClose) {
      const timer = setTimeout(handleDismiss, alert.autoClose);
      return () => clearTimeout(timer);
    }
  }, [alert.autoClose, handleDismiss]);

  return (
    <div 
      className={`
        relative flex items-start gap-3 p-4 rounded-xl backdrop-blur-md
        border-l-4 shadow-xl max-w-md
        ${isExiting ? 'animate-slide-out' : 'animate-slide-in'}
        ${config.pulse ? 'neon-glow' : ''}
      `}
      style={{
        backgroundColor: config.bg,
        borderColor: config.text,
        borderLeftWidth: '4px',
        animation: isExiting ? 'toast-out 0.3s ease-out forwards' : 'toast-in 0.3s ease-out'
      }}
      role="alert"
      aria-live={alert.severity === 'critical' || alert.severity === 'breach' ? 'assertive' : 'polite'}
    >
      {/* Icono */}
      <div 
        className={`flex-shrink-0 p-2 rounded-lg ${config.pulse ? 'animate-pulse' : ''}`}
        style={{ backgroundColor: `${config.text}20` }}
      >
        <IconComponent size={20} color={config.text} />
      </div>

      {/* Contenido */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h4 className="font-semibold text-white text-sm">{alert.title}</h4>
          <span 
            className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase"
            style={{ backgroundColor: `${config.text}30`, color: config.text }}
          >
            {alert.severity}
          </span>
          {alert.nature && (
            <span className="px-1 py-0.5 rounded text-[10px] font-semibold uppercase bg-slate-900/60 text-slate-300 border border-slate-700/60">
              {alert.nature === 'incidente' ? 'Incidente' : 'Demo'}
            </span>
          )}
        </div>
        <p className="text-sm text-slate-300 mt-1">{alert.message}</p>
        {alert.why && (
          <p className="text-xs text-emerald-200 mt-1">¿Por qué importa? {alert.why}</p>
        )}
        
        {/* Acción */}
        {alert.action && (
          <button
            onClick={alert.action.onClick}
            className="mt-2 text-sm font-medium hover:underline btn-ripple"
            style={{ color: config.text }}
          >
            {alert.action.label} →
          </button>
        )}

        {/* Timestamp */}
        <p className="text-xs text-slate-500 mt-2">
          {alert.timestamp.toLocaleTimeString()}
        </p>
      </div>

      {/* Botón cerrar */}
      {alert.dismissible && (
        <button
          onClick={handleDismiss}
          className="flex-shrink-0 p-1 rounded hover:bg-white/10 transition-colors"
          aria-label="Dismiss alert"
        >
          <CloseIcon size={16} color="#94A3B8" />
        </button>
      )}

      {/* Progress bar para auto-close */}
      {alert.autoClose && (
        <div 
          className="absolute bottom-0 left-0 h-1 rounded-bl-xl"
          style={{ 
            backgroundColor: config.text,
            width: '100%',
            animation: `shrink-width ${alert.autoClose}ms linear forwards`
          }}
        />
      )}
    </div>
  );
}

// Contenedor de Toasts
export function ToastContainer() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [demoStarted, setDemoStarted] = useState(false);

  const addAlert = useCallback((alertData: Omit<Alert, 'id' | 'timestamp'>) => {
    const newAlert: Alert = {
      ...alertData,
      id: `alert-${Date.now()}-${Math.random()}`,
      timestamp: new Date()
    };
    setAlerts(prev => [...prev, newAlert]);
  }, []);

  const dismissAlert = useCallback((id: string) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  }, []);

  // Demo: mostrar alertas periódicamente
  useEffect(() => {
    if (!demoStarted) return;

    let index = 0;
    const interval = setInterval(() => {
      if (index < sampleAlerts.length) {
        addAlert(sampleAlerts[index]);
        index++;
      } else {
        index = 0;
      }
    }, 8000);

    // Mostrar primera alerta inmediatamente
    addAlert(sampleAlerts[0]);

    return () => clearInterval(interval);
  }, [demoStarted, addAlert]);

  return (
    <>
      {/* Botón para iniciar demo */}
      {!demoStarted && (
        <button
          onClick={() => setDemoStarted(true)}
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-lg shadow-lg transition-colors z-50 text-center sm:text-left btn-ripple"
        >
          Iniciar Demo de Alertas
        </button>
      )}

      {/* Contenedor de toasts */}
      <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:w-80 flex flex-col gap-3 z-50 max-h-[80vh] overflow-y-auto">
        {alerts.map(alert => (
          <Toast key={alert.id} alert={alert} onDismiss={dismissAlert} />
        ))}
      </div>

      {/* Estilos adicionales para animación de progress bar */}
      <style jsx global>{`
        @keyframes shrink-width {
          from { width: 100%; }
          to { width: 0%; }
        }
        
        @keyframes toast-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes toast-out {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}

// Panel de alertas embebido (para dashboard)
export default function AlertPanel() {
  const [alerts] = useState<Alert[]>(
    sampleAlerts.slice(0, 5).map((a, i) => ({
      ...a,
      id: `panel-${i}`,
      timestamp: new Date(Date.now() - i * 300000)
    }))
  );

  return (
    <div className="card-premium animate-fade-up">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-700/50">
        <h3 className="text-lg font-semibold gradient-text">Alertas Activas</h3>
        <span className="px-2 py-1 text-xs font-bold rounded-full bg-red-900/30 text-red-400">
          {alerts.filter(a => a.severity === 'critical' || a.severity === 'breach').length} Críticas
        </span>
      </div>

      <div className="flex flex-wrap gap-2 text-[11px] text-slate-400 mb-3">
        <span className="px-2 py-1 rounded-full bg-slate-800/60 border border-slate-700/60">Incidente real: rojo / ámbar</span>
        <span className="px-2 py-1 rounded-full bg-slate-800/60 border border-slate-700/60">Alerta pedagógica: gris / verde (para demos)</span>
        <span className="px-2 py-1 rounded-full bg-slate-800/60 border border-slate-700/60">`¿Por qué importa?` explica el impacto en cumplimiento.</span>
      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
        {alerts.map(alert => {
          const config = severityConfig[alert.severity];
          const IconComponent = config.icon;

          return (
            <div
              key={alert.id}
              className="flex items-start gap-3 p-3 rounded-lg transition-all hover:bg-slate-800/50"
              style={{ borderLeft: `3px solid ${config.text}` }}
            >
              <div 
                className="p-1.5 rounded"
                style={{ backgroundColor: config.bg }}
              >
                <IconComponent size={14} color={config.text} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-white">{alert.title}</span>
                  <span 
                    className="px-1 py-0.5 rounded text-[9px] font-bold uppercase"
                    style={{ color: config.text }}
                  >
                    {alert.severity}
                  </span>
                  {alert.nature && (
                    <span className="px-1 py-0.5 rounded text-[9px] font-semibold uppercase bg-slate-900/70 text-slate-300 border border-slate-800/70">
                      {alert.nature === 'incidente' ? 'Incidente' : 'Demo'}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">{alert.message}</p>
                {alert.why && <p className="text-[11px] text-emerald-200 mt-1">¿Por qué importa? {alert.why}</p>}
                <p className="text-[10px] text-slate-600 mt-1">
                  {Math.floor((Date.now() - alert.timestamp.getTime()) / 60000)}m atrás
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-700/50">
        <button className="w-full py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors">
          Ver Todas las Alertas →
        </button>
      </div>
    </div>
  );
}
