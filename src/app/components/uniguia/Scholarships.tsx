import { useState } from 'react';
import { ChevronRight, Award } from 'lucide-react';
import type { NavProps } from './types';

const categories = ['Todos', 'Assistência', 'Pesquisa', 'Extensão', 'Ensino', 'Emergencial'];

const opportunities = [
  {
    id: 1,
    title: 'Auxílio Socioeconômico',
    category: 'Assistência',
    status: 'Aberto',
    deadline: '20/06/2026',
    description: 'Apoio financeiro para estudantes em situação de vulnerabilidade socioeconômica.',
    value: 'R$ 465/mês',
    icon: '🏠',
  },
  {
    id: 2,
    title: 'Auxílio Moradia',
    category: 'Assistência',
    status: 'Documentos pendentes',
    deadline: '15/06/2026',
    description: 'Auxílio para estudantes de outros municípios ou estados que residem em Brasília.',
    value: 'R$ 530/mês',
    icon: '🏘️',
  },
  {
    id: 3,
    title: 'Auxílio Alimentação',
    category: 'Assistência',
    status: 'Contínuo',
    deadline: 'Permanente',
    description: 'Acesso gratuito ou subsidiado ao Restaurante Universitário (RU).',
    value: 'Gratuito',
    icon: '🍽️',
  },
  {
    id: 4,
    title: 'Monitoria Voluntária',
    category: 'Ensino',
    status: 'Aberto',
    deadline: '30/06/2026',
    description: 'Apoio pedagógico em disciplinas. Certificado de horas complementares.',
    value: 'Horas complementares',
    icon: '📚',
  },
  {
    id: 5,
    title: 'PIBIC — Iniciação Científica',
    category: 'Pesquisa',
    status: 'Em análise',
    deadline: 'Resultado: 30/06',
    description: 'Programa de Iniciação Científica com orientação de professor pesquisador.',
    value: 'R$ 500/mês',
    icon: '🔬',
  },
  {
    id: 6,
    title: 'PIBEX — Extensão Universitária',
    category: 'Extensão',
    status: 'Aberto',
    deadline: '25/06/2026',
    description: 'Projetos de extensão com impacto social. Bolsa e certificação.',
    value: 'R$ 400/mês',
    icon: '🌱',
  },
  {
    id: 7,
    title: 'Bolsa Permanência MEC',
    category: 'Assistência',
    status: 'Ativo',
    deadline: 'Renovação: 2026/2',
    description: 'Bolsa federal para estudantes indígenas e quilombolas em universidades federais.',
    value: 'R$ 400/mês',
    icon: '🏛️',
  },
  {
    id: 8,
    title: 'Auxílio Emergencial',
    category: 'Emergencial',
    status: 'Aberto',
    deadline: '10/06/2026',
    description: 'Apoio imediato para situações de emergência comprovadas.',
    value: 'Variável',
    icon: '🆘',
  },
];

const statusConfig: Record<string, { bg: string; color: string }> = {
  'Aberto':                 { bg: '#dcfce7', color: '#16a34a' },
  'Documentos pendentes':   { bg: '#fef9c3', color: '#ca8a04' },
  'Em análise':             { bg: '#dbeafe', color: '#1d4ed8' },
  'Contínuo':               { bg: '#f0fdf4', color: '#15803d' },
  'Ativo':                  { bg: '#f0fdf4', color: '#15803d' },
  'Encerrado':              { bg: '#f1f5f9', color: '#94a3b8' },
};

export default function Scholarships({ onNavigate }: NavProps) {
  const [activeCategory, setActiveCategory] = useState('Todos');

  const filtered = opportunities.filter(o =>
    activeCategory === 'Todos' || o.category === activeCategory
  );

  return (
    <div className="h-full flex flex-col" style={{ background: '#f0f4f8' }}>
      {/* Header */}
      <div style={{ background: '#1a3a6b', padding: '16px 20px 20px' }}>
        <div className="flex items-center gap-3 mb-1">
          <div style={{ width: '36px', height: '36px', borderRadius: '12px', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Award className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-bold" style={{ color: '#ffffff', fontSize: '20px' }}>Bolsas e Auxílios</h2>
            <p style={{ color: '#93c5fd', fontSize: '13px' }}>Central de oportunidades UnB</p>
          </div>
        </div>

        {/* Quick stats */}
        <div className="flex gap-2 mt-3">
          {[
            { label: 'Abertos', count: 5, color: '#22c55e' },
            { label: 'Inscritos', count: 2, color: '#60a5fa' },
            { label: 'Em análise', count: 1, color: '#f59e0b' },
          ].map(({ label, count, color }) => (
            <div key={label} className="flex-1 rounded-xl p-2.5 text-center" style={{ background: 'rgba(255,255,255,0.12)' }}>
              <p style={{ color, fontSize: '18px', fontWeight: '700' }}>{count}</p>
              <p style={{ color: '#93c5fd', fontSize: '10px' }}>{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Category filter */}
      <div className="overflow-x-auto px-4 py-3" style={{ flexShrink: 0, background: '#fff', borderBottom: '1px solid #e2e8f0' }}>
        <div className="flex gap-2" style={{ width: 'max-content' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-3 py-1.5 rounded-full whitespace-nowrap"
              style={{
                background: activeCategory === cat ? '#1d4ed8' : '#f1f5f9',
                color: activeCategory === cat ? '#fff' : '#64748b',
                fontSize: '12px',
                fontWeight: '600',
                border: 'none',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Opportunity cards */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        {filtered.map(opp => {
          const st = statusConfig[opp.status] || { bg: '#f1f5f9', color: '#64748b' };
          return (
            <div
              key={opp.id}
              style={{
                background: '#fff',
                borderRadius: '16px',
                padding: '14px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
              }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="flex items-center justify-center flex-shrink-0 rounded-2xl"
                  style={{ width: '44px', height: '44px', background: '#f8fafc', border: '1px solid #e2e8f0', fontSize: '22px' }}
                >
                  {opp.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="px-2 py-0.5 rounded-full"
                      style={{ background: st.bg, color: st.color, fontSize: '10px', fontWeight: '700' }}
                    >
                      {opp.status}
                    </span>
                    <span
                      className="px-2 py-0.5 rounded-full"
                      style={{ background: '#f1f5f9', color: '#64748b', fontSize: '10px', fontWeight: '600' }}
                    >
                      {opp.category}
                    </span>
                  </div>
                  <p className="font-bold" style={{ color: '#0f172a', fontSize: '14px', marginBottom: '4px' }}>{opp.title}</p>
                  <p style={{ color: '#64748b', fontSize: '12px', lineHeight: 1.4, marginBottom: '6px' }}>{opp.description}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span style={{ color: '#16a34a', fontSize: '13px', fontWeight: '700' }}>{opp.value}</span>
                      <span style={{ color: '#94a3b8', fontSize: '11px' }}> · Prazo: {opp.deadline}</span>
                    </div>
                    <button
                      onClick={() => onNavigate('document-checklist')}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-xl"
                      style={{ background: '#1d4ed8', color: '#fff', fontSize: '11px', fontWeight: '600' }}
                    >
                      Ver detalhes
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div style={{ height: '16px' }} />
      </div>
    </div>
  );
}
