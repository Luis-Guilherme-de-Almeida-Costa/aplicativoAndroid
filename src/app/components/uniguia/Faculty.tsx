import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, ThumbsUp, MessageSquare, BookOpen, Clock, MapPin, Mail, Search } from 'lucide-react';
import type { NavProps } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// TIPOS
// ─────────────────────────────────────────────────────────────────────────────

interface RatingBreakdown {
  didatica: number;       // clareza das explicações
  disponibilidade: number; // atendimento / horas de escritório
  justeza: number;        // critérios de avaliação
  conteudo: number;       // qualidade do material
}

interface Comment {
  id: number;
  semestre: string;
  disciplina: string;
  rating: number;
  text: string;
  upvotes: number;
  tag: 'Recomendo' | 'Neutro' | 'Difícil' | 'Excelente' | 'Muito exigente';
}

interface TeacherCourse {
  name: string;
  code: string;
  semester: string;
  students: number;
  color: string;
  bg: string;
}

interface Teacher {
  id: number;
  name: string;
  title: string;
  initials: string;
  avatarColor: string;
  avatarBg: string;
  department: string;
  area: string;
  office: string;
  email: string;
  lattes: string;
  overallRating: number;
  totalReviews: number;
  bio: string;
  breakdown: RatingBreakdown;
  courses: TeacherCourse[];
  comments: Comment[];
}

// ─────────────────────────────────────────────────────────────────────────────
// DADOS — edite aqui para adicionar ou alterar docentes
// ─────────────────────────────────────────────────────────────────────────────

