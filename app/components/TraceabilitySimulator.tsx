'use client';

import { useEffect, useMemo, useState } from 'react';
import { 
  RegionIcon, 
  AvailabilityZoneIcon, 
  FirewallIcon, 
  GatewayIcon,
  LoadBalancerIcon,
  CDNIcon,
  CacheIcon,
  DatabaseIcon,
  StorageIcon,
  KMSIcon,
  ServiceMeshIcon,
  IAMIcon,
  AINodeIcon,
  DataLakeIcon,
  MessageQueueIcon,
  WAFIcon,
  ServerlessIcon
} from './Icons';

/**
 * SIMULADOR DE TRAZABILIDAD MULTI-CLOUD
 * Visualización interactiva de arquitectura cloud con flujo de datos animado
 */

// Tipos de nodos de infraestructura
type NodeType = 
  | 'region' | 'az' | 'firewall' | 'waf' | 'gateway' | 'loadbalancer' 
  | 'cdn' | 'cache' | 'queue' | 'database' | 'storage' | 'kms' 
  | 'mesh' | 'iam' | 'ai' | 'datalake' | 'serverless';

interface InfraNode {
  id: string;
  type: NodeType;
  label: string;
  provider: 'aws' | 'azure' | 'gcp' | 'onprem';
  region: string;
  az?: string;
  x: number;
  y: number;
  status: 'healthy' | 'warning' | 'critical' | 'degraded';
  latency?: number;
  compliance: string[];
  connections: string[];
  metrics?: {
    cpu?: number;
    memory?: number;
    requests?: number;
    errors?: number;
  };
}

interface DataFlow {
  id: string;
  from: string;
  to: string;
  status: 'active' | 'encrypted' | 'blocked' | 'slow';
  dataType: 'pii' | 'public' | 'confidential' | 'logs';
  latency: number;
  throughput: number;
}

type FlowFilter = 'all' | 'pii' | 'confidential' | 'issues';

interface Anomaly {
  flowId: string;
  severity: 'info' | 'warning' | 'critical';
  reason: string;
}

// Iconos por tipo de nodo
const nodeIcons: Record<NodeType, React.ComponentType<{ size?: number; className?: string; color?: string }>> = {
  region: RegionIcon,
  az: AvailabilityZoneIcon,
  firewall: FirewallIcon,
  waf: WAFIcon,
  gateway: GatewayIcon,
  loadbalancer: LoadBalancerIcon,
  cdn: CDNIcon,
  cache: CacheIcon,
  queue: MessageQueueIcon,
  database: DatabaseIcon,
  storage: StorageIcon,
  kms: KMSIcon,
  mesh: ServiceMeshIcon,
  iam: IAMIcon,
  ai: AINodeIcon,
  datalake: DataLakeIcon,
  serverless: ServerlessIcon
};

// Colores por proveedor
const providerColors = {
  aws: '#FF9900',
  azure: '#0089D6',
  gcp: '#4285F4',
  onprem: '#6B7280'
};

// Colores por estado
const statusColors = {
  healthy: '#10B981',
  warning: '#F59E0B',
  critical: '#EF4444',
  degraded: '#8B5CF6'
};

