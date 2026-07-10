import { useState } from 'react';
import { ChevronRight, Star } from 'lucide-react';
import type { NavProps } from './types';

const categories = ['Todos', 'PIBIC', 'PIBITI', 'Voluntário'];

const projects = [
  {
    id: 1,
    title: 'IA Aplicada ao Diagnóstico Médico',
    professor: 'Prof. Dr. João da Silva',
    department: 'CIC — Dep. de Ciência da Computação',
    type: 'PIBIC',
    salary: 'R$ 500/mês',
    hours: '20h/semana',
    deadline: '30/06/2026',
    vacancies: 2,
    description: 'Pesquisa sobre modelos de deep learning para auxílio ao diagnóstico de doenças a partir de imagens médicas. Uso de PyTorch e datasets do SUS.',
    lab: 'LEIA — Laboratório de Estudos em IA',
    icon: '🧠',
  },
  {
    id: 2,
    title: 'Computação Quântica e Otimização',
    professor: 'Profa. Dra. Maria Santos',
    department: 'CIC — Dep. de Ciência da Computação',
    type: 'PIBITI',
    salary: 'R$ 500/mês',
    hours: '20h/semana',
    deadline: '25/06/2026',
    vacancies: 1,
    description: 'Investigação de algoritmos quânticos para problemas de otimização combinatória com implementação em Qiskit (IBM Quantum).',
    lab: 'QuanTIC — Lab. de Computação Quântica UnB',
    icon: '⚛️',
  },
  {
    id: 3,
    title: 'Segurança em Dispositivos IoT',
    professor: 'Prof. Dr. André Lima',
    department: 'CIC — Dep. de Ciência da Computação',
    type: 'PIBIC',
    salary: 'R$ 500/mês',
    hours: '20h/semana',
    deadline: '28/06/2026',
    vacancies: 2,
    description: 'Análise de vulnerabilidades em dispositivos IoT e proposta de protocolos de segurança para Edge Computing com testes em hardware real.',
    lab: 'LABSEC — Laboratório de Segurança Computacional',
    icon: '🔒',
  },
  {
    id: 4,
    title: 'Engenharia de Software para Sistemas Críticos',
    professor: 'Profa. Dra. Carla Mendes',
    department: 'CIC / FGA — Eng. de Software',
    type: 'PIBIC',
    salary: 'R$ 500/mês',
    hours: '15h/semana',
    deadline: '02/07/2026',
    vacancies: 3,
    description: 'Desenvolvimento de métodos formais e técnicas de verificação para software embarcado em sistemas de saúde e transporte com ferramentas SPIN e NuSMV.',
    lab: 'LADES — Lab. de Desenvolvimento de Software',
    icon: '🛡️',
  },
  {
    id: 5,
    title: 'Visão Computacional para Agricultura',
    professor: 'Prof. Dr. Lucas Oliveira',
    department: 'CIC — Dep. de Ciência da Computação',
    type: 'Voluntário',
    salary: null,
    hours: '12h/semana',
    deadline: '15/07/2026',
    vacancies: 4,
    description: 'Modelos de visão computacional para detecção de pragas e análise de solo em imagens de drone. Parceria com a Embrapa Cerrados.',
    lab: 'VISUM — Lab. de Visão Computacional',
    icon: '🌱',
  },
  {
    id: 6,
    title: 'Sistemas Distribuídos e Nuvem',
    professor: 'Prof. Dr. Pedro Nunes',
    department: 'CIC — Dep. de Ciência da Computação',
    type: 'PIBITI',
    salary: 'R$ 500/mês',
    hours: '20h/semana',
    deadline: '20/07/2026',
    vacancies: 2,
    description: 'Pesquisa sobre tolerância a falhas e consistência em sistemas distribuídos de larga escala com benchmark em Kubernetes.',
    lab: 'LDSC — Lab. de Sistemas Distribuídos',
    icon: '☁️',
  },
  {
    id: 7,
    title: 'IHC e Acessibilidade Digital',
    professor: 'Profa. Dra. Ana Costa',
    department: 'CIC / FGA',
    type: 'PIBIC',
    salary: 'R$ 500/mês',
    hours: '15h/semana',
    deadline: '10/07/2026',
    vacancies: 2,
    description: 'Estudo de acessibilidade digital e design inclusivo em aplicativos móveis com estudos de usuário com pessoas com deficiência visual e auditiva.',
    lab: 'IHC-UnB — Laboratório de IHC',
    icon: '♿',
  },
];

