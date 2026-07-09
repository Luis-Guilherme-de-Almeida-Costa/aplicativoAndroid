import { useState } from 'react';
import { ChevronRight, Leaf } from 'lucide-react';
import type { NavProps } from './types';

const categories = ['Todos', 'Tecnologia', 'Educação', 'Social', 'Saúde', 'Cultural', 'Ambiental'];

const projects = [
  {
    id: 1,
    title: 'TechComunidade — Capacitação Digital para Idosos',
    coordinator: 'Profa. Dra. Fernanda Borges',
    department: 'FCI — Fac. de Ciência da Informação',
    category: 'Tecnologia',
    modality: 'Híbrido',
    salary: 'R$ 400/mês',
    hours: '12h/semana',
    deadline: '30/06/2026',
    vacancies: 4,
    description: 'Inclusão digital a idosos de Ceilândia, ensinando uso de smartphones e aplicativos bancários. Parceria com CRAS e Secretaria de Saúde do DF.',
    icon: '💻',
  },
  {
    id: 2,
    title: 'Saúde Mental nas Escolas — Roda de Conversa',
    coordinator: 'Prof. Dr. Roberto Alves',
    department: 'IP — Instituto de Psicologia',
    category: 'Saúde',
    modality: 'Presencial',
    salary: 'R$ 400/mês',
    hours: '10h/semana',
    deadline: '05/07/2026',
    vacancies: 6,
    description: 'Promoção de saúde mental em escolas públicas do DF com rodas de conversa para adolescentes de 14–18 anos. Foco em prevenção e encaminhamento.',
    icon: '❤️',
  },
  {
    id: 3,
    title: 'Cerrado Vivo — Educação Ambiental',
    coordinator: 'Profa. Dra. Juliana Ferreira',
    department: 'IB — Instituto de Biologia',
    category: 'Ambiental',
    modality: 'Presencial',
    salary: null,
    hours: '8h/semana',
    deadline: '12/07/2026',
    vacancies: 8,
    description: 'Educação ambiental sobre o bioma Cerrado em escolas municipais do DF. Inclui trilhas no campus Darcy, exibição de espécimes e horta escolar.',
    icon: '🌿',
  },
  {
    id: 4,
    title: 'GovTech — Inovação em Serviços Públicos',
    coordinator: 'Prof. Dr. Marcos Henrique',
    department: 'CIC / FGA — Engenharia de Software',
    category: 'Tecnologia',
    modality: 'Híbrido',
    salary: 'R$ 400/mês',
    hours: '12h/semana',
    deadline: '22/06/2026',
    vacancies: 3,
    description: 'Desenvolvimento de soluções de software em parceria com órgãos públicos do DF para modernizar serviços cidadãos. Projetos adotados por 3 secretarias do GDF.',
    icon: '🏛️',
  },
  {
    id: 5,
    title: 'Cultura e Memória — Patrimônio do DF',
    coordinator: 'Profa. Dra. Sônia Nogueira',
    department: 'FAU — Fac. de Arquitetura e Urbanismo',
    category: 'Cultural',
    modality: 'Presencial',
    salary: null,
    hours: '10h/semana',
    deadline: '18/07/2026',
    vacancies: 5,
    description: 'Digitalização do patrimônio histórico e cultural de Brasília com foco em bairros modernistas. Parceria com GDF e IPHAN.',
    icon: '🎭',
  },
  {
    id: 6,
    title: 'Reforço Escolar UnB — Matemática e Ciências',
    coordinator: 'Prof. Dr. Eduardo Prates',
    department: 'IE — Instituto de Educação',
    category: 'Educação',
    modality: 'Presencial',
    salary: 'R$ 400/mês',
    hours: '10h/semana',
    deadline: '28/06/2026',
    vacancies: 10,
    description: 'Reforço escolar em matemática, física e química para estudantes do Ensino Médio de escolas públicas, com foco na preparação para o ENEM.',
    icon: '📚',
  },
  {
    id: 7,
    title: 'Direito à Moradia — Assessoria Jurídica',
    coordinator: 'Profa. Dra. Camila Rocha',
    department: 'FD — Faculdade de Direito',
    category: 'Social',
    modality: 'Presencial',
    salary: null,
    hours: '8h/semana',
    deadline: '15/07/2026',
    vacancies: 6,
    description: 'Assessoria jurídica gratuita para comunidades vulneráveis do DF em questões de habitação e regularização fundiária. Parceria com a Defensoria Pública.',
    icon: '🤝',
  },
  {
    id: 8,
    title: 'Arte e Transformação — Teatro nas Periferias',
    coordinator: 'Prof. Dr. Henrique Castro',
    department: 'CEN — Departamento de Artes Cênicas',
    category: 'Cultural',
    modality: 'Presencial',
    salary: 'R$ 400/mês',
    hours: '8h/semana',
    deadline: '20/07/2026',
    vacancies: 4,
    description: 'Oficinas de teatro e expressão corporal para jovens em situação de vulnerabilidade no Sol Nascente e Estrutural. Culminância em espetáculo público.',
    icon: '🎬',
  },
];

