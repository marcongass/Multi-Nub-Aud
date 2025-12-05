'use client';

/**
 * ICONOS SVG LIGEROS PARA INFRAESTRUCTURA CLOUD
 * Diseñados específicamente para representar componentes de arquitectura multi-cloud
 */

interface IconProps {
  size?: number;
  className?: string;
  color?: string;
}

// === INFRAESTRUCTURA CORE ===

export const RegionIcon = ({ size = 24, className = '', color = 'currentColor' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" strokeDasharray="3 2" />
    <circle cx="12" cy="12" r="5" stroke={color} strokeWidth="1.5" />
    <circle cx="12" cy="12" r="2" fill={color} />
  </svg>
);

export const AvailabilityZoneIcon = ({ size = 24, className = '', color = 'currentColor' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="3" y="3" width="18" height="18" rx="3" stroke={color} strokeWidth="1.5" />
    <path d="M3 9h18M9 9v12" stroke={color} strokeWidth="1.5" />
    <circle cx="6" cy="6" r="1.5" fill={color} />
  </svg>
);

export const FirewallIcon = ({ size = 24, className = '', color = 'currentColor' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M9 12l2 2 4-4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const WAFIcon = ({ size = 24, className = '', color = 'currentColor' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M8 10h8M8 14h8" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="6" cy="10" r="1" fill={color} />
    <circle cx="6" cy="14" r="1" fill={color} />
  </svg>
);

export const GatewayIcon = ({ size = 24, className = '', color = 'currentColor' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="6" y="4" width="12" height="16" rx="2" stroke={color} strokeWidth="1.5" />
    <path d="M6 8h12M6 16h12" stroke={color} strokeWidth="1.5" />
    <circle cx="12" cy="12" r="2" stroke={color} strokeWidth="1.5" />
    <path d="M2 12h4M18 12h4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const LoadBalancerIcon = ({ size = 24, className = '', color = 'currentColor' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="5" r="3" stroke={color} strokeWidth="1.5" />
    <circle cx="6" cy="19" r="3" stroke={color} strokeWidth="1.5" />
    <circle cx="18" cy="19" r="3" stroke={color} strokeWidth="1.5" />
    <path d="M12 8v4M12 12l-6 4M12 12l6 4" stroke={color} strokeWidth="1.5" />
  </svg>
);

export const CDNIcon = ({ size = 24, className = '', color = 'currentColor' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" />
    <ellipse cx="12" cy="12" rx="4" ry="9" stroke={color} strokeWidth="1.5" />
    <path d="M3 12h18" stroke={color} strokeWidth="1.5" />
    <path d="M4 8h16M4 16h16" stroke={color} strokeWidth="1" strokeOpacity="0.5" />
  </svg>
);

export const CacheIcon = ({ size = 24, className = '', color = 'currentColor' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="3" y="6" width="18" height="12" rx="2" stroke={color} strokeWidth="1.5" />
    <path d="M7 10h4M7 14h6" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M17 10v4" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <circle cx="17" cy="10" r="1" fill={color} />
    <circle cx="17" cy="14" r="1" fill={color} />
  </svg>
);

export const MessageQueueIcon = ({ size = 24, className = '', color = 'currentColor' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="2" y="6" width="6" height="4" rx="1" stroke={color} strokeWidth="1.5" />
    <rect x="9" y="6" width="6" height="4" rx="1" stroke={color} strokeWidth="1.5" />
    <rect x="16" y="6" width="6" height="4" rx="1" stroke={color} strokeWidth="1.5" />
    <rect x="5" y="14" width="6" height="4" rx="1" stroke={color} strokeWidth="1.5" />
    <rect x="13" y="14" width="6" height="4" rx="1" stroke={color} strokeWidth="1.5" />
    <path d="M5 10v4M12 10v4M19 10v4" stroke={color} strokeWidth="1.5" strokeDasharray="2 2" />
  </svg>
);

export const DatabaseIcon = ({ size = 24, className = '', color = 'currentColor' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <ellipse cx="12" cy="6" rx="8" ry="3" stroke={color} strokeWidth="1.5" />
    <path d="M4 6v12c0 1.66 3.58 3 8 3s8-1.34 8-3V6" stroke={color} strokeWidth="1.5" />
    <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" stroke={color} strokeWidth="1.5" />
  </svg>
);

export const StorageIcon = ({ size = 24, className = '', color = 'currentColor' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M4 4h16v4H4zM4 10h16v4H4zM4 16h16v4H4z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    <circle cx="7" cy="6" r="1" fill={color} />
    <circle cx="7" cy="12" r="1" fill={color} />
    <circle cx="7" cy="18" r="1" fill={color} />
  </svg>
);

export const KMSIcon = ({ size = 24, className = '', color = 'currentColor' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2L4 6v4c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    <circle cx="12" cy="10" r="2" stroke={color} strokeWidth="1.5" />
    <path d="M12 12v4M10 14h4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const ServiceMeshIcon = ({ size = 24, className = '', color = 'currentColor' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="5" cy="5" r="2" stroke={color} strokeWidth="1.5" />
    <circle cx="19" cy="5" r="2" stroke={color} strokeWidth="1.5" />
    <circle cx="5" cy="19" r="2" stroke={color} strokeWidth="1.5" />
    <circle cx="19" cy="19" r="2" stroke={color} strokeWidth="1.5" />
    <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1.5" />
    <path d="M7 5h10M5 7v10M19 7v10M7 19h10" stroke={color} strokeWidth="1" strokeOpacity="0.5" />
    <path d="M7 7l3 3M17 7l-3 3M7 17l3-3M17 17l-3-3" stroke={color} strokeWidth="1.5" />
  </svg>
);

export const IAMIcon = ({ size = 24, className = '', color = 'currentColor' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="8" r="4" stroke={color} strokeWidth="1.5" />
    <path d="M4 20c0-4 4-6 8-6s8 2 8 6" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M15 7l3-3m0 0l3 3m-3-3v6" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const AINodeIcon = ({ size = 24, className = '', color = 'currentColor' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="4" y="4" width="16" height="16" rx="3" stroke={color} strokeWidth="1.5" />
    <circle cx="9" cy="10" r="1.5" fill={color} />
    <circle cx="15" cy="10" r="1.5" fill={color} />
    <path d="M8 15c0 0 1.5 2 4 2s4-2 4-2" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M12 2v2M12 20v2M2 12h2M20 12h2" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const DataLakeIcon = ({ size = 24, className = '', color = 'currentColor' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <ellipse cx="12" cy="18" rx="9" ry="3" stroke={color} strokeWidth="1.5" />
    <path d="M3 18V8c0-3 4-5 9-5s9 2 9 5v10" stroke={color} strokeWidth="1.5" />
    <path d="M3 8c0 1.66 4 3 9 3s9-1.34 9-3" stroke={color} strokeWidth="1.5" />
    <path d="M3 13c0 1.66 4 3 9 3s9-1.34 9-3" stroke={color} strokeWidth="1.5" />
  </svg>
);

export const VPCIcon = ({ size = 24, className = '', color = 'currentColor' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="2" y="4" width="20" height="16" rx="2" stroke={color} strokeWidth="1.5" strokeDasharray="4 2" />
    <rect x="5" y="7" width="6" height="5" rx="1" stroke={color} strokeWidth="1.5" />
    <rect x="13" y="7" width="6" height="5" rx="1" stroke={color} strokeWidth="1.5" />
    <rect x="9" y="14" width="6" height="4" rx="1" stroke={color} strokeWidth="1.5" />
    <path d="M8 12v2M16 12v2" stroke={color} strokeWidth="1.5" />
  </svg>
);

// === ICONOS DE ESTADO Y CUMPLIMIENTO ===

export const GDPRIcon = ({ size = 24, className = '', color = 'currentColor' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" />
    <path d="M12 3c-2 2-3 5-3 9s1 7 3 9c2-2 3-5 3-9s-1-7-3-9z" stroke={color} strokeWidth="1.5" />
    <path d="M3 12h18" stroke={color} strokeWidth="1.5" />
    <text x="12" y="14" textAnchor="middle" fontSize="6" fill={color} fontWeight="bold">EU</text>
  </svg>
);

export const CertifiedIcon = ({ size = 24, className = '', color = 'currentColor' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="10" r="7" stroke={color} strokeWidth="1.5" />
    <path d="M9 10l2 2 4-4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 17l4 4 4-4" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M12 17v4" stroke={color} strokeWidth="1.5" />
  </svg>
);

export const WarningIcon = ({ size = 24, className = '', color = 'currentColor' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 3L2 21h20L12 3z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M12 10v4M12 17v1" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const SovereigntyIcon = ({ size = 24, className = '', color = 'currentColor' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M4 6h16v12H4z" stroke={color} strokeWidth="1.5" />
    <path d="M4 6l8-3 8 3" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M8 10v6M12 9v7M16 10v6" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="12" cy="6" r="1.5" fill={color} />
  </svg>
);

export const EncryptionIcon = ({ size = 24, className = '', color = 'currentColor' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="5" y="11" width="14" height="10" rx="2" stroke={color} strokeWidth="1.5" />
    <path d="M8 11V7a4 4 0 118 0v4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="12" cy="16" r="2" fill={color} />
  </svg>
);

export const LogIcon = ({ size = 24, className = '', color = 'currentColor' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M4 4h16v16H4z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M8 8h8M8 12h8M8 16h5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="17" cy="16" r="2" stroke={color} strokeWidth="1.5" />
    <path d="M19 18l2 2" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// === ICONOS DE PROVEEDORES CLOUD ===

export const AWSIcon = ({ size = 24, className = '', color = 'currentColor' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M6.5 11.5l5.5 3 5.5-3M12 14.5v-9" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M4 8l8 4.5L20 8" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M4 8v8l8 4.5 8-4.5V8" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

export const AzureIcon = ({ size = 24, className = '', color = 'currentColor' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M5 18L9 6h4l-6 12h-2z" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1.5" />
    <path d="M11 6l4 6-7 6h11L11 6z" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1.5" />
  </svg>
);

export const GCPIcon = ({ size = 24, className = '', color = 'currentColor' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 4l7 4v8l-7 4-7-4V8l7-4z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M12 4v8M5 8l7 4M19 8l-7 4" stroke={color} strokeWidth="1.5" />
    <circle cx="12" cy="12" r="2" fill={color} />
  </svg>
);

// === ICONOS DE ACCIONES ===

export const TransferIcon = ({ size = 24, className = '', color = 'currentColor' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M4 12h16M16 8l4 4-4 4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 12H4M8 16l-4-4 4-4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
  </svg>
);

export const FailoverIcon = ({ size = 24, className = '', color = 'currentColor' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="7" cy="12" r="4" stroke={color} strokeWidth="1.5" />
    <circle cx="17" cy="12" r="4" stroke={color} strokeWidth="1.5" strokeDasharray="2 2" />
    <path d="M11 12h2" stroke={color} strokeWidth="1.5" />
    <path d="M14 10l2 2-2 2" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7 8v-3M7 16v3" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const SyncIcon = ({ size = 24, className = '', color = 'currentColor' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M4 12a8 8 0 0114.5-4.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M20 12a8 8 0 01-14.5 4.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M15 7l3.5 0.5 0.5-3.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 17l-3.5-0.5-0.5 3.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const DeleteIcon = ({ size = 24, className = '', color = 'currentColor' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M4 6h16M6 6v12a2 2 0 002 2h8a2 2 0 002-2V6" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M9 6V4h6v2" stroke={color} strokeWidth="1.5" />
    <path d="M10 10v6M14 10v6" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// === ICONOS DE MÉTRICAS ===

export const LatencyIcon = ({ size = 24, className = '', color = 'currentColor' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" />
    <path d="M12 6v6l4 2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ThroughputIcon = ({ size = 24, className = '', color = 'currentColor' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M3 18l4-6 4 4 4-8 6 10" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3 18h18" stroke={color} strokeWidth="1.5" />
  </svg>
);

export const UptimeIcon = ({ size = 24, className = '', color = 'currentColor' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" />
    <path d="M12 7v5l3 3" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="12" cy="12" r="1.5" fill={color} />
  </svg>
);

export const AlertIcon = ({ size = 24, className = '', color = 'currentColor' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M12 9v4M12 17h.01" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const CheckCircleIcon = ({ size = 24, className = '', color = 'currentColor' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" />
    <path d="M9 12l2 2 4-4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const CloseIcon = ({ size = 24, className = '', color = 'currentColor' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M6 6l12 12M6 18L18 6" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const InfoIcon = ({ size = 24, className = '', color = 'currentColor' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" />
    <path d="M12 11v5M12 8h.01" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const ServerlessIcon = ({ size = 24, className = '', color = 'currentColor' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M13 3L4 14h7l-1 7 9-11h-7l1-7z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

export const PipelineIcon = ({ size = 24, className = '', color = 'currentColor' }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="5" cy="12" r="2" stroke={color} strokeWidth="1.5" />
    <circle cx="12" cy="12" r="2" stroke={color} strokeWidth="1.5" />
    <circle cx="19" cy="12" r="2" stroke={color} strokeWidth="1.5" />
    <path d="M7 12h3M14 12h3" stroke={color} strokeWidth="1.5" />
    <path d="M5 10V6M12 10V6M19 10V6" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M5 14v4M12 14v4M19 14v4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export default {
  RegionIcon,
  AvailabilityZoneIcon,
  FirewallIcon,
  WAFIcon,
  GatewayIcon,
  LoadBalancerIcon,
  CDNIcon,
  CacheIcon,
  MessageQueueIcon,
  DatabaseIcon,
  StorageIcon,
  KMSIcon,
  ServiceMeshIcon,
  IAMIcon,
  AINodeIcon,
  DataLakeIcon,
  VPCIcon,
  GDPRIcon,
  CertifiedIcon,
  WarningIcon,
  SovereigntyIcon,
  EncryptionIcon,
  LogIcon,
  AWSIcon,
  AzureIcon,
  GCPIcon,
  TransferIcon,
  FailoverIcon,
  SyncIcon,
  DeleteIcon,
  LatencyIcon,
  ThroughputIcon,
  UptimeIcon,
  AlertIcon,
  CheckCircleIcon,
  CloseIcon,
  InfoIcon,
  ServerlessIcon,
  PipelineIcon
};
