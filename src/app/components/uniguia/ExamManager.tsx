import { useState } from 'react';
import { ChevronLeft, Plus, Edit2, Trash2, Check, X, BookOpen } from 'lucide-react';
import type { NavProps } from './types';

interface Exam {
  id: number;
  subject: string;
  subjectColor: string;
  title: string;
  date: string;
  time: string;
  room: string;
  notes: string;
  done: boolean;
}

const SUBJECTS = [
  { name: 'Cálculo 1',               color: '#3b82f6' },
  { name: 'Humanidades e Cidadania',  color: '#8b5cf6' },
  { name: 'Algoritmos e Programação', color: '#22c55e' },
  { name: 'Física 1',                 color: '#f97316' },
];

const initialExams: Exam[] = [
  {
    id: 1,
    subject: 'Física 1',
    subjectColor: '#f97316',
    title: 'Prova 2 — Módulos 3 e 4',
    date: '17/06/2026',
    time: '17:00',
    room: 'FIS-A01/4',
    notes: 'Dinâmica, energia cinética e potencial, trabalho.',
    done: false,
  },
  {
    id: 2,
    subject: 'Cálculo 1',
    subjectColor: '#3b82f6',
    title: 'Prova 2 — Derivadas e Integrais',
    date: '20/06/2026',
    time: '08:00',
    room: 'ICC Sul AT-024/6',
    notes: 'Regra da cadeia, integrais por substituição.',
    done: false,
  },
];

interface FormState {
  subject: string;
  subjectColor: string;
  title: string;
  date: string;
  time: string;
  room: string;
  notes: string;
}

const emptyForm: FormState = {
  subject: SUBJECTS[0].name,
  subjectColor: SUBJECTS[0].color,
  title: '',
  date: '',
  time: '',
  room: '',
  notes: '',
};