const catConfig: Record<string, { bg: string; color: string }> = {
  'Tecnologia': { bg: '#eff6ff', color: '#1d4ed8' },
  'Educação':   { bg: '#fef9c3', color: '#ca8a04' },
  'Social':     { bg: '#fce7f3', color: '#be185d' },
  'Saúde':      { bg: '#f0fdf4', color: '#15803d' },
  'Cultural':   { bg: '#fdf4ff', color: '#9333ea' },
  'Ambiental':  { bg: '#ecfdf5', color: '#065f46' },
};

export default function Extension({ onNavigate }: NavProps) {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [saved, setSaved] = useState<number[]>([]);

  const filtered = projects.filter(p =>
    activeCategory === 'Todos' || p.category === activeCategory
  );

  const toggleSave = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSaved(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <div className="h-full flex flex-col" style={{ background: '#f0f4f8' }}>

      {/* Header */}
      <div style={{ background: '#065f46', padding: '16px 20px 20px' }}>
        <div className="flex items-center gap-3 mb-1">
          <div style={{ width: '36px', height: '36px', borderRadius: '12px', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
            🌱
          </div>
          <div>
            <h2 className="font-bold" style={{ color: '#ffffff', fontSize: '20px' }}>Extensão Universitária</h2>
            <p style={{ color: '#a7f3d0', fontSize: '13px' }}>PIBEX e projetos comunitários — UnB 2026</p>
          </div>
        </div>

        <div className="flex gap-2 mt-3">
          {[
            { label: 'Com bolsa', count: projects.filter(p => p.salary).length, color: '#4ade80' },
            { label: 'Voluntário', count: projects.filter(p => !p.salary).length, color: '#86efac' },
            { label: 'Salvos', count: saved.length, color: '#fde047' },
          ].map(({ label, count, color }) => (
            <div key={label} className="flex-1 rounded-xl p-2.5 text-center" style={{ background: 'rgba(255,255,255,0.12)' }}>
              <p style={{ color, fontSize: '18px', fontWeight: '700' }}>{count}</p>
              <p style={{ color: '#a7f3d0', fontSize: '10px' }}>{label}</p>
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
                background: activeCategory === cat ? '#065f46' : '#f1f5f9',
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
          const cc = catConfig[project.category] || { bg: '#f1f5f9', color: '#64748b' };
          const isSaved = saved.includes(project.id);

          return (
            <div
              key={project.id}
              style={{
                background: '#fff',
                borderRadius: '16px',
                padding: '14px',
                border: isSaved ? '1.5px solid #a7f3d0' : '1px solid #e2e8f0',
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
                    <span className="px-2 py-0.5 rounded-full" style={{ background: cc.bg, color: cc.color, fontSize: '10px', fontWeight: '700' }}>
                      {project.category}
                    </span>
                    <span style={{ color: '#64748b', fontSize: '10px', fontWeight: '600' }}>{project.modality}</span>
                    {project.salary
                      ? <span style={{ color: '#15803d', fontSize: '10px', fontWeight: '700' }}>💰 {project.salary}</span>
                      : <span style={{ color: '#64748b', fontSize: '10px' }}>Voluntário</span>
                    }
                  </div>
                  <p className="font-bold" style={{ color: '#0f172a', fontSize: '14px', marginBottom: '2px' }}>{project.title}</p>
                  <p style={{ color: '#64748b', fontSize: '12px', marginBottom: '6px' }}>{project.coordinator} · {project.department}</p>
                  <p style={{ color: '#64748b', fontSize: '12px', lineHeight: 1.4, marginBottom: '8px' }}>{project.description}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span style={{ color: '#065f46', fontSize: '13px', fontWeight: '700' }}>{project.hours}</span>
                      <span style={{ color: '#94a3b8', fontSize: '11px' }}> · {project.vacancies} vagas · Prazo: {project.deadline}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={e => toggleSave(project.id, e)}
                        style={{
                          width: '30px', height: '30px', borderRadius: '8px',
                          background: isSaved ? '#ecfdf5' : '#f1f5f9',
                          border: isSaved ? '1px solid #a7f3d0' : '1px solid #e2e8f0',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}
                      >
                        <Leaf className="w-3.5 h-3.5" style={{ color: isSaved ? '#059669' : '#94a3b8' }} />
                      </button>
                      <button
                        className="flex items-center gap-1 px-3 py-1.5 rounded-xl"
                        style={{ background: '#065f46', color: '#fff', fontSize: '11px', fontWeight: '600' }}
                      >
                        Participar
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
