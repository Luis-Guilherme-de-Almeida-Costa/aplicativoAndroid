import { useState } from 'react';
import { ChevronLeft, Search, Plus, Check } from 'lucide-react';
import type { NavProps } from './types';

const filters = ['Todos', 'Obrigatórias', 'Optativas', 'Com vagas', 'Sem choque', 'Meu fluxo'];

// hasConflict: true = choque com grade atual
// inFlow: true = está no fluxo do curso
const availableSubjects = [
  { id: 1, name: 'Cálculo 2',                   code: 'MAT0026', credits: 6, schedule: 'Seg/Qua/Sex 08h', class: 'Turma A', seats: 12, type: 'Obrigatória', hasConflict: false, inFlow: true  },
  { id: 2, name: 'Estruturas de Dados',          code: 'CIC0003', credits: 4, schedule: 'Ter/Qui 10h',     class: 'Turma B', seats: 5,  type: 'Obrigatória', hasConflict: true,  inFlow: true  },
  { id: 3, name: 'Probabilidade e Estatística',  code: 'EST0001', credits: 4, schedule: 'Seg/Qua 14h',     class: 'Turma A', seats: 20, type: 'Obrigatória', hasConflict: false, inFlow: true  },
  { id: 4, name: 'Fundamentos de Banco de Dados',code: 'CIC0097', credits: 4, schedule: 'Ter/Qui 16h',     class: 'Turma C', seats: 8,  type: 'Obrigatória', hasConflict: false, inFlow: true  },
  { id: 5, name: 'Lógica Computacional',         code: 'CIC0201', credits: 4, schedule: 'Sex 08h',         class: 'Turma A', seats: 15, type: 'Optativa',    hasConflict: false, inFlow: false },
  { id: 6, name: 'Computação e Sociedade',       code: 'CIC0099', credits: 2, schedule: 'Qua 16h',         class: 'Turma D', seats: 30, type: 'Optativa',    hasConflict: false, inFlow: false },
  { id: 7, name: 'Introdução à IA',              code: 'CIC0135', credits: 4, schedule: 'Sex 14h',         class: 'Turma A', seats: 0,  type: 'Optativa',    hasConflict: false, inFlow: false },
  { id: 8, name: 'Engenharia de Software 1',     code: 'CIC0101', credits: 4, schedule: 'Ter/Qui 08h',     class: 'Turma B', seats: 10, type: 'Obrigatória', hasConflict: false, inFlow: true  },
];

