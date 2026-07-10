import type { NavProps } from './types';

const subjects = [
  {
    name: 'Cálculo 1',
    code: 'MAT0025',
    difficulty: 4.5,
    perceivedPct: 87,
    credits: 6,
    color: '#3b82f6',
    tag: 'Alta dificuldade',
  },
  {
    name: 'Física 1',
    code: 'FIS0110',
    difficulty: 4.2,
    perceivedPct: 81,
    credits: 6,
    color: '#f97316',
    tag: 'Alta dificuldade',
  },
  {
    name: 'Algoritmos e Programação',
    code: 'CIC0004',
    difficulty: 3.1,
    perceivedPct: 58,
    credits: 6,
    color: '#22c55e',
    tag: 'Dificuldade média',
  },
  {
    name: 'Humanidades e Cidadania',
    code: 'FCI0116',
    difficulty: 1.8,
    perceivedPct: 29,
    credits: 4,
    color: '#8b5cf6',
    tag: 'Leve',
  },
];

// Compute overload index (0–100)
const totalCredits   = subjects.reduce((s, x) => s + x.credits, 0);
const avgDifficulty  = subjects.reduce((s, x) => s + x.difficulty * x.credits, 0) / totalCredits;
// Scale: avgDifficulty 1→5 maps roughly to 10→95
const overloadIndex  = Math.round(((avgDifficulty - 1) / 4) * 90 + 5);

const level =
  overloadIndex < 40 ? 'leve' :
  overloadIndex < 68 ? 'moderado' : 'pesado';

const levelConfig = {
  leve:     { color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0', label: 'Leve',     emoji: '😊' },
  moderado: { color: '#ca8a04', bg: '#fef9c3', border: '#fde047', label: 'Moderado', emoji: '😐' },
  pesado:   { color: '#dc2626', bg: '#fef2f2', border: '#fecaca', label: 'Pesado',   emoji: '😰' },
};

const lc = levelConfig[level];

const diagnoses: Record<string, string> = {
  leve:     'Sua carga acadêmica está equilibrada. Você tem espaço para manter boas notas e ainda participar de atividades extracurriculares ou projetos de pesquisa.',
  moderado: 'Você está cursando matérias de dificuldade variada. É importante organizar bem seus horários de estudo para não acumular conteúdo perto das provas.',
  pesado:   'Você está cursando várias matérias de alta dificuldade ao mesmo tempo. Considere redistribuir sua grade no próximo semestre e redobrar a atenção à rotina de estudos.',
};

const tips: Record<string, string[]> = {
  leve: [
    'Aproveite para aprofundar conteúdos ou explorar projetos de extensão',
    'Considere adicionar uma disciplina optativa de interesse',
    'Participe de grupos de estudo para reforçar sua base',
  ],
  moderado: [
    'Reserve blocos de estudo fixos para Cálculo 1 e Física 1',
    'Use as monitorias disponíveis no SIGAA',
    'Evite deixar trabalhos para a última semana',
  ],
  pesado: [
    'Priorize Cálculo 1 e Física 1 — são as de maior risco de reprovação',
    'Considere reduzir a carga no 2026/2 para compensar',
    'Procure o Serviço de Orientação ao Universitário (SOU-UnB)',
    'Use as monitorias e horas de atendimento dos professores',
  ],
};

function DifficultyDots({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(i => {
        const filled = value >= i;
        const half   = !filled && value >= i - 0.5;
        return (
          <div key={i} style={{
            width: '10px', height: '10px', borderRadius: '50%',
            background: filled ? '#dc2626' : half ? '#fca5a5' : '#f1f5f9',
            border: '1px solid ' + (filled || half ? '#fca5a5' : '#e2e8f0'),
          }} />
        );
      })}
    </div>
  );
}

// Gauge needle angle: -90° (empty) to +90° (full)
const needleAngle = -90 + (overloadIndex / 100) * 180;

