import { useState } from 'react';
import { ChevronRight, ChevronLeft, Edit3, Bell, Shield, HelpCircle, LogOut, BookOpen, Target, Clock } from 'lucide-react';
import type { NavProps } from './types';

const goals = ['Conseguir bolsa PIBIC', 'Manter bom desempenho', 'Graduar no prazo'];

const settingsGroups = [
  {
    title: 'Preferências',
    items: [
      { icon: Bell, label: 'Notificações e alertas', desc: 'Editais, prazos e tarefas', color: '#f59e0b' },
      { icon: Clock, label: 'Horários de estudo', desc: 'Bloqueios na agenda', color: '#3b82f6' },
    ],
  },
  {
    title: 'Conta',
    items: [
      { icon: Shield, label: 'Privacidade e segurança', desc: 'Senha e dados', color: '#8b5cf6' },
      { icon: HelpCircle, label: 'Ajuda e suporte', desc: 'Central de atendimento', color: '#16a34a' },
    ],
  },
];

export default function Profile({ onNavigate }: NavProps) {
  const [editing] = useState(false);

  return (
    <div className="h-full flex flex-col" style={{ background: '#f0f4f8' }}>
      {/* Header */}
      <div style={{ background: '#1a3a6b', padding: '16px 20px 28px' }}>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('dashboard')}
              className="flex items-center justify-center"
              style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'rgba(255,255,255,0.15)' }}
            >
              <ChevronLeft className="w-4 h-4 text-white" />
            </button>
            <h2 className="font-bold" style={{ color: '#ffffff', fontSize: '20px' }}>Meu Perfil</h2>
          </div>
        </div>

        {/* Avatar + name */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div
              className="flex items-center justify-center"
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '22px',
                background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                border: '3px solid rgba(255,255,255,0.3)',
                fontSize: '26px',
                fontWeight: '700',
                color: '#fff',
              }}
            >
              MC
            </div>
            <div
              style={{
                position: 'absolute',
                bottom: '-2px',
                right: '-2px',
                width: '18px',
                height: '18px',
                borderRadius: '6px',
                background: '#4ade80',
                border: '2px solid #1a3a6b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ fontSize: '8px' }}>✓</span>
            </div>
          </div>
          <div>
            <h3 className="font-bold" style={{ color: '#fff', fontSize: '18px' }}>Roberto Costa</h3>
            <p style={{ color: '#93c5fd', fontSize: '12px' }}>Matrícula: 22/1234567</p>
            <div className="flex items-center gap-1.5 mt-1">
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80' }} />
              <span style={{ color: '#4ade80', fontSize: '11px', fontWeight: '500' }}>Ativa · 4º Semestre</span>
            </div>
          </div>
        </div>
      </div>

      {/* Academic info cards */}
      <div className="px-4 -mt-4" style={{ flexShrink: 0 }}>
        <div
          className="grid grid-cols-3 gap-2 rounded-2xl overflow-hidden"
          style={{ background: '#fff', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
        >
          {[
            { label: 'Curso', value: 'Eng. Software', sub: 'FGA/UnB' },
            { label: 'Campus', value: 'Darcy Ribeiro', sub: 'Brasília, DF' },
            { label: 'Turno', value: 'Diurno', sub: '2026/1' },
          ].map(({ label, value, sub }) => (
            <div key={label} className="text-center" style={{ padding: '14px 8px' }}>
              <p style={{ color: '#94a3b8', fontSize: '10px', marginBottom: '2px' }}>{label}</p>
              <p style={{ color: '#0f172a', fontSize: '12px', fontWeight: '700', lineHeight: 1.2 }}>{value}</p>
              <p style={{ color: '#94a3b8', fontSize: '10px' }}>{sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 mt-2">
        {/* Academic stats */}
        <div style={{ background: '#fff', borderRadius: '16px', padding: '14px', border: '1px solid #e2e8f0' }}>
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-4 h-4" style={{ color: '#1d4ed8' }} />
            <span className="font-semibold" style={{ color: '#1e293b', fontSize: '14px' }}>Situação Acadêmica</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'Créditos cursados', value: '88/240', color: '#1d4ed8' },
              { label: 'Créditos no semestre', value: '22', color: '#8b5cf6' },
              { label: 'IRA estimado', value: '4.7/5.0', color: '#16a34a' },
              { label: 'Disciplinas aprovadas', value: '18', color: '#f59e0b' },
            ].map(({ label, value, color }) => (
              <div key={label} style={{ background: '#f8fafc', borderRadius: '12px', padding: '10px 12px' }}>
                <p style={{ color: '#94a3b8', fontSize: '10px', marginBottom: '2px' }}>{label}</p>
                <p style={{ color, fontSize: '17px', fontWeight: '700' }}>{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Study preferences */}
        <div style={{ background: '#fff', borderRadius: '16px', padding: '14px', border: '1px solid #e2e8f0' }}>
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4" style={{ color: '#8b5cf6' }} />
            <span className="font-semibold" style={{ color: '#1e293b', fontSize: '14px' }}>Preferências de Estudo</span>
          </div>
          <div className="flex flex-col gap-2">
            {[
              { label: 'Disponibilidade semanal', value: '20h/semana' },
              { label: 'Melhor horário', value: 'Noite (19h–22h)' },
              { label: 'Estilo de aprendizagem', value: 'Visual + Prático' },
              { label: 'Trabalha', value: 'Não trabalha' },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between py-1.5" style={{ borderBottom: '1px solid #f1f5f9' }}>
                <span style={{ color: '#64748b', fontSize: '13px' }}>{label}</span>
                <span style={{ color: '#334155', fontSize: '13px', fontWeight: '600' }}>{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Goals */}
        <div style={{ background: '#fff', borderRadius: '16px', padding: '14px', border: '1px solid #e2e8f0' }}>
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-4 h-4" style={{ color: '#16a34a' }} />
            <span className="font-semibold" style={{ color: '#1e293b', fontSize: '14px' }}>Objetivos Acadêmicos</span>
          </div>
          <div className="flex flex-col gap-2">
            {goals.map(goal => (
              <div key={goal} className="flex items-center gap-2">
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#16a34a', flexShrink: 0 }} />
                <span style={{ color: '#334155', fontSize: '13px' }}>{goal}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Settings */}
        {settingsGroups.map(group => (
          <div key={group.title} style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
            <p style={{ color: '#94a3b8', fontSize: '11px', fontWeight: '700', padding: '10px 14px 6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {group.title}
            </p>
            {group.items.map(({ icon: Icon, label, desc, color }, i) => (
              <button
                key={label}
                className="w-full flex items-center gap-3"
                style={{
                  padding: '12px 14px',
                  borderTop: i === 0 ? '1px solid #f1f5f9' : '1px solid #f1f5f9',
                }}
              >
                <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon className="w-4 h-4" style={{ color }} />
                </div>
                <div className="flex-1 text-left">
                  <p style={{ color: '#334155', fontSize: '13px', fontWeight: '500' }}>{label}</p>
                  <p style={{ color: '#94a3b8', fontSize: '11px' }}>{desc}</p>
                </div>
                <ChevronRight className="w-4 h-4" style={{ color: '#cbd5e1' }} />
              </button>
            ))}
          </div>
        ))}

        {/* Logout */}
        <button
          onClick={() => onNavigate('welcome')}
          className="w-full flex items-center justify-center gap-2 font-semibold"
          style={{
            background: '#fef2f2',
            color: '#dc2626',
            padding: '14px',
            borderRadius: '14px',
            fontSize: '14px',
            border: '1px solid #fecaca',
          }}
        >
          <LogOut className="w-4 h-4" />
          Sair da conta
        </button>

        <div style={{ height: '16px' }} />
      </div>
    </div>
  );
}
