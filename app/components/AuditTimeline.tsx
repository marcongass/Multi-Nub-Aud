'use client';

import { useState } from 'react';
import { 
  IAMIcon, 
  TransferIcon, 
  SyncIcon, 
  DeleteIcon, 
  FailoverIcon,
  EncryptionIcon,
  AINodeIcon,
  WarningIcon,
  CheckCircleIcon,
  CacheIcon
} from './Icons';

/**
 * TIMELINE DE AUDITORÍA
 * Registro cronológico de eventos de seguridad y cumplimiento
 */

type EventType = 
  | 'iam_access' | 'data_transfer' | 'replication' | 'cache_read' 
  | 'cache_invalidation' | 'failover' | 'ai_event' | 'secure_delete'
  | 'encryption_rotation' | 'policy_change' | 'breach_attempt' | 'sovereignty_check';

type EventSeverity = 'info' | 'success' | 'warning' | 'critical';

interface AuditEvent {
  id: string;
  timestamp: Date;
  type: EventType;
  severity: EventSeverity;
  title: string;
  description: string;
  actor?: string;
  resource?: string;
  sourceRegion?: string;
  targetRegion?: string;
  metadata?: Record<string, string | number>;
  compliance?: string[];
}

// Iconos por tipo de evento
const eventIcons: Record<EventType, React.ComponentType<{ size?: number; className?: string; color?: string }>> = {
  iam_access: IAMIcon,
  data_transfer: TransferIcon,
  replication: SyncIcon,
  cache_read: CacheIcon,
  cache_invalidation: CacheIcon,
  failover: FailoverIcon,
  ai_event: AINodeIcon,
  secure_delete: DeleteIcon,
  encryption_rotation: EncryptionIcon,
  policy_change: IAMIcon,
  breach_attempt: WarningIcon,
  sovereignty_check: CheckCircleIcon
};

const eventCategories: Record<EventType, { label: string; color: string; why: string }> = {
  iam_access: { label: 'IAM/Acceso', color: '#22D3EE', why: 'Controla quién entra y deja evidencia de autenticación.' },
  data_transfer: { label: 'Transferencia', color: '#10B981', why: 'Mover datos exige cifrado y justificación legal (RGPD Art. 44).' },
  replication: { label: 'Replicación', color: '#a855f7', why: 'Afecta soberanía y RPO/RTO; debe ser trazable.' },
  cache_read: { label: 'Caché', color: '#fbbf24', why: 'Lee datos sensibles; debe respetar expiración y controles.' },
  cache_invalidation: { label: 'Caché', color: '#fbbf24', why: 'Evita servir datos desactualizados tras cambios.' },
  failover: { label: 'Resiliencia', color: '#f59e0b', why: 'Impacta continuidad; requiere registros para auditoría.' },
  ai_event: { label: 'IA', color: '#8b5cf6', why: 'Modelos de alto riesgo deben auditarse (AI Act).' },
  secure_delete: { label: 'Borrado RGPD', color: '#22d3ee', why: 'Derecho al olvido: borrar en primario y backups.' },
  encryption_rotation: { label: 'Cripto', color: '#06b6d4', why: 'Rotar llaves prueba buen gobierno de claves.' },
  policy_change: { label: 'Políticas', color: '#06b6d4', why: 'Cambios de acceso deben quedar trazados.' },
  breach_attempt: { label: 'Seguridad', color: '#ef4444', why: 'Intento de ataque bloqueado: evidencia para forense.' },
  sovereignty_check: { label: 'Soberanía', color: '#a3e635', why: 'Confirma que datos permanecen en la jurisdicción correcta.' }
};

// Colores por severidad
const severityColors: Record<EventSeverity, { bg: string; text: string; border: string }> = {
  info: { bg: 'rgba(6, 182, 212, 0.15)', text: '#22D3EE', border: 'rgba(6, 182, 212, 0.3)' },
  success: { bg: 'rgba(16, 185, 129, 0.15)', text: '#34D399', border: 'rgba(16, 185, 129, 0.3)' },
  warning: { bg: 'rgba(245, 158, 11, 0.15)', text: '#FBBF24', border: 'rgba(245, 158, 11, 0.3)' },
  critical: { bg: 'rgba(239, 68, 68, 0.15)', text: '#F87171', border: 'rgba(239, 68, 68, 0.3)' }
};

