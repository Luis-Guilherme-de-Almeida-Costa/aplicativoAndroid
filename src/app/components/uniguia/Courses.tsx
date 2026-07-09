import { useState } from 'react';
import { ChevronLeft, Play, BookOpen, Clock, Users, Star, ChevronRight, GraduationCap, Lock } from 'lucide-react';
import type { NavProps } from './types';

// ─── Data ────────────────────────────────────────────────────────────────────

type Level = 'Iniciante' | 'Intermediário' | 'Avançado';

interface Lesson {
  id: number;
  title: string;
  duration: string;
  videoUrl: string | null;  // YouTube URL — substituir para ativar o player
}

interface Subject {
  id: number;
  name: string;
  code: string;
  description: string;
  level: Level;
  area: string;
  hours: number;
  students: number;
  rating: number;
  icon: string;
  color: string;
  bg: string;
  topics: string[];
  lessons: Lesson[];
}

const subjects: Subject[] = [
  {
    id: 1,
    name: 'Cálculo 1',
    code: 'MAT0025',
    description: 'Fundamentos do cálculo diferencial e integral de funções reais de uma variável. Abrange limites, continuidade, derivadas e integrais, com aplicações em problemas físicos e de engenharia.',
    level: 'Iniciante',
    area: 'Matemática',
    hours: 90,
    students: 1240,
    rating: 4.3,
    icon: '∫',
    color: '#1d4ed8',
    bg: '#eff6ff',
    topics: ['Limites e Continuidade', 'Derivadas', 'Regras de Derivação', 'Integrais', 'Teorema Fundamental'],
    lessons: [
      { id: 1, title: 'Introdução ao Cálculo e Limites', duration: '42min', videoUrl: null },
      { id: 2, title: 'Continuidade de Funções',          duration: '38min', videoUrl: null },
      { id: 3, title: 'Derivadas — Conceito e Notação',   duration: '51min', videoUrl: null },
      { id: 4, title: 'Regra da Cadeia e Derivação Implícita', duration: '47min', videoUrl: null },
      { id: 5, title: 'Integral Definida e Área',         duration: '55min', videoUrl: null },
    ],
  },
  {
    id: 2,
    name: 'Cálculo 2',
    code: 'MAT0026',
    description: 'Extensão do Cálculo 1 para funções de várias variáveis. Estudo de derivadas parciais, integrais múltiplas, séries de Taylor e equações diferenciais ordinárias elementares.',
    level: 'Intermediário',
    area: 'Matemática',
    hours: 90,
    students: 980,
    rating: 4.1,
    icon: '∂',
    color: '#7c3aed',
    bg: '#f5f3ff',
    topics: ['Funções de Várias Variáveis', 'Derivadas Parciais', 'Integrais Duplas', 'Séries', 'EDO'],
    lessons: [
      { id: 1, title: 'Funções de Várias Variáveis',        duration: '44min', videoUrl: null },
      { id: 2, title: 'Derivadas Parciais e Gradiente',     duration: '49min', videoUrl: null },
      { id: 3, title: 'Máximos e Mínimos Locais',           duration: '41min', videoUrl: null },
      { id: 4, title: 'Integrais Duplas — Método de Fubini', duration: '58min', videoUrl: null },
      { id: 5, title: 'Introdução às EDOs',                 duration: '52min', videoUrl: null },
    ],
  },
  {
    id: 3,
    name: 'Física 1',
    code: 'FIS0110',
    description: 'Mecânica clássica newtoniana: cinemática, dinâmica, trabalho e energia, impulso e momento linear. Base fundamental para engenharia mecânica, elétrica e civil.',
    level: 'Iniciante',
    area: 'Física',
    hours: 75,
    students: 1380,
    rating: 4.0,
    icon: 'F',
    color: '#0891b2',
    bg: '#ecfeff',
    topics: ['Cinemática', 'Leis de Newton', 'Trabalho e Energia', 'Momento Linear', 'Colisões'],
    lessons: [
      { id: 1, title: 'Grandezas Físicas e Vetores',   duration: '36min', videoUrl: null },
      { id: 2, title: 'Cinemática — MRU e MRUV',       duration: '43min', videoUrl: null },
      { id: 3, title: 'Segunda Lei de Newton',          duration: '50min', videoUrl: null },
      { id: 4, title: 'Trabalho, Potência e Energia',  duration: '48min', videoUrl: null },
      { id: 5, title: 'Colisões e Conservação',        duration: '45min', videoUrl: null },
    ],
  },
  {
    id: 4,
    name: 'Algoritmos e Programação',
    code: 'CIC0004',
    description: 'Introdução ao pensamento algorítmico e programação estruturada em C. Aborda variáveis, condicionais, laços, funções, vetores e ponteiros. Pré-requisito para Estruturas de Dados.',
    level: 'Iniciante',
    area: 'Computação',
    hours: 60,
    students: 1560,
    rating: 4.5,
    icon: '{ }',
    color: '#16a34a',
    bg: '#f0fdf4',
    topics: ['Variáveis e Tipos', 'Estruturas Condicionais', 'Laços de Repetição', 'Funções', 'Ponteiros'],
    lessons: [
      { id: 1, title: 'Lógica de Programação — Introdução', duration: '40min', videoUrl: null },
      { id: 2, title: 'Variáveis, Tipos e Operadores',       duration: '38min', videoUrl: null },
      { id: 3, title: 'If-Else e Switch-Case',               duration: '35min', videoUrl: null },
      { id: 4, title: 'For, While e Do-While',               duration: '42min', videoUrl: null },
      { id: 5, title: 'Funções e Recursividade',             duration: '54min', videoUrl: null },
    ],
  },
  {
    id: 5,
    name: 'Álgebra Linear',
    code: 'MAT0031',
    description: 'Estudo de espaços vetoriais, transformações lineares, matrizes, sistemas de equações lineares e autovalores. Ferramenta essencial para computação gráfica, IA e engenharia.',
    level: 'Intermediário',
    area: 'Matemática',
    hours: 75,
    students: 820,
    rating: 4.2,
    icon: '[A]',
    color: '#b45309',
    bg: '#fef3c7',
    topics: ['Sistemas Lineares', 'Matrizes', 'Determinantes', 'Espaços Vetoriais', 'Autovalores'],
    lessons: [
      { id: 1, title: 'Sistemas de Equações Lineares', duration: '46min', videoUrl: null },
      { id: 2, title: 'Operações com Matrizes',        duration: '40min', videoUrl: null },
      { id: 3, title: 'Determinantes e Inversa',       duration: '44min', videoUrl: null },
      { id: 4, title: 'Espaço Nulo e Imagem',          duration: '49min', videoUrl: null },
      { id: 5, title: 'Autovalores e Autovetores',     duration: '56min', videoUrl: null },
    ],
  },
  {
    id: 6,
    name: 'Estruturas de Dados',
    code: 'CIC0004',
    description: 'Análise e implementação de estruturas de dados fundamentais: listas, pilhas, filas, árvores e grafos. Complexidade de algoritmos com notação Big-O. Pré-requisito para Algoritmos.',
    level: 'Avançado',
    area: 'Computação',
    hours: 90,
    students: 740,
    rating: 4.6,
    icon: '🌲',
    color: '#dc2626',
    bg: '#fef2f2',
    topics: ['Listas Encadeadas', 'Pilhas e Filas', 'Árvores Binárias', 'Grafos', 'Complexidade'],
    lessons: [
      { id: 1, title: 'Revisão de Ponteiros em C',  duration: '38min', videoUrl: null },
      { id: 2, title: 'Listas Simplesmente Encadeadas', duration: '52min', videoUrl: null },
      { id: 3, title: 'Pilhas e Aplicações',          duration: '43min', videoUrl: null },
      { id: 4, title: 'Árvores Binárias de Busca',   duration: '60min', videoUrl: null },
      { id: 5, title: 'Grafos — BFS e DFS',          duration: '65min', videoUrl: null },
    ],
  },
  {
    id: 7,
    name: 'Circuitos Elétricos',
    code: 'ENE0008',
    description: 'Análise de circuitos de corrente contínua e alternada. Lei de Ohm, Kirchhoff, Thévenin, Norton e resposta em frequência. Essencial para engenharia elétrica e mecatrônica.',
    level: 'Intermediário',
    area: 'Engenharia Elétrica',
    hours: 75,
    students: 610,
    rating: 3.9,
    icon: '⚡',
    color: '#d97706',
    bg: '#fffbeb',
    topics: ['Lei de Ohm', 'Kirchhoff', 'Thévenin e Norton', 'Capacitores', 'Fasores'],
    lessons: [
      { id: 1, title: 'Grandezas Elétricas Básicas', duration: '37min', videoUrl: null },
      { id: 2, title: 'Leis de Kirchhoff',            duration: '45min', videoUrl: null },
      { id: 3, title: 'Teorema de Thévenin',          duration: '48min', videoUrl: null },
      { id: 4, title: 'Capacitores e Indutores',      duration: '51min', videoUrl: null },
      { id: 5, title: 'Circuitos em CA e Fasores',    duration: '58min', videoUrl: null },
    ],
  },
  {
    id: 8,
    name: 'Resistência dos Materiais',
    code: 'ENM0025',
    description: 'Comportamento mecânico de sólidos sob cargas. Tensão, deformação, flexão, torção e flambagem. Crucial para dimensionamento de estruturas e componentes mecânicos.',
    level: 'Avançado',
    area: 'Engenharia Mecânica',
    hours: 90,
    students: 490,
    rating: 4.0,
    icon: '🔩',
    color: '#475569',
    bg: '#f8fafc',
    topics: ['Tensão e Deformação', 'Flexão Pura', 'Torção', 'Flambagem', 'Fadiga'],
    lessons: [
      { id: 1, title: 'Conceitos de Tensão Normal',  duration: '41min', videoUrl: null },
      { id: 2, title: 'Deformação e Lei de Hooke',   duration: '39min', videoUrl: null },
      { id: 3, title: 'Vigas sob Flexão',            duration: '53min', videoUrl: null },
      { id: 4, title: 'Torção em Eixos Circulares',  duration: '46min', videoUrl: null },
      { id: 5, title: 'Flambagem de Colunas',        duration: '50min', videoUrl: null },
    ],
  },
];

