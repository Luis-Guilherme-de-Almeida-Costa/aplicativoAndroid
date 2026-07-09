import { Bell, ChevronRight, BookOpen, ClipboardList, AlertTriangle, TrendingUp, Clock, Award } from 'lucide-react';
import type { NavProps } from './types';

const todayRoutine = [
  { time: '08:00', label: 'Aula de Cálculo 1', type: 'aula', color: '#3b82f6' },
  { time: '10:00', label: 'Aula de Algoritmos', type: 'aula', color: '#8b5cf6' },
  { time: '14:00', label: 'Entregar trabalho de Humanidades', type: 'tarefa', color: '#f59e0b' },
  { time: '16:00', label: 'Estudar para Física 1', type: 'estudo', color: '#22c55e' },
  { time: '18:00', label: 'Ver edital de auxílio moradia', type: 'edital', color: '#f97316' },
];

const typeIcons: Record<string, string> = {
  aula: '📚',
  tarefa: '✅',
  estudo: '📖',
  edital: '📋',
};

export default function Dashboard({ onNavigate }: NavProps) {
  return (
    <div className="h-full flex flex-col" style={{ background: '#f0f4f8' }}>
      {/* Header */}
      <div style={{ background: '#1a3a6b', padding: '16px 20px 24px' }}>
        <div className="flex items-center justify-between mb-4">
          <div style={{ paddingLeft: '44px' }}>
            <p style={{ color: '#93c5fd', fontSize: '13px' }}>Terça-feira, 9 de junho de 2026</p>
            <h2 className="font-bold" style={{ color: '#ffffff', fontSize: '20px' }}>
              Olá, Roberto! 👋
            </h2>
          </div>
          <button
            onClick={() => onNavigate('notifications')}
            className="flex items-center justify-center relative"
            style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(255,255,255,0.15)' }}
          >
            <Bell className="w-5 h-5 text-white" />
            <div style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#f97316', position: 'absolute', top: '7px', right: '7px', border: '2px solid #1a3a6b' }} />
          </button>
        </div>

        {/* Summary chips */}
        <div className="flex gap-2">
          {[
            { label: '4 aulas hoje', bg: 'rgba(59,130,246,0.25)', color: '#93c5fd' },
            { label: '2 tarefas', bg: 'rgba(245,158,11,0.25)', color: '#fde68a' },
            { label: '1 edital', bg: 'rgba(239,68,68,0.25)', color: '#fca5a5' },
          ].map(({ label, bg, color }) => (
            <div key={label} className="px-3 py-1 rounded-full" style={{ background: bg }}>
              <span style={{ color, fontSize: '12px', fontWeight: '500' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto" style={{ padding: '16px' }}>

        {/* Alerta prazo */}
        <div
          className="flex items-center gap-3 mb-4"
          style={{
            background: '#fef9c3',
            border: '1.5px solid #fde047',
            borderRadius: '14px',
            padding: '12px 14px',
          }}
        >
          <AlertTriangle className="w-4 h-4 flex-shrink-0" style={{ color: '#ca8a04' }} />
          <div>
            <p style={{ color: '#713f12', fontSize: '13px', fontWeight: '600' }}>Prazo se aproximando</p>
            <p style={{ color: '#92400e', fontSize: '12px' }}>Edital Auxílio Moradia — inscrição até 15/06</p>
          </div>
          <button onClick={() => onNavigate('notices')} style={{ marginLeft: 'auto', color: '#ca8a04', fontSize: '12px', fontWeight: '600', flexShrink: 0 }}>
            Ver →
          </button>
        </div>

        {/* Hoje na sua rotina */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold" style={{ color: '#1e293b', fontSize: '15px' }}>Hoje na sua rotina</h3>
            <button onClick={() => onNavigate('timetable')} style={{ color: '#1d4ed8', fontSize: '12px', fontWeight: '500' }}>
              Ver tudo →
            </button>
          </div>
          <div
            className="rounded-2xl overflow-hidden"
            style={{ background: '#fff', border: '1px solid #e2e8f0' }}
          >
            {todayRoutine.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3"
                style={{
                  padding: '12px 14px',
                  borderBottom: i < todayRoutine.length - 1 ? '1px solid #f1f5f9' : 'none',
                }}
              >
                <div style={{ width: '40px', textAlign: 'right' }}>
                  <span style={{ color: '#94a3b8', fontSize: '11px', fontWeight: '500' }}>{item.time}</span>
                </div>
                <div style={{ width: '3px', height: '36px', borderRadius: '2px', background: item.color, flexShrink: 0 }} />
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <span style={{ fontSize: '16px' }}>{typeIcons[item.type]}</span>
                  <span style={{ color: '#334155', fontSize: '13px', fontWeight: '500' }} className="truncate">
                    {item.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {/* Próximas aulas */}
          <button
            onClick={() => onNavigate('subjects')}
            className="text-left"
            style={{ background: '#fff', borderRadius: '16px', padding: '14px', border: '1px solid #e2e8f0' }}
          >
            <div className="flex items-center justify-between mb-2">
              <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <BookOpen className="w-4 h-4" style={{ color: '#1d4ed8' }} />
              </div>
              <ChevronRight className="w-4 h-4" style={{ color: '#94a3b8' }} />
            </div>
            <p style={{ color: '#64748b', fontSize: '11px', marginBottom: '2px' }}>Disciplinas</p>
            <p className="font-bold" style={{ color: '#0f172a', fontSize: '20px' }}>4</p>
            <p style={{ color: '#94a3b8', fontSize: '11px' }}>este semestre</p>
          </button>

          {/* Tarefas */}
          <button
            onClick={() => onNavigate('tasks')}
            className="text-left"
            style={{ background: '#fff', borderRadius: '16px', padding: '14px', border: '1px solid #e2e8f0' }}
          >
            <div className="flex items-center justify-between mb-2">
              <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: '#fef9c3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ClipboardList className="w-4 h-4" style={{ color: '#ca8a04' }} />
              </div>
              <ChevronRight className="w-4 h-4" style={{ color: '#94a3b8' }} />
            </div>
            <p style={{ color: '#64748b', fontSize: '11px', marginBottom: '2px' }}>Tarefas</p>
            <p className="font-bold" style={{ color: '#0f172a', fontSize: '20px' }}>5</p>
            <p style={{ color: '#94a3b8', fontSize: '11px' }}>pendentes</p>
          </button>

          {/* Provas */}
          <button
            onClick={() => onNavigate('exams')}
            className="text-left"
            style={{ background: '#fff', borderRadius: '16px', padding: '14px', border: '1px solid #e2e8f0' }}
          >
            <div className="flex items-center justify-between mb-2">
              <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Clock className="w-4 h-4" style={{ color: '#dc2626' }} />
              </div>
              <ChevronRight className="w-4 h-4" style={{ color: '#94a3b8' }} />
            </div>
            <p style={{ color: '#64748b', fontSize: '11px', marginBottom: '2px' }}>Provas</p>
            <p className="font-bold" style={{ color: '#0f172a', fontSize: '20px' }}>2</p>
            <p style={{ color: '#dc2626', fontSize: '11px', fontWeight: '500' }}>esta semana</p>
          </button>

          {/* Bolsas */}
          <button
            onClick={() => onNavigate('scholarships')}
            className="text-left"
            style={{ background: '#fff', borderRadius: '16px', padding: '14px', border: '1px solid #e2e8f0' }}
          >
            <div className="flex items-center justify-between mb-2">
              <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Award className="w-4 h-4" style={{ color: '#16a34a' }} />
              </div>
              <ChevronRight className="w-4 h-4" style={{ color: '#94a3b8' }} />
            </div>
            <p style={{ color: '#64748b', fontSize: '11px', marginBottom: '2px' }}>Bolsas abertas</p>
            <p className="font-bold" style={{ color: '#0f172a', fontSize: '20px' }}>3</p>
            <p style={{ color: '#16a34a', fontSize: '11px', fontWeight: '500' }}>disponíveis</p>
          </button>
        </div>

        {/* Progresso semanal */}
        <div style={{ background: '#fff', borderRadius: '16px', padding: '14px', border: '1px solid #e2e8f0', marginBottom: '16px' }}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" style={{ color: '#1d4ed8' }} />
              <span className="font-semibold" style={{ color: '#1e293b', fontSize: '14px' }}>Progresso Semanal</span>
            </div>
            <span style={{ color: '#64748b', fontSize: '12px' }}>Semana 24 · 2026/1</span>
          </div>
          {[
            { label: 'Horas estudadas', value: 14, max: 20, color: '#1d4ed8' },
            { label: 'Tarefas concluídas', value: 3, max: 8, color: '#16a34a' },
            { label: 'Frequência', value: 90, max: 100, color: '#8b5cf6', percent: true },
          ].map(({ label, value, max, color, percent }) => (
            <div key={label} className="mb-2">
              <div className="flex items-center justify-between mb-1">
                <span style={{ color: '#64748b', fontSize: '12px' }}>{label}</span>
                <span style={{ color: '#334155', fontSize: '12px', fontWeight: '600' }}>
                  {percent ? `${value}%` : `${value}/${max}`}
                </span>
              </div>
              <div style={{ background: '#f1f5f9', borderRadius: '999px', height: '6px' }}>
                <div style={{
                  background: color,
                  borderRadius: '999px',
                  height: '6px',
                  width: `${Math.round((value / max) * 100)}%`,
                }} />
              </div>
            </div>
          ))}
        </div>

        {/* Editais importantes */}
        <div style={{ background: '#fff', borderRadius: '16px', padding: '14px', border: '1px solid #e2e8f0' }}>
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold" style={{ color: '#1e293b', fontSize: '14px' }}>📋 Editais Importantes</span>
            <button onClick={() => onNavigate('notices')} style={{ color: '#1d4ed8', fontSize: '12px', fontWeight: '500' }}>
              Ver todos →
            </button>
          </div>
          {[
            { title: 'Auxílio Moradia', deadline: '15/06', status: 'Aberto', statusColor: '#16a34a', statusBg: '#dcfce7' },
            { title: 'Auxílio Socioeconômico', deadline: '20/06', status: 'Aberto', statusColor: '#16a34a', statusBg: '#dcfce7' },
            { title: 'Monitoria 2024/2', deadline: '30/06', status: 'Aberto', statusColor: '#16a34a', statusBg: '#dcfce7' },
          ].map(({ title, deadline, status, statusColor, statusBg }) => (
            <div key={title} className="flex items-center justify-between py-2" style={{ borderBottom: '1px solid #f1f5f9' }}>
              <div>
                <p style={{ color: '#334155', fontSize: '13px', fontWeight: '500' }}>{title}</p>
                <p style={{ color: '#94a3b8', fontSize: '11px' }}>Prazo: {deadline}</p>
              </div>
              <div className="px-2 py-1 rounded-full" style={{ background: statusBg }}>
                <span style={{ color: statusColor, fontSize: '11px', fontWeight: '600' }}>{status}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ height: '16px' }} />
      </div>
    </div>
  );
}