// Datos de ejemplo - Eventos de auditoría
const sampleEvents: AuditEvent[] = [
  {
    id: 'evt-001',
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
    type: 'iam_access',
    severity: 'info',
    title: 'Autenticación IAM',
    description: 'Usuario autenticado vía SSO federado',
    actor: 'admin@company.eu',
    resource: 'AWS Console',
    sourceRegion: 'EU-West-1',
    metadata: { mfaUsed: 'true', sessionDuration: '3600' },
    compliance: ['GDPR', 'SOC2']
  },
  {
    id: 'evt-002',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    type: 'data_transfer',
    severity: 'success',
    title: 'Transferencia de Datos entre Regiones',
    description: 'Datos PII cifrados replicados al sitio de recuperación ante desastres',
    actor: 'system',
    resource: 'customer_data_backup',
    sourceRegion: 'EU-West-1',
    targetRegion: 'EU-Central-1',
    metadata: { size: '2.4GB', encrypted: 'AES-256', records: '150000' },
    compliance: ['GDPR']
  },
  {
    id: 'evt-003',
    timestamp: new Date(Date.now() - 8 * 60 * 1000),
    type: 'breach_attempt',
    severity: 'critical',
    title: 'Acceso No Autorizado Bloqueado',
    description: 'Intento de inyección SQL bloqueado por WAF',
    actor: 'unknown',
    resource: '/api/users',
    sourceRegion: 'External',
    metadata: { attackType: 'SQLi', blocked: 'true', sourceIP: '203.0.113.xxx' },
    compliance: ['PCI-DSS']
  },
  {
    id: 'evt-004',
    timestamp: new Date(Date.now() - 12 * 60 * 1000),
    type: 'ai_event',
    severity: 'info',
    title: 'Inferencia de Modelo ML',
    description: 'Modelo de detección de fraude procesó lote',
    actor: 'ml-pipeline',
    resource: 'fraud_detection_v2.3',
    sourceRegion: 'EU-West-1',
    metadata: { predictions: '5420', avgLatency: '23ms', accuracy: '99.2%' },
    compliance: ['AI-Act', 'GDPR']
  },
  {
    id: 'evt-005',
    timestamp: new Date(Date.now() - 18 * 60 * 1000),
    type: 'cache_invalidation',
    severity: 'warning',
    title: 'Invalidación de Caché Activada',
    description: 'Caché distribuida limpiada tras actualización de esquema',
    actor: 'deployment-service',
    resource: 'ElastiCache Cluster',
    sourceRegion: 'EU-West-1',
    metadata: { keysInvalidated: '28500', reason: 'schema_migration' }
  },
  {
    id: 'evt-006',
    timestamp: new Date(Date.now() - 25 * 60 * 1000),
    type: 'sovereignty_check',
    severity: 'success',
    title: 'Verificación de Residencia de Datos',
    description: 'Verificación automatizada confirmó que datos de la UE permanecen en la UE',
    actor: 'compliance-bot',
    resource: 'All EU Customer Data',
    metadata: { regionsChecked: '4', violations: '0' },
    compliance: ['GDPR', 'Schrems II']
  },
  {
    id: 'evt-007',
    timestamp: new Date(Date.now() - 35 * 60 * 1000),
    type: 'encryption_rotation',
    severity: 'success',
    title: 'Rotación de Clave KMS',
    description: 'Clave maestra de cifrado rotada exitosamente',
    actor: 'kms-service',
    resource: 'prod-master-key',
    sourceRegion: 'EU-West-1',
    metadata: { algorithm: 'AES-256-GCM', keyId: 'mrk-xxxx', policy: 'annual' },
    compliance: ['FIPS-140-2', 'SOC2']
  },
  {
    id: 'evt-008',
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
    type: 'failover',
    severity: 'warning',
    title: 'Failover de Base de Datos Iniciado',
    description: 'Failover de BD primaria a standby debido a pico de latencia',
    actor: 'rds-ha',
    resource: 'aurora-prod-cluster',
    sourceRegion: 'EU-West-1',
    targetRegion: 'EU-West-1b',
    metadata: { downtime: '12s', reason: 'latency_threshold', automated: 'true' }
  },
  {
    id: 'evt-009',
    timestamp: new Date(Date.now() - 60 * 60 * 1000),
    type: 'secure_delete',
    severity: 'success',
    title: 'Borrado de Datos RGPD',
    description: 'Datos de usuario eliminados permanentemente por solicitud RTBF',
    actor: 'gdpr-processor',
    resource: 'user_profile_12847',
    metadata: { tablesAffected: '8', backupsCleared: 'true', auditTrail: 'preserved' },
    compliance: ['GDPR Art. 17']
  },
  {
    id: 'evt-010',
    timestamp: new Date(Date.now() - 90 * 60 * 1000),
    type: 'replication',
    severity: 'info',
    title: 'Sincronización Multi-Nube Completa',
    description: 'Data lake sincronizado entre AWS y Azure',
    actor: 'sync-service',
    resource: 'analytics_dataset',
    sourceRegion: 'AWS EU-West-1',
    targetRegion: 'Azure West Europe',
    metadata: { deltaRecords: '45000', latency: '850ms', conflicts: '0' },
    compliance: ['GDPR']
  }
];

