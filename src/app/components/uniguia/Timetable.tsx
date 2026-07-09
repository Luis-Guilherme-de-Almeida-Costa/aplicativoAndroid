import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import type { NavProps } from './types';

const days = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
const weekDates = [8, 9, 10, 11, 12, 13, 14];
const today = 9; // Terça, 9 de junho de 2026

interface Event {
  day: number; // 0=Seg, 1=Ter...
  startHour: number;
  duration: number; // in hour units
  label: string;
  type: 'aula' | 'estudo' | 'prova' | 'prazo' | 'trabalho';
}

const events: Event[] = [
  { day: 0, startHour: 8,  duration: 2, label: 'Aula de Cálculo 1',       type: 'aula' },
  { day: 0, startHour: 10, duration: 2, label: 'Aula de Algoritmos',       type: 'aula' },
  { day: 0, startHour: 16, duration: 2, label: 'Aula de Física 1',         type: 'aula' },
  { day: 1, startHour: 9,  duration: 1, label: 'Estudo de Algoritmos',     type: 'estudo' },
  { day: 1, startHour: 14, duration: 2, label: 'Aula Humanidades',         type: 'aula' },
  { day: 2, startHour: 8,  duration: 2, label: 'Aula de Cálculo 1',        type: 'aula' },
  { day: 2, startHour: 10, duration: 2, label: 'Aula de Algoritmos',       type: 'aula' },
  { day: 2, startHour: 15, duration: 2, label: 'Estudo Cálculo',           type: 'estudo' },
  { day: 3, startHour: 10, duration: 2, label: 'Aula de Algoritmos',       type: 'aula' },
  { day: 3, startHour: 14, duration: 2, label: 'Aula Humanidades',         type: 'aula' },
  { day: 3, startHour: 17, duration: 1, label: 'Prova de Física 1',        type: 'prova' },
  { day: 4, startHour: 8,  duration: 2, label: 'Aula de Cálculo 1',        type: 'aula' },
  { day: 4, startHour: 16, duration: 2, label: 'Aula de Física 1',         type: 'aula' },
  { day: 4, startHour: 18, duration: 1, label: 'Prazo edital auxílio',     type: 'prazo' },
];

const typeStyle: Record<string, { bg: string; text: string; border: string; icon: string }> = {
  aula:     { bg: '#dbeafe', text: '#1e40af', border: '#bfdbfe', icon: '📚' },
  estudo:   { bg: '#dcfce7', text: '#15803d', border: '#bbf7d0', icon: '📖' },
  prova:    { bg: '#fef2f2', text: '#b91c1c', border: '#fecaca', icon: '📝' },
  prazo:    { bg: '#fef9c3', text: '#92400e', border: '#fde047', icon: '⏰' },
  trabalho: { bg: '#f5f3ff', text: '#6d28d9', border: '#ddd6fe', icon: '💼' },
};

const HOURS = Array.from({ length: 14 }, (_, i) => i + 7); // 7h–20h
const PX_PER_HOUR = 48;