const typeConfig: Record<string, { bg: string; color: string }> = {
  'PIBIC':     { bg: '#eff6ff', color: '#1d4ed8' },
  'PIBITI':    { bg: '#f5f3ff', color: '#7c3aed' },
  'Voluntário':{ bg: '#f1f5f9', color: '#64748b' },
};

export default function Research({ onNavigate }: NavProps) {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [interested, setInterested] = useState<number[]>([]);

  const filtered = projects.filter(p =>
    activeCategory === 'Todos' || p.type === activeCategory
  );

  const toggleInterest = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setInterested(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <div className="h-full flex flex-col" style={{ background: '#f0f4f8' }}>

      {/* Header */}
      <div style={{ background: '#1a3a6b', padding: '16px 20px 20px' }}>
        <div className="flex items-center gap-3 mb-1">
          <div style={{ width: '36px', height: '36px', borderRadius: '12px', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
            🔬
          </div>
          <div>
            <h2 className="font-bold" style={{ color: '#ffffff', fontSize: '20px' }}>Projetos de Pesquisa</h2>
            <p style={{ color: '#93c5fd', fontSize: '13px' }}>PIBIC · PIBITI · Voluntário — UnB 2026</p>
          </div>
        </div>

        <div className="flex gap-2 mt-3">
          {[
            { label: 'Com bolsa', count: projects.filter(p => p.salary).length, color: '#22c55e' },
            { label: 'Voluntário', count: projects.filter(p => !p.salary).length, color: '#60a5fa' },
            { label: 'Interesse', count: interested.length, color: '#f59e0b' },
          ].map(({ label, count, color }) => (
            <div key={label} className="flex-1 rounded-xl p-2.5 text-center" style={{ background: 'rgba(255,255,255,0.12)' }}>
              <p style={{ color, fontSize: '18px', fontWeight: '700' }}>{count}</p>
              <p style={{ color: '#93c5fd', fontSize: '10px' }}>{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Filter */}
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
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Cards */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        {filtered.map(project => {
          const tc = typeConfig[project.type] || { bg: '#f1f5f9', color: '#64748b' };
          const isInterested = interested.includes(project.id);

          return (
            <div
              key={project.id}
              style={{
                background: '#fff',
                borderRadius: '16px',
                padding: '14px',
                border: isInterested ? '1.5px solid #bfdbfe' : '1px solid #e2e8f0',
                boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
              }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="flex items-center justify-center flex-shrink-0 rounded-2xl"
                  style={{ width: '44px', height: '44px', background: '#f8fafc', border: '1px solid #e2e8f0', fontSize: '22px' }}
                >
                  {project.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="px-2 py-0.5 rounded-full" style={{ background: tc.bg, color: tc.color, fontSize: '10px', fontWeight: '700' }}>
                      {project.type}
                    </span>
                    {project.salary
                      ? <span style={{ color: '#16a34a', fontSize: '10px', fontWeight: '700' }}></span>
                      : <span style={{ color: '#64748b', fontSize: '10px', fontWeight: '600' }}>Voluntário</span>
                    }
                  </div>
                  <p className="font-bold" style={{ color: '#0f172a', fontSize: '14px', marginBottom: '2px' }}>{project.title}</p>
                  <p style={{ color: '#64748b', fontSize: '12px', marginBottom: '2px' }}>{project.professor}</p>
                  <p style={{ color: '#94a3b8', fontSize: '11px', marginBottom: '6px' }}>{project.lab}</p>
                  <p style={{ color: '#64748b', fontSize: '12px', lineHeight: 1.4, marginBottom: '8px' }}>{project.description}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span style={{ color: '#64748b', fontSize: '11px' }}>{project.hours} · {project.vacancies} vaga{project.vacancies > 1 ? 's' : ''}</span>
                      <span style={{ color: '#94a3b8', fontSize: '11px' }}> · Prazo: {project.deadline}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={e => toggleInterest(project.id, e)}
                        style={{
                          width: '30px', height: '30px', borderRadius: '8px',
                          background: isInterested ? '#fef9c3' : '#f1f5f9',
                          border: isInterested ? '1px solid #fde047' : '1px solid #e2e8f0',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}
                      >
                        <Star className="w-3.5 h-3.5" style={{ color: isInterested ? '#ca8a04' : '#94a3b8', fill: isInterested ? '#fde047' : 'none' }} />
                      </button>
                      <button
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
            </div>
          );
        })}
        <div style={{ height: '16px' }} />
      </div>
    </div>
  );
}