// Datos de ejemplo - Arquitectura multi-cloud compleja
const sampleNodes: InfraNode[] = [
  // AWS Region EU
  { id: 'aws-eu-region', type: 'region', label: 'EU-West-1', provider: 'aws', region: 'eu-west-1', x: 50, y: 80, status: 'healthy', compliance: ['GDPR', 'SOC2'], connections: ['aws-eu-az1', 'aws-eu-az2'] },
  { id: 'aws-eu-az1', type: 'az', label: 'AZ-1a', provider: 'aws', region: 'eu-west-1', az: 'eu-west-1a', x: 120, y: 50, status: 'healthy', latency: 2, compliance: ['GDPR'], connections: ['aws-eu-fw', 'aws-eu-lb'] },
  { id: 'aws-eu-az2', type: 'az', label: 'AZ-1b', provider: 'aws', region: 'eu-west-1', az: 'eu-west-1b', x: 120, y: 110, status: 'healthy', latency: 3, compliance: ['GDPR'], connections: ['aws-eu-db-replica'] },
  { id: 'aws-eu-fw', type: 'firewall', label: 'WAF/Shield', provider: 'aws', region: 'eu-west-1', x: 190, y: 50, status: 'healthy', compliance: ['GDPR', 'PCI-DSS'], connections: ['aws-eu-gw'] },
  { id: 'aws-eu-gw', type: 'gateway', label: 'API Gateway', provider: 'aws', region: 'eu-west-1', x: 260, y: 50, status: 'healthy', latency: 5, compliance: ['GDPR'], connections: ['aws-eu-lb'] },
  { id: 'aws-eu-lb', type: 'loadbalancer', label: 'ALB', provider: 'aws', region: 'eu-west-1', x: 330, y: 80, status: 'healthy', latency: 1, compliance: ['GDPR'], connections: ['aws-eu-cache', 'aws-eu-svc'] },
  { id: 'aws-eu-cache', type: 'cache', label: 'ElastiCache', provider: 'aws', region: 'eu-west-1', x: 400, y: 40, status: 'healthy', latency: 0.5, compliance: ['GDPR'], connections: ['aws-eu-db'] },
  { id: 'aws-eu-svc', type: 'mesh', label: 'App Mesh', provider: 'aws', region: 'eu-west-1', x: 400, y: 100, status: 'healthy', compliance: ['GDPR'], connections: ['aws-eu-queue', 'aws-eu-ai'] },
  { id: 'aws-eu-queue', type: 'queue', label: 'SQS/SNS', provider: 'aws', region: 'eu-west-1', x: 470, y: 60, status: 'healthy', compliance: ['GDPR'], connections: ['aws-eu-lambda'] },
  { id: 'aws-eu-lambda', type: 'serverless', label: 'Lambda', provider: 'aws', region: 'eu-west-1', x: 540, y: 60, status: 'healthy', compliance: ['GDPR'], connections: ['aws-eu-db'] },
  { id: 'aws-eu-ai', type: 'ai', label: 'SageMaker', provider: 'aws', region: 'eu-west-1', x: 470, y: 120, status: 'warning', compliance: ['AI-Act', 'GDPR'], connections: ['aws-eu-datalake'] },
  { id: 'aws-eu-db', type: 'database', label: 'Aurora', provider: 'aws', region: 'eu-west-1', x: 540, y: 100, status: 'healthy', latency: 3, compliance: ['GDPR', 'SOC2'], connections: ['aws-eu-kms', 'aws-eu-db-replica'] },
  { id: 'aws-eu-db-replica', type: 'database', label: 'Aurora Read', provider: 'aws', region: 'eu-west-1', x: 610, y: 130, status: 'healthy', latency: 1, compliance: ['GDPR'], connections: [] },
  { id: 'aws-eu-kms', type: 'kms', label: 'KMS', provider: 'aws', region: 'eu-west-1', x: 610, y: 70, status: 'healthy', compliance: ['GDPR', 'FIPS'], connections: [] },
  { id: 'aws-eu-datalake', type: 'datalake', label: 'S3 Data Lake', provider: 'aws', region: 'eu-west-1', x: 540, y: 160, status: 'healthy', compliance: ['GDPR'], connections: ['azure-eu-sync'] },
  { id: 'aws-eu-iam', type: 'iam', label: 'IAM/SSO', provider: 'aws', region: 'eu-west-1', x: 50, y: 160, status: 'healthy', compliance: ['GDPR', 'SOC2'], connections: ['aws-eu-region'] },
  
  // Azure Region EU
  { id: 'azure-eu-region', type: 'region', label: 'West Europe', provider: 'azure', region: 'westeurope', x: 50, y: 280, status: 'healthy', compliance: ['GDPR', 'ISO27001'], connections: ['azure-eu-az1'] },
  { id: 'azure-eu-az1', type: 'az', label: 'Zone-1', provider: 'azure', region: 'westeurope', x: 120, y: 280, status: 'healthy', latency: 2, compliance: ['GDPR'], connections: ['azure-eu-fw'] },
  { id: 'azure-eu-fw', type: 'firewall', label: 'Azure FW', provider: 'azure', region: 'westeurope', x: 190, y: 280, status: 'healthy', compliance: ['GDPR'], connections: ['azure-eu-gw'] },
  { id: 'azure-eu-gw', type: 'gateway', label: 'App Gateway', provider: 'azure', region: 'westeurope', x: 260, y: 280, status: 'degraded', latency: 12, compliance: ['GDPR'], connections: ['azure-eu-aks'] },
  { id: 'azure-eu-aks', type: 'mesh', label: 'AKS + Istio', provider: 'azure', region: 'westeurope', x: 330, y: 280, status: 'healthy', compliance: ['GDPR'], connections: ['azure-eu-cosmos', 'azure-eu-ai'] },
  { id: 'azure-eu-cosmos', type: 'database', label: 'Cosmos DB', provider: 'azure', region: 'westeurope', x: 400, y: 250, status: 'healthy', latency: 4, compliance: ['GDPR'], connections: ['azure-eu-kv'] },
  { id: 'azure-eu-ai', type: 'ai', label: 'Azure AI', provider: 'azure', region: 'westeurope', x: 400, y: 310, status: 'healthy', compliance: ['AI-Act', 'GDPR'], connections: ['azure-eu-storage'] },
  { id: 'azure-eu-kv', type: 'kms', label: 'Key Vault', provider: 'azure', region: 'westeurope', x: 470, y: 250, status: 'healthy', compliance: ['GDPR', 'FIPS'], connections: [] },
  { id: 'azure-eu-storage', type: 'storage', label: 'Blob Storage', provider: 'azure', region: 'westeurope', x: 470, y: 310, status: 'healthy', compliance: ['GDPR'], connections: [] },
  { id: 'azure-eu-sync', type: 'cdn', label: 'Cross-Cloud Sync', provider: 'azure', region: 'westeurope', x: 540, y: 220, status: 'healthy', latency: 25, compliance: ['GDPR'], connections: ['gcp-us-gw'] },

  // GCP Region US (conexión multi-cloud con restricciones)
  { id: 'gcp-us-region', type: 'region', label: 'US-Central1', provider: 'gcp', region: 'us-central1', x: 50, y: 400, status: 'warning', compliance: ['SOC2', 'HIPAA'], connections: ['gcp-us-az1'] },
  { id: 'gcp-us-az1', type: 'az', label: 'Zone-A', provider: 'gcp', region: 'us-central1', x: 120, y: 400, status: 'warning', latency: 85, compliance: [], connections: ['gcp-us-fw'] },
  { id: 'gcp-us-fw', type: 'waf', label: 'Cloud Armor', provider: 'gcp', region: 'us-central1', x: 190, y: 400, status: 'healthy', compliance: [], connections: ['gcp-us-gw'] },
  { id: 'gcp-us-gw', type: 'gateway', label: 'Cloud Run', provider: 'gcp', region: 'us-central1', x: 260, y: 400, status: 'critical', latency: 150, compliance: [], connections: ['gcp-us-bq'] },
  { id: 'gcp-us-bq', type: 'datalake', label: 'BigQuery', provider: 'gcp', region: 'us-central1', x: 330, y: 400, status: 'healthy', compliance: ['SOC2'], connections: ['gcp-us-ai'] },
  { id: 'gcp-us-ai', type: 'ai', label: 'Vertex AI', provider: 'gcp', region: 'us-central1', x: 400, y: 400, status: 'healthy', compliance: ['AI-Act'], connections: [] }
];