export default function Timetable({ onNavigate }: NavProps) {
  const [view, setView] = useState<'Dia' | 'Semana' | 'Mês'>('Semana');
  const [selectedDay, setSelectedDay] = useState(1); // Tuesday

  const viewDays = view === 'Dia' ? [selectedDay] : view === 'Semana' ? [0, 1, 2, 3, 4] : [0, 1, 2, 3, 4, 5, 6];

  return (
    <div className="h-full flex flex-col" style={{ background: '#f0f4f8' }}>
      {/* Header */}
      <div style={{ background: '#1a3a6b', padding: '16px 20px 16px' }}>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold" style={{ color: '#ffffff', fontSize: '20px' }}>Cronograma</h2>
          <button
            className="flex items-center justify-center"
            style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'rgba(255,255,255,0.15)' }}
          >
            <Plus className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* View toggle */}
        <div className="flex gap-1 p-1 rounded-xl" style={{ background: 'rgba(255,255,255,0.12)', width: 'fit-content' }}>
          {(['Dia', 'Semana', 'Mês'] as const).map(v => (
            <button
              key={v}
              onClick={() => setView(v)}
              className="px-4 py-1.5 rounded-lg"
              style={{
                background: view === v ? '#fff' : 'transparent',
                color: view === v ? '#1a3a6b' : '#93c5fd',
                fontSize: '13px',
                fontWeight: '600',
              }}
            >
              {v}
            </button>
          ))}
        </div>

        {/* Week navigation */}
        <div className="flex items-center justify-between mt-3">
          <button><ChevronLeft className="w-4 h-4 text-white opacity-60" /></button>
          <span style={{ color: '#fff', fontSize: '13px', fontWeight: '500' }}>8–14 de Junho, 2026</span>
          <button><ChevronRight className="w-4 h-4 text-white opacity-60" /></button>
        </div>
      </div>

      {/* Day headers */}
      <div className="flex px-4 py-2" style={{ background: '#fff', borderBottom: '1px solid #e2e8f0', flexShrink: 0 }}>
        <div style={{ width: '32px', flexShrink: 0 }} />
        {viewDays.map(di => (
          <div key={di} className="flex-1 flex flex-col items-center">
            <span style={{ color: '#94a3b8', fontSize: '10px', fontWeight: '500' }}>{days[di]}</span>
            <div
              className="flex items-center justify-center rounded-full"
              style={{
                width: '26px',
                height: '26px',
                background: weekDates[di] === today ? '#1d4ed8' : 'transparent',
                marginTop: '2px',
              }}
            >
              <span style={{
                color: weekDates[di] === today ? '#fff' : '#334155',
                fontSize: '13px',
                fontWeight: weekDates[di] === today ? '700' : '500',
              }}>
                {weekDates[di]}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div className="flex-1 overflow-auto">
        <div className="flex px-4 pt-2" style={{ position: 'relative', minHeight: `${HOURS.length * PX_PER_HOUR}px` }}>
          {/* Time column */}
          <div style={{ width: '32px', flexShrink: 0 }}>
            {HOURS.map(h => (
              <div key={h} style={{ height: `${PX_PER_HOUR}px`, display: 'flex', alignItems: 'flex-start', paddingTop: '2px' }}>
                <span style={{ color: '#94a3b8', fontSize: '9px', fontWeight: '500' }}>{h}h</span>
              </div>
            ))}
          </div>

          {/* Day columns */}
          {viewDays.map(di => (
            <div key={di} style={{ flex: 1, position: 'relative', marginLeft: '2px' }}>
              {/* Hour lines */}
              {HOURS.map(h => (
                <div key={h} style={{ height: `${PX_PER_HOUR}px`, borderTop: '1px solid #f1f5f9' }} />
              ))}

              {/* Events */}
              {events
                .filter(e => e.day === di)
                .map((e, i) => {
                  const style = typeStyle[e.type];
                  const top = (e.startHour - 7) * PX_PER_HOUR;
                  const height = e.duration * PX_PER_HOUR - 4;
                  return (
                    <div
                      key={i}
                      style={{
                        position: 'absolute',
                        top: `${top + 2}px`,
                        left: '2px',
                        right: '2px',
                        height: `${height}px`,
                        background: style.bg,
                        border: `1.5px solid ${style.border}`,
                        borderRadius: '8px',
                        padding: '4px 6px',
                        overflow: 'hidden',
                        zIndex: 1,
                      }}
                    >
                      <p style={{ color: style.text, fontSize: '9px', fontWeight: '700', lineHeight: 1.2 }}>
                        {style.icon} {e.label}
                      </p>
                      <p style={{ color: style.text, fontSize: '8px', opacity: 0.7 }}>
                        {e.startHour}h–{e.startHour + e.duration}h
                      </p>
                    </div>
                  );
                })}
            </div>
          ))}
        </div>
        <div style={{ height: '16px' }} />
      </div>
    </div>
  );
}