// ─── Helper components ────────────────────────────────────────────────────────

const levelConfig: Record<Level, { bg: string; color: string }> = {
  'Iniciante':     { bg: '#dcfce7', color: '#16a34a' },
  'Intermediário': { bg: '#fef9c3', color: '#ca8a04' },
  'Avançado':      { bg: '#fef2f2', color: '#dc2626' },
};

function StarRating({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          className="w-2.5 h-2.5"
          style={{ color: i <= Math.round(value) ? '#f59e0b' : '#e2e8f0', fill: i <= Math.round(value) ? '#f59e0b' : '#e2e8f0' }}
        />
      ))}
    </div>
  );
}

// ─── Video Player component ───────────────────────────────────────────────────
// To activate: replace videoUrl from null to a YouTube embed URL
// e.g. videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ"

function VideoPlayer({ videoUrl, lessonTitle }: { videoUrl: string | null; lessonTitle: string }) {
  if (videoUrl) {
    return (
      <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%' /* 16:9 */ }}>
        <iframe
          src={videoUrl}
          title={lessonTitle}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            borderRadius: '12px', border: 'none',
          }}
        />
      </div>
    );
  }

  // Placeholder — rendered when videoUrl is null
  return (
    <div
      style={{
        position: 'relative', width: '100%', paddingTop: '56.25%',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        borderRadius: '14px', overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px',
      }}>
        {/* Red play button à la YouTube */}
        <div style={{
          width: '52px', height: '52px', borderRadius: '50%',
          background: '#ff0000',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(255,0,0,0.5)',
        }}>
          <Play style={{ width: '20px', height: '20px', color: '#fff', marginLeft: '3px', fill: '#fff' }} />
        </div>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px', fontWeight: '500', textAlign: 'center', padding: '0 16px' }}>
          {lessonTitle}
        </p>
        <span style={{
          fontSize: '9px', color: 'rgba(255,255,255,0.4)', fontWeight: '600',
          textTransform: 'uppercase', letterSpacing: '0.1em',
          background: 'rgba(255,255,255,0.08)', paddingLeft: '8px', paddingRight: '8px', paddingTop: '3px', paddingBottom: '3px',
          borderRadius: '4px',
        }}>
          Aula em breve — videoUrl não definido
        </span>
      </div>
      {/* Scrubber bar */}
      <div style={{ position: 'absolute', bottom: '10px', left: '12px', right: '12px' }}>
        <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '2px', height: '3px' }}>
          <div style={{ width: '0%', height: '3px', background: '#ff0000', borderRadius: '2px' }} />
        </div>
      </div>
    </div>
  );
}