const sampleFlows: DataFlow[] = [
  { id: 'flow-1', from: 'aws-eu-gw', to: 'aws-eu-lb', status: 'encrypted', dataType: 'pii', latency: 2, throughput: 1500 },
  { id: 'flow-2', from: 'aws-eu-lb', to: 'aws-eu-cache', status: 'active', dataType: 'public', latency: 0.5, throughput: 5000 },
  { id: 'flow-3', from: 'aws-eu-svc', to: 'aws-eu-db', status: 'encrypted', dataType: 'confidential', latency: 3, throughput: 800 },
  { id: 'flow-4', from: 'aws-eu-datalake', to: 'azure-eu-sync', status: 'encrypted', dataType: 'pii', latency: 45, throughput: 200 },
  { id: 'flow-5', from: 'azure-eu-sync', to: 'gcp-us-gw', status: 'blocked', dataType: 'pii', latency: 0, throughput: 0 },
  { id: 'flow-6', from: 'aws-eu-ai', to: 'aws-eu-datalake', status: 'active', dataType: 'logs', latency: 5, throughput: 300 },
  { id: 'flow-7', from: 'azure-eu-aks', to: 'azure-eu-cosmos', status: 'active', dataType: 'confidential', latency: 4, throughput: 1200 }
];

interface TooltipData {
  node: InfraNode;
  x: number;
  y: number;
}

