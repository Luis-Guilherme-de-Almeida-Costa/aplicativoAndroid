import { GraduationCap, BookOpen, Calendar, Award, Sparkles } from 'lucide-react';
import type { NavProps } from './types';

export default function WelcomeScreen({ onNavigate }: NavProps) {
  return (
    <div
      className="h-full flex flex-col items-center justify-between px-6 py-8"
      style={{
        background: 'linear-gradient(160deg, #0a1f4d 0%, #1a3a6b 45%, #1d4ed8 100%)',
        minHeight: '100%',
      }}
    >
      {/* Top decoration */}
      <div className="w-full flex justify-end pt-2">
        <div
          className="px-3 py-1 rounded-full text-xs"
          style={{ background: 'rgba(255,255,255,0.12)', color: '#93c5fd' }}
        >
          UnB • 2026/1
        </div>
      </div>

      {/* Logo area */}
      <div className="flex-1 flex flex-col items-center justify-center gap-6">
        <div
          className="flex items-center justify-center"
          style={{
            width: '112px',
            height: '112px',
            borderRadius: '32px',
            background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(10px)',
            border: '1.5px solid rgba(255,255,255,0.25)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          }}
        >
          <GraduationCap className="w-16 h-16 text-white" />
        </div>

        <div className="text-center">
          <h1 className="text-white font-bold tracking-tight" style={{ fontSize: '48px' }}>
            UniGuia
          </h1>
          <div className="flex items-center justify-center gap-2 mt-1">
            <div style={{ width: '32px', height: '1.5px', background: 'rgba(255,255,255,0.3)', borderRadius: '1px' }} />
            <span style={{ color: '#93c5fd', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              Universidade de Brasília
            </span>
            <div style={{ width: '32px', height: '1.5px', background: 'rgba(255,255,255,0.3)', borderRadius: '1px' }} />
          </div>
        </div>

        <p className="text-center" style={{ color: 'rgba(255,255,255,0.9)', fontSize: '17px', lineHeight: '1.5' }}>
          Organize sua vida acadêmica<br />
          <span style={{ color: '#93c5fd' }}>em um só lugar</span>
        </p>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-2 mt-1">
          {[
            { icon: BookOpen, label: 'Disciplinas' },
            { icon: Calendar, label: 'Cronograma' },
            { icon: Award, label: 'Bolsas' },
            { icon: Sparkles, label: 'Cursos' },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.18)',
              }}
            >
              <Icon style={{ width: '13px', height: '13px', color: '#93c5fd' }} />
              <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="w-full flex flex-col gap-3">
        <button
          onClick={() => onNavigate('login')}
          className="w-full font-semibold"
          style={{
            background: '#ffffff',
            color: '#1a3a6b',
            padding: '16px',
            borderRadius: '16px',
            fontSize: '15px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          }}
        >
          Entrar
        </button>
        <button
          onClick={() => onNavigate('profile-setup')}
          className="w-full font-semibold"
          style={{
            background: 'transparent',
            color: '#ffffff',
            padding: '16px',
            borderRadius: '16px',
            fontSize: '15px',
            border: '2px solid rgba(255,255,255,0.45)',
          }}
        >
          Criar conta
        </button>
      </div>
    </div>
  );
}