// ─── Detail screen ────────────────────────────────────────────────────────────

function SubjectDetail({ subject, onBack }: { subject: Subject; onBack: () => void }) {
  const [activeLesson, setActiveLesson] = useState<Lesson>(subject.lessons[0]);
  const lc = levelConfig[subject.level];

  return (
    <div className="h-full flex flex-col" style={{ background: '#f0f4f8' }}>
      {/* Header */}
      <div style={{ background: subject.color, padding: '14px 16px 18px', flexShrink: 0 }}>
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 mb-3"
          style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px', fontWeight: '600', paddingLeft: '30px' }}
        >
          <ChevronLeft className="w-4 h-4" />
          Cursos
        </button>
        <div className="flex items-start gap-3">
          <div style={{
            width: '46px', height: '46px', borderRadius: '14px',
            background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '18px', fontWeight: '800', color: '#fff', flexShrink: 0,
          }}>
            {subject.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="px-2 py-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', fontSize: '10px', fontWeight: '700' }}>
                {subject.area}
              </span>
              <span className="px-2 py-0.5 rounded-full" style={{ background: lc.bg, color: lc.color, fontSize: '10px', fontWeight: '700' }}>
                {subject.level}
              </span>
            </div>
            <h2 style={{ color: '#fff', fontSize: '18px', fontWeight: '800', lineHeight: 1.1 }}>{subject.name}</h2>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '11px', marginTop: '2px' }}>{subject.code}</p>
          </div>
        </div>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto">
        {/* Video area */}
        <div style={{ background: '#0f172a', padding: '14px' }}>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
            ▶ AULA ATUAL
          </p>
          {/* VideoPlayer uses the videoUrl variable from the lesson */}
          <VideoPlayer videoUrl={activeLesson.videoUrl} lessonTitle={activeLesson.title} />
          <p style={{ color: '#fff', fontSize: '13px', fontWeight: '700', marginTop: '10px' }}>{activeLesson.title}</p>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '11px', marginTop: '3px' }}>
            {subject.name} · {activeLesson.duration}
          </p>
        </div>

        <div className="p-4 flex flex-col gap-4">
          {/* About */}
          <div style={{ background: '#fff', borderRadius: '16px', padding: '14px 16px', border: '1px solid #e2e8f0' }}>
            <p style={{ color: '#0f172a', fontSize: '13px', fontWeight: '700', marginBottom: '6px' }}>Sobre a disciplina</p>
            <p style={{ color: '#64748b', fontSize: '12px', lineHeight: 1.65 }}>{subject.description}</p>
            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3 h-3" style={{ color: '#94a3b8' }} />
                <span style={{ color: '#64748b', fontSize: '11px' }}>{subject.hours}h de carga</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-3 h-3" style={{ color: '#94a3b8' }} />
                <span style={{ color: '#64748b', fontSize: '11px' }}>{subject.students.toLocaleString()} alunos</span>
              </div>
              <div className="flex items-center gap-1.5">
                <StarRating value={subject.rating} />
                <span style={{ color: '#64748b', fontSize: '11px' }}>{subject.rating}</span>
              </div>
            </div>
          </div>

          {/* Topics */}
          <div style={{ background: '#fff', borderRadius: '16px', padding: '14px 16px', border: '1px solid #e2e8f0' }}>
            <p style={{ color: '#0f172a', fontSize: '13px', fontWeight: '700', marginBottom: '10px' }}>Conteúdo programático</p>
            {subject.topics.map((t, i) => (
              <div key={i} className="flex items-center gap-2.5 mb-2.5">
                <div style={{ width: '20px', height: '20px', borderRadius: '6px', background: subject.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontSize: '9px', fontWeight: '700', color: subject.color }}>{i + 1}</span>
                </div>
                <span style={{ color: '#475569', fontSize: '12px' }}>{t}</span>
              </div>
            ))}
          </div>

          {/* Lessons list */}
          <div style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
            <div style={{ padding: '14px 16px 10px', borderBottom: '1px solid #f1f5f9' }}>
              <p style={{ color: '#0f172a', fontSize: '13px', fontWeight: '700' }}>Aulas</p>
            </div>
            {subject.lessons.map((lesson, idx) => {
              const isActive = lesson.id === activeLesson.id;
              return (
                <button
                  key={lesson.id}
                  onClick={() => setActiveLesson(lesson)}
                  className="w-full flex items-center gap-3"
                  style={{
                    padding: '12px 16px',
                    borderBottom: idx < subject.lessons.length - 1 ? '1px solid #f8fafc' : 'none',
                    background: isActive ? subject.bg : 'transparent',
                    textAlign: 'left',
                  }}
                >
                  <div style={{
                    width: '30px', height: '30px', borderRadius: '10px', flexShrink: 0,
                    background: isActive ? subject.color : '#f1f5f9',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {lesson.videoUrl
                      ? <Play className="w-3.5 h-3.5" style={{ color: isActive ? '#fff' : '#64748b', fill: isActive ? '#fff' : '#64748b', marginLeft: '1px' }} />
                      : <Lock className="w-3 h-3" style={{ color: isActive ? '#fff' : '#94a3b8' }} />
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <p style={{ color: isActive ? subject.color : '#0f172a', fontSize: '12px', fontWeight: isActive ? '700' : '500' }}>
                      {lesson.title}
                    </p>
                    <p style={{ color: '#94a3b8', fontSize: '10px', marginTop: '1px' }}>{lesson.duration}</p>
                  </div>
                  {isActive && (
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: subject.color, flexShrink: 0 }} />
                  )}
                </button>
              );
            })}
          </div>

          <div style={{ height: '8px' }} />
        </div>
      </div>
    </div>
  );
}

