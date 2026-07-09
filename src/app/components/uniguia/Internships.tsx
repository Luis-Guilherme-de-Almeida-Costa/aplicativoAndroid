import { useState } from 'react';
import { ChevronRight, Bookmark } from 'lucide-react';
import type { NavProps } from './types';

const categories = ['Todos', 'Remoto', 'Presencial', 'Híbrido', 'Compatível'];

const internships = [
  {
    id: 1,
    title: 'Estágio em Desenvolvimento Web',
    company: 'Serpro',
    area: 'Desenvolvimento de Software',
    modality: 'Híbrido',
    kind: 'Não-obrigatório',
    salary: 'R$ 1.650/mês',
    hours: '30h/semana',
    deadline: '20/06/2026',
    location: 'SAS Q. 01 — Brasília, DF',
    description: 'Desenvolvimento e manutenção de sistemas web governamentais com React, Node.js e PostgreSQL. Participação em squads ágeis com profissionais experientes.',
    skills: ['React', 'Node.js', 'PostgreSQL', 'Git'],
    gradeCompatible: true,
    status: 'Aberto',
    icon: '🏛️',
  },
  {
    id: 2,
    title: 'Estágio em Análise de Dados',
    company: 'TCU',
    area: 'Ciência de Dados',
    modality: 'Presencial',
    kind: 'Não-obrigatório',
    salary: 'R$ 1.800/mês',
    hours: '20h/semana',
    deadline: '25/06/2026',
    location: 'SAFS Q. 04 — Brasília, DF',
    description: 'Suporte à equipe de auditoria digital com análise exploratória de dados, criação de dashboards em Power BI e automatização de relatórios em Python.',
    skills: ['Python', 'Power BI', 'SQL', 'Excel'],
    gradeCompatible: true,
    status: 'Aberto',
    icon: '📊',
  },
  {
    id: 3,
    title: 'Estágio em Segurança da Informação',
    company: 'Caixa Econômica',
    area: 'Segurança',
    modality: 'Híbrido',
    kind: 'Não-obrigatório',
    salary: 'R$ 1.500/mês',
    hours: '30h/semana',
    deadline: '30/06/2026',
    location: 'SBS Q. 04 — Brasília, DF',
    description: 'Apoio ao time de Cyber Security no monitoramento de incidentes, análise de vulnerabilidades e suporte à implementação de políticas de segurança.',
    skills: ['Linux', 'Redes', 'Python', 'LGPD'],
    gradeCompatible: false,
    status: 'Aberto',
    icon: '🔐',
  },
  {
    id: 4,
    title: 'Estágio em Desenvolvimento de Software',
    company: 'Embrapa',
    area: 'Desenvolvimento de Software',
    modality: 'Presencial',
    kind: 'Obrigatório',
    salary: 'R$ 1.200/mês',
    hours: '20h/semana',
    deadline: '15/07/2026',
    location: 'W3 Norte — Brasília, DF',
    description: 'Desenvolvimento de sistemas de informação agrícola em Java e Angular. Oportunidade de trabalhar com dados geoespaciais do agronegócio brasileiro.',
    skills: ['Java', 'Angular', 'Spring Boot', 'MySQL'],
    gradeCompatible: true,
    status: 'Aberto',
    icon: '🌾',
  },
  {
    id: 5,
    title: 'Estágio em Machine Learning',
    company: 'Petrobras',
    area: 'Inteligência Artificial',
    modality: 'Remoto',
    kind: 'Não-obrigatório',
    salary: 'R$ 2.100/mês',
    hours: '25h/semana',
    deadline: '10/07/2026',
    location: 'Remoto — Rio de Janeiro / DF',
    description: 'Desenvolvimento de modelos de machine learning para análise preditiva de falhas em equipamentos industriais usando Python e TensorFlow.',
    skills: ['Python', 'TensorFlow', 'Pandas', 'MLflow'],
    gradeCompatible: true,
    status: 'Aberto',
    icon: '🤖',
  },
  {
    id: 6,
    title: 'Estágio em TI — Suporte e Infra',
    company: 'Banco do Brasil',
    area: 'Infraestrutura de TI',
    modality: 'Presencial',
    kind: 'Obrigatório',
    salary: 'R$ 1.400/mês',
    hours: '30h/semana',
    deadline: '05/07/2026',
    location: 'SBS Q. 01 — Brasília, DF',
    description: 'Suporte técnico e monitoramento de infraestrutura de servidores, redes e banco de dados. Possibilidade de efetivação ao final do estágio.',
    skills: ['Windows Server', 'Linux', 'Redes TCP/IP', 'Help Desk'],
    gradeCompatible: false,
    status: 'Aberto',
    icon: '🏦',
  },
  {
    id: 7,
    title: 'Estágio em DevOps',
    company: 'STJ',
    area: 'DevOps / Cloud',
    modality: 'Híbrido',
    kind: 'Não-obrigatório',
    salary: 'R$ 1.900/mês',
    hours: '20h/semana',
    deadline: '18/07/2026',
    location: 'SAFS Q. 06 — Brasília, DF',
    description: 'Automação de pipelines CI/CD, gerenciamento de contêineres Docker/Kubernetes e manutenção de infraestrutura em nuvem AWS.',
    skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
    gradeCompatible: true,
    status: 'Aberto',
    icon: '⚖️',
  },
  {
    id: 8,
    title: 'Estágio em Desenvolvimento — MEC',
    company: 'MEC',
    area: 'Desenvolvimento de Software',
    modality: 'Presencial',
    kind: 'Obrigatório',
    salary: 'R$ 1.300/mês',
    hours: '20h/semana',
    deadline: '01/07/2026',
    location: 'Esplanada dos Ministérios — Brasília, DF',
    description: 'Desenvolvimento de plataformas educacionais e sistemas de gestão escolar com impacto nacional na educação pública brasileira.',
    skills: ['Python', 'Django', 'Vue.js', 'PostgreSQL'],
    gradeCompatible: true,
    status: 'Em processo',
    icon: '📚',
  },
];

