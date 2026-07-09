import { useState } from 'react';
import { Plus, ChevronLeft, X, Trash2 } from 'lucide-react';
import type { NavProps } from './types';

interface Task {
  id: number;
  title: string;
  subject: string;
  subjectColor: string;
  deadline: string;
  priority: 'Alta' | 'Média' | 'Baixa';
  checklist: { label: string; done: boolean }[];
}

type Column = 'todo' | 'doing' | 'review' | 'done';

const COLUMNS: { id: Column; label: string; color: string; bg: string }[] = [
  { id: 'todo',   label: 'A fazer',      color: '#64748b', bg: '#f1f5f9' },
  { id: 'doing',  label: 'Em andamento', color: '#1d4ed8', bg: '#eff6ff' },
  { id: 'review', label: 'Revisar',      color: '#ca8a04', bg: '#fef9c3' },
  { id: 'done',   label: 'Concluído',    color: '#16a34a', bg: '#dcfce7' },
];

const SUBJECTS = [
  { name: 'Cálculo 1',               color: '#3b82f6' },
  { name: 'Humanidades e Cidadania',  color: '#8b5cf6' },
  { name: 'Algoritmos e Programação', color: '#22c55e' },
  { name: 'Física 1',                 color: '#f97316' },
];

const PRIORITIES: ('Alta' | 'Média' | 'Baixa')[] = ['Alta', 'Média', 'Baixa'];

const priorityStyle: Record<string, { bg: string; color: string }> = {
  Alta:  { bg: '#fef2f2', color: '#dc2626' },
  Média: { bg: '#fef9c3', color: '#ca8a04' },
  Baixa: { bg: '#f0fdf4', color: '#16a34a' },
};

const initialTasks: Record<Column, Task[]> = {
  todo: [
    {
      id: 1,
      title: 'Resumo de Humanidades',
      subject: 'Humanidades e Cidadania',
      subjectColor: '#8b5cf6',
      deadline: '15/06',
      priority: 'Alta',
      checklist: [
        { label: 'Ler capítulo 4', done: false },
        { label: 'Fazer fichamento', done: false },
        { label: 'Escrever resumo', done: false },
      ],
    },
    {
      id: 2,
      title: 'Estudar para prova Cálculo',
      subject: 'Cálculo 1',
      subjectColor: '#3b82f6',
      deadline: '20/06',
      priority: 'Alta',
      checklist: [
        { label: 'Revisar limites', done: false },
        { label: 'Exercícios de derivada', done: false },
      ],
    },
    {
      id: 3,
      title: 'Lista de exercícios Física',
      subject: 'Física 1',
      subjectColor: '#f97316',
      deadline: '18/06',
      priority: 'Média',
      checklist: [{ label: 'Questões 1–10', done: false }],
    },
  ],
  doing: [
    {
      id: 4,
      title: 'Lista de Cálculo 3',
      subject: 'Cálculo 1',
      subjectColor: '#3b82f6',
      deadline: '12/06',
      priority: 'Alta',
      checklist: [
        { label: 'Questões ímpares', done: true },
        { label: 'Questões pares', done: false },
        { label: 'Conferir gabarito', done: false },
      ],
    },
    {
      id: 5,
      title: 'Projeto de Programação',
      subject: 'Algoritmos e Programação',
      subjectColor: '#22c55e',
      deadline: '25/06',
      priority: 'Média',
      checklist: [
        { label: 'Definir estrutura', done: true },
        { label: 'Implementar funções', done: false },
        { label: 'Testes', done: false },
      ],
    },
  ],
  review: [
    {
      id: 6,
      title: 'Revisão Física 1 — Módulo 2',
      subject: 'Física 1',
      subjectColor: '#f97316',
      deadline: '14/06',
      priority: 'Alta',
      checklist: [
        { label: 'Reler anotações', done: true },
        { label: 'Resolver exercícios', done: true },
        { label: 'Revisar fórmulas', done: false },
      ],
    },
  ],
  done: [
    {
      id: 7,
      title: 'Trabalho Humanidades — U1',
      subject: 'Humanidades e Cidadania',
      subjectColor: '#8b5cf6',
      deadline: '01/06',
      priority: 'Baixa',
      checklist: [
        { label: 'Pesquisa', done: true },
        { label: 'Redação', done: true },
        { label: 'Revisão', done: true },
      ],
    },
  ],
};