export default function WorkloadAnalysis({ onNavigate }: NavProps) {
  return (
    <div className="h-full flex flex-col" style={{ background: '#f0f4f8' }}>

      {/* Header */}
      <div style={{ background: '#1a3a6b', padding: '16px 20px 20px' }}>
        <div className="flex items-center gap-3 mb-1" style={{ paddingLeft: '44px' }}>
          <div>
            <h2 className="font-bold" style={{ color: '#fff', fontSize: '20px' }}>Carga Acadêmica</h2>
            <p style={{ color: '#93c5fd', fontSize: '13px' }}>Análise do seu semestre — 2026/1</p>
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">

        {/* ── Gauge card ── */}
        <div style={{ background: '#fff', borderRadius: '20px', padding: '20px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <p style={{ color: '#64748b', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px', textAlign: 'center' }}>
            Índice de Sobrecarga Acadêmica
          </p>

          {/* SVG gauge */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
            <svg width="220" height="120" viewBox="0 0 220 120">
              {/* Background arc segments */}
              {/* Green: -90° to -18° (0–40%) */}
              <path
                d="M 20 110 A 90 90 0 0 1 74.5 29.3"
                fill="none" stroke="#bbf7d0" strokeWidth="18" strokeLinecap="round"
              />
              {/* Yellow: -18° to +50° (40–68%) */}
              <path
                d="M 74.5 29.3 A 90 90 0 0 1 162 28"
                fill="none" stroke="#fde047" strokeWidth="18" strokeLinecap="round"
              />
              {/* Red: +50° to +90° (68–100%) */}
              <path
                d="M 162 28 A 90 90 0 0 1 200 110"
                fill="none" stroke="#fca5a5" strokeWidth="18" strokeLinecap="round"
              />

              {/* Needle */}
              <g transform={`translate(110, 110) rotate(${needleAngle})`}>
                <line x1="0" y1="0" x2="0" y2="-72" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
                <circle cx="0" cy="0" r="6" fill="#1e293b" />
                <circle cx="0" cy="0" r="3" fill="#fff" />
              </g>

              {/* Labels */}
              <text x="14" y="116" style={{ fontSize: '10px', fill: '#16a34a', fontWeight: '700' }}>Leve</text>
              <text x="92" y="22" style={{ fontSize: '10px', fill: '#ca8a04', fontWeight: '700' }}>Mod.</text>
              <text x="172" y="116" style={{ fontSize: '10px', fill: '#dc2626', fontWeight: '700' }}>Pesado</text>
            </svg>
          </div>

          {/* Index value + level badge */}
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '36px', fontWeight: '800', color: lc.color, lineHeight: 1 }}>
              {overloadIndex}
              <span style={{ fontSize: '16px', fontWeight: '600', color: '#94a3b8' }}>/100</span>
            </p>
            <div className="flex items-center justify-center gap-2 mt-2">
              <span style={{ fontSize: '18px' }}>{lc.emoji}</span>
              <span className="px-3 py-1 rounded-full" style={{ background: lc.bg, color: lc.color, fontSize: '12px', fontWeight: '700', border: `1px solid ${lc.border}` }}>
                Nível {lc.label}
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ marginTop: '14px', background: '#f1f5f9', borderRadius: '999px', height: '6px' }}>
            <div style={{
              width: `${overloadIndex}%`, height: '6px', borderRadius: '999px',
              background: `linear-gradient(90deg, #16a34a, #ca8a04 50%, #dc2626)`,
              transition: 'width 0.6s ease',
            }} />
          </div>
          <div className="flex justify-between mt-1">
            <span style={{ color: '#94a3b8', fontSize: '9px' }}>0</span>
            <span style={{ color: '#94a3b8', fontSize: '9px' }}>50</span>
            <span style={{ color: '#94a3b8', fontSize: '9px' }}>100</span>
          </div>
        </div>

        {/* ── Diagnostic card ── */}
        <div style={{ background: lc.bg, borderRadius: '16px', padding: '14px 16px', border: `1px solid ${lc.border}` }}>
          <div className="flex items-start gap-3">
            <span style={{ fontSize: '22px', flexShrink: 0 }}>🩺</span>
            <div>
              <p style={{ color: lc.color, fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>
                Diagnóstico automático
              </p>
              <p style={{ color: '#334155', fontSize: '13px', lineHeight: 1.6 }}>
                {diagnoses[level]}
              </p>
            </div>
          </div>
        </div>

        {/* ── Subjects difficulty list ── */}
        <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <div style={{ padding: '14px 16px 10px', borderBottom: '1px solid #f1f5f9' }}>
            <p style={{ color: '#0f172a', fontSize: '14px', fontWeight: '700' }}>Matérias mais difíceis</p>
            <p style={{ color: '#94a3b8', fontSize: '11px', marginTop: '2px' }}>Dificuldade percebida pelos estudantes</p>
          </div>

          {subjects
            .slice()
            .sort((a, b) => b.difficulty - a.difficulty)
            .map((sub, idx, arr) => (
              <div key={sub.code} style={{
                padding: '12px 16px',
                borderBottom: idx < arr.length - 1 ? '1px solid #f8fafc' : 'none',
              }}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: sub.color, flexShrink: 0 }} />
                    <div>
                      <p style={{ color: '#0f172a', fontSize: '13px', fontWeight: '600' }}>{sub.name}</p>
                      <p style={{ color: '#94a3b8', fontSize: '10px' }}>{sub.code} · {sub.credits} créditos</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full" style={{
                    background: sub.difficulty >= 4 ? '#fef2f2' : sub.difficulty >= 3 ? '#fef9c3' : '#f0fdf4',
                    color: sub.difficulty >= 4 ? '#dc2626' : sub.difficulty >= 3 ? '#ca8a04' : '#16a34a',
                    fontSize: '10px', fontWeight: '700',
                  }}>
                    {sub.tag}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <DifficultyDots value={sub.difficulty} />
                  <div style={{ flex: 1, margin: '0 10px', background: '#f1f5f9', borderRadius: '999px', height: '5px' }}>
                    <div style={{
                      width: `${sub.perceivedPct}%`, height: '5px', borderRadius: '999px',
                      background: sub.difficulty >= 4 ? '#ef4444' : sub.difficulty >= 3 ? '#eab308' : '#22c55e',
                    }} />
                  </div>
                  <span style={{ color: '#475569', fontSize: '11px', fontWeight: '700', minWidth: '30px', textAlign: 'right' }}>
                    {sub.perceivedPct}%
                  </span>
                </div>
              </div>
            ))}
        </div>

        {/* ── Alert / tips card ── */}
        <div style={{ background: '#fff', borderRadius: '16px', padding: '14px 16px', border: '1px solid #e2e8f0', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <div className="flex items-center gap-2 mb-3">
            <span style={{ fontSize: '18px' }}>💡</span>
            <p style={{ color: '#0f172a', fontSize: '14px', fontWeight: '700' }}>Sugestões para você</p>
          </div>
          {tips[level].map((tip, i) => (
            <div key={i} className="flex items-start gap-2.5 mb-3">
              <div style={{ width: '20px', height: '20px', borderRadius: '6px', background: lc.bg, border: `1px solid ${lc.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
                <span style={{ fontSize: '10px' }}>→</span>
              </div>
              <p style={{ color: '#475569', fontSize: '13px', lineHeight: 1.55 }}>{tip}</p>
            </div>
          ))}
        </div>

        {/* ── Stats summary ── */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Créditos', value: totalCredits, unit: 'cr', color: '#1d4ed8' },
            { label: 'Dific. média', value: avgDifficulty.toFixed(1), unit: '/5', color: lc.color },
            { label: 'Disciplinas', value: subjects.length, unit: '', color: '#7c3aed' },
          ].map(({ label, value, unit, color }) => (
            <div key={label} style={{ background: '#fff', borderRadius: '14px', padding: '12px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
              <p style={{ color, fontSize: '20px', fontWeight: '800', lineHeight: 1 }}>
                {value}<span style={{ fontSize: '11px', fontWeight: '500', color: '#94a3b8' }}>{unit}</span>
              </p>
              <p style={{ color: '#94a3b8', fontSize: '10px', marginTop: '4px' }}>{label}</p>
            </div>
          ))}
        </div>

        <div style={{ height: '8px' }} />
      </div>
    </div>
  );
}