const teachers: Teacher[] = [
  {
    id: 1,
    name: 'João Carlos da Silva',
    title: 'Prof. Dr.',
    initials: 'JC',
    avatarColor: '#fff',
    avatarBg: '#1d4ed8',
    department: 'CIC — Dep. de Ciência da Computação',
    area: 'Inteligência Artificial',
    office: 'CIC, sala 116 — campus Darcy Ribeiro',
    email: 'joaocarlos@unb.br',
    lattes: 'lattes.cnpq.br/0001',
    overallRating: 4.6,
    totalReviews: 148,
    bio: 'Doutor em Computação pela UNICAMP, com pós-doutorado no MIT. Pesquisa machine learning aplicado a imagens médicas e sistemas de recomendação. Orientador de 12 dissertações de mestrado e 4 teses de doutorado.',
    breakdown: { didatica: 4.8, disponibilidade: 4.5, justeza: 4.4, conteudo: 4.7 },
    courses: [
      { name: 'Algoritmos e Programação', code: 'CIC0004', semester: '2026/1', students: 42, color: '#16a34a', bg: '#f0fdf4' },
      { name: 'Inteligência Artificial',   code: 'CIC0099', semester: '2026/1', students: 38, color: '#1d4ed8', bg: '#eff6ff' },
      { name: 'Aprendizado de Máquina',   code: 'CIC0135', semester: '2025/2', students: 30, color: '#7c3aed', bg: '#f5f3ff' },
    ],
    comments: [
      { id: 1, semestre: '2026/1', disciplina: 'Algoritmos e Programação', rating: 5, tag: 'Excelente', text: 'Um dos melhores professores que já tive. Explica com exemplos do mundo real, responde dúvidas com muita paciência e as provas são desafiadoras mas completamente justas.', upvotes: 34 },
      { id: 2, semestre: '2025/2', disciplina: 'Aprendizado de Máquina',   rating: 5, tag: 'Recomendo', text: 'Material atualizado, aulas dinâmicas e sempre disponível no horário de atendimento. Fez a turma inteira entender backpropagation do zero. Recomendo muito.', upvotes: 27 },
      { id: 3, semestre: '2025/1', disciplina: 'Inteligência Artificial',   rating: 4, tag: 'Recomendo', text: 'Ótimo professor, conteúdo relevante e bem organizado. Às vezes vai rápido demais nas aulas, mas as gravações ajudam bastante. Vale muito a pena.', upvotes: 19 },
      { id: 4, semestre: '2024/2', disciplina: 'Algoritmos e Programação', rating: 3, tag: 'Neutro',    text: 'Professor competente, mas as provas têm um salto de dificuldade grande em relação às aulas. Precisei de muito estudo extra para acompanhar.', upvotes: 12 },
    ],
  },
  {
    id: 2,
    name: 'Maria Fernanda Santos',
    title: 'Profa. Dra.',
    initials: 'MF',
    avatarColor: '#fff',
    avatarBg: '#7c3aed',
    department: 'MAT — Dep. de Matemática',
    area: 'Análise e Equações Diferenciais',
    office: 'MAT, sala 203 — campus Darcy Ribeiro',
    email: 'mariasantos@unb.br',
    lattes: 'lattes.cnpq.br/0002',
    overallRating: 4.1,
    totalReviews: 203,
    bio: 'Doutora em Matemática pela USP, especialista em equações diferenciais parciais e análise funcional. Premiada duas vezes pelo MEC como professora destaque na graduação. Coordenadora do curso de Matemática Aplicada.',
    breakdown: { didatica: 4.3, disponibilidade: 3.8, justeza: 4.0, conteudo: 4.5 },
    courses: [
      { name: 'Cálculo 1',      code: 'MAT0025', semester: '2026/1', students: 65, color: '#1d4ed8', bg: '#eff6ff' },
      { name: 'Cálculo 2',      code: 'MAT0026', semester: '2026/1', students: 50, color: '#7c3aed', bg: '#f5f3ff' },
      { name: 'Álgebra Linear', code: 'MAT0031', semester: '2025/2', students: 48, color: '#b45309', bg: '#fef3c7' },
    ],
    comments: [
      { id: 1, semestre: '2026/1', disciplina: 'Cálculo 1',  rating: 5, tag: 'Excelente',     text: 'Profundidade matemática incrível. Ela deriva a intuição por trás de cada teorema antes de formalizar. Nunca entendi limites tão bem. Professora excepcional.', upvotes: 41 },
      { id: 2, semestre: '2026/1', disciplina: 'Cálculo 2',  rating: 4, tag: 'Recomendo',     text: 'Exige bastante, mas o aprendizado é real. As listas de exercícios são longas, mas preparam muito bem para as provas. Precisa estudar todo dia.', upvotes: 28 },
      { id: 3, semestre: '2025/1', disciplina: 'Cálculo 1',  rating: 3, tag: 'Muito exigente', text: 'A professora domina muito o conteúdo, mas às vezes é difícil tirar dúvidas fora do horário de atendimento. As provas são pesadas e o ritmo é alto.', upvotes: 22 },
      { id: 4, semestre: '2024/2', disciplina: 'Álgebra Linear', rating: 2, tag: 'Difícil',    text: 'Conteúdo excelente, mas senti falta de mais exemplos práticos nas aulas. Tive que buscar muito material fora. A prova final foi bem mais difícil que os simulados.', upvotes: 15 },
    ],
  },
  {
    id: 3,
    name: 'André Lima Pereira',
    title: 'Prof. Dr.',
    initials: 'AL',
    avatarColor: '#fff',
    avatarBg: '#0891b2',
    department: 'FIS — Instituto de Física',
    area: 'Física Computacional',
    office: 'ICC Norte, sala 305 — campus Darcy Ribeiro',
    email: 'andrelima@unb.br',
    lattes: 'lattes.cnpq.br/0003',
    overallRating: 3.8,
    totalReviews: 176,
    bio: 'Doutor em Física pela UFRJ, pesquisador em física computacional e simulações de sistemas complexos. Colaborador do CERN e membro do Observatório Nacional. Ministra Física 1 e 2 há mais de 15 anos.',
    breakdown: { didatica: 3.6, disponibilidade: 4.2, justeza: 3.9, conteudo: 3.8 },
    courses: [
      { name: 'Física 1', code: 'FIS0110', semester: '2026/1', students: 72, color: '#0891b2', bg: '#ecfeff' },
      { name: 'Física 2', code: 'FIS0111', semester: '2026/1', students: 58, color: '#7c3aed', bg: '#f5f3ff' },
    ],
    comments: [
      { id: 1, semestre: '2026/1', disciplina: 'Física 1', rating: 4, tag: 'Recomendo',     text: 'Muito acessível no atendimento, sempre responde os e-mails rápido. As aulas são densas mas ele para para tirar dúvidas. Provas equilibradas.', upvotes: 18 },
      { id: 2, semestre: '2025/2', disciplina: 'Física 2', rating: 3, tag: 'Neutro',        text: 'Professor experiente e cordial. O ponto fraco é que usa muita notação sem explicar a origem. Recomendo assistir vídeos complementares em paralelo.', upvotes: 24 },
      { id: 3, semestre: '2025/1', disciplina: 'Física 1', rating: 3, tag: 'Difícil',       text: 'As provas cobram derivações que não foram feitas em aula. Fui reprovado na primeira tentativa. Na segunda, me preparei melhor e passei, mas foi sofrido.', upvotes: 31 },
      { id: 4, semestre: '2024/2', disciplina: 'Física 1', rating: 5, tag: 'Excelente',     text: 'Me surpreendeu positivamente. Quando você vai às monitorias e ao atendimento, ele explica de um jeito completamente diferente e tudo faz sentido.', upvotes: 20 },
    ],
  },
  {
    id: 4,
    name: 'Carla Mendes Oliveira',
    title: 'Profa. Dra.',
    initials: 'CM',
    avatarColor: '#fff',
    avatarBg: '#16a34a',
    department: 'CIC / FGA — Engenharia de Software',
    area: 'Engenharia de Software e Métodos Formais',
    office: 'FGA, sala 12 — campus Gama',
    email: 'carlamendes@unb.br',
    lattes: 'lattes.cnpq.br/0004',
    overallRating: 4.8,
    totalReviews: 92,
    bio: 'Doutora em Engenharia de Software pela UFPE. Especialista em métodos ágeis, arquitetura de software e DevOps. Orientou mais de 20 TCCs e é avaliadora de conferências internacionais como ICSE e FSE.',
    breakdown: { didatica: 4.9, disponibilidade: 4.8, justeza: 4.7, conteudo: 4.8 },
    courses: [
      { name: 'Eng. de Software',   code: 'FGA0110', semester: '2026/1', students: 35, color: '#16a34a', bg: '#f0fdf4' },
      { name: 'Arquitetura de SW',  code: 'FGA0131', semester: '2026/1', students: 28, color: '#0891b2', bg: '#ecfeff' },
      { name: 'Métodos Ágeis',      code: 'FGA0208', semester: '2025/2', students: 32, color: '#d97706', bg: '#fffbeb' },
    ],
    comments: [
      { id: 1, semestre: '2026/1', disciplina: 'Eng. de Software', rating: 5, tag: 'Excelente', text: 'Sem dúvidas a melhor professora que já tive na UnB. Ela transforma a teoria em prática de uma forma que você entende por que aquilo importa. Muda a sua visão como desenvolvedor.', upvotes: 52 },
      { id: 2, semestre: '2026/1', disciplina: 'Arquitetura de SW', rating: 5, tag: 'Excelente', text: 'Preparação impecável, feedback rápido, disponível para tirar dúvidas sempre. Os projetos da disciplina acabaram indo para o meu portfólio. Recomendo demais.', upvotes: 44 },
      { id: 3, semestre: '2025/2', disciplina: 'Métodos Ágeis',    rating: 5, tag: 'Recomendo', text: 'Trouxe profissionais de mercado para dar palestras, fez sprint real com a turma e ainda assim cobrou conteúdo com rigor. Aula prática do jeito certo.', upvotes: 38 },
      { id: 4, semestre: '2025/1', disciplina: 'Eng. de Software', rating: 4, tag: 'Recomendo', text: 'Excelente professora. Único ponto é que a carga de trabalho do projeto pode ser pesada para quem trabalha. Mas o aprendizado compensa totalmente.', upvotes: 21 },
    ],
  },
  {
    id: 5,
    name: 'Eduardo Prates Viana',
    title: 'Prof. Dr.',
    initials: 'EP',
    avatarColor: '#fff',
    avatarBg: '#dc2626',
    department: 'ENE — Dep. de Engenharia Elétrica',
    area: 'Circuitos e Eletrônica',
    office: 'SG-11, sala 405 — campus Darcy Ribeiro',
    email: 'eduardoprates@unb.br',
    lattes: 'lattes.cnpq.br/0005',
    overallRating: 3.5,
    totalReviews: 134,
    bio: 'Doutor em Engenharia Elétrica pela UFMG. Pesquisa eletrônica de potência e conversores de energia para sistemas fotovoltaicos. Coordenador do laboratório LABEE-UnB.',
    breakdown: { didatica: 3.3, disponibilidade: 3.7, justeza: 3.5, conteudo: 3.6 },
    courses: [
      { name: 'Circuitos Elétricos', code: 'ENE0008', semester: '2026/1', students: 55, color: '#d97706', bg: '#fffbeb' },
      { name: 'Eletrônica 1',        code: 'ENE0025', semester: '2026/1', students: 42, color: '#dc2626', bg: '#fef2f2' },
    ],
    comments: [
      { id: 1, semestre: '2026/1', disciplina: 'Circuitos Elétricos', rating: 4, tag: 'Recomendo',     text: 'Difícil no começo, mas depois que você pega o ritmo dele, as aulas fazem muito sentido. As provas são extensas mas o conteúdo estava nas aulas.', upvotes: 14 },
      { id: 2, semestre: '2025/2', disciplina: 'Eletrônica 1',        rating: 2, tag: 'Difícil',       text: 'Provas com nível muito diferente das listas de exercício. Muitos colegas reprovaram. Precisei de monitoria toda semana para acompanhar.', upvotes: 29 },
      { id: 3, semestre: '2025/1', disciplina: 'Circuitos Elétricos', rating: 3, tag: 'Neutro',        text: 'Professor conhece bem o conteúdo mas as explicações em sala às vezes ficam confusas. O atendimento individual é bem melhor que as aulas.', upvotes: 22 },
      { id: 4, semestre: '2024/2', disciplina: 'Circuitos Elétricos', rating: 4, tag: 'Muito exigente', text: 'Exige muito, mas aprendi demais. Passei pela disciplina mais preparado do que esperava. Não desista nas primeiras semanas.', upvotes: 17 },
    ],
  },
  {
    id: 6,
    name: 'Luciana Borges Castro',
    title: 'Profa. Dra.',
    initials: 'LB',
    avatarColor: '#fff',
    avatarBg: '#b45309',
    department: 'ENM — Dep. de Eng. Mecânica',
    area: 'Mecânica dos Sólidos',
    office: 'SG-12, sala 202 — campus Darcy Ribeiro',
    email: 'lucianabc@unb.br',
    lattes: 'lattes.cnpq.br/0006',
    overallRating: 4.3,
    totalReviews: 87,
    bio: 'Doutora em Engenharia Mecânica pela UFRGS, pós-doutora pela ETH Zürich. Especialista em mecânica computacional e simulação de estruturas por MEF. Coordenadora do grupo de pesquisa SimEst-UnB.',
    breakdown: { didatica: 4.4, disponibilidade: 4.2, justeza: 4.5, conteudo: 4.3 },
    courses: [
      { name: 'Resistência dos Materiais', code: 'ENM0025', semester: '2026/1', students: 45, color: '#475569', bg: '#f8fafc' },
      { name: 'Mecânica dos Sólidos',      code: 'ENM0040', semester: '2026/1', students: 30, color: '#b45309', bg: '#fef3c7' },
    ],
    comments: [
      { id: 1, semestre: '2026/1', disciplina: 'Resistência dos Materiais', rating: 5, tag: 'Excelente',  text: 'A professora torna a matéria muito visual. Ela desenha os diagramas passo a passo e isso faz toda a diferença. Provas desafiadoras mas justas.', upvotes: 30 },
      { id: 2, semestre: '2025/2', disciplina: 'Mecânica dos Sólidos',      rating: 4, tag: 'Recomendo',  text: 'Exigente mas justa. As correções são detalhadas e você sempre sabe onde errou e por quê. Isso ajuda muito na evolução.', upvotes: 22 },
      { id: 3, semestre: '2025/1', disciplina: 'Resistência dos Materiais', rating: 4, tag: 'Recomendo',  text: 'Ótimas aulas teóricas. Gostaria que houvesse mais exemplos de projetos reais de engenharia, mas no geral muito bom.', upvotes: 16 },
      { id: 4, semestre: '2024/2', disciplina: 'Resistência dos Materiais', rating: 3, tag: 'Neutro',     text: 'Competente, mas o ritmo das aulas varia muito. Às vezes o conteúdo de 2 semanas é dado em 3 dias. Organização do semestre poderia melhorar.', upvotes: 10 },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

const tagConfig: Record<string, { bg: string; color: string }> = {
  'Excelente':      { bg: '#dcfce7', color: '#15803d' },
  'Recomendo':      { bg: '#dbeafe', color: '#1d4ed8' },
  'Neutro':         { bg: '#f1f5f9', color: '#64748b' },
  'Difícil':        { bg: '#fef2f2', color: '#dc2626' },
  'Muito exigente': { bg: '#fef9c3', color: '#ca8a04' },
};

function RatingBadge({ value, size = 'md' }: { value: number; size?: 'sm' | 'md' | 'lg' }) {
  const color = value >= 4.5 ? '#15803d' : value >= 3.5 ? '#ca8a04' : '#dc2626';
  const bg    = value >= 4.5 ? '#dcfce7' : value >= 3.5 ? '#fef9c3' : '#fee2e2';
  const fs    = size === 'lg' ? '22px' : size === 'md' ? '14px' : '11px';
  return (
    <span style={{ background: bg, color, fontSize: fs, fontWeight: '800', padding: size === 'lg' ? '6px 14px' : '2px 8px', borderRadius: '10px' }}>
      ★ {value.toFixed(1)}
    </span>
  );
}

function StarRow({ value, max = 5 }: { value: number; max?: number }) {
  const pct = (value / max) * 100;
  const color = value >= 4.5 ? '#16a34a' : value >= 3.5 ? '#ca8a04' : '#dc2626';
  return (
    <div className="flex items-center gap-2">
      <div style={{ flex: 1, background: '#f1f5f9', borderRadius: '999px', height: '6px' }}>
        <div style={{ width: `${pct}%`, height: '6px', borderRadius: '999px', background: color, transition: 'width 0.4s ease' }} />
      </div>
      <span style={{ color: '#475569', fontSize: '11px', fontWeight: '700', minWidth: '26px', textAlign: 'right' }}>{value.toFixed(1)}</span>
    </div>
  );
}

function Avatar({ initials, bg, color, size = 48 }: { initials: string; bg: string; color: string; size?: number }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: size * 0.3,
      background: bg, flexShrink: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.33, fontWeight: '800', color,
      boxShadow: `0 2px 10px ${bg}66`,
    }}>
      {initials}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DETAIL SCREEN
// ─────────────────────────────────────────────────────────────────────────────

type DetailTab = 'perfil' | 'avaliacoes';

function TeacherDetail({ teacher, onBack }: { teacher: Teacher; onBack: () => void }) {
  const [tab, setTab]           = useState<DetailTab>('perfil');
  const [upvoted, setUpvoted]   = useState<number[]>([]);
  const [filterRating, setFilterRating] = useState<number | null>(null);

  const toggleUpvote = (id: number) =>
    setUpvoted(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const displayedComments = filterRating
    ? teacher.comments.filter(c => c.rating === filterRating)
    : teacher.comments;

  const avgDisplay = teacher.overallRating.toFixed(1);

  // Rating distribution (1–5 stars)
  const dist = [5, 4, 3, 2, 1].map(s => ({
    star: s,
    count: teacher.comments.filter(c => c.rating === s).length,
  }));

  return (
    <div className="h-full flex flex-col" style={{ background: '#f0f4f8' }}>

      {/* Header */}
      <div style={{ background: teacher.avatarBg, padding: '14px 16px 20px', flexShrink: 0 }}>
        <button onClick={onBack} className="flex items-center gap-1.5 mb-4"
          style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px', fontWeight: '600', paddingLeft: '30px' }}>
          <ChevronLeft className="w-4 h-4" />
          Docentes
        </button>

        <div className="flex items-center gap-4">
          {/* Big avatar */}
          <div style={{
            width: '64px', height: '64px', borderRadius: '20px',
            background: 'rgba(255,255,255,0.22)', border: '2px solid rgba(255,255,255,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '24px', fontWeight: '800', color: '#fff', flexShrink: 0,
          }}>
            {teacher.initials}
          </div>
          <div className="flex-1 min-w-0">
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '11px', fontWeight: '600' }}>{teacher.title}</p>
            <h2 style={{ color: '#fff', fontSize: '17px', fontWeight: '800', lineHeight: 1.2 }}>{teacher.name}</h2>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '11px', marginTop: '2px' }}>{teacher.area}</p>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex gap-2 mt-4">
          {[
            { label: 'Avaliação', value: avgDisplay, icon: '★' },
            { label: 'Avaliações', value: teacher.totalReviews, icon: '💬' },
            { label: 'Disciplinas', value: teacher.courses.length, icon: '📚' },
          ].map(({ label, value, icon }) => (
            <div key={label} className="flex-1 rounded-xl p-2.5 text-center" style={{ background: 'rgba(255,255,255,0.14)' }}>
              <p style={{ color: '#fff', fontSize: '16px', fontWeight: '800' }}>{icon} {value}</p>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '10px', marginTop: '1px' }}>{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tab bar */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e2e8f0', flexShrink: 0, display: 'flex' }}>
        {(['perfil', 'avaliacoes'] as DetailTab[]).map(t => {
          const active = tab === t;
          const label  = t === 'perfil' ? '👤  Perfil' : '⭐  Avaliações';
          return (
            <button key={t} onClick={() => setTab(t)} className="flex-1 py-3"
              style={{
                fontSize: '13px', fontWeight: active ? '700' : '500',
                color: active ? teacher.avatarBg : '#94a3b8',
                borderBottom: active ? `2.5px solid ${teacher.avatarBg}` : '2.5px solid transparent',
                background: 'transparent', transition: 'all 0.15s ease',
              }}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">

        {/* ── PERFIL TAB ── */}
        {tab === 'perfil' && (
          <div className="p-4 flex flex-col gap-4">

            {/* Bio */}
            <div style={{ background: '#fff', borderRadius: '16px', padding: '14px 16px', border: '1px solid #e2e8f0' }}>
              <p style={{ color: '#0f172a', fontSize: '13px', fontWeight: '700', marginBottom: '8px' }}>Sobre o docente</p>
              <p style={{ color: '#64748b', fontSize: '12px', lineHeight: 1.7 }}>{teacher.bio}</p>
            </div>

            {/* Contact */}
            <div style={{ background: '#fff', borderRadius: '16px', padding: '14px 16px', border: '1px solid #e2e8f0' }}>
              <p style={{ color: '#0f172a', fontSize: '13px', fontWeight: '700', marginBottom: '12px' }}>Informações de contato</p>
              {[
                { icon: MapPin,  label: 'Sala / localização', value: teacher.office },
                { icon: Mail,    label: 'E-mail institucional', value: teacher.email },
                { icon: BookOpen,label: 'Currículo Lattes',    value: teacher.lattes },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3 mb-3">
                  <div style={{ width: '30px', height: '30px', borderRadius: '10px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon className="w-3.5 h-3.5" style={{ color: '#64748b' }} />
                  </div>
                  <div>
                    <p style={{ color: '#94a3b8', fontSize: '10px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</p>
                    <p style={{ color: '#334155', fontSize: '12px', fontWeight: '500', marginTop: '1px' }}>{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Rating breakdown */}
            <div style={{ background: '#fff', borderRadius: '16px', padding: '14px 16px', border: '1px solid #e2e8f0' }}>
              <div className="flex items-center justify-between mb-3">
                <p style={{ color: '#0f172a', fontSize: '13px', fontWeight: '700' }}>Critérios de avaliação</p>
                <RatingBadge value={teacher.overallRating} size="md" />
              </div>
              {[
                { label: 'Didática',        value: teacher.breakdown.didatica },
                { label: 'Disponibilidade', value: teacher.breakdown.disponibilidade },
                { label: 'Critério nas provas', value: teacher.breakdown.justeza },
                { label: 'Qualidade do conteúdo', value: teacher.breakdown.conteudo },
              ].map(({ label, value }) => (
                <div key={label} className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span style={{ color: '#475569', fontSize: '12px' }}>{label}</span>
                  </div>
                  <StarRow value={value} />
                </div>
              ))}
            </div>

            {/* Courses */}
            <div style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
              <div style={{ padding: '14px 16px 10px', borderBottom: '1px solid #f1f5f9' }}>
                <p style={{ color: '#0f172a', fontSize: '13px', fontWeight: '700' }}>Disciplinas ministradas</p>
              </div>
              {teacher.courses.map((c, idx) => (
                <div key={c.code} className="flex items-center gap-3"
                  style={{ padding: '12px 16px', borderBottom: idx < teacher.courses.length - 1 ? '1px solid #f8fafc' : 'none' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '12px', background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <BookOpen className="w-4 h-4" style={{ color: c.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p style={{ color: '#0f172a', fontSize: '12px', fontWeight: '600' }}>{c.name}</p>
                    <p style={{ color: '#94a3b8', fontSize: '10px', marginTop: '1px' }}>{c.code} · {c.semester} · {c.students} alunos</p>
                  </div>
                  <span style={{ color: c.color, fontSize: '10px', fontWeight: '700', background: c.bg, padding: '3px 8px', borderRadius: '6px' }}>
                    {c.semester}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ height: '8px' }} />
          </div>
        )}

        {/* ── AVALIAÇÕES TAB ── */}
        {tab === 'avaliacoes' && (
          <div className="flex flex-col gap-4 p-4">

            {/* Summary card */}
            <div style={{ background: '#fff', borderRadius: '16px', padding: '16px', border: '1px solid #e2e8f0' }}>
              <div className="flex items-center gap-4">
                {/* Big rating */}
                <div style={{ textAlign: 'center', flexShrink: 0 }}>
                  <p style={{ fontSize: '40px', fontWeight: '900', color: '#0f172a', lineHeight: 1 }}>{avgDisplay}</p>
                  <div className="flex items-center justify-center gap-0.5 mt-1">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className="w-3 h-3" style={{
                        color: i <= Math.round(teacher.overallRating) ? '#f59e0b' : '#e2e8f0',
                        fill: i <= Math.round(teacher.overallRating) ? '#f59e0b' : '#e2e8f0',
                      }} />
                    ))}
                  </div>
                  <p style={{ color: '#94a3b8', fontSize: '10px', marginTop: '3px' }}>{teacher.totalReviews} avaliações</p>
                </div>

                {/* Distribution bars */}
                <div className="flex-1">
                  {dist.map(({ star, count }) => {
                    const pct = teacher.comments.length > 0 ? (count / teacher.comments.length) * 100 : 0;
                    return (
                      <div key={star} className="flex items-center gap-2 mb-1.5">
                        <span style={{ color: '#64748b', fontSize: '10px', fontWeight: '600', minWidth: '10px' }}>{star}</span>
                        <Star className="w-2.5 h-2.5" style={{ color: '#f59e0b', fill: '#f59e0b', flexShrink: 0 }} />
                        <div style={{ flex: 1, background: '#f1f5f9', borderRadius: '999px', height: '5px' }}>
                          <div style={{ width: `${pct}%`, height: '5px', borderRadius: '999px', background: star >= 4 ? '#16a34a' : star === 3 ? '#ca8a04' : '#dc2626' }} />
                        </div>
                        <span style={{ color: '#94a3b8', fontSize: '10px', minWidth: '14px', textAlign: 'right' }}>{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Filter by stars */}
            <div className="flex gap-2 flex-wrap">
              {[null, 5, 4, 3, 2, 1].map(r => (
                <button key={r ?? 'all'} onClick={() => setFilterRating(r)}
                  className="px-3 py-1.5 rounded-full"
                  style={{
                    background: filterRating === r ? teacher.avatarBg : '#f1f5f9',
                    color: filterRating === r ? '#fff' : '#64748b',
                    fontSize: '11px', fontWeight: '600',
                  }}>
                  {r === null ? 'Todos' : `★ ${r}`}
                </button>
              ))}
            </div>

            {/* Comments */}
            {displayedComments.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '32px 0', color: '#94a3b8', fontSize: '13px' }}>
                Nenhuma avaliação com esse filtro.
              </div>
            ) : (
              displayedComments.map(comment => {
                const tc = tagConfig[comment.tag] || { bg: '#f1f5f9', color: '#64748b' };
                const isUpvoted = upvoted.includes(comment.id);
                return (
                  <div key={comment.id} style={{ background: '#fff', borderRadius: '16px', padding: '14px 16px', border: '1px solid #e2e8f0', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>

                    {/* Comment header */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        {/* Anonymous avatar */}
                        <div style={{ width: '28px', height: '28px', borderRadius: '10px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <span style={{ fontSize: '14px' }}>🎓</span>
                        </div>
                        <div>
                          <p style={{ color: '#475569', fontSize: '11px', fontWeight: '600' }}>Aluno anônimo</p>
                          <p style={{ color: '#94a3b8', fontSize: '10px' }}>{comment.disciplina} · {comment.semestre}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        {[1,2,3,4,5].map(i => (
                          <Star key={i} className="w-2.5 h-2.5" style={{ color: i <= comment.rating ? '#f59e0b' : '#e2e8f0', fill: i <= comment.rating ? '#f59e0b' : '#e2e8f0' }} />
                        ))}
                      </div>
                    </div>

                    {/* Tag */}
                    <span className="px-2 py-0.5 rounded-full" style={{ background: tc.bg, color: tc.color, fontSize: '10px', fontWeight: '700' }}>
                      {comment.tag}
                    </span>

                    {/* Text */}
                    <p style={{ color: '#334155', fontSize: '12px', lineHeight: 1.65, marginTop: '8px', marginBottom: '10px' }}>
                      "{comment.text}"
                    </p>

                    {/* Upvote */}
                    <div className="flex items-center justify-between">
                      <p style={{ color: '#94a3b8', fontSize: '10px' }}>Foi útil para você?</p>
                      <button
                        onClick={() => toggleUpvote(comment.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl"
                        style={{
                          background: isUpvoted ? '#dbeafe' : '#f1f5f9',
                          border: isUpvoted ? '1px solid #93c5fd' : '1px solid #e2e8f0',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        <ThumbsUp className="w-3 h-3" style={{ color: isUpvoted ? '#1d4ed8' : '#94a3b8', fill: isUpvoted ? '#1d4ed8' : 'none' }} />
                        <span style={{ color: isUpvoted ? '#1d4ed8' : '#64748b', fontSize: '11px', fontWeight: '600' }}>
                          {comment.upvotes + (isUpvoted ? 1 : 0)}
                        </span>
                      </button>
                    </div>
                  </div>
                );
              })
            )}

            {/* Disclaimer */}
            <div style={{ background: '#fef9c3', borderRadius: '12px', padding: '10px 14px', border: '1px solid #fde047' }}>
              <p style={{ color: '#92400e', fontSize: '11px', lineHeight: 1.5 }}>
                🔒 <strong>Avaliações 100% anônimas.</strong> Os comentários refletem a opinião individual dos estudantes e não representam a posição oficial da UnB.
              </p>
            </div>

            <div style={{ height: '8px' }} />
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LIST SCREEN
// ─────────────────────────────────────────────────────────────────────────────

const areaFilters = ['Todos', 'Computação', 'Matemática', 'Física', 'Eng. Elétrica', 'Eng. Mecânica'];

const areaMap: Record<string, string> = {
  'Computação':   'Computação',
  'Matemática':   'Matemática',
  'Física':       'Física',
  'Eng. Elétrica':'Circuitos e Eletrônica',
  'Eng. Mecânica':'Mecânica dos Sólidos',
};

export default function Faculty({ onNavigate }: NavProps) {
  const [selected, setSelected]     = useState<Teacher | null>(null);
  const [activeArea, setActiveArea] = useState('Todos');
  const [search, setSearch]         = useState('');
  const [searchFocused, setSearchFocused] = useState(false);

  if (selected) {
    return <TeacherDetail teacher={selected} onBack={() => setSelected(null)} />;
  }

  const filtered = teachers.filter(t => {
    const matchArea = activeArea === 'Todos' || t.area === areaMap[activeArea];
    const matchSearch = !search || t.name.toLowerCase().includes(search.toLowerCase()) || t.department.toLowerCase().includes(search.toLowerCase());
    return matchArea && matchSearch;
  });

  return (
    <div className="h-full flex flex-col" style={{ background: '#f0f4f8' }}>

      {/* Header */}
      <div style={{ background: '#1a3a6b', padding: '16px 20px 20px', flexShrink: 0 }}>
        <div className="flex items-center gap-3 mb-1" style={{ paddingLeft: '44px' }}>
          <div>
            <h2 className="font-bold" style={{ color: '#fff', fontSize: '20px' }}>Docentes</h2>
            <p style={{ color: '#93c5fd', fontSize: '13px' }}>Perfil, disciplinas e avaliações — UnB 2026</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-2 mt-3">
          {[
            { label: 'Docentes',    count: teachers.length,                                                                  color: '#60a5fa' },
            { label: 'Avaliações',  count: teachers.reduce((s, t) => s + t.totalReviews, 0),                                color: '#34d399' },
            { label: 'Média geral', count: (teachers.reduce((s, t) => s + t.overallRating, 0) / teachers.length).toFixed(1), color: '#fbbf24' },
          ].map(({ label, count, color }) => (
            <div key={label} className="flex-1 rounded-xl p-2.5 text-center" style={{ background: 'rgba(255,255,255,0.12)' }}>
              <p style={{ color, fontSize: '16px', fontWeight: '700' }}>{count}</p>
              <p style={{ color: '#93c5fd', fontSize: '10px' }}>{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Search bar */}
      <div style={{ background: '#fff', padding: '10px 16px 0', flexShrink: 0 }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          background: searchFocused ? '#eff6ff' : '#f8fafc',
          borderRadius: '12px', padding: '9px 12px',
          border: searchFocused ? '1.5px solid #93c5fd' : '1.5px solid #e2e8f0',
          transition: 'all 0.15s ease',
        }}>
          <Search className="w-4 h-4" style={{ color: '#94a3b8', flexShrink: 0 }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            placeholder="Buscar docente ou departamento..."
            style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: '13px', color: '#0f172a' }}
          />
          {search && (
            <button onClick={() => setSearch('')} style={{ color: '#94a3b8', fontSize: '16px', lineHeight: 1 }}>×</button>
          )}
        </div>
      </div>

      {/* Area filter */}
      <div className="overflow-x-auto px-4 py-3" style={{ flexShrink: 0, background: '#fff', borderBottom: '1px solid #e2e8f0' }}>
        <div className="flex gap-2" style={{ width: 'max-content' }}>
          {areaFilters.map(area => (
            <button key={area} onClick={() => setActiveArea(area)}
              className="px-3 py-1.5 rounded-full whitespace-nowrap"
              style={{ background: activeArea === area ? '#1d4ed8' : '#f1f5f9', color: activeArea === area ? '#fff' : '#64748b', fontSize: '12px', fontWeight: '600' }}>
              {area}
            </button>
          ))}
        </div>
      </div>

      {/* Cards */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '48px 0', color: '#94a3b8', fontSize: '13px' }}>
            Nenhum docente encontrado.
          </div>
        )}
        {filtered.map(teacher => (
          <button key={teacher.id} onClick={() => setSelected(teacher)}
            className="w-full text-left"
            style={{ background: '#fff', borderRadius: '16px', padding: '14px', border: '1px solid #e2e8f0', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>

            <div className="flex items-start gap-3">
              <Avatar initials={teacher.initials} bg={teacher.avatarBg} color={teacher.avatarColor} size={52} />

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p style={{ color: '#94a3b8', fontSize: '10px', fontWeight: '600' }}>{teacher.title}</p>
                    <p className="font-bold" style={{ color: '#0f172a', fontSize: '14px', lineHeight: 1.2 }}>{teacher.name}</p>
                    <p style={{ color: '#64748b', fontSize: '11px', marginTop: '2px' }}>{teacher.area}</p>
                  </div>
                  <RatingBadge value={teacher.overallRating} size="sm" />
                </div>

                <p style={{ color: '#94a3b8', fontSize: '10px', marginTop: '5px' }}>{teacher.department}</p>

                {/* Courses pills */}
                <div className="flex flex-wrap gap-1 mt-2">
                  {teacher.courses.slice(0, 2).map(c => (
                    <span key={c.code} className="px-2 py-0.5 rounded-full" style={{ background: c.bg, color: c.color, fontSize: '9px', fontWeight: '700' }}>
                      {c.name}
                    </span>
                  ))}
                  {teacher.courses.length > 2 && (
                    <span style={{ color: '#94a3b8', fontSize: '9px', fontWeight: '600', padding: '2px 0' }}>+{teacher.courses.length - 2}</span>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" style={{ color: '#94a3b8' }} />
                      <span style={{ color: '#64748b', fontSize: '10px' }}>{teacher.totalReviews} avaliações</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" style={{ color: '#94a3b8' }} />
                      <span style={{ color: '#64748b', fontSize: '10px' }}>{teacher.courses.length} disciplina{teacher.courses.length > 1 ? 's' : ''}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4" style={{ color: teacher.avatarBg, flexShrink: 0 }} />
                </div>
              </div>
            </div>
          </button>
        ))}
        <div style={{ height: '16px' }} />
      </div>
    </div>
  );
}