// Formatear tiempo relativo
function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  
  if (diffMins < 1) return 'Ahora mismo';
  if (diffMins < 60) return `${diffMins}m atrás`;
  
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h atrás`;
  
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d atrás`;
}

// Formatear timestamp completo
function formatTimestamp(date: Date): string {
  return date.toLocaleString('en-GB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}

export default function AuditTimeline() {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [filter, setFilter] = useState<EventSeverity | 'all'>('all');

  const filteredEvents = filter === 'all' 
    ? sampleEvents 
    : sampleEvents.filter(e => e.severity === filter);

  return (
    <div className="card-premium animate-fade-up">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-700/50">
        <div>
          <h3 className="text-lg font-semibold gradient-text">Registro de Auditoría</h3>
          <p className="text-sm text-slate-500">Eventos de seguridad y cumplimiento en tiempo real</p>
          <p className="text-xs text-slate-400 mt-1">Lectura pedagógica: icono = qué sucede • color = severidad • etiqueta = por qué importa.</p>
        </div>
        
        {/* Filtros */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">Filtro:</span>
          {(['all', 'info', 'success', 'warning', 'critical'] as const).map((sev) => (
            <button
              key={sev}
              onClick={() => setFilter(sev)}
              className={`px-3 py-1 text-xs font-medium rounded-full transition-all btn-ripple ${
                filter === sev 
                  ? sev === 'all'
                    ? 'bg-slate-700 text-white'
                    : `text-white`
                  : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50'
              }`}
              style={filter === sev && sev !== 'all' ? {
                backgroundColor: severityColors[sev].bg,
                color: severityColors[sev].text,
                borderColor: severityColors[sev].border
              } : undefined}
            >
              {sev.charAt(0).toUpperCase() + sev.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Leyenda rápida */}
      <div className="flex flex-wrap gap-2 mb-4 text-[11px] text-slate-400">
        <span className="px-2 py-1 rounded-full bg-slate-800/60 border border-slate-700/60">Rojo crítico = acción inmediata</span>
        <span className="px-2 py-1 rounded-full bg-slate-800/60 border border-slate-700/60">Ámbar = vigilar/planificar</span>
        <span className="px-2 py-1 rounded-full bg-slate-800/60 border border-slate-700/60">Verde/Azul = evidencia de cumplimiento</span>
        <span className="px-2 py-1 rounded-full bg-slate-800/60 border border-slate-700/60">Haz clic en un evento para ver la mini-lección</span>
      </div>

      {/* Timeline */}
      <div className="space-y-0 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
        {filteredEvents.map((event, index) => {
          const IconComponent = eventIcons[event.type];
          const colors = severityColors[event.severity];
          const category = eventCategories[event.type];
          const isExpanded = selectedEvent === event.id;
          
          return (
            <div 
              key={event.id}
              className={`timeline-event animate-stagger`}
              style={{ 
                animationDelay: `${index * 50}ms`,
                borderLeftColor: colors.text
              }}
            >
              {/* Indicador del evento */}
              <div 
                className="absolute -left-[7px] top-0 w-3 h-3 rounded-full border-2 border-slate-900"
                style={{ backgroundColor: colors.text }}
              />
              
              {/* Contenido del evento */}
              <div 
                className={`
                  p-3 rounded-lg cursor-pointer transition-all duration-200
                  hover:bg-slate-800/50
                  ${isExpanded ? 'bg-slate-800/50' : ''}
                `}
                onClick={() => setSelectedEvent(isExpanded ? null : event.id)}
              >
                {/* Header del evento */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div 
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: colors.bg }}
                    >
                      <IconComponent size={16} color={colors.text} />
                    </div>
                    
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-white text-sm">{event.title}</span>
                        <span 
                          className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase"
                          style={{ 
                            backgroundColor: colors.bg,
                            color: colors.text,
                            border: `1px solid ${colors.border}`
                          }}
                        >
                          {event.severity}
                        </span>
                        {event.compliance?.map(c => (
                          <span 
                            key={c}
                            className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-blue-900/30 text-blue-400"
                          >
                            {c}
                          </span>
                        ))}
                          {category && (
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold" style={{ backgroundColor: `${category.color}15`, color: category.color }}>
                              {category.label}
                            </span>
                          )}
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">{event.description}</p>
                      {category && (
                        <p className="text-[11px] text-emerald-200 mt-1">¿Qué significa? {category.why}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-right flex-shrink-0">
                    <span className="text-xs text-slate-500">{formatRelativeTime(event.timestamp)}</span>
                  </div>
                </div>

                {/* Detalles expandidos */}
                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-slate-700/50 space-y-3 animate-fade-up">
                    {/* Info básica */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                      {event.actor && (
                        <div>
                          <span className="text-slate-500">Actor:</span>
                          <p className="text-slate-200 font-mono">{event.actor}</p>
                        </div>
                      )}
                      {event.resource && (
                        <div>
                          <span className="text-slate-500">Recurso:</span>
                          <p className="text-slate-200 font-mono truncate" title={event.resource}>{event.resource}</p>
                        </div>
                      )}
                      {event.sourceRegion && (
                        <div>
                          <span className="text-slate-500">Origen:</span>
                          <p className="text-slate-200">{event.sourceRegion}</p>
                        </div>
                      )}
                      {event.targetRegion && (
                        <div>
                          <span className="text-slate-500">Destino:</span>
                          <p className="text-slate-200">{event.targetRegion}</p>
                        </div>
                      )}
                    </div>

                    {/* Metadata */}
                    {event.metadata && (
                      <div className="p-2 bg-slate-900/50 rounded-lg">
                        <div className="flex flex-wrap gap-3">
                          {Object.entries(event.metadata).map(([key, value]) => (
                            <div key={key} className="text-xs">
                              <span className="text-slate-500">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                              <span className="ml-1 text-cyan-400 font-mono">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Timestamp completo */}
                    <div className="text-xs text-slate-500">
                      Marca de tiempo completa: <span className="font-mono text-slate-400">{formatTimestamp(event.timestamp)}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer con estadísticas */}
      <div className="mt-4 pt-4 border-t border-slate-700/50 flex items-center justify-between text-xs text-slate-500">
        <span>Mostrando {filteredEvents.length} de {sampleEvents.length} eventos</span>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            {sampleEvents.filter(e => e.severity === 'critical').length} críticos
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            {sampleEvents.filter(e => e.severity === 'warning').length} advertencias
          </span>
        </div>
      </div>
    </div>
  );
}
