'use client';

import { useEffect, useState, useRef } from 'react';

/**
 * DASHBOARD DE MÉTRICAS DE CUMPLIMIENTO
 * Gráficos donut SVG y métricas animadas para auditoría
 */

interface DonutChartProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  label: string;
  sublabel?: string;
  color?: string;
  secondaryColor?: string;
  animationDelay?: number;
}

// Componente de gráfico donut SVG
function DonutChart({ 
  value, 
  max = 100, 
  size = 120, 
  strokeWidth = 10, 
  label, 
  sublabel,
  color = '#10B981',
  secondaryColor = '#1E293B',
  animationDelay = 0
}: DonutChartProps) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (animatedValue / max) * circumference;
  const offset = circumference - progress;

  useEffect(() => {
    const timer = setTimeout(() => {
      const duration = 1500;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      
      const animate = () => {
        current += increment;
        if (current < value) {
          setAnimatedValue(current);
          requestAnimationFrame(animate);
        } else {
          setAnimatedValue(value);
        }
      };
      
      requestAnimationFrame(animate);
    }, animationDelay);

    return () => clearTimeout(timer);
  }, [value, animationDelay]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg 
          className="donut-chart" 
          width={size} 
          height={size}
          viewBox={`0 0 ${size} ${size}`}
        >
          {/* Fondo del círculo */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={secondaryColor}
            strokeWidth={strokeWidth}
          />
          {/* Progreso animado */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={`url(#gradient-${label.replace(/\s/g, '')})`}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="donut-segment transition-all duration-1000 ease-out"
          />
          <defs>
            <linearGradient id={`gradient-${label.replace(/\s/g, '')}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={color} />
              <stop offset="100%" stopColor={color.replace(')', ', 0.7)')} />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Valor central */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-white tabular-nums">
            {Math.round(animatedValue)}
            <span className="text-sm font-normal text-slate-400">%</span>
          </span>
        </div>
      </div>
      
      <div className="mt-3 text-center">
        <p className="text-sm font-medium text-slate-200">{label}</p>
        {sublabel && <p className="text-xs text-slate-500">{sublabel}</p>}
      </div>
    </div>
  );
}

// Componente de contador animado
interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  decimals?: number;
}

function AnimatedCounter({ value, suffix = '', prefix = '', duration = 2000, decimals = 0 }: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const startTime = useRef<number | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const elapsed = timestamp - startTime.current;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setDisplayValue(value * easeOutQuart);
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [value, duration]);

  return (
    <span className="tabular-nums">
      {prefix}
      {decimals > 0 ? displayValue.toFixed(decimals) : Math.round(displayValue)}
      {suffix}
    </span>
  );
}

// Progress bar animada
interface ProgressBarProps {
  value: number;
  max?: number;
  label: string;
  color?: string;
  showValue?: boolean;
  animated?: boolean;
}

function ProgressBar({ 
  value, 
  max = 100, 
  label, 
  color = '#10B981', 
  showValue = true,
  animated = true 
}: ProgressBarProps) {
  const percentage = (value / max) * 100;
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm text-slate-300">{label}</span>
        {showValue && (
          <span className="text-sm font-medium text-slate-200">
            {animated ? <AnimatedCounter value={percentage} suffix="%" /> : `${percentage.toFixed(0)}%`}
          </span>
        )}
      </div>
      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-1000 ease-out ${animated ? 'progress-animated' : ''}`}
          style={{ 
            width: `${percentage}%`,
            background: animated ? undefined : color
          }}
        />
      </div>
    </div>
  );
}

// Métricas de ejemplo
const complianceMetrics = {
  gdpr: 94,
  soc2: 87,
  pciDss: 91,
  hipaa: 78,
  aiAct: 82
};

const systemMetrics = {
  uptime: 99.97,
  latencyP99: 45,
  throughput: 15420,
  errorRate: 0.03,
  cacheHit: 94.2,
  replication: 3
};

const riskMetrics = {
  overall: 'low',
  score: 23,
  dataBreachRisk: 12,
  sovereigntyRisk: 8,
  vendorLockIn: 35,
  complianceGaps: 5
};

export default function MetricsDashboard() {
  const [activeTab, setActiveTab] = useState<'compliance' | 'system' | 'risk'>('compliance');

  return (
    <div className="card-premium animate-fade-up">
      {/* Header con tabs y microcopy educativo */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-700/50">
        <div>
          <p className="text-[11px] uppercase tracking-wide text-emerald-300 font-semibold mb-1">Qué estás viendo</p>
          <h3 className="text-lg font-semibold gradient-text">Panel de Métricas de Auditoría</h3>
          <p className="text-xs text-slate-500 mt-0.5">Visión rápida: regulación que aplica → dato medido → implicación de cumplimiento.</p>
        </div>
        
        <div className="flex gap-1 p-1 bg-slate-800/50 rounded-lg">
          {(['compliance', 'system', 'risk'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all btn-ripple ${
                activeTab === tab 
                  ? 'bg-emerald-500/20 text-emerald-400' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab === 'compliance' ? 'Cumplimiento' : tab === 'system' ? 'Sistema' : 'Riesgo'}
            </button>
          ))}
        </div>
      </div>

      {/* Tab: Compliance */}
      {activeTab === 'compliance' && (
        <div className="space-y-6">
          <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-800/70 text-sm text-slate-200">
            <p className="font-semibold text-white">Por qué importa</p>
            <p className="text-slate-400">Cada donut muestra % de controles exigidos por la norma que están activos. Pasa el cursor para ver una definición corta.</p>
          </div>
          {/* Donut charts */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <DonutChart 
              value={complianceMetrics.gdpr} 
              label="GDPR" 
              sublabel="Protección de Datos UE"
              color="#10B981"
              animationDelay={0}
              /* exp: GDPR = Reglamento europeo de protección de datos */
            />
            <DonutChart 
              value={complianceMetrics.soc2} 
              label="SOC 2" 
              sublabel="Controles de Seguridad"
              color="#06B6D4"
              animationDelay={100}
              /* exp: SOC 2 = controles de seguridad y disponibilidad auditados */
            />
            <DonutChart 
              value={complianceMetrics.pciDss} 
              label="PCI-DSS" 
              sublabel="Seguridad de Pagos"
              color="#8B5CF6"
              animationDelay={200}
              /* exp: PCI-DSS = requisitos para manejar tarjetas */
            />
            <DonutChart 
              value={complianceMetrics.hipaa} 
              label="HIPAA" 
              sublabel="Datos de Salud"
              color="#F59E0B"
              animationDelay={300}
              /* exp: HIPAA = protección de información médica en EE. UU. */
            />
            <DonutChart 
              value={complianceMetrics.aiAct} 
              label="AI Act" 
              sublabel="Regulación IA UE"
              color="#EC4899"
              animationDelay={400}
              /* exp: AI Act = gestión de riesgos y explicabilidad de modelos */
            />
          </div>

          {/* Detalles de compliance */}
          <div className="grid md:grid-cols-3 gap-4 pt-4">
            <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/30">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-slate-400">Residencia de Datos</span>
                <span className="status-badge success">Cumple</span>
              </div>
              <p className="text-xs text-slate-500">
                Todos los datos PII almacenados en jurisdicciones de la UE. No se detectaron transferencias transfronterizas no autorizadas.
              </p>
            </div>
            
            <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/30">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-slate-400">Estado de Cifrado</span>
                <span className="status-badge success">Activo</span>
              </div>
              <p className="text-xs text-slate-500">
                AES-256 en reposo, TLS 1.3 en tránsito. Todas las claves KMS rotadas según política.
              </p>
            </div>
            
            <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/30">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-slate-400">Registros de Auditoría</span>
                <span className="status-badge info">Inmutable</span>
              </div>
              <p className="text-xs text-slate-500">
                47,382 eventos registrados. Almacenamiento WORM habilitado. Retención: 7 años.
              </p>
            </div>
          </div>

          {/* Glosario mini contextual */}
          <div className="grid md:grid-cols-3 gap-3 text-xs text-slate-300">
            {[{
              term: 'Residencia de datos',
              def: 'Datos personales no salen de la jurisdicción definida (ej. UE).'
            }, {
              term: 'Cifrado',
              def: 'Protección con claves; en tránsito (TLS 1.3) y en reposo (AES-256).'
            }, {
              term: 'Registros inmutables',
              def: 'Logs protegidos contra borrado/edición para auditar acciones.'
            }].map(item => (
              <div key={item.term} className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80">
                <p className="font-semibold text-white text-sm">{item.term}</p>
                <p className="text-slate-400 mt-1">{item.def}</p>
                <p className="text-emerald-300 mt-1 text-[11px]">¿Qué significa esto? Facilita evidenciar cumplimiento ante auditorías.</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: System */}
      {activeTab === 'system' && (
        <div className="space-y-6">
          <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-800/70 text-sm text-slate-200">
            <p className="font-semibold text-white">Cómo leerlo</p>
            <p className="text-slate-400">Estas métricas son "salud de la plataforma". Relaciónalas con cumplimiento: más latencia o errores = más riesgo operativo (afecta SLA y evidencias).</p>
          </div>
          {/* Métricas grandes */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-gradient-to-br from-emerald-900/20 to-emerald-800/10 rounded-xl border border-emerald-700/30">
              <p className="text-sm text-emerald-400/80 mb-1">SLA de Tiempo de Actividad</p>
              <p className="text-3xl font-bold text-white">
                <AnimatedCounter value={systemMetrics.uptime} suffix="%" decimals={2} />
              </p>
              <p className="text-xs text-slate-500 mt-1">Últimos 30 días</p>
            </div>
            
            <div className="p-4 bg-gradient-to-br from-cyan-900/20 to-cyan-800/10 rounded-xl border border-cyan-700/30">
              <p className="text-sm text-cyan-400/80 mb-1">Latencia P99</p>
              <p className="text-3xl font-bold text-white">
                <AnimatedCounter value={systemMetrics.latencyP99} suffix="ms" />
              </p>
              <p className="text-xs text-slate-500 mt-1">Entre regiones</p>
            </div>
            
            <div className="p-4 bg-gradient-to-br from-purple-900/20 to-purple-800/10 rounded-xl border border-purple-700/30">
              <p className="text-sm text-purple-400/80 mb-1">Rendimiento</p>
              <p className="text-3xl font-bold text-white">
                <AnimatedCounter value={systemMetrics.throughput} suffix="" />
              </p>
              <p className="text-xs text-slate-500 mt-1">sol/seg</p>
            </div>
            
            <div className="p-4 bg-gradient-to-br from-amber-900/20 to-amber-800/10 rounded-xl border border-amber-700/30">
              <p className="text-sm text-amber-400/80 mb-1">Tasa de Errores</p>
              <p className="text-3xl font-bold text-white">
                <AnimatedCounter value={systemMetrics.errorRate} suffix="%" decimals={2} />
              </p>
              <p className="text-xs text-slate-500 mt-1">Umbral: 0.1%</p>
            </div>
          </div>

          {/* Progress bars */}
          <div className="space-y-4 pt-2">
            <ProgressBar value={systemMetrics.cacheHit} label="Tasa de Aciertos de Caché" color="#10B981" />
            <ProgressBar value={85} label="Salud de Sincronización Multi-Región" color="#06B6D4" />
            <ProgressBar value={92} label="Cobertura de Políticas IAM" color="#8B5CF6" />
            <ProgressBar value={78} label="Preparación para Recuperación ante Desastres" color="#F59E0B" />
            <div className="grid md:grid-cols-2 gap-2 text-xs text-slate-400">
              <p><span className="text-white font-semibold">Tip:</span> Si la sincronización baja de 80%, replicas tardan y el RPO sube.</p>
              <p><span className="text-white font-semibold">Tip:</span> Cobertura IAM <span className="text-emerald-300">{'>'}90%</span> significa que Zero Trust está aplicado en la mayoría de rutas.</p>
            </div>
          </div>

          {/* Indicadores de replicación */}
          <div className="flex items-center gap-4 p-4 bg-slate-800/30 rounded-xl border border-slate-700/30">
            <div className="flex -space-x-2">
              {Array.from({ length: systemMetrics.replication }).map((_, i) => (
                <div 
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-slate-900 flex items-center justify-center text-xs font-bold"
                  style={{ 
                    background: i === 0 ? '#10B981' : i === 1 ? '#06B6D4' : '#8B5CF6',
                    zIndex: systemMetrics.replication - i
                  }}
                >
                  R{i + 1}
                </div>
              ))}
            </div>
            <div>
              <p className="text-sm font-medium text-white">Réplicas Activas: {systemMetrics.replication}</p>
              <p className="text-xs text-slate-500">Primaria: EU-West-1 • Standby: EU-Central-1, US-East-1</p>
              <p className="text-[11px] text-emerald-300 mt-1">¿Qué significa? Replicación = resiliencia + soberanía (elige dónde vive cada copia).</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Risk */}
      {activeTab === 'risk' && (
        <div className="space-y-6">
          <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-800/70 text-sm text-slate-200">
            <p className="font-semibold text-white">Cómo interpretar el riesgo</p>
            <p className="text-slate-400">0 = sin riesgo identificado. {'>'}50% merece atención inmediata. Los colores siguen semáforo accesible.</p>
          </div>
          {/* Risk score principal */}
          <div className="flex items-center gap-6 p-6 bg-gradient-to-r from-emerald-900/20 via-slate-800/30 to-slate-800/30 rounded-xl border border-emerald-700/30">
            <div className="relative">
              <DonutChart 
                value={100 - riskMetrics.score}
                size={100}
                strokeWidth={8}
                label=""
                color="#10B981"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-emerald-400">{riskMetrics.score}</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl font-bold text-white">Puntaje General de Riesgo</span>
                <span className="status-badge success">BAJO</span>
              </div>
              <p className="text-sm text-slate-400 max-w-md">
                Su infraestructura multi-nube mantiene una postura de bajo riesgo. 
                Se recomiendan mejoras menores para mitigar el bloqueo del proveedor.
              </p>
              <p className="text-xs text-emerald-300 mt-1">¿Qué significa? Combina riesgo operativo + de cumplimiento + de dependencia.</p>
            </div>
          </div>

          {/* Desglose de riesgos */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-slate-300">Desglose de Riesgos</h4>
              <p className="text-xs text-slate-500">Haz hover para ver por qué importa cada riesgo.</p>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                  <span className="text-sm text-slate-400" title="Probabilidad de fuga de datos o acceso indebido">Riesgo de Violación de Datos</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-emerald-500 rounded-full transition-all duration-1000"
                        style={{ width: `${riskMetrics.dataBreachRisk}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-emerald-400">{riskMetrics.dataBreachRisk}%</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                  <span className="text-sm text-slate-400" title="¿Cumple la residencia de datos?">Riesgo de Soberanía</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-emerald-500 rounded-full transition-all duration-1000"
                        style={{ width: `${riskMetrics.sovereigntyRisk}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-emerald-400">{riskMetrics.sovereigntyRisk}%</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                  <span className="text-sm text-slate-400" title="Dependencia de un único proveedor">Bloqueo de Proveedor</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-amber-500 rounded-full transition-all duration-1000"
                        style={{ width: `${riskMetrics.vendorLockIn}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-amber-400">{riskMetrics.vendorLockIn}%</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                  <span className="text-sm text-slate-400" title="Controles faltantes vs. normas declaradas">Brechas de Cumplimiento</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-emerald-500 rounded-full transition-all duration-1000"
                        style={{ width: `${riskMetrics.complianceGaps}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-emerald-400">{riskMetrics.complianceGaps}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mapa de calor por región */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-slate-300">Mapa de Calor de Riesgo Regional</h4>
              <p className="text-xs text-slate-500">Colores: verde seguro • ámbar vigilar • rojo actuar. Úsalo para decidir dónde poner datos sensibles.</p>
              <div className="grid grid-cols-4 gap-1">
                {[
                  { region: 'EU-W1', risk: 15 },
                  { region: 'EU-C1', risk: 18 },
                  { region: 'EU-N1', risk: 12 },
                  { region: 'EU-S1', risk: 22 },
                  { region: 'US-E1', risk: 45 },
                  { region: 'US-W1', risk: 38 },
                  { region: 'US-C1', risk: 42 },
                  { region: 'CA-C1', risk: 28 },
                  { region: 'AP-S1', risk: 55 },
                  { region: 'AP-N1', risk: 48 },
                  { region: 'AP-E1', risk: 52 },
                  { region: 'SA-E1', risk: 62 }
                ].map((item) => (
                  <div 
                    key={item.region}
                    className="heatmap-cell p-2 text-center cursor-pointer"
                    style={{
                      backgroundColor: `rgba(${
                        item.risk < 25 ? '16, 185, 129' : 
                        item.risk < 40 ? '245, 158, 11' : 
                        item.risk < 55 ? '249, 115, 22' : 
                        '239, 68, 68'
                      }, ${0.2 + (item.risk / 100) * 0.6})`
                    }}
                    title={`${item.region}: ${item.risk}% risk`}
                  >
                    <span className="text-[10px] font-medium text-white/80">{item.region}</span>
                    <span className="block text-xs font-bold text-white">{item.risk}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-500 text-center mt-2">
                Haga clic en una región para un análisis de riesgo detallado
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