export default function TraceabilitySimulator() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const [activeFlows, setActiveFlows] = useState<Set<string>>(new Set());
  const [simulationState, setSimulationState] = useState<'running' | 'paused' | 'failover'>('running');
  const [flowFilter, setFlowFilter] = useState<FlowFilter>('all');
  const [learningMode, setLearningMode] = useState(true);
  const [flowMetrics, setFlowMetrics] = useState<Record<string, { latency: number; throughput: number }>>(() => (
    sampleFlows.reduce((acc, flow) => {
      acc[flow.id] = { latency: flow.latency, throughput: flow.throughput };
      return acc;
    }, {} as Record<string, { latency: number; throughput: number }>)
  ));
  const [anomalies, setAnomalies] = useState<Anomaly[]>([]);

  // Simulación de flujo de datos
  useEffect(() => {
    if (simulationState !== 'running') return;
    
    const interval = setInterval(() => {
      setActiveFlows(prev => {
        const newFlows = new Set<string>();
        sampleFlows.forEach(flow => {
          if (flow.status !== 'blocked' && Math.random() > 0.3) {
            newFlows.add(flow.id);
          }
        });
        return newFlows;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [simulationState]);

  // Pequeñas variaciones para simular telemetría en vivo
  useEffect(() => {
    if (simulationState === 'paused') return;
    const interval = setInterval(() => {
      setFlowMetrics(prev => {
        const next = { ...prev };
        sampleFlows.forEach(flow => {
          const current = next[flow.id];
          const jitter = (Math.random() - 0.5) * 6;
          const throughputJitter = (Math.random() - 0.5) * 120;
          const latency = Math.max(0, (current?.latency ?? flow.latency) + jitter);
          const throughput = Math.max(0, (current?.throughput ?? flow.throughput) + throughputJitter);
          next[flow.id] = { latency, throughput };
        });
        return next;
      });
    }, 1700);

    return () => clearInterval(interval);
  }, [simulationState]);

  const handleNodeHover = (node: InfraNode, event: React.MouseEvent) => {
    setHoveredNode(node.id);
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    setTooltip({
      node,
      x: rect.left + rect.width / 2,
      y: rect.top - 10
    });
  };

  const handleNodeLeave = () => {
    setHoveredNode(null);
    setTooltip(null);
  };

  const getNodePosition = (nodeId: string) => {
    const node = sampleNodes.find(n => n.id === nodeId);
    return node ? { x: node.x, y: node.y } : { x: 0, y: 0 };
  };

  const getNodeById = (nodeId: string) => sampleNodes.find(n => n.id === nodeId);

  const flowMatchesFilter = (flow?: DataFlow) => {
    if (!flow) return true;
    if (flowFilter === 'all') return true;
    if (flowFilter === 'pii') return flow.dataType === 'pii';
    if (flowFilter === 'confidential') return flow.dataType === 'confidential';
    return flow.status === 'blocked' || flow.latency > 60 || flow.status === 'slow';
  };

  const flowHasComplianceGap = (flow: DataFlow) => {
    if (flow.dataType !== 'pii' && flow.dataType !== 'confidential') return false;
    if (flow.dataType === 'pii' && flow.status !== 'encrypted') return true;
    const target = getNodeById(flow.to);
    return !(target && target.compliance.includes('GDPR'));
  };

  useEffect(() => {
    const next: Anomaly[] = [];
    sampleFlows.forEach(flow => {
      const metrics = flowMetrics[flow.id] || { latency: flow.latency, throughput: flow.throughput };
      if (flow.status === 'blocked') {
        next.push({ flowId: flow.id, severity: 'critical', reason: 'Flujo bloqueado por política' });
      }
      if (metrics.latency > 80) {
        next.push({ flowId: flow.id, severity: 'warning', reason: `Latencia alta: ${metrics.latency.toFixed(0)}ms` });
      }
      if (flowHasComplianceGap(flow)) {
        next.push({ flowId: flow.id, severity: 'critical', reason: 'Violación GDPR/Soberanía: PII sin cifrar o destino no autorizado' });
      }
    });
    setAnomalies(next);
  }, [flowMetrics]);

  const { issues, piiFlows, sensitiveFlows, encryptedSensitive, gdprCovered } = useMemo(() => {
    const filteredIssues = sampleFlows.filter(f => f.status === 'blocked' || f.latency > 60);
    const pii = sampleFlows.filter(f => f.dataType === 'pii');
    const sensitive = sampleFlows.filter(f => f.dataType === 'pii' || f.dataType === 'confidential');
    const encrypted = sensitive.filter(f => f.status === 'encrypted');
    const gdpr = pii.filter(f => getNodeById(f.to)?.compliance.includes('GDPR'));
    return { issues: filteredIssues, piiFlows: pii, sensitiveFlows: sensitive, encryptedSensitive: encrypted, gdprCovered: gdpr };
  }, []);

  const storyline = [
    {
      title: 'Entrada segura',
      detail: 'WAF → Gateway → Balanceador mantienen el tráfico controlado en EU con GDPR.',
    },
    {
      title: 'Procesamiento y datos',
      detail: 'Servicios cifran PII antes de cachear o persistir en base de datos y lago.',
    },
    {
      title: 'Cruce de nubes',
      detail: 'AWS sincroniza con Azure; GCP queda bloqueado para datos sensibles.',
    }
  ];

  return (
    <div className="relative w-full bg-slate-900/50 rounded-2xl border border-slate-700/50 overflow-hidden">
      {/* Header del simulador */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between p-4 border-b border-slate-700/50">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${simulationState === 'running' ? 'bg-emerald-400 animate-pulse' : simulationState === 'failover' ? 'bg-red-400 animate-pulse' : 'bg-slate-400'}`} />
            <span className="text-sm font-medium text-slate-300">
              {simulationState === 'running' ? 'Vista en vivo' : simulationState === 'failover' ? 'Failover simulado' : 'Pausado'}
            </span>
          </div>
          <div className="h-4 w-px bg-slate-700" />
          <span className="text-xs text-slate-400">Mapa rápido de flujo multi-nube</span>
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto justify-end md:justify-start">
          <button 
            onClick={() => setSimulationState(s => s === 'running' ? 'paused' : 'running')}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors btn-ripple"
          >
            {simulationState === 'running' ? 'Pausar' : 'Reanudar'}
          </button>
          <button 
            onClick={() => setSimulationState('failover')}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-amber-900/30 hover:bg-amber-900/50 text-amber-400 border border-amber-700/50 transition-colors btn-ripple"
          >
            Simular Failover
          </button>
          <button
            onClick={() => setLearningMode((prev) => !prev)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors btn-ripple ${learningMode ? 'bg-emerald-900/40 text-emerald-200 border-emerald-700/60' : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'}`}
            title="Modo Aprendizaje agrega explicaciones y resaltados"
          >
            {learningMode ? 'Aprendizaje ON' : 'Aprendizaje OFF'}
          </button>
        </div>
      </div>

      {/* Resumen para entender el flujo en segundos */}
      <div className="grid gap-3 md:grid-cols-3 px-4 pb-4 border-b border-slate-700/30 bg-slate-900/30">
        {storyline.map(item => (
          <div key={item.title} className="p-3 rounded-xl bg-slate-900 border border-slate-700/50 shadow-sm">
            <p className="text-[11px] uppercase tracking-wide text-slate-500 font-semibold">{item.title}</p>
            <p className="text-sm text-slate-200 leading-relaxed">{item.detail}</p>
          </div>
        ))}
      </div>

      {/* Pasos secuenciales del flujo */}
      <div className="px-4 pb-4 border-b border-slate-700/30 bg-slate-900/40">
        <div className="flex flex-wrap gap-3">
          {[
            { step: '1. Entrada', detail: 'Petición pasa por WAF/Firewall' },
            { step: '2. Procesamiento', detail: 'Servicios aplican IAM + cifrado' },
            { step: '3. Replicación', detail: 'Se copia entre nubes con políticas de soberanía' },
            { step: '4. Evidencia', detail: 'Se registra en logs inmutables' }
          ].map((item, idx) => (
            <div
              key={item.step}
              className="flex-1 min-w-[160px] p-3 rounded-lg border border-slate-700/60 bg-slate-900/70"
              style={{ boxShadow: idx === 2 && learningMode ? '0 0 0 1px rgba(124, 58, 237, 0.3)' : undefined }}
            >
              <p className="text-xs font-semibold text-emerald-300">{item.step}</p>
              <p className="text-sm text-slate-300">{item.detail}</p>
            </div>
          ))}
        </div>
        {learningMode && (
          <p className="text-[11px] text-emerald-200 mt-2">Modo Aprendizaje: los pasos muestran cómo se respalda la trazabilidad para auditoría.</p>
        )}
      </div>

      {/* Panel compacto de monitoreo */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 px-4 pb-4 border-b border-slate-700/30 bg-slate-900/40">
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-700/50">
          <p className="text-[11px] uppercase tracking-wide text-slate-500 font-semibold">Flujos activos</p>
          <p className="text-2xl font-bold text-emerald-300">{activeFlows.size}</p>
          <p className="text-xs text-slate-500">Brillan en el diagrama</p>
        </div>
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-700/50">
          <p className="text-[11px] uppercase tracking-wide text-slate-500 font-semibold">Cifrado en sensibles</p>
          <p className="text-2xl font-bold text-cyan-300">{sensitiveFlows.length ? Math.round((encryptedSensitive.length / sensitiveFlows.length) * 100) : 100}%</p>
          <p className="text-xs text-slate-500">PII + confidencial</p>
        </div>
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-700/50">
          <p className="text-[11px] uppercase tracking-wide text-slate-500 font-semibold">GDPR destino</p>
          <p className="text-2xl font-bold text-indigo-200">{piiFlows.length ? Math.round((gdprCovered.length / piiFlows.length) * 100) : 100}%</p>
          <p className="text-xs text-slate-500">PII va a nodos compliant</p>
        </div>
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-700/50">
          <p className="text-[11px] uppercase tracking-wide text-slate-500 font-semibold">Riesgos visibles</p>
          <p className={`text-2xl font-bold ${issues.length ? 'text-amber-300' : 'text-emerald-300'}`}>{issues.length || 0}</p>
          <p className="text-xs text-slate-500">Latencia alta o bloqueos</p>
        </div>
      </div>

      {/* Leyenda y filtros en una sola fila para lectura rápida */}
      <div className="flex flex-col gap-3 px-4 py-3 border-b border-slate-700/30 bg-slate-900/35">
        <div className="flex flex-wrap items-center gap-4">
          {Object.entries(providerColors).map(([provider, color]) => (
            <div key={provider} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: color }} />
              <span className="text-xs text-slate-400 uppercase">{provider}</span>
            </div>
          ))}
          <div className="h-4 w-px bg-slate-700" />
          {Object.entries(statusColors).map(([status, color]) => (
            <div key={status} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-xs text-slate-500 capitalize">{status}</span>
            </div>
          ))}
          <div className="h-4 w-px bg-slate-700" />
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-400" />
            <span className="text-xs text-slate-400">Violación GDPR/Soberanía</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {([
            { key: 'all', label: 'Todo' },
            { key: 'pii', label: 'PII cifrado' },
            { key: 'confidential', label: 'Confidencial' },
            { key: 'issues', label: 'Riesgos' }
          ] as { key: FlowFilter; label: string }[]).map(option => (
            <button
              key={option.key}
              onClick={() => setFlowFilter(option.key)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors btn-ripple ${
                flowFilter === option.key
                  ? 'bg-emerald-900/30 border-emerald-600 text-emerald-200'
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {option.label}
            </button>
          ))}
          <span className="text-[11px] text-slate-500">El brillo marca los flujos activos.</span>
        </div>
      </div>

      {/* Lista rápida de anomalías y cumplimiento */}
      <div className="px-4 py-3 border-b border-slate-700/30 bg-slate-900/30 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-slate-200">Anomalías</span>
          <span className={`text-[11px] px-2 py-1 rounded-full border ${anomalies.length ? 'border-amber-500 text-amber-300' : 'border-emerald-500 text-emerald-300'}`}>
            {anomalies.length ? `${anomalies.length} activas` : 'Sin anomalías'}
          </span>
        </div>
        <p className="text-[11px] text-slate-500">Lectura: rojo = bloqueo o violación de soberanía; ámbar = latencia o política pendiente.</p>
        {anomalies.length === 0 ? (
          <p className="text-xs text-slate-500">Todo estable y compliant.</p>
        ) : (
          <ul className="text-xs text-slate-300 space-y-1">
            {anomalies.slice(0, 4).map(anomaly => (
              <li key={anomaly.flowId + anomaly.reason} className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${anomaly.severity === 'critical' ? 'bg-red-400' : 'bg-amber-300'}`} />
                <span>{anomaly.reason}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Canvas del diagrama */}
      <div className="px-4 pb-4">
        <div className="overflow-x-auto overflow-y-hidden">
          <div className="relative min-w-[700px] h-[420px] sm:h-[500px]">
            <svg 
              className="absolute inset-0 pointer-events-none" 
              width="700" 
              height="480"
              viewBox="0 0 700 480"
            >
              <defs>
                {/* Gradientes para líneas */}
                <linearGradient id="gradient-line-active" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#06B6D4" stopOpacity="1" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0.8" />
                </linearGradient>
                <linearGradient id="gradient-line-encrypted" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#A855F7" stopOpacity="0.8" />
                </linearGradient>
                <linearGradient id="gradient-line-blocked" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#EF4444" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#DC2626" stopOpacity="0.6" />
                </linearGradient>
                
                {/* Filtro de glow */}
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>

                {/* Marker para flechas */}
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#10B981" />
                </marker>
              </defs>

              {/* Regiones de fondo */}
              <rect x="30" y="25" width="620" height="155" rx="12" fill="rgba(255, 153, 0, 0.05)" stroke="rgba(255, 153, 0, 0.2)" strokeWidth="1" strokeDasharray="4 2" />
              <text x="45" y="45" fill="#FF9900" fontSize="11" fontWeight="600" opacity="0.7">AWS EU-WEST-1</text>
              
              <rect x="30" y="220" width="500" height="120" rx="12" fill="rgba(0, 137, 214, 0.05)" stroke="rgba(0, 137, 214, 0.2)" strokeWidth="1" strokeDasharray="4 2" />
              <text x="45" y="240" fill="#0089D6" fontSize="11" fontWeight="600" opacity="0.7">AZURE WEST EUROPE</text>
              
              <rect x="30" y="370" width="430" height="90" rx="12" fill="rgba(66, 133, 244, 0.05)" stroke="rgba(66, 133, 244, 0.2)" strokeWidth="1" strokeDasharray="4 2" />
              <text x="45" y="390" fill="#4285F4" fontSize="11" fontWeight="600" opacity="0.7">GCP US-CENTRAL1 (Restricted)</text>

              {/* Líneas de conexión entre nodos */}
              {sampleNodes.map(node => 
                node.connections.map(targetId => {
                  const target = getNodePosition(targetId);
                  const flow = sampleFlows.find(
                    f => (f.from === node.id && f.to === targetId) || (f.to === node.id && f.from === targetId)
                  );
                  const matchesFilter = flowMatchesFilter(flow);
                  const flowAnomaly = anomalies.find(a => a.flowId === flow?.id);
                  const violation = flow ? flowHasComplianceGap(flow) : false;
                  const anomalyColor = flowAnomaly?.severity === 'critical' ? '#EF4444' : '#F97316';
                  
                  return (
                    <g key={`${node.id}-${targetId}`}>
                      <line
                        x1={node.x + 30}
                        y1={node.y + 20}
                        x2={target.x + 30}
                        y2={target.y + 20}
                        stroke={violation ? '#EF4444' : flow?.status === 'blocked' ? '#EF4444' : flowAnomaly ? anomalyColor : flow?.status === 'encrypted' ? '#8B5CF6' : '#10B981'}
                        strokeWidth={activeFlows.has(flow?.id || '') ? 2.5 : 1.5}
                        strokeOpacity={matchesFilter ? (activeFlows.has(flow?.id || '') ? 0.85 : 0.35) : 0.08}
                        strokeDasharray={flow?.status === 'blocked' || violation ? '8 4' : flow?.status === 'encrypted' ? '4 2' : 'none'}
                        filter={activeFlows.has(flow?.id || '') && matchesFilter ? 'url(#glow)' : 'none'}
                        className="transition-all duration-300"
                      />
                      {/* Partícula de datos animada */}
                      {activeFlows.has(flow?.id || '') && flow?.status !== 'blocked' && matchesFilter && (
                        <circle r="3" fill={flow?.status === 'encrypted' ? '#A855F7' : '#22D3EE'}>
                          <animateMotion
                            dur="1.5s"
                            repeatCount="indefinite"
                            path={`M${node.x + 30},${node.y + 20} L${target.x + 30},${target.y + 20}`}
                          />
                        </circle>
                      )}
                      {flowAnomaly && matchesFilter && (
                        <circle
                          cx={(node.x + target.x) / 2 + 30}
                          cy={(node.y + target.y) / 2 + 20}
                          r="6"
                          fill={anomalyColor}
                          fillOpacity="0.15"
                          stroke={anomalyColor}
                          strokeWidth="1.5"
                          className="animate-ping"
                        />
                      )}
                    </g>
                  );
                })
              )}
            </svg>

            {/* Nodos de infraestructura */}
            {sampleNodes.map((node, index) => {
              const IconComponent = nodeIcons[node.type];
              const isSelected = selectedNode === node.id;
              const isHovered = hoveredNode === node.id;
              
              return (
                <div
                  key={node.id}
                  className={`absolute cursor-pointer transition-all duration-300 tooltip-trigger ${isSelected ? 'z-20' : 'z-10'}`}
                  style={{ 
                    left: node.x, 
                    top: node.y,
                    animationDelay: `${index * 50}ms`
                  }}
                  onClick={() => setSelectedNode(isSelected ? null : node.id)}
                  onMouseEnter={(e) => handleNodeHover(node, e)}
                  onMouseLeave={handleNodeLeave}
                >
                  <div 
                    className={`
                      relative p-3 rounded-xl transition-all duration-300
                      ${isSelected ? 'scale-110' : isHovered ? 'scale-105' : 'scale-100'}
                      ${node.status === 'critical' ? 'neon-glow' : ''}
                    `}
                    style={{
                      background: 'rgba(15, 23, 42, 0.9)',
                      border: `2px solid ${isSelected ? statusColors[node.status] : providerColors[node.provider]}`,
                      boxShadow: isSelected || isHovered 
                        ? `0 0 20px ${statusColors[node.status]}40, 0 4px 20px rgba(0,0,0,0.4)` 
                        : '0 2px 10px rgba(0,0,0,0.3)'
                    }}
                  >
                    {/* Pulse ring para nodos críticos */}
                    {(node.status === 'critical' || node.status === 'warning') && (
                      <div 
                        className="pulse-ring"
                        style={{ 
                          borderColor: statusColors[node.status],
                          borderRadius: '12px'
                        }} 
                      />
                    )}
                    
                    {/* Icono */}
                    <IconComponent 
                      size={24} 
                      color={statusColors[node.status]} 
                    />
                    
                    {/* Indicador de estado */}
                    <div 
                      className="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-slate-900"
                      style={{ backgroundColor: statusColors[node.status] }}
                    />
                    
                    {/* Badge de compliance */}
                    {node.compliance.includes('GDPR') && (
                      <div className="absolute -bottom-1 -left-1 px-1 py-0.5 text-[8px] font-bold bg-blue-600 text-white rounded">
                        GDPR
                      </div>
                    )}
                    {node.compliance.includes('AI-Act') && (
                      <div className="absolute -bottom-1 -right-1 px-1 py-0.5 text-[8px] font-bold bg-purple-600 text-white rounded">
                        AI
                      </div>
                    )}
                  </div>
                  
                  {/* Label del nodo */}
                  <div className="mt-1 text-center">
                    <span className="text-[10px] font-medium text-slate-300 block truncate max-w-[60px]">
                      {node.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tooltip técnico */}
      {tooltip && (
        <div 
          className="fixed z-50 p-3 bg-slate-800/95 backdrop-blur-sm border border-slate-600 rounded-lg shadow-xl max-w-xs pointer-events-none"
          style={{
            left: Math.min(tooltip.x, window.innerWidth - 280),
            top: tooltip.y - 120,
            transform: 'translateX(-50%)'
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <div 
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: statusColors[tooltip.node.status] }}
            />
            <span className="font-semibold text-white">{tooltip.node.label}</span>
            <span className="text-xs px-1.5 py-0.5 rounded bg-slate-700 text-slate-400 uppercase">
              {tooltip.node.type}
            </span>
          </div>
          
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Proveedor:</span>
              <span className="text-slate-200 uppercase">{tooltip.node.provider}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Región:</span>
              <span className="text-slate-200">{tooltip.node.region}</span>
            </div>
            {tooltip.node.latency !== undefined && (
              <div className="flex justify-between">
                <span className="text-slate-400">Latencia:</span>
                <span className={`${tooltip.node.latency > 50 ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {tooltip.node.latency}ms
                </span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-slate-400">Cumplimiento:</span>
              <span className="text-slate-200">{tooltip.node.compliance.join(', ') || 'Ninguno'}</span>
            </div>
            {learningMode && (
              <p className="text-[11px] text-emerald-200 leading-relaxed">
                ¿Por qué importa? Este nodo debe mantener PII dentro de su jurisdicción y registrar cada salto para auditoría.
              </p>
            )}
          </div>
          
          {/* Flecha del tooltip */}
          <div 
            className="absolute left-1/2 -bottom-2 w-0 h-0 -translate-x-1/2"
            style={{
              borderLeft: '8px solid transparent',
              borderRight: '8px solid transparent',
              borderTop: '8px solid rgb(51 65 85)'
            }}
          />
        </div>
      )}

      {/* Panel de detalle del nodo seleccionado */}
      {selectedNode && (
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-slate-900 via-slate-900/95 to-transparent">
          {(() => {
            const node = sampleNodes.find(n => n.id === selectedNode);
            if (!node) return null;
            
            return (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-slate-800 border border-slate-700">
                    {(() => {
                      const Icon = nodeIcons[node.type];
                      return <Icon size={32} color={statusColors[node.status]} />;
                    })()}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{node.label}</h4>
                    <p className="text-sm text-slate-400">
                      {node.provider.toUpperCase()} • {node.region}
                      {node.az && ` • ${node.az}`}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-400">{node.latency || 0}ms</div>
                    <div className="text-xs text-slate-500">Latencia</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cyan-400">{node.connections.length}</div>
                    <div className="text-xs text-slate-500">Conexiones</div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {node.compliance.map(c => (
                      <span 
                        key={c} 
                        className="px-2 py-1 text-xs font-medium rounded-full bg-emerald-900/30 text-emerald-400 border border-emerald-700/50"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}