export default function PlanSemester({ onNavigate }: NavProps) {
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [search, setSearch] = useState('');
  const [added, setAdded] = useState<number[]>([]);

  const toggleAdd = (id: number) => {
    setAdded(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const filtered = availableSubjects.filter(s => {
    const matchesSearch = !search ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.code.toLowerCase().includes(search.toLowerCase());

    let matchesFilter = true;
    if (activeFilter === 'Obrigatórias') matchesFilter = s.type === 'Obrigatória';
    else if (activeFilter === 'Optativas') matchesFilter = s.type === 'Optativa';
    else if (activeFilter === 'Com vagas') matchesFilter = s.seats > 0;
    else if (activeFilter === 'Sem choque') matchesFilter = !s.hasConflict;
    else if (activeFilter === 'Meu fluxo') matchesFilter = s.inFlow;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="h-full flex flex-col" style={{ background: '#f0f4f8' }}>
      {/* Header */}
      <div style={{ background: '#1a3a6b', padding: '16px 20px 20px' }}>
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={() => onNavigate('subjects')}
            className="flex items-center justify-center"
            style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'rgba(255,255,255,0.15)' }}
          >
            <ChevronLeft className="w-4 h-4 text-white" />
          </button>
          <div>
            <h2 className="font-bold" style={{ color: '#ffffff', fontSize: '17px' }}>Planejar Novo Semestre</h2>
            <p style={{ color: '#93c5fd', fontSize: '12px' }}>2026/2 — Darcy Ribeiro</p>
          </div>
        </div>

        {/* Selectors */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          {[
            { label: 'Curso', value: 'Eng. Software' },
            { label: 'Semestre', value: '2026/2' },
            { label: 'Turno', value: 'Diurno' },
          ].map(({ label, value }) => (
            <div key={label} style={{ background: 'rgba(255,255,255,0.12)', borderRadius: '10px', padding: '8px 10px' }}>
              <p style={{ color: '#93c5fd', fontSize: '10px', marginBottom: '1px' }}>{label}</p>
              <p style={{ color: '#fff', fontSize: '12px', fontWeight: '600' }}>{value}</p>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="flex items-center gap-2" style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '12px', padding: '10px 12px' }}>
          <Search className="w-4 h-4" style={{ color: '#93c5fd', flexShrink: 0 }} />
          <input
            className="flex-1 bg-transparent outline-none"
            style={{ color: '#fff', fontSize: '13px' }}
            placeholder="Buscar disciplinas disponíveis no SIGAA"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Filters */}
      <div className="overflow-x-auto px-4 py-3" style={{ flexShrink: 0 }}>
        <div className="flex gap-2" style={{ width: 'max-content' }}>
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className="px-3 py-1.5 rounded-full whitespace-nowrap"
              style={{
                background: activeFilter === f ? '#1d4ed8' : '#fff',
                color: activeFilter === f ? '#fff' : '#64748b',
                fontSize: '12px',
                fontWeight: '500',
                border: activeFilter === f ? 'none' : '1px solid #e2e8f0',
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Subject list */}
      <div className="flex-1 overflow-y-auto px-4 flex flex-col gap-3">
        {/* Créditos selecionados */}
        {added.length > 0 && (
          <div
            className="flex items-center justify-between px-3 py-2 rounded-xl"
            style={{ background: '#eff6ff', border: '1.5px solid #bfdbfe' }}
          >
            <span style={{ color: '#1d4ed8', fontSize: '13px', fontWeight: '500' }}>
              {added.length} disciplina{added.length > 1 ? 's' : ''} selecionada{added.length > 1 ? 's' : ''}
            </span>
            <button
              onClick={() => onNavigate('schedule-builder')}
              style={{ color: '#1d4ed8', fontSize: '13px', fontWeight: '600' }}
            >
              Ver grade →
            </button>
          </div>
        )}

        {filtered.map(sub => {
          const isAdded = added.includes(sub.id);
          return (
            <div
              key={sub.id}
              style={{
                background: '#fff',
                borderRadius: '14px',
                padding: '14px',
                border: isAdded ? '2px solid #1d4ed8' : '1px solid #e2e8f0',
              }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="px-2 py-0.5 rounded-full"
                      style={{
                        background: sub.type === 'Obrigatória' ? '#eff6ff' : '#f5f3ff',
                        color: sub.type === 'Obrigatória' ? '#1d4ed8' : '#7c3aed',
                        fontSize: '10px',
                        fontWeight: '700',
                      }}
                    >
                      {sub.type}
                    </span>
                    <span style={{ color: '#94a3b8', fontSize: '10px' }}>{sub.code}</span>
                  </div>
                  <p className="font-semibold" style={{ color: '#0f172a', fontSize: '14px' }}>{sub.name}</p>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span style={{ color: '#64748b', fontSize: '11px' }}>🕐 {sub.schedule}</span>
                    <span style={{ color: '#64748b', fontSize: '11px' }}>• {sub.credits} cr.</span>
                    <span style={{ color: '#64748b', fontSize: '11px' }}>• {sub.class}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <div style={{
                      width: '6px', height: '6px', borderRadius: '50%',
                      background: sub.seats > 10 ? '#22c55e' : sub.seats > 0 ? '#f59e0b' : '#ef4444',
                    }} />
                    <span style={{
                      fontSize: '11px',
                      color: sub.seats > 10 ? '#16a34a' : sub.seats > 0 ? '#ca8a04' : '#dc2626',
                    }}>
                      {sub.seats} vagas disponíveis
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => toggleAdd(sub.id)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl flex-shrink-0"
                  style={{
                    background: isAdded ? '#eff6ff' : '#1d4ed8',
                    color: isAdded ? '#1d4ed8' : '#fff',
                    fontSize: '12px',
                    fontWeight: '600',
                    border: isAdded ? '1.5px solid #bfdbfe' : 'none',
                  }}
                >
                  {isAdded ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  {isAdded ? 'Adicionado' : 'Adicionar'}
                </button>
              </div>
            </div>
          );
        })}

        <div style={{ height: '16px' }} />
      </div>

      {/* Bottom action */}
      {added.length > 0 && (
        <div className="p-4">
          <button
            onClick={() => onNavigate('schedule-builder')}
            className="w-full font-semibold"
            style={{
              background: '#1d4ed8',
              color: '#fff',
              padding: '16px',
              borderRadius: '16px',
              fontSize: '15px',
            }}
          >
            Montar grade ({added.length} disciplinas)
          </button>
        </div>
      )}
    </div>
  );
}
