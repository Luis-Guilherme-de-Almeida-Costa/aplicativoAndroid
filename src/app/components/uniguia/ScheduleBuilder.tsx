import { ChevronLeft, AlertTriangle, Sparkles, Save } from 'lucide-react';
import type { NavProps } from './types';

const days = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'];

const timeSlots = ['08h', '09h', '10h', '11h', '12h', '14h', '15h', '16h', '17h', '19h', '20h'];

const subjectColors: Record<string, { bg: string; text: string; border: string }> = {
  'CAL2': { bg: '#dbeafe', text: '#1d4ed8', border: '#93c5fd' },
  'ESD':  { bg: '#f0fdf4', text: '#16a34a', border: '#86efac' },
  'EST':  { bg: '#fef9c3', text: '#ca8a04', border: '#fde047' },
  'BDD':  { bg: '#fce7f3', text: '#be185d', border: '#f9a8d4' },
  'CONFLICT': { bg: '#fef2f2', text: '#dc2626', border: '#fca5a5' },
};

// Grid: [day][timeIndex] = subjectCode | null
const grid: (string | null)[][] = days.map(() => timeSlots.map(() => null));
// Seg: CAL2 08h-09h, 10h (conflict with ESD)
grid[0][0] = 'CAL2'; // Seg 08h
grid[0][2] = 'CONFLICT'; // Seg 10h — Conflito CAL2+ESD
// Ter: ESD 10h-11h, BDD 16h-17h
grid[1][2] = 'ESD'; grid[1][3] = 'ESD';
grid[1][7] = 'BDD'; grid[1][8] = 'BDD';
// Qua: CAL2, EST 14h-15h
grid[2][0] = 'CAL2';
grid[2][5] = 'EST'; grid[2][6] = 'EST';
// Qui: ESD 10h, BDD 16h
grid[3][2] = 'ESD'; grid[3][3] = 'ESD';
grid[3][7] = 'BDD'; grid[3][8] = 'BDD';
// Sex: CAL2 08h, EST nop
grid[4][0] = 'CAL2';
grid[4][5] = 'EST'; grid[4][6] = 'EST';

const subjectNames: Record<string, string> = {
  CAL2: 'Cálculo 2',
  ESD: 'Estrut. Dados',
  EST: 'Prob. e Estat.',
  BDD: 'Banco de Dados',
  CONFLICT: 'CONFLITO',
};

export default function ScheduleBuilder({ onNavigate }: NavProps) {
  return (
    <div className="h-full flex flex-col" style={{ background: '#f0f4f8' }}>
      {/* Header */}
      <div style={{ background: '#1a3a6b', padding: '16px 20px 20px' }}>
        <div className="flex items-center gap-3 mb-1">
          <button
            onClick={() => onNavigate('plan-semester')}
            className="flex items-center justify-center"
            style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'rgba(255,255,255,0.15)' }}
          >
            <ChevronLeft className="w-4 h-4 text-white" />
          </button>
          <div>
            <h2 className="font-bold" style={{ color: '#ffffff', fontSize: '17px' }}>Montagem de Grade</h2>
            <p style={{ color: '#93c5fd', fontSize: '12px' }}>2026/2 — 18 créditos selecionados</p>
          </div>
        </div>
      </div>

      {/* Conflict alert */}
      <div
        className="mx-4 mt-3 flex items-start gap-2 rounded-xl p-3"
        style={{ background: '#fef2f2', border: '1.5px solid #fca5a5', flexShrink: 0 }}
      >
        <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#dc2626' }} />
        <div>
          <p style={{ color: '#991b1b', fontSize: '12px', fontWeight: '600' }}>Conflito detectado</p>
          <p style={{ color: '#b91c1c', fontSize: '11px' }}>
            Cálculo 2 e Estrut. Dados ocorrem no mesmo horário (Seg 10h)
          </p>
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-2 px-4 py-2 overflow-x-auto" style={{ flexShrink: 0 }}>
        {Object.entries(subjectNames).map(([code, name]) => (
          <div
            key={code}
            className="flex items-center gap-1.5 px-2 py-1 rounded-lg flex-shrink-0"
            style={{
              background: subjectColors[code]?.bg,
              border: `1px solid ${subjectColors[code]?.border}`,
            }}
          >
            <span style={{ color: subjectColors[code]?.text, fontSize: '10px', fontWeight: '600' }}>
              {code === 'CONFLICT' ? '' : ''} {name}
            </span>
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-auto px-4">
        <div style={{ minWidth: '320px' }}>
          {/* Day headers */}
          <div className="flex" style={{ marginLeft: '32px', marginBottom: '4px' }}>
            {days.map(d => (
              <div key={d} style={{ flex: 1, textAlign: 'center' }}>
                <span style={{ color: '#64748b', fontSize: '11px', fontWeight: '600' }}>{d}</span>
              </div>
            ))}
          </div>

          {/* Time rows */}
          {timeSlots.map((time, ti) => (
            <div key={time} className="flex items-stretch mb-0.5">
              <div style={{ width: '32px', flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                <span style={{ color: '#94a3b8', fontSize: '9px', fontWeight: '500' }}>{time}</span>
              </div>
              {days.map((_, di) => {
                const code = grid[di][ti];
                const style = code ? subjectColors[code] : null;
                return (
                  <div
                    key={di}
                    style={{
                      flex: 1,
                      height: '28px',
                      margin: '0 1px',
                      borderRadius: '6px',
                      background: style ? style.bg : '#f1f5f9',
                      border: style ? `1.5px solid ${style.border}` : '1px solid #e8edf2',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                    }}
                  >
                    {code && (
                      <span style={{ color: style!.text, fontSize: '7.5px', fontWeight: '700', textAlign: 'center', lineHeight: 1, padding: '0 2px' }}>
                        {code === 'CONFLICT' ? 'CONFLITO' : code}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Action buttons */}
      <div className="p-4 flex flex-col gap-2">
        <button
          onClick={() => onNavigate('timetable')}
          className="w-full flex items-center justify-center gap-2 font-semibold"
          style={{
            background: '#16a34a',
            color: '#fff',
            padding: '14px',
            borderRadius: '14px',
            fontSize: '14px',
          }}
        >
          <Save className="w-4 h-4" />
          Salvar semestre
        </button>
      </div>
    </div>
  );
}