export default function ExamManager({ onNavigate }: NavProps) {
  const [exams, setExams] = useState<Exam[]>(initialExams);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

  const pending = exams.filter(e => !e.done);
  const done = exams.filter(e => e.done);

  const openAdd = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  };

  const openEdit = (exam: Exam) => {
    setForm({
      subject: exam.subject,
      subjectColor: exam.subjectColor,
      title: exam.title,
      date: exam.date,
      time: exam.time,
      room: exam.room,
      notes: exam.notes,
    });
    setEditingId(exam.id);
    setShowForm(true);
  };

  const saveForm = () => {
    if (!form.title.trim() || !form.date.trim()) return;
    if (editingId !== null) {
      setExams(prev => prev.map(e =>
        e.id === editingId ? { ...e, ...form } : e
      ));
    } else {
      setExams(prev => [...prev, {
        id: Date.now(),
        ...form,
        done: false,
      }]);
    }
    setShowForm(false);
    setEditingId(null);
  };

  const toggleDone = (id: number) => {
    setExams(prev => prev.map(e => e.id === id ? { ...e, done: !e.done } : e));
  };

  const deleteExam = (id: number) => {
    setExams(prev => prev.filter(e => e.id !== id));
    setConfirmDelete(null);
  };

  const handleSubjectChange = (name: string) => {
    const sub = SUBJECTS.find(s => s.name === name);
    setForm(f => ({ ...f, subject: name, subjectColor: sub?.color ?? '#64748b' }));
  };

  return (
    <div className="h-full flex flex-col" style={{ background: '#f0f4f8' }}>
      {/* Header */}
      <div style={{ background: '#1a3a6b', padding: '16px 20px 20px' }}>
        <div className="flex items-center gap-3 mb-1">
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex items-center justify-center"
            style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'rgba(255,255,255,0.15)' }}
          >
            <ChevronLeft className="w-4 h-4 text-white" />
          </button>
          <div className="flex-1">
            <h2 className="font-bold" style={{ color: '#fff', fontSize: '18px' }}>Provas e Avaliações</h2>
            <p style={{ color: '#93c5fd', fontSize: '12px' }}>
              {pending.length} pendente{pending.length !== 1 ? 's' : ''} · 2026/1
            </p>
          </div>
          <button
            onClick={openAdd}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl"
            style={{ background: '#1d4ed8', color: '#fff', fontSize: '13px', fontWeight: '600' }}
          >
            <Plus className="w-3.5 h-3.5" />
            Adicionar
          </button>
        </div>
      </div>

      {/* Form overlay */}
      {showForm && (
        <div
          style={{
            position: 'absolute', inset: 0, zIndex: 30,
            background: 'rgba(0,0,0,0.4)',
            display: 'flex', alignItems: 'flex-end',
          }}
        >
          <div style={{
            width: '100%', background: '#fff',
            borderRadius: '24px 24px 0 0',
            padding: '20px',
            maxHeight: '85%',
            overflowY: 'auto',
          }}>
            <div className="flex items-center justify-between mb-4">
              <h3 style={{ color: '#0f172a', fontSize: '16px', fontWeight: '700' }}>
                {editingId ? 'Editar prova' : 'Nova prova'}
              </h3>
              <button onClick={() => setShowForm(false)}>
                <X className="w-5 h-5" style={{ color: '#94a3b8' }} />
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {/* Subject */}
              <div>
                <label style={{ color: '#64748b', fontSize: '12px', fontWeight: '600', display: 'block', marginBottom: '4px' }}>
                  Disciplina *
                </label>
                <select
                  value={form.subject}
                  onChange={e => handleSubjectChange(e.target.value)}
                  style={{
                    width: '100%', border: '1.5px solid #e2e8f0', borderRadius: '12px',
                    padding: '11px 14px', fontSize: '14px', color: '#0f172a',
                    background: '#fff', outline: 'none',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center',
                    appearance: 'none', WebkitAppearance: 'none',
                  }}
                >
                  {SUBJECTS.map(s => (
                    <option key={s.name} value={s.name}>{s.name}</option>
                  ))}
                </select>
              </div>

              {/* Title */}
              <div>
                <label style={{ color: '#64748b', fontSize: '12px', fontWeight: '600', display: 'block', marginBottom: '4px' }}>
                  Título / descrição *
                </label>
                <input
                  value={form.title}
                  onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  placeholder="Ex: Prova 2 — Derivadas e Integrais"
                  style={{
                    width: '100%', border: '1.5px solid #e2e8f0', borderRadius: '12px',
                    padding: '11px 14px', fontSize: '14px', color: '#0f172a',
                    background: '#fff', outline: 'none',
                  }}
                />
              </div>

              {/* Date + Time */}
              <div className="flex gap-2">
                <div style={{ flex: 1 }}>
                  <label style={{ color: '#64748b', fontSize: '12px', fontWeight: '600', display: 'block', marginBottom: '4px' }}>
                    Data *
                  </label>
                  <input
                    value={form.date}
                    onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                    placeholder="DD/MM/AAAA"
                    style={{
                      width: '100%', border: '1.5px solid #e2e8f0', borderRadius: '12px',
                      padding: '11px 14px', fontSize: '14px', color: '#0f172a',
                      background: '#fff', outline: 'none',
                    }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ color: '#64748b', fontSize: '12px', fontWeight: '600', display: 'block', marginBottom: '4px' }}>
                    Horário
                  </label>
                  <input
                    value={form.time}
                    onChange={e => setForm(f => ({ ...f, time: e.target.value }))}
                    placeholder="HH:MM"
                    style={{
                      width: '100%', border: '1.5px solid #e2e8f0', borderRadius: '12px',
                      padding: '11px 14px', fontSize: '14px', color: '#0f172a',
                      background: '#fff', outline: 'none',
                    }}
                  />
                </div>
              </div>

              {/* Room */}
              <div>
                <label style={{ color: '#64748b', fontSize: '12px', fontWeight: '600', display: 'block', marginBottom: '4px' }}>
                  Local / Sala
                </label>
                <input
                  value={form.room}
                  onChange={e => setForm(f => ({ ...f, room: e.target.value }))}
                  placeholder="Ex: ICC Sul AT-024/6"
                  style={{
                    width: '100%', border: '1.5px solid #e2e8f0', borderRadius: '12px',
                    padding: '11px 14px', fontSize: '14px', color: '#0f172a',
                    background: '#fff', outline: 'none',
                  }}
                />
              </div>

              {/* Notes */}
              <div>
                <label style={{ color: '#64748b', fontSize: '12px', fontWeight: '600', display: 'block', marginBottom: '4px' }}>
                  Conteúdo / observações
                </label>
                <textarea
                  value={form.notes}
                  onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                  placeholder="Ex: Derivadas, integrais, regra da cadeia..."
                  rows={3}
                  style={{
                    width: '100%', border: '1.5px solid #e2e8f0', borderRadius: '12px',
                    padding: '11px 14px', fontSize: '14px', color: '#0f172a',
                    background: '#fff', outline: 'none', resize: 'none',
                  }}
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setShowForm(false)}
                  style={{
                    flex: 1, padding: '14px', borderRadius: '14px',
                    background: '#f1f5f9', color: '#64748b',
                    fontSize: '14px', fontWeight: '600',
                  }}
                >
                  Cancelar
                </button>
                <button
                  onClick={saveForm}
                  style={{
                    flex: 2, padding: '14px', borderRadius: '14px',
                    background: !form.title.trim() || !form.date.trim() ? '#94a3b8' : '#1d4ed8',
                    color: '#fff', fontSize: '14px', fontWeight: '600',
                  }}
                  disabled={!form.title.trim() || !form.date.trim()}
                >
                  {editingId ? 'Salvar alterações' : 'Adicionar prova'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">

        {/* Pending exams */}
        {pending.length > 0 && (
          <>
            <p style={{ color: '#64748b', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Pendentes — {pending.length}
            </p>
            {pending.map(exam => (
              <ExamCard
                key={exam.id}
                exam={exam}
                onEdit={() => openEdit(exam)}
                onDelete={() => setConfirmDelete(exam.id)}
                onToggle={() => toggleDone(exam.id)}
                confirmDelete={confirmDelete === exam.id}
                onCancelDelete={() => setConfirmDelete(null)}
                onConfirmDelete={() => deleteExam(exam.id)}
              />
            ))}
          </>
        )}

        {/* Empty state */}
        {pending.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8" style={{ color: '#94a3b8' }}>
            <BookOpen className="w-10 h-10 mb-3 opacity-30" />
            <p style={{ fontSize: '14px', fontWeight: '500' }}>Nenhuma prova pendente</p>
            <p style={{ fontSize: '12px', marginTop: '4px' }}>Clique em "Adicionar" para cadastrar uma prova</p>
          </div>
        )}

        {/* Done exams */}
        {done.length > 0 && (
          <>
            <p style={{ color: '#94a3b8', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '4px' }}>
              Realizadas — {done.length}
            </p>
            {done.map(exam => (
              <ExamCard
                key={exam.id}
                exam={exam}
                onEdit={() => openEdit(exam)}
                onDelete={() => setConfirmDelete(exam.id)}
                onToggle={() => toggleDone(exam.id)}
                confirmDelete={confirmDelete === exam.id}
                onCancelDelete={() => setConfirmDelete(null)}
                onConfirmDelete={() => deleteExam(exam.id)}
              />
            ))}
          </>
        )}

        <div style={{ height: '16px' }} />
      </div>

      {/* FAB */}
      <div style={{ position: 'absolute', bottom: '84px', right: '16px' }}>
        <button
          onClick={openAdd}
          className="flex items-center justify-center shadow-lg"
          style={{ width: '52px', height: '52px', borderRadius: '16px', background: '#1d4ed8' }}
        >
          <Plus className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
}

interface ExamCardProps {
  exam: Exam;
  onEdit: () => void;
  onDelete: () => void;
  onToggle: () => void;
  confirmDelete: boolean;
  onCancelDelete: () => void;
  onConfirmDelete: () => void;
}

function ExamCard({ exam, onEdit, onDelete, onToggle, confirmDelete, onCancelDelete, onConfirmDelete }: ExamCardProps) {
  return (
    <div style={{
      background: exam.done ? '#f8fafc' : '#fff',
      borderRadius: '16px',
      border: exam.done ? '1px solid #e2e8f0' : `2px solid ${exam.subjectColor}40`,
      overflow: 'hidden',
      boxShadow: exam.done ? 'none' : '0 2px 8px rgba(0,0,0,0.06)',
    }}>
      {/* Color bar */}
      <div style={{ height: '4px', background: exam.done ? '#e2e8f0' : exam.subjectColor }} />

      <div style={{ padding: '14px' }}>
        <div className="flex items-start gap-3">
          {/* Checkbox */}
          <button
            onClick={onToggle}
            className="flex items-center justify-center flex-shrink-0 mt-0.5"
            style={{
              width: '22px', height: '22px', borderRadius: '7px',
              border: exam.done ? 'none' : '2px solid #cbd5e1',
              background: exam.done ? '#16a34a' : 'transparent',
            }}
          >
            {exam.done && <Check className="w-3 h-3 text-white" />}
          </button>

          <div className="flex-1 min-w-0">
            {/* Subject badge */}
            <div className="flex items-center gap-2 mb-1.5">
              <div
                className="px-2 py-0.5 rounded-full"
                style={{ background: `${exam.subjectColor}18`, border: `1px solid ${exam.subjectColor}40` }}
              >
                <span style={{ color: exam.subjectColor, fontSize: '10px', fontWeight: '700' }}>
                  {exam.subject.split(' ').slice(0, 2).join(' ')}
                </span>
              </div>
              {!exam.done && (
                <span style={{ color: '#dc2626', fontSize: '10px', fontWeight: '600' }}>
                   {exam.date}
                </span>
              )}
              {exam.done && (
                <span style={{ color: '#94a3b8', fontSize: '10px' }}>✅ Realizada</span>
              )}
            </div>

            <p style={{
              color: exam.done ? '#94a3b8' : '#0f172a',
              fontSize: '14px',
              fontWeight: '600',
              textDecoration: exam.done ? 'line-through' : 'none',
              marginBottom: '4px',
            }}>
              {exam.title}
            </p>

            {!exam.done && (
              <div className="flex flex-col gap-1 mb-2">
                {exam.time && (
                  <span style={{ color: '#64748b', fontSize: '12px' }}> {exam.time}h</span>
                )}
                {exam.room && (
                  <span style={{ color: '#64748b', fontSize: '12px' }}> {exam.room}</span>
                )}
                {exam.notes && (
                  <span style={{ color: '#64748b', fontSize: '12px' }}> {exam.notes}</span>
                )}
              </div>
            )}

            {/* Confirm delete */}
            {confirmDelete ? (
              <div className="flex items-center gap-2 mt-2">
                <span style={{ color: '#dc2626', fontSize: '12px', flex: 1 }}>Remover esta prova?</span>
                <button
                  onClick={onConfirmDelete}
                  style={{ background: '#dc2626', color: '#fff', padding: '4px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: '700' }}
                >
                  Sim
                </button>
                <button
                  onClick={onCancelDelete}
                  style={{ background: '#f1f5f9', color: '#64748b', padding: '4px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: '700' }}
                >
                  Não
                </button>
              </div>
            ) : (
              <div className="flex gap-2 mt-2">
                <button
                  onClick={onEdit}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
                  style={{ background: '#f1f5f9', color: '#475569', fontSize: '11px', fontWeight: '600' }}
                >
                  <Edit2 className="w-3 h-3" />
                  Editar
                </button>
                <button
                  onClick={onDelete}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
                  style={{ background: '#fef2f2', color: '#dc2626', fontSize: '11px', fontWeight: '600' }}
                >
                  <Trash2 className="w-3 h-3" />
                  Remover
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
