import { ChevronRight, Clock, MapPin, User, AlertCircle, CalendarPlus, Plus } from 'lucide-react';
import type { NavProps } from './types';

const subjects = [
  {
    id: 1,
    name: 'Cálculo 1',
    code: 'MAT0025',
    professor: 'Prof. Ricardo Alves',
    schedule: 'Seg/Qua/Sex 08h–10h',
    room: 'ICC Sul — AT-024/6',
    progress: 62,
    absences: 2,
    maxAbsences: 15,
    nextActivity: 'Prova 2 — 20/06',
    nextType: 'prova',
    color: '#3b82f6',
    lightColor: '#eff6ff',
    credits: 6,
  },
  {
    id: 2,
    name: 'Humanidades e Cidadania',
    code: 'FCI0116',
    professor: 'Profa. Carla Mendes',
    schedule: 'Ter/Qui 14h–16h',
    room: 'ICC Norte — BT-104/2',
    progress: 75,
    absences: 0,
    maxAbsences: 10,
    nextActivity: 'Trabalho — 14/06',
    nextType: 'tarefa',
    color: '#8b5cf6',
    lightColor: '#f5f3ff',
    credits: 4,
  },
  {
    id: 3,
    name: 'Algoritmos e Programação',
    code: 'CIC0004',
    professor: 'Prof. André Lima',
    schedule: 'Ter/Qui 10h–12h',
    room: 'CIC — CIC-117/2',
    progress: 48,
    absences: 4,
    maxAbsences: 15,
    nextActivity: 'Projeto final — 25/06',
    nextType: 'projeto',
    color: '#22c55e',
    lightColor: '#f0fdf4',
    credits: 6,
  },
  {
    id: 4,
    name: 'Física 1',
    code: 'FIS0110',
    professor: 'Prof. Paulo Costa',
    schedule: 'Seg/Qua 16h–18h',
    room: 'FIS — FIS-A01/4',
    progress: 55,
    absences: 6,
    maxAbsences: 15,
    nextActivity: 'Prova 2 — 17/06',
    nextType: 'prova',
    color: '#f97316',
    lightColor: '#fff7ed',
    credits: 6,
  },
];

const nextTypeColors: Record<string, { bg: string; color: string }> = {
  prova: { bg: '#fef2f2', color: '#dc2626' },
  tarefa: { bg: '#fef9c3', color: '#ca8a04' },
  projeto: { bg: '#f0fdf4', color: '#16a34a' },
};

export default function Subjects({ onNavigate }: NavProps) {
  return (
    <div className="h-full flex flex-col" style={{ background: '#f0f4f8' }}>
      {/* Header */}
      <div style={{ background: '#1a3a6b', padding: '16px 20px 20px' }}>
        <h2 className="font-bold mb-1" style={{ color: '#ffffff', fontSize: '20px' }}>
          Minhas Disciplinas
        </h2>
        <p style={{ color: '#93c5fd', fontSize: '13px' }}>2026/1 — 4º semestre • 22 créditos</p>

        <div className="flex gap-2 mt-3">
          <button
            onClick={() => onNavigate('plan-semester')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl"
            style={{ background: '#1d4ed8', color: '#fff', fontSize: '13px', fontWeight: '500' }}
          >
            <CalendarPlus className="w-3.5 h-3.5" />
            Planejar Semestre
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        {subjects.map(sub => {
          const absencePercent = Math.round((sub.absences / sub.maxAbsences) * 100);
          const absenceWarning = absencePercent >= 50;
          const nextColors = nextTypeColors[sub.nextType] || { bg: '#f1f5f9', color: '#64748b' };

          return (
            <div
              key={sub.id}
              style={{
                background: '#fff',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid #e2e8f0',
                boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
              }}
            >
              {/* Color bar + title */}
              <div style={{ borderLeft: `4px solid ${sub.color}`, padding: '14px 14px 10px' }}>
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span
                        className="px-2 py-0.5 rounded-full"
                        style={{ background: sub.lightColor, color: sub.color, fontSize: '10px', fontWeight: '700' }}
                      >
                        {sub.credits} créditos
                      </span>
                      <span style={{ color: '#94a3b8', fontSize: '10px' }}>{sub.code}</span>
                    </div>
                    <h3 className="font-bold" style={{ color: '#0f172a', fontSize: '15px' }}>{sub.name}</h3>
                  </div>
                  <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: '#94a3b8', marginTop: '2px' }} />
                </div>
              </div>

              {/* Details */}
              <div style={{ padding: '0 14px 12px', borderTop: '1px solid #f8fafc' }}>
                <div className="flex flex-col gap-1.5 mb-3">
                  <div className="flex items-center gap-2">
                    <User className="w-3 h-3 flex-shrink-0" style={{ color: '#94a3b8' }} />
                    <span style={{ color: '#64748b', fontSize: '12px' }}>{sub.professor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3 flex-shrink-0" style={{ color: '#94a3b8' }} />
                    <span style={{ color: '#64748b', fontSize: '12px' }}>{sub.schedule}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3 h-3 flex-shrink-0" style={{ color: '#94a3b8' }} />
                    <span style={{ color: '#64748b', fontSize: '12px' }}>{sub.room}</span>
                  </div>
                </div>

                {/* Progress */}
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span style={{ color: '#64748b', fontSize: '11px' }}>Progresso do semestre</span>
                    <span style={{ color: '#334155', fontSize: '11px', fontWeight: '600' }}>{sub.progress}%</span>
                  </div>
                  <div style={{ background: '#f1f5f9', borderRadius: '999px', height: '5px' }}>
                    <div style={{
                      background: sub.color,
                      borderRadius: '999px',
                      height: '5px',
                      width: `${sub.progress}%`,
                    }} />
                  </div>
                </div>

                {/* Faltas + próxima atividade */}
                <div className="flex items-center gap-2">
                  <div
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg"
                    style={{ background: absenceWarning ? '#fef2f2' : '#f1f5f9' }}
                  >
                    {absenceWarning && <AlertCircle className="w-3 h-3" style={{ color: '#dc2626' }} />}
                    <span style={{ color: absenceWarning ? '#dc2626' : '#64748b', fontSize: '11px', fontWeight: '500' }}>
                      {sub.absences}/{sub.maxAbsences} faltas
                    </span>
                  </div>
                  <div
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg flex-1"
                    style={{ background: nextColors.bg }}
                  >
                    <span style={{ color: nextColors.color, fontSize: '11px', fontWeight: '500' }}>
                      📌 {sub.nextActivity}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        <div style={{ height: '16px' }} />
      </div>

      {/* FAB */}
  
    </div>
  );
}