// ─── Task Card ────────────────────────────────────────────────────────────────

function TaskCard({ task }: { task: Task }) {
  const doneCount = task.checklist.filter(c => c.done).length;
  const pStyle = priorityStyle[task.priority];

  return (
    <div style={{
      background: '#fff',
      borderRadius: '14px',
      padding: '12px',
      border: '1px solid #e2e8f0',
      marginBottom: '8px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      width: '180px',
    }}>
      <div className="flex items-center justify-between mb-1.5">
        <div className="px-2 py-0.5 rounded-full" style={{ background: pStyle.bg }}>
          <span style={{ color: pStyle.color, fontSize: '10px', fontWeight: '700' }}>{task.priority}</span>
        </div>
        <span style={{ color: '#94a3b8', fontSize: '10px' }}>📅 {task.deadline}</span>
      </div>

      <p style={{ color: '#0f172a', fontSize: '13px', fontWeight: '600', marginBottom: '6px', lineHeight: 1.3 }}>
        {task.title}
      </p>

      <div
        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full mb-2"
        style={{ background: `${task.subjectColor}18`, border: `1px solid ${task.subjectColor}40` }}
      >
        <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: task.subjectColor }} />
        <span style={{ color: task.subjectColor, fontSize: '10px', fontWeight: '600' }}>
          {task.subject.split(' ').slice(0, 2).join(' ')}
        </span>
      </div>

      <div className="flex flex-col gap-1">
        {task.checklist.slice(0, 2).map((item, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div style={{
              width: '12px', height: '12px', borderRadius: '3px',
              border: item.done ? 'none' : '1.5px solid #cbd5e1',
              background: item.done ? '#1d4ed8' : 'transparent',
              flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {item.done && <span style={{ color: '#fff', fontSize: '8px', fontWeight: '700' }}>✓</span>}
            </div>
            <span style={{ color: item.done ? '#94a3b8' : '#64748b', fontSize: '11px', textDecoration: item.done ? 'line-through' : 'none' }}>
              {item.label}
            </span>
          </div>
        ))}
        {task.checklist.length > 2 && (
          <span style={{ color: '#94a3b8', fontSize: '10px', marginTop: '2px' }}>
            +{task.checklist.length - 2} itens • {doneCount}/{task.checklist.length} feitos
          </span>
        )}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

interface FormState {
  title: string;
  subject: string;
  subjectColor: string;
  column: Column;
  priority: 'Alta' | 'Média' | 'Baixa';
  deadline: string;
  checklistInput: string;
  checklist: { label: string; done: boolean }[];
}

const emptyForm = (): FormState => ({
  title: '',
  subject: SUBJECTS[0].name,
  subjectColor: SUBJECTS[0].color,
  column: 'todo',
  priority: 'Alta',
  deadline: '',
  checklistInput: '',
  checklist: [],
});

export default function Tasks({ onNavigate }: NavProps) {
  const [tasks, setTasks] = useState(initialTasks);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm());

  const pendingCount = tasks.todo.length + tasks.doing.length + tasks.review.length;

  const handleSubjectChange = (name: string) => {
    const sub = SUBJECTS.find(s => s.name === name);
    setForm(f => ({ ...f, subject: name, subjectColor: sub?.color ?? '#64748b' }));
  };

  const addChecklistItem = () => {
    const label = form.checklistInput.trim();
    if (!label) return;
    setForm(f => ({
      ...f,
      checklist: [...f.checklist, { label, done: false }],
      checklistInput: '',
    }));
  };

  const removeChecklistItem = (i: number) => {
    setForm(f => ({ ...f, checklist: f.checklist.filter((_, idx) => idx !== i) }));
  };

  const saveTask = () => {
    if (!form.title.trim()) return;
    const newTask: Task = {
      id: Date.now(),
      title: form.title.trim(),
      subject: form.subject,
      subjectColor: form.subjectColor,
      deadline: form.deadline || '—',
      priority: form.priority,
      checklist: form.checklist,
    };
    setTasks(prev => ({
      ...prev,
      [form.column]: [newTask, ...prev[form.column]],
    }));
    setShowForm(false);
    setForm(emptyForm());
  };

  return (
    <div className="h-full flex flex-col" style={{ background: '#f0f4f8', position: 'relative' }}>

      {/* Header */}
      <div style={{ background: '#1a3a6b', padding: '16px 20px 20px', flexShrink: 0 }}>
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex items-center justify-center flex-shrink-0"
            style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'rgba(255,255,255,0.15)' }}
          >
            <ChevronLeft className="w-4 h-4 text-white" />
          </button>
          <div className="flex-1">
            <h2 className="font-bold" style={{ color: '#fff', fontSize: '20px' }}>Tarefas</h2>
            <p style={{ color: '#93c5fd', fontSize: '13px' }}>
              {pendingCount} pendentes • {tasks.done.length} concluídas
            </p>
          </div>
          <button
            onClick={() => { setForm(emptyForm()); setShowForm(true); }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl"
            style={{ background: '#1d4ed8', color: '#fff', fontSize: '13px', fontWeight: '600' }}
          >
            <Plus className="w-3.5 h-3.5" />
            Nova tarefa
          </button>
        </div>
      </div>

      {/* Kanban board */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden">
        <div className="flex gap-3 px-4 pt-4 pb-4 h-full" style={{ width: 'max-content' }}>
          {COLUMNS.map(col => (
            <div key={col.id} style={{ width: '196px', display: 'flex', flexDirection: 'column', height: '100%' }}>
              {/* Column header */}
              <div
                className="flex items-center justify-between px-3 py-2 rounded-xl mb-2"
                style={{ background: col.bg, flexShrink: 0 }}
              >
                <div className="flex items-center gap-2">
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: col.color }} />
                  <span style={{ color: col.color, fontSize: '12px', fontWeight: '700' }}>{col.label}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span
                    className="flex items-center justify-center rounded-full"
                    style={{ width: '20px', height: '20px', background: col.color, color: '#fff', fontSize: '10px', fontWeight: '700' }}
                  >
                    {tasks[col.id].length}
                  </span>
                  <button
                    onClick={() => { setForm({ ...emptyForm(), column: col.id }); setShowForm(true); }}
                    style={{ color: col.color, opacity: 0.7 }}
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Cards */}
              <div className="flex-1 overflow-y-auto">
                {tasks[col.id].map(task => (
                  <TaskCard key={task.id} task={task} />
                ))}
                {tasks[col.id].length === 0 && (
                  <button
                    onClick={() => { setForm({ ...emptyForm(), column: col.id }); setShowForm(true); }}
                    className="flex flex-col items-center justify-center gap-1 w-full"
                    style={{ height: '72px', borderRadius: '12px', border: '1.5px dashed #cbd5e1', color: '#94a3b8', fontSize: '11px' }}
                  >
                    <Plus className="w-4 h-4 opacity-40" />
                    Adicionar tarefa
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Formulário (bottom sheet) ── */}
      {showForm && (
        <div
          style={{ position: 'absolute', inset: 0, zIndex: 40, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'flex-end' }}
          onClick={e => { if (e.target === e.currentTarget) setShowForm(false); }}
        >
          <div style={{
            width: '100%', background: '#fff', borderRadius: '24px 24px 0 0',
            padding: '20px 20px 28px', maxHeight: '88%', overflowY: 'auto',
          }}>

            {/* Sheet header */}
            <div className="flex items-center justify-between mb-5">
              <h3 style={{ color: '#0f172a', fontSize: '17px', fontWeight: '700' }}>Nova tarefa</h3>
              <button onClick={() => setShowForm(false)}>
                <X className="w-5 h-5" style={{ color: '#94a3b8' }} />
              </button>
            </div>

            <div className="flex flex-col gap-4">

              {/* Título */}
              <div>
                <label style={labelStyle}>Título *</label>
                <input
                  autoFocus
                  value={form.title}
                  onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  placeholder="Ex: Lista de exercícios Cálculo 2"
                  style={inputStyle(!!form.title)}
                />
              </div>

              {/* Disciplina */}
              <div>
                <label style={labelStyle}>Disciplina</label>
                <select
                  value={form.subject}
                  onChange={e => handleSubjectChange(e.target.value)}
                  style={selectStyle}
                >
                  {SUBJECTS.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
                </select>
              </div>

              {/* Coluna destino */}
              <div>
                <label style={labelStyle}>Adicionar em</label>
                <div className="flex gap-2 flex-wrap">
                  {COLUMNS.map(col => (
                    <button
                      key={col.id}
                      onClick={() => setForm(f => ({ ...f, column: col.id }))}
                      style={{
                        padding: '7px 14px', borderRadius: '10px', fontSize: '12px', fontWeight: '600',
                        background: form.column === col.id ? col.color : '#f1f5f9',
                        color: form.column === col.id ? '#fff' : '#64748b',
                        border: 'none',
                      }}
                    >
                      {col.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Prioridade */}
              <div>
                <label style={labelStyle}>Prioridade</label>
                <div className="flex gap-2">
                  {PRIORITIES.map(p => {
                    const ps = priorityStyle[p];
                    return (
                      <button
                        key={p}
                        onClick={() => setForm(f => ({ ...f, priority: p }))}
                        style={{
                          flex: 1, padding: '9px', borderRadius: '12px', fontSize: '13px', fontWeight: '600',
                          background: form.priority === p ? ps.bg : '#f8fafc',
                          color: form.priority === p ? ps.color : '#94a3b8',
                          border: form.priority === p ? `1.5px solid ${ps.color}60` : '1.5px solid #e2e8f0',
                        }}
                      >
                        {p}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Prazo */}
              <div>
                <label style={labelStyle}>Prazo</label>
                <input
                  value={form.deadline}
                  onChange={e => setForm(f => ({ ...f, deadline: e.target.value }))}
                  placeholder="Ex: 30/06"
                  style={inputStyle(false)}
                />
              </div>

              {/* Checklist */}
              <div>
                <label style={labelStyle}>Checklist (opcional)</label>
                {form.checklist.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 mb-2">
                    <div style={{ width: '14px', height: '14px', borderRadius: '4px', border: '1.5px solid #cbd5e1', flexShrink: 0 }} />
                    <span style={{ flex: 1, color: '#334155', fontSize: '13px' }}>{item.label}</span>
                    <button onClick={() => removeChecklistItem(i)}>
                      <Trash2 className="w-3.5 h-3.5" style={{ color: '#f87171' }} />
                    </button>
                  </div>
                ))}
                <div className="flex gap-2">
                  <input
                    value={form.checklistInput}
                    onChange={e => setForm(f => ({ ...f, checklistInput: e.target.value }))}
                    onKeyDown={e => e.key === 'Enter' && addChecklistItem()}
                    placeholder="Adicionar item..."
                    style={{ ...inputStyle(false), flex: 1 }}
                  />
                  <button
                    onClick={addChecklistItem}
                    style={{
                      width: '42px', height: '42px', borderRadius: '12px', flexShrink: 0,
                      background: form.checklistInput.trim() ? '#1d4ed8' : '#f1f5f9',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    <Plus className="w-4 h-4" style={{ color: form.checklistInput.trim() ? '#fff' : '#94a3b8' }} />
                  </button>
                </div>
              </div>

              {/* Botões */}
              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => setShowForm(false)}
                  style={{ flex: 1, padding: '14px', borderRadius: '14px', background: '#f1f5f9', color: '#64748b', fontSize: '14px', fontWeight: '600' }}
                >
                  Cancelar
                </button>
                <button
                  onClick={saveTask}
                  disabled={!form.title.trim()}
                  style={{
                    flex: 2, padding: '14px', borderRadius: '14px',
                    background: form.title.trim() ? '#1d4ed8' : '#94a3b8',
                    color: '#fff', fontSize: '14px', fontWeight: '700',
                  }}
                >
                  Criar tarefa
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Shared style helpers ──────────────────────────────────────────────────────

const labelStyle: React.CSSProperties = {
  color: '#64748b', fontSize: '12px', fontWeight: '700',
  display: 'block', marginBottom: '6px',
  textTransform: 'uppercase', letterSpacing: '0.05em',
};

const inputStyle = (filled: boolean): React.CSSProperties => ({
  width: '100%', border: `1.5px solid ${filled ? '#bfdbfe' : '#e2e8f0'}`,
  borderRadius: '12px', padding: '11px 14px', fontSize: '14px',
  color: '#0f172a', background: '#f8fafc', outline: 'none',
});

const selectStyle: React.CSSProperties = {
  width: '100%', border: '1.5px solid #e2e8f0', borderRadius: '12px',
  padding: '11px 14px', fontSize: '14px', color: '#0f172a',
  background: '#f8fafc', outline: 'none', appearance: 'none', WebkitAppearance: 'none',
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center',
};
