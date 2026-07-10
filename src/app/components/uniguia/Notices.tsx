import { useState } from 'react';
import { ChevronLeft, ChevronRight, FileText, Calendar } from 'lucide-react';
import type { NavProps } from './types';

const filterTabs = ['Abertos', 'Pendentes', 'Encerrados'];

const notices = [
  {
    id: 1,
    title: 'Edital Auxílio Socioeconômico 2026/1',
    number: 'Edital Nº 05/2026 — DAC',
    status: 'Aberto',
    deadline: '20/06/2026',
    action: 'Inscrição aberta',
    details: 'Inscrição pelo SIGAA · Documentação até 20/06',
    filter: 'Abertos',
    urgent: false,
  },
  {
    id: 2,
    title: 'Edital Monitoria 2026/1',
    number: 'Edital Nº 08/2026 — DEG',
    status: 'Aberto',
    deadline: '30/06/2026',
    action: 'Candidatura aberta',
    details: 'Vagas por departamento · Resultado em 10/07',
    filter: 'Abertos',
    urgent: false,
  },
  {
    id: 3,
    title: 'PIBEX — Extensão Universitária 2026',
    number: 'Edital Nº 02/2026 — DEX',
    status: 'Aberto',
    deadline: '25/06/2026',
    action: 'Submissão de projetos',
    details: 'Bolsas de R$400/mês por 12 meses',
    filter: 'Abertos',
    urgent: false,
  },
  {
    id: 4,
    title: 'Edital Auxílio Moradia 2026/1',
    number: 'Edital Nº 04/2026 — DAC',
    status: 'Documentos pendentes',
    deadline: '15/06/2026',
    action: 'Enviar documentos',
    details: 'Comprovante de renda e residência pendentes',
    filter: 'Pendentes',
    urgent: true,
  },
  {
    id: 5,
    title: 'PIBIC 2026-2026 — Resultado',
    number: 'Edital CNPq/UnB Nº 01/2026',
    status: 'Resultado em breve',
    deadline: '30/06/2026',
    action: 'Aguardando resultado',
    details: 'Publicação prevista para 30/06/2026',
    filter: 'Pendentes',
    urgent: false,
  },
  {
    id: 6,
    title: 'Auxílio Alimentação Contínuo 2026/1',
    number: 'Portaria DAC Nº 12/2026',
    status: 'Ativo',
    deadline: 'Permanente',
    action: 'Ativo até 12/2026',
    details: 'Renovação automática via SIGAA',
    filter: 'Abertos',
    urgent: false,
  },
  {
    id: 7,
    title: 'Edital Auxílio Emergencial 2026/1',
    number: 'Edital Nº 06/2026 — DAC',
    status: 'Encerrado',
    deadline: '10/06/2026',
    action: 'Prazo encerrado',
    details: 'Resultado publicado em 05/06/2026',
    filter: 'Encerrados',
    urgent: false,
  },
];

const statusConfig: Record<string, { bg: string; color: string }> = {
  'Aberto':               { bg: '#dcfce7', color: '#16a34a' },
  'Documentos pendentes': { bg: '#fef9c3', color: '#ca8a04' },
  'Resultado em breve':   { bg: '#dbeafe', color: '#1d4ed8' },
  'Ativo':                { bg: '#dcfce7', color: '#16a34a' },
  'Encerrado':            { bg: '#f1f5f9', color: '#94a3b8' },
};

export default function Notices({ onNavigate }: NavProps) {
  const [activeTab, setActiveTab] = useState('Abertos');

  const filtered = notices.filter(n => n.filter === activeTab);

  return (
    <div className="h-full flex flex-col" style={{ background: '#f0f4f8' }}>
      {/* Header */}
      <div style={{ background: '#1a3a6b', padding: '16px 20px 20px' }}>
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex items-center justify-center"
            style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'rgba(255,255,255,0.15)' }}
          >
            <ChevronLeft className="w-4 h-4 text-white" />
          </button>
          <div>
            <h2 className="font-bold" style={{ color: '#ffffff', fontSize: '18px' }}>Editais e Prazos</h2>
            <p style={{ color: '#93c5fd', fontSize: '12px' }}>Acompanhe inscrições e resultados</p>
          </div>
        </div>

        {/* Info bar */}
        <div className="flex gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl" style={{ background: 'rgba(255,255,255,0.12)' }}>
            <Calendar className="w-3 h-3" style={{ color: '#93c5fd' }} />
            <span style={{ color: '#fff', fontSize: '12px' }}>Junho 2026</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl" style={{ background: '#fef9c320' }}>
            <span style={{ color: '#fde047', fontSize: '12px', fontWeight: '600' }}>1 prazo urgente</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex px-4 py-3 gap-2" style={{ background: '#fff', borderBottom: '1px solid #e2e8f0', flexShrink: 0 }}>
        {filterTabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="flex-1 py-2 rounded-xl"
            style={{
              background: activeTab === tab ? '#1d4ed8' : '#f1f5f9',
              color: activeTab === tab ? '#fff' : '#64748b',
              fontSize: '12px',
              fontWeight: '600',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Notices list */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        {filtered.map(notice => {
          const st = statusConfig[notice.status] || { bg: '#f1f5f9', color: '#64748b' };
          return (
            <div
              key={notice.id}
              style={{
                background: '#fff',
                borderRadius: '16px',
                border: notice.urgent ? '2px solid #fde047' : '1px solid #e2e8f0',
                overflow: 'hidden',
                boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
              }}
            >
              {notice.urgent && (
                <div style={{ background: '#fef9c3', padding: '6px 14px', borderBottom: '1px solid #fde047' }}>
                  <span style={{ color: '#92400e', fontSize: '11px', fontWeight: '700' }}>⚠️ Documentação pendente — Prazo se aproxima</span>
                </div>
              )}
              <div style={{ padding: '14px' }}>
                <div className="flex items-start gap-3">
                  <div
                    className="flex items-center justify-center flex-shrink-0 rounded-xl"
                    style={{ width: '40px', height: '40px', background: '#f8fafc', border: '1px solid #e2e8f0' }}
                  >
                    <FileText className="w-5 h-5" style={{ color: '#64748b' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="px-2 py-0.5 rounded-full"
                        style={{ background: st.bg, color: st.color, fontSize: '10px', fontWeight: '700' }}
                      >
                        {notice.status}
                      </span>
                    </div>
                    <p className="font-bold" style={{ color: '#0f172a', fontSize: '13px', marginBottom: '2px' }}>{notice.title}</p>
                    <p style={{ color: '#94a3b8', fontSize: '10px', marginBottom: '4px' }}>{notice.number}</p>
                    <p style={{ color: '#64748b', fontSize: '11px', marginBottom: '8px' }}>{notice.details}</p>
                    <div className="flex items-center justify-between">
                      <span style={{ color: '#94a3b8', fontSize: '11px' }}> {notice.deadline}</span>
                      <button
                        onClick={() => onNavigate('document-checklist')}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-xl"
                        style={{
                          background: notice.urgent ? '#1d4ed8' : '#f1f5f9',
                          color: notice.urgent ? '#fff' : '#64748b',
                          fontSize: '11px',
                          fontWeight: '600',
                        }}
                      >
                        {notice.action}
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12" style={{ color: '#94a3b8' }}>
            <FileText className="w-10 h-10 mb-3 opacity-30" />
            <p style={{ fontSize: '14px' }}>Nenhum edital nesta categoria</p>
          </div>
        )}

        <div style={{ height: '16px' }} />
      </div>
    </div>
  );
}