// ─── List screen ──────────────────────────────────────────────────────────────

const areaFilters = ['Todos', 'Matemática', 'Física', 'Computação', 'Engenharia Elétrica', 'Engenharia Mecânica'];

export default function Courses({ onNavigate }: NavProps) {
  const [selected, setSelected] = useState<Subject | null>(null);
  const [activeArea, setActiveArea] = useState('Todos');

  if (selected) {
    return <SubjectDetail subject={selected} onBack={() => setSelected(null)} />;
  }

  const filtered = subjects.filter(s =>
    activeArea === 'Todos' || s.area === activeArea
  );

  return (
    <div className="h-full flex flex-col" style={{ background: '#f0f4f8' }}>
      {/* Header */}
      <div style={{ background: '#1a3a6b', padding: '16px 20px 20px', flexShrink: 0 }}>
        <div className="flex items-center gap-3 mb-1" style={{ paddingLeft: '44px' }}>
          <div>
            <h2 className="font-bold" style={{ color: '#fff', fontSize: '20px' }}>Cursos de Engenharia</h2>
            <p style={{ color: '#93c5fd', fontSize: '13px' }}>Disciplinas com material de aula — UnB 2026/1</p>
          </div>
        </div>
        <div className="flex gap-2 mt-3">
          {[
            { label: 'Disciplinas', count: subjects.length, color: '#60a5fa' },
            { label: 'Horas', count: subjects.reduce((s, x) => s + x.hours, 0), color: '#34d399' },
            { label: 'Alunos', count: `${(subjects.reduce((s, x) => s + x.students, 0) / 1000).toFixed(1)}k`, color: '#fbbf24' },
          ].map(({ label, count, color }) => (
            <div key={label} className="flex-1 rounded-xl p-2.5 text-center" style={{ background: 'rgba(255,255,255,0.12)' }}>
              <p style={{ color, fontSize: '16px', fontWeight: '700' }}>{count}</p>
              <p style={{ color: '#93c5fd', fontSize: '10px' }}>{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Area filter */}
      <div className="overflow-x-auto px-4 py-3" style={{ flexShrink: 0, background: '#fff', borderBottom: '1px solid #e2e8f0' }}>
        <div className="flex gap-2" style={{ width: 'max-content' }}>
          {areaFilters.map(area => (
            <button
              key={area}
              onClick={() => setActiveArea(area)}
              className="px-3 py-1.5 rounded-full whitespace-nowrap"
              style={{
                background: activeArea === area ? '#1d4ed8' : '#f1f5f9',
                color: activeArea === area ? '#fff' : '#64748b',
                fontSize: '12px', fontWeight: '600',
              }}
            >
              {area}
            </button>
          ))}
        </div>
      </div>

      {/* Cards */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        {filtered.map(subject => {
          const lc = levelConfig[subject.level];
          return (
            <button
              key={subject.id}
              onClick={() => setSelected(subject)}
              className="w-full text-left"
              style={{
                background: '#fff',
                borderRadius: '16px',
                padding: '14px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
              }}
            >
              <div className="flex items-start gap-3">
                {/* Icon */}
                <div style={{
                  width: '48px', height: '48px', borderRadius: '14px',
                  background: subject.bg, border: `1.5px solid ${subject.color}22`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '18px', fontWeight: '800', color: subject.color, flexShrink: 0,
                  fontFamily: 'monospace',
                }}>
                  {subject.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="px-2 py-0.5 rounded-full" style={{ background: lc.bg, color: lc.color, fontSize: '10px', fontWeight: '700' }}>
                      {subject.level}
                    </span>
                    <span style={{ color: '#94a3b8', fontSize: '10px', fontWeight: '600' }}>{subject.area}</span>
                  </div>
                  <p className="font-bold" style={{ color: '#0f172a', fontSize: '14px' }}>{subject.name}</p>
                  <p style={{ color: '#64748b', fontSize: '11px', marginTop: '1px' }}>{subject.code}</p>

                  {/* Topics preview */}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {subject.topics.slice(0, 3).map(t => (
                      <span key={t} className="px-2 py-0.5 rounded-full" style={{ background: '#f1f5f9', color: '#475569', fontSize: '9px', fontWeight: '600' }}>
                        {t}
                      </span>
                    ))}
                    {subject.topics.length > 3 && (
                      <span style={{ color: '#94a3b8', fontSize: '9px', fontWeight: '600', padding: '2px 0' }}>
                        +{subject.topics.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-3 h-3" style={{ color: '#94a3b8' }} />
                        <span style={{ color: '#64748b', fontSize: '10px' }}>{subject.lessons.length} aulas</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" style={{ color: '#94a3b8' }} />
                        <span style={{ color: '#64748b', fontSize: '10px' }}>{subject.hours}h</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <StarRating value={subject.rating} />
                        <span style={{ color: '#64748b', fontSize: '10px' }}>{subject.rating}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4" style={{ color: subject.color, flexShrink: 0 }} />
                  </div>
                </div>
              </div>
            </button>
          );
        })}
        <div style={{ height: '16px' }} />
      </div>
    </div>
  );
}
