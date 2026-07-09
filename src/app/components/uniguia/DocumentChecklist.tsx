import { useState } from 'react';
import { ChevronLeft, Upload, CheckCircle } from 'lucide-react';
import type { NavProps } from './types';

const initialDocs = [
  { id: 1, label: 'Documento de identificação (RG ou CNH)', done: true, info: 'Frente e verso, legível' },
  { id: 2, label: 'Comprovante de matrícula', done: true, info: 'Emitir pelo SIGAA — Módulo Aluno' },
  { id: 3, label: 'Comprovante de renda familiar', done: false, info: 'Últimos 3 meses — todos os membros da família' },
  { id: 4, label: 'Comprovante de residência', done: false, info: 'Conta de luz/água/gás dos últimos 3 meses' },
  { id: 5, label: 'Dados bancários', done: true, info: 'Conta corrente no seu nome — qualquer banco' },
  { id: 6, label: 'Declaração de vulnerabilidade socioeconômica', done: false, info: 'Modelo disponível no site do DAC' },
  { id: 7, label: 'Certidão de composição familiar', done: false, info: 'Cartório de registro civil' },
  { id: 8, label: 'Laudo médico (se aplicável)', done: false, info: 'Somente para casos de saúde' },
];

export default function DocumentChecklist({ onNavigate }: NavProps) {
  const [docs, setDocs] = useState(initialDocs);

  const toggle = (id: number) => {
    setDocs(prev => prev.map(d => d.id === id ? { ...d, done: !d.done } : d));
  };

  const doneCount = docs.filter(d => d.done).length;
  const percent = Math.round((doneCount / docs.length) * 100);

  return (
    <div className="h-full flex flex-col" style={{ background: '#f0f4f8' }}>
      {/* Header */}
      <div style={{ background: '#1a3a6b', padding: '16px 20px 20px' }}>
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={() => onNavigate('notices')}
            className="flex items-center justify-center"
            style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'rgba(255,255,255,0.15)' }}
          >
            <ChevronLeft className="w-4 h-4 text-white" />
          </button>
          <div>
            <h2 className="font-bold" style={{ color: '#ffffff', fontSize: '17px' }}>Checklist de Documentos</h2>
            <p style={{ color: '#93c5fd', fontSize: '12px' }}>Edital Auxílio Moradia · DAC 2026/1</p>
          </div>
        </div>

        {/* Progress */}
        <div style={{ background: 'rgba(255,255,255,0.12)', borderRadius: '14px', padding: '12px' }}>
          <div className="flex items-center justify-between mb-2">
            <span style={{ color: '#fff', fontSize: '13px', fontWeight: '600' }}>
              {doneCount} de {docs.length} documentos
            </span>
            <span style={{ color: percent === 100 ? '#4ade80' : '#fde047', fontSize: '16px', fontWeight: '700' }}>
              {percent}%
            </span>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '999px', height: '8px' }}>
            <div
              style={{
                background: percent === 100 ? '#4ade80' : 'linear-gradient(90deg, #60a5fa, #4ade80)',
                borderRadius: '999px',
                height: '8px',
                width: `${percent}%`,
                transition: 'width 0.4s ease',
              }}
            />
          </div>
          {percent < 100 && (
            <p style={{ color: '#fde047', fontSize: '11px', marginTop: '6px' }}>
              ⚠️ Inscrição incompleta — prazo: 15/06/2026
            </p>
          )}
          {percent === 100 && (
            <p style={{ color: '#4ade80', fontSize: '11px', marginTop: '6px' }}>
              ✅ Documentação completa — pronto para enviar!
            </p>
          )}
        </div>
      </div>

      {/* Document list */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
        {docs.map(doc => (
          <div
            key={doc.id}
            onClick={() => toggle(doc.id)}
            className="flex items-start gap-3 w-full text-left cursor-pointer"
            style={{
              background: doc.done ? '#f0fdf4' : '#fff',
              borderRadius: '14px',
              padding: '14px',
              border: doc.done ? '1.5px solid #bbf7d0' : '1px solid #e2e8f0',
              transition: 'all 0.15s ease',
            }}
          >
            <div
              className="flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{
                width: '22px',
                height: '22px',
                borderRadius: '7px',
                background: doc.done ? '#16a34a' : 'transparent',
                border: doc.done ? 'none' : '2px solid #cbd5e1',
              }}
            >
              {doc.done && <CheckCircle className="w-4 h-4 text-white" />}
            </div>
            <div className="flex-1 min-w-0">
              <p style={{
                color: doc.done ? '#15803d' : '#0f172a',
                fontSize: '13px',
                fontWeight: '500',
                textDecoration: doc.done ? 'line-through' : 'none',
                marginBottom: '2px',
              }}>
                {doc.label}
              </p>
              <p style={{ color: '#94a3b8', fontSize: '11px' }}>{doc.info}</p>
            </div>
            {!doc.done && (
              <div
                onClick={e => { e.stopPropagation(); }}
                className="flex items-center gap-1 flex-shrink-0 cursor-pointer"
                style={{
                  background: '#eff6ff',
                  color: '#1d4ed8',
                  padding: '4px 8px',
                  borderRadius: '8px',
                  fontSize: '11px',
                  fontWeight: '600',
                }}
              >
                <Upload className="w-3 h-3" />
                Anexar
              </div>
            )}
          </div>
        ))}

        {/* Info box */}
        <div
          style={{ background: '#fff', borderRadius: '14px', padding: '14px', border: '1px solid #e2e8f0', marginTop: '4px' }}
        >
          <p className="font-semibold" style={{ color: '#334155', fontSize: '13px', marginBottom: '6px' }}>
            📋 Como enviar os documentos
          </p>
          <ol className="flex flex-col gap-1.5">
            {[
              'Acesse o SIGAA → Módulo Bolsas e Benefícios',
              'Selecione o edital Auxílio Moradia 2026/1',
              'Faça upload de cada documento em PDF',
              'Confirme a inscrição antes de 15/06/2026',
            ].map((step, i) => (
              <li key={i} className="flex gap-2">
                <span
                  style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    background: '#1d4ed8',
                    color: '#fff',
                    fontSize: '10px',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '1px',
                  }}
                >
                  {i + 1}
                </span>
                <span style={{ color: '#64748b', fontSize: '12px' }}>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div style={{ height: '16px' }} />
      </div>

      {/* Submit button */}
      <div className="p-4">
        <button
          className="w-full font-semibold flex items-center justify-center gap-2"
          style={{
            background: percent === 100 ? '#16a34a' : '#94a3b8',
            color: '#fff',
            padding: '16px',
            borderRadius: '16px',
            fontSize: '15px',
          }}
          disabled={percent < 100}
        >
          {percent === 100 ? '✅ Enviar inscrição' : `Complete ${docs.length - doneCount} documento${docs.length - doneCount > 1 ? 's' : ''} restante${docs.length - doneCount > 1 ? 's' : ''}`}
        </button>
      </div>
    </div>
  );
}
