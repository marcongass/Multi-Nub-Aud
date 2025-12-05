'use client';

import { useEffect, useState } from 'react';
import { 
  GDPRIcon, 
  CertifiedIcon, 
  SovereigntyIcon, 
  EncryptionIcon,
  AWSIcon,
  AzureIcon,
  GCPIcon,
  FirewallIcon,
  IAMIcon,
  DatabaseIcon
} from './Icons';

/**
 * TARJETAS CONCEPTUALES PREMIUM
 * Cards con iconos, efectos de brillo y badges de cumplimiento
 */

interface ConceptCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  badges?: string[];
  metrics?: { label: string; value: string | number; trend?: 'up' | 'down' | 'neutral' }[];
  status?: 'active' | 'warning' | 'inactive';
  delay?: number;
}

function ConceptCard({ title, description, icon, badges, metrics, status = 'active', delay = 0 }: ConceptCardProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const statusColors = {
    active: { dot: 'bg-emerald-400', ring: 'ring-emerald-400/20' },
    warning: { dot: 'bg-amber-400', ring: 'ring-amber-400/20' },
    inactive: { dot: 'bg-slate-500', ring: 'ring-slate-500/20' }
  };

  return (
    <div 
      className={`
        group relative p-5 rounded-2xl overflow-hidden
        bg-gradient-to-br from-slate-800/80 via-slate-800/50 to-slate-900/80
        border border-slate-700/50 hover:border-emerald-500/30
        transition-all duration-500 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Efecto de brillo en hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
      </div>

      {/* Borde gradiente animado en hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-[-1px] rounded-2xl bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-emerald-500/20" />
      </div>

      {/* Header con icono y estado */}
      <div className="relative flex items-start justify-between mb-4">
        <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20">
          {icon}
        </div>
        
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${statusColors[status].dot} ring-4 ${statusColors[status].ring}`} />
        </div>
      </div>

      {/* Título y descripción */}
      <div className="relative">
        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-slate-400 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Badges de cumplimiento */}
      {badges && badges.length > 0 && (
        <div className="relative flex flex-wrap gap-2 mt-4">
          {badges.map((badge) => (
            <span 
              key={badge}
              className="px-2 py-1 text-[10px] font-bold uppercase rounded-full 
                bg-gradient-to-r from-emerald-900/40 to-cyan-900/40 
                text-emerald-400 border border-emerald-700/30"
            >
              {badge}
            </span>
          ))}
        </div>
      )}

      {/* Mini gráficos/métricas */}
      {metrics && metrics.length > 0 && (
        <div className="relative grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-700/50">
          {metrics.map((metric, i) => (
            <div key={i} className="text-center">
              <p className="text-lg font-bold text-white">
                {metric.value}
                {metric.trend && (
                  <span className={`ml-1 text-xs ${metric.trend === 'up' ? 'text-emerald-400' : metric.trend === 'down' ? 'text-red-400' : 'text-slate-500'}`}>
                    {metric.trend === 'up' ? '↑' : metric.trend === 'down' ? '↓' : '→'}
                  </span>
                )}
              </p>
              <p className="text-xs text-slate-500">{metric.label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Grid de tarjetas conceptuales
export default function ConceptCards() {
  const cards = [
    {
      title: 'Cumplimiento RGPD',
      description: 'Protección de datos completa para ciudadanos de la UE con gestión automatizada de consentimiento y residencia de datos.',
      icon: <GDPRIcon size={28} color="#10B981" />,
      badges: ['Art. 17 RTBF', 'Art. 44 Transfer', 'DPO'],
      metrics: [
        { label: 'Cumplimiento', value: '94%', trend: 'up' as const },
        { label: 'Solicitudes', value: '127', trend: 'neutral' as const }
      ],
      status: 'active' as const
    },
    {
      title: 'Preparación Ley de IA',
      description: 'Cumplimiento de regulación de IA de la UE para sistemas de alto riesgo con explicabilidad total y monitoreo de sesgos.',
      icon: <CertifiedIcon size={28} color="#8B5CF6" />,
      badges: ['Alto Riesgo', 'Explicabilidad', 'Auditoría'],
      metrics: [
        { label: 'Modelos', value: '12', trend: 'up' as const },
        { label: 'Puntaje Riesgo', value: 'Bajo', trend: 'neutral' as const }
      ],
      status: 'warning' as const
    },
    {
      title: 'Soberanía de Datos',
      description: 'Despliegue de nube soberana con garantías de residencia física de datos y enrutamiento consciente de la jurisdicción.',
      icon: <SovereigntyIcon size={28} color="#F59E0B" />,
      badges: ['Solo UE', 'Residencia Física', 'Schrems II'],
      metrics: [
        { label: 'Regiones', value: '4 UE', trend: 'neutral' as const },
        { label: 'Violaciones', value: '0', trend: 'down' as const }
      ],
      status: 'active' as const
    },
    {
      title: 'Cifrado y KMS',
      description: 'Cifrado de extremo a extremo con claves gestionadas por el cliente y almacenamiento respaldado por HSM en todos los proveedores.',
      icon: <EncryptionIcon size={28} color="#06B6D4" />,
      badges: ['AES-256', 'HSM', 'BYOK'],
      metrics: [
        { label: 'Claves', value: '847', trend: 'neutral' as const },
        { label: 'Rotaciones', value: '12/mes', trend: 'up' as const }
      ],
      status: 'active' as const
    },
    {
      title: 'Estrategia Multi-Nube',
      description: 'Arquitectura agnóstica del proveedor en AWS, Azure y GCP con gestión unificada y portabilidad.',
      icon: (
        <div className="flex -space-x-2">
          <AWSIcon size={20} color="#FF9900" />
          <AzureIcon size={20} color="#0089D6" />
          <GCPIcon size={20} color="#4285F4" />
        </div>
      ),
      badges: ['Sin Bloqueo', 'Portable', 'Federado'],
      metrics: [
        { label: 'Proveedores', value: '3', trend: 'neutral' as const },
        { label: 'Portabilidad', value: '78%', trend: 'up' as const }
      ],
      status: 'active' as const
    },
    {
      title: 'Seguridad Zero Trust',
      description: 'Seguridad centrada en la identidad con verificación continua, micro-segmentación y acceso de mínimo privilegio.',
      icon: <FirewallIcon size={28} color="#EF4444" />,
      badges: ['mTLS', 'RBAC', 'MFA'],
      metrics: [
        { label: 'Políticas', value: '2.4K', trend: 'up' as const },
        { label: 'Denegaciones', value: '847', trend: 'down' as const }
      ],
      status: 'active' as const
    },
    {
      title: 'IAM Federado',
      description: 'Gestión de identidad unificada en proveedores de nube con SSO, aprovisionamiento SCIM y revisiones de acceso.',
      icon: <IAMIcon size={28} color="#EC4899" />,
      badges: ['SAML 2.0', 'OIDC', 'SCIM'],
      metrics: [
        { label: 'Identidades', value: '3.2K', trend: 'up' as const },
        { label: 'Sesiones', value: '847', trend: 'neutral' as const }
      ],
      status: 'active' as const
    },
    {
      title: 'Replicación de Datos',
      description: 'Replicación activo-activo multi-región con resolución de conflictos y consistencia garantizada.',
      icon: <DatabaseIcon size={28} color="#22D3EE" />,
      badges: ['RPO<15s', 'RTO<60s', 'Multi-AZ'],
      metrics: [
        { label: 'Réplicas', value: '6', trend: 'neutral' as const },
        { label: 'Retraso', value: '45ms', trend: 'down' as const }
      ],
      status: 'active' as const
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {cards.map((card, index) => (
        <ConceptCard
          key={card.title}
          {...card}
          delay={index * 100}
        />
      ))}
    </div>
  );
}