const statusConfig: Record<string, { bg: string; color: string }> = {
  'Aberto':      { bg: '#dcfce7', color: '#16a34a' },
  'Em processo': { bg: '#fef9c3', color: '#ca8a04' },
  'Encerrado':   { bg: '#f1f5f9', color: '#94a3b8' },
};

const modalityConfig: Record<string, { bg: string; color: string }> = {
  'Remoto':     { bg: '#f0fdf4', color: '#15803d' },
  'Presencial': { bg: '#eff6ff', color: '#1d4ed8' },
  'Híbrido':    { bg: '#f5f3ff', color: '#7c3aed' },
};

export default function Internships({ onNavigate }: NavProps) {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [saved, setSaved] = useState<number[]>([]);

  const filtered = internships.filter(i => {
    if (activeCategory === 'Todos') return true;
    if (activeCategory === 'Compatível') return i.gradeCompatible;
    return i.modality === activeCategory;
  });

  const toggleSave = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSaved(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <div className="h-full flex flex-col" style={{ background: '#f0f4f8' }}>

      {/* Header */}
      <div style={{ background: '#1a3a6b', padding: '16px 20px 20px' }}>
        <div className="flex items-center gap-3 mb-1">
          <div style={{ width: '36px', height: '36px', borderRadius: '12px', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
            💼
          </div>
          <div>
            <h2 className="font-bold" style={{ color: '#ffffff', fontSize: '20px' }}>Estágios</h2>
            <p style={{ color: '#93c5fd', fontSize: '13px' }}>Oportunidades para estudantes UnB</p>
          </div>
        </div>

        <div className="flex gap-2 mt-3">
          {[
            { label: 'Abertos', count: internships.filter(i => i.status === 'Aberto').length, color: '#22c55e' },
            { label: 'Compatíveis', count: internships.filter(i => i.gradeCompatible).length, color: '#60a5fa' },
            { label: 'Salvos', count: saved.length, color: '#f59e0b' },
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
              }}
            >
              {cat === 'Compatível' ? '⚡ ' + cat : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Cards */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        {filtered.map(item => {
          const st = statusConfig[item.status] || { bg: '#f1f5f9', color: '#64748b' };
          const mc = modalityConfig[item.modality] || { bg: '#f1f5f9', color: '#64748b' };
          const isSaved = saved.includes(item.id);

          return (
            <div
              key={item.id}
              style={{
                background: '#fff',
                borderRadius: '16px',
                padding: '14px',
                border: isSaved ? '1.5px solid #bfdbfe' : '1px solid #e2e8f0',
                boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
              }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="flex items-center justify-center flex-shrink-0 rounded-2xl"
                  style={{ width: '44px', height: '44px', background: '#f8fafc', border: '1px solid #e2e8f0', fontSize: '22px' }}
                >
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="px-2 py-0.5 rounded-full" style={{ background: st.bg, color: st.color, fontSize: '10px', fontWeight: '700' }}>
                      {item.status}
                    </span>
                    <span className="px-2 py-0.5 rounded-full" style={{ background: mc.bg, color: mc.color, fontSize: '10px', fontWeight: '600' }}>
                      {item.modality}
                    </span>
                    {item.gradeCompatible && (
                      <span style={{ color: '#1d4ed8', fontSize: '10px', fontWeight: '700' }}>⚡ Compatível</span>
                    )}
                  </div>
                  <p className="font-bold" style={{ color: '#0f172a', fontSize: '14px', marginBottom: '2px' }}>{item.title}</p>
                  <p style={{ color: '#64748b', fontSize: '12px', marginBottom: '4px' }}>{item.company} · {item.area}</p>
                  <p style={{ color: '#64748b', fontSize: '12px', lineHeight: 1.4, marginBottom: '8px' }}>{item.description}</p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1 mb-6">
                    {item.skills.map(s => (
                      <span key={s} className="px-2 py-0.5 rounded-full" style={{ background: '#f1f5f9', color: '#475569', fontSize: '10px', fontWeight: '600' }}>
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span style={{ color: '#16a34a', fontSize: '13px', fontWeight: '700' }}>{item.salary}</span>
                      <span style={{ color: '#94a3b8', fontSize: '11px' }}> · {item.hours} · Prazo: {item.deadline}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={e => toggleSave(item.id, e)}
                        style={{
                          width: '30px', height: '30px', borderRadius: '8px', flexShrink: 0,
                          background: isSaved ? '#eff6ff' : '#f1f5f9',
                          border: isSaved ? '1px solid #bfdbfe' : '1px solid #e2e8f0',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}
                      >
                        <Bookmark className="w-3.5 h-3.5" style={{ color: isSaved ? '#1d4ed8' : '#94a3b8', fill: isSaved ? '#1d4ed8' : 'none' }} />
                      </button>
                      <button
                        className="flex items-center gap-1 px-3 py-1.5 rounded-xl"
                        style={{ background: '#1d4ed8', color: '#fff', fontSize: '11px', fontWeight: '600' }}
                      >
                        Candidatar-se
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
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
