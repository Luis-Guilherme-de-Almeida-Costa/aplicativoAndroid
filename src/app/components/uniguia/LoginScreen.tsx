import { useState } from 'react';
import { ChevronLeft, Eye, EyeOff, GraduationCap } from 'lucide-react';
import type { NavProps } from './types';

export default function LoginScreen({ onNavigate }: NavProps) {
  const [matricula, setMatricula] = useState('');
  const [senha, setSenha] = useState('');
  const [showSenha, setShowSenha] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEntrar = () => {
    if (!matricula.trim() || !senha.trim()) {
      setError('Preencha todos os campos.');
      return;
    }
    setError('');
    setLoading(true);
    // Simula autenticação
    setTimeout(() => {
      setLoading(false);
      onNavigate('dashboard');
    }, 1200);
  };

  return (
    <div className="h-full flex flex-col" style={{ background: '#f0f4f8' }}>
      {/* Header azul */}
      <div
        style={{
          background: 'linear-gradient(160deg, #0a1f4d 0%, #1a3a6b 60%, #1d4ed8 100%)',
          padding: '20px 20px 36px',
          borderRadius: '0 0 32px 32px',
        }}
      >
        <button
          onClick={() => onNavigate('welcome')}
          className="flex items-center gap-2 mb-6"
          style={{ color: '#93c5fd', fontSize: '13px' }}
        >
          <ChevronLeft className="w-4 h-4" />
          Voltar
        </button>

        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center"
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '16px',
              background: 'rgba(255,255,255,0.15)',
              border: '1.5px solid rgba(255,255,255,0.2)',
            }}
          >
            <GraduationCap className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="font-bold" style={{ color: '#fff', fontSize: '22px' }}>Entrar no UniGuia</h1>
            <p style={{ color: '#93c5fd', fontSize: '13px' }}>Universidade de Brasília</p>
          </div>
        </div>
      </div>

      {/* Form card */}
      <div className="flex-1 px-5 -mt-4">
        <div
          style={{
            background: '#fff',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            border: '1px solid #e2e8f0',
          }}
        >
          <p className="font-semibold mb-5" style={{ color: '#0f172a', fontSize: '15px' }}>
            Acesse com seus dados UnB
          </p>

          {/* Matrícula */}
          <div className="mb-4">
            <label
              style={{ color: '#64748b', fontSize: '12px', fontWeight: '600', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}
            >
              Matrícula
            </label>
            <input
              value={matricula}
              onChange={e => { setMatricula(e.target.value); setError(''); }}
              placeholder="Ex: 22/1234567"
              style={{
                width: '100%',
                border: error && !matricula ? '1.5px solid #dc2626' : '1.5px solid #e2e8f0',
                borderRadius: '14px',
                padding: '14px 16px',
                fontSize: '15px',
                color: '#0f172a',
                background: '#f8fafc',
                outline: 'none',
              }}
            />
          </div>

          {/* Senha */}
          <div className="mb-2">
            <label
              style={{ color: '#64748b', fontSize: '12px', fontWeight: '600', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}
            >
              Senha
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showSenha ? 'text' : 'password'}
                value={senha}
                onChange={e => { setSenha(e.target.value); setError(''); }}
                placeholder="Sua senha SIGAA"
                onKeyDown={e => e.key === 'Enter' && handleEntrar()}
                style={{
                  width: '100%',
                  border: error && !senha ? '1.5px solid #dc2626' : '1.5px solid #e2e8f0',
                  borderRadius: '14px',
                  padding: '14px 48px 14px 16px',
                  fontSize: '15px',
                  color: '#0f172a',
                  background: '#f8fafc',
                  outline: 'none',
                }}
              />
              <button
                onClick={() => setShowSenha(v => !v)}
                style={{
                  position: 'absolute',
                  right: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#94a3b8',
                }}
              >
                {showSenha
                  ? <EyeOff className="w-5 h-5" />
                  : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Erro */}
          {error && (
            <p style={{ color: '#dc2626', fontSize: '12px', marginBottom: '8px' }}>{error}</p>
          )}

          {/* Esqueci senha */}
          <div className="flex justify-end mb-5">
            <button style={{ color: '#1d4ed8', fontSize: '13px', fontWeight: '500' }}>
              Esqueci minha senha
            </button>
          </div>

          {/* Botão entrar */}
          <button
            onClick={handleEntrar}
            disabled={loading}
            style={{
              width: '100%',
              background: loading ? '#94a3b8' : '#1d4ed8',
              color: '#fff',
              padding: '16px',
              borderRadius: '16px',
              fontSize: '15px',
              fontWeight: '700',
              transition: 'background 0.2s',
            }}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-4">
            <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
            <span style={{ color: '#94a3b8', fontSize: '12px' }}>ou</span>
            <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
          </div>

          {/* Criar conta */}
          <button
            onClick={() => onNavigate('profile-setup')}
            style={{
              width: '100%',
              background: 'transparent',
              color: '#1d4ed8',
              padding: '14px',
              borderRadius: '16px',
              fontSize: '15px',
              fontWeight: '600',
              border: '1.5px solid #bfdbfe',
            }}
          >
            Criar nova conta
          </button>
        </div>

        {/* Info SIGAA */}
        <div
          className="flex items-start gap-3 mt-4"
          style={{
            background: '#eff6ff',
            borderRadius: '14px',
            padding: '12px 14px',
            border: '1px solid #bfdbfe',
          }}
        >
          <span style={{ fontSize: '16px', flexShrink: 0 }}>ℹ️</span>
          <p style={{ color: '#1e40af', fontSize: '12px', lineHeight: 1.5 }}>
            Use a mesma matrícula e senha do <strong>SIGAA/UnB</strong>. Caso não lembre a senha, redefina pelo portal{' '}
            <span style={{ fontWeight: '700' }}>sig.unb.br</span>.
          </p>
        </div>
      </div>

      <div style={{ height: '24px' }} />
    </div>
  );
}
