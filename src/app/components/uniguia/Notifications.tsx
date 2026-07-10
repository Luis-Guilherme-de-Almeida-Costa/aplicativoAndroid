import { useState } from 'react';
import { ChevronLeft, Bell, Check, X, ArrowRight } from 'lucide-react';
import type { NavProps } from './types';
import type { Screen } from './types';

interface Notification {
  id: number;
  type: 'edital' | 'prova' | 'tarefa' | 'bolsa' | 'sistema';
  title: string;
  summary: string;     // texto curto exibido no card
  detail: string;      // texto completo exibido no modal
  actions: { label: string; screen: Screen }[];
  time: string;
  read: boolean;
}

const typeConfig = {
  edital:  { icon: '', bg: '', border: '#ddd6fe', color: '#92400e',  label: 'Edital'   },
  prova:   { icon: '', bg: '', border: '#ddd6fe', color: '#991b1b',  label: 'Prova'    },
  tarefa:  { icon: '', bg: '', border: '#ddd6fe', color: '#1e40af',  label: 'Tarefa'   },
  bolsa:   { icon: '', bg: '', border: '#ddd6fe', color: '#15803d',  label: 'Bolsa'    },
  sistema: { icon: '', bg: '', border: '#ddd6fe', color: '#6d28d9',  label: 'Sistema'  },
};

const initialNotifications: Notification[] = [
  {
    id: 1,
    type: 'edital',
    title: 'Prazo se aproximando — Auxílio Moradia',
    summary: 'O prazo de inscrição encerra em 15/06. Você ainda tem documentos pendentes.',
    detail:
      'O prazo de inscrição do Edital Auxílio Moradia 2026/1 encerra no dia 15/06/2026.\n\n' +
      'Situação atual da sua inscrição:\n' +
      ' Documento de identificação — enviado\n' +
      ' Comprovante de matrícula — enviado\n' +
      ' Dados bancários — enviado\n' +
      ' Comprovante de renda — pendente\n' +
      ' Comprovante de residência — pendente\n' +
      ' Declaração de vulnerabilidade — pendente\n' +
      ' Certidão de composição familiar — pendente\n\n' +
      'Você completou 3 de 7 documentos (43%). Acesse o checklist para enviar os documentos restantes antes do prazo.\n\n' +
      'Dúvidas: dac.unb.br ou presencialmente no DAC — ICC Norte.',
    actions: [
      { label: 'Ir para o checklist', screen: 'document-checklist' },
      { label: 'Ver edital completo', screen: 'notices' },
    ],
    time: 'Agora',
    read: false,
  },
  {
    id: 2,
    type: 'prova',
    title: 'Prova de Física 1 em 8 dias',
    summary: 'Prova 2 marcada para 17/06 às 17h na sala FIS-A01/4.',
    detail:
      'Você tem uma prova se aproximando:\n\n' +
      ' Disciplina: Física 1 (FIS0110)\n' +
      ' Data: 17/06/2026 — quinta-feira\n' +
      ' Horário: 17h00\n' +
      ' Local: Sala FIS-A01/4\n' +
      ' Professor: Prof. Paulo Costa\n\n' +
      'Conteúdo cobrado:\n' +
      '• Módulo 3 — Dinâmica: leis de Newton e aplicações\n' +
      '• Módulo 4 — Energia: trabalho, energia cinética e potencial, conservação\n\n' +
      'Sugestão de estudos:\n' +
      '— Dias 1–3: revisar anotações dos módulos 3 e 4\n' +
      '— Dias 4–6: resolver exercícios das listas anteriores\n' +
      '— Dias 7–8: simulado cronometrado + revisão de fórmulas\n\n' +
      'Dica: peça ajuda ao UniBot para montar um cronograma personalizado!',
    actions: [
      { label: 'Ver minhas provas', screen: 'exams' },
    ],
    time: 'Há 1 hora',
    read: false,
  },
  {
    id: 3,
    type: 'bolsa',
    title: 'Nova bolsa compatível com seu perfil',
    summary: 'PIBEX — Extensão Universitária 2026 abriu inscrições. Prazo: 25/06.',
    detail:
      'Uma oportunidade compatível com o seu perfil foi identificada:\n\n' +
      ' Programa: PIBEX — Extensão Universitária 2026\n' +
      ' Órgão: DEX/UnB\n' +
      ' Valor: R$ 400,00/mês por 12 meses\n' +
      ' Prazo de inscrição: 25/06/2026\n' +
      ' Edital: Nº 02/2026 — DEX\n\n' +
      'Por que você foi selecionado:\n' +
      '• Seu curso (Eng. de Software) tem projetos elegíveis no CIC/UnB\n' +
      '• Você marcou "Participar de extensão" como objetivo\n' +
      '• Não há pendências no seu histórico acadêmico\n\n' +
      'Documentos necessários:\n' +
      '• Comprovante de matrícula (SIGAA)\n' +
      '• Histórico parcial atualizado\n' +
      '• Carta de intenção (modelo no site do DEX)\n' +
      '• Dados bancários\n\n' +
      'Acesse bolsas e auxílios para ver todos os detalhes e se inscrever.',
    actions: [
      { label: 'Ver bolsas e auxílios', screen: 'scholarships' },
      { label: 'Ver editais abertos', screen: 'notices' },
    ],
    time: 'Há 3 horas',
    read: false,
  },
  {
    id: 4,
    type: 'tarefa',
    title: 'Tarefa com prazo amanhã',
    summary: '"Lista de Cálculo 3" vence amanhã (12/06). Itens pendentes no checklist.',
    detail:
      'A seguinte tarefa vence amanhã e ainda tem itens incompletos:\n\n' +
      ' Tarefa: Lista de Cálculo 3\n' +
      ' Disciplina: Cálculo 1\n' +
      ' Prazo: 12/06/2026\n' +
      ' Prioridade: Alta\n\n' +
      'Status do checklist:\n' +
      ' Questões ímpares — concluído\n' +
      ' Questões pares — pendente\n' +
      ' Conferir gabarito — pendente\n\n' +
      'Você completou 1 de 3 itens. Restam 2 itens para finalizar a tarefa.\n\n' +
      'Dica do UniBot: separe pelo menos 1h hoje à noite para concluir as questões pares e conferir o gabarito antes de entregar.',
    actions: [
      { label: 'Ir para tarefas', screen: 'tasks' },
    ],
    time: 'Há 5 horas',
    read: false,
  },
  {
    id: 5,
    type: 'edital',
    title: 'Edital Monitoria 2026/1 aberto',
    summary: 'Vagas em Cálculo 1, Física 1 e Algoritmos. Prazo: 30/06.',
    detail:
      'Inscrições abertas para o Programa de Monitoria 2026/1:\n\n' +
      ' Edital: Nº 08/2026 — DEG/UnB\n' +
      ' Período de inscrição: até 30/06/2026\n' +
      ' Resultado: 10/07/2026\n' +
      ' Início das atividades: 01/08/2026\n\n' +
      'Disciplinas com vagas compatíveis com o seu perfil:\n' +
      '• Cálculo 1 (MAT0025) — 3 vagas\n' +
      '• Física 1 (FIS0110) — 2 vagas\n' +
      '• Algoritmos e Programação (CIC0004) — 4 vagas\n\n' +
      'Benefícios:\n' +
      '• Certificado de horas complementares (60h/semestre)\n' +
      '• Desenvolvimento de habilidades pedagógicas\n' +
      '• Fortalecimento do histórico acadêmico\n\n' +
      'Requisitos: aprovação na disciplina com nota mínima 5.0 e não estar em monitoria remunerada.',
    actions: [
      { label: 'Ver edital completo', screen: 'notices' },
      { label: 'Ver bolsas e auxílios', screen: 'scholarships' },
    ],
    time: 'Ontem, 14h',
    read: true,
  },
  {
    id: 6,
    type: 'prova',
    title: 'Prova de Cálculo 1 em 11 dias',
    summary: 'Prova 2 marcada para 20/06 às 08h. O UniBot pode ajudar com os estudos.',
    detail:
      'Lembrete de prova próxima:\n\n' +
      ' Disciplina: Cálculo 1 (MAT0025)\n' +
      ' Data: 20/06/2026 — sábado\n' +
      ' Horário: 08h00\n' +
      ' Local: ICC Sul — AT-024/6\n' +
      ' Professor: Prof. Ricardo Alves\n\n' +
      'Conteúdo cobrado (Prova 2):\n' +
      '• Derivadas: regras de derivação, regra da cadeia\n' +
      '• Aplicações de derivadas: máximos, mínimos, taxa de variação\n' +
      '• Integrais indefinidas: técnicas básicas de integração\n' +
      '• Integrais definidas: Teorema Fundamental do Cálculo\n\n' +
      'Situação atual:\n' +
      '• Lista de Cálculo 3 em andamento (1/3 itens feitos)\n' +
      '• Progresso no semestre: 62%\n\n' +
      'Você tem 11 dias — tempo suficiente para uma boa preparação. Peça ao UniBot um plano de estudos detalhado!',
    actions: [
      { label: 'Ver minhas provas', screen: 'exams' },
    ],
    time: 'Ontem, 09h',
    read: true,
  },
  {
    id: 7,
    type: 'sistema',
    title: 'Bem-vindo ao UniGuia! 🎓',
    summary: 'Seu perfil está configurado. Explore o app e comece a se organizar.',
    detail:
      'Olá, Roberto! Seja bem-vindo ao UniGuia — sua central acadêmica da UnB.\n\n' +
      'Seu perfil foi configurado com sucesso:\n' +
      ' Nome: Roberto Costa\n' +
      ' Curso: Engenharia de Software\n' +
      ' Campus: Darcy Ribeiro\n' +
      ' Semestre: 4º semestre — 2026/1\n\n' +
      'O que você pode fazer no UniGuia:\n\n' +
      ' Disciplinas — acompanhe faltas, progresso e atividades\n' +
      ' Cronograma — visualize aulas, provas e prazos\n' +
      ' Tarefas — organize atividades em um quadro Kanban\n' +
      ' Bolsas e auxílios — encontre oportunidades compatíveis\n' +
      ' Editais — acompanhe prazos e status de inscrições\n' +
      ' UniBot — seu assistente acadêmico com IA\n\n' +
      'Dica: comece conversando com o UniBot para montar seu cronograma da semana!',
    actions: [
      { label: 'Ver meu perfil', screen: 'profile' },
    ],
    time: '08/06, 10h',
    read: true,
  },
  {
    id: 8,
    type: 'bolsa',
    title: 'Resultado PIBIC publicado',
    summary: 'O resultado do Edital PIBIC 2025–2026 foi publicado. Acesse o SIGAA.',
    detail:
      'O resultado do Edital PIBIC 2025–2026 foi publicado pelo DEG/UnB.\n\n' +
      ' Edital: CNPq/UnB Nº 01/2025\n' +
      ' Publicação do resultado: 07/06/2026\n' +
      ' Início das atividades: 01/08/2026\n\n' +
      'Como verificar seu resultado:\n' +
      '1. Acesse sig.unb.br\n' +
      '2. Vá em Módulo Bolsas → PIBIC → Minha Candidatura\n' +
      '3. Verifique o status: Selecionado, Lista de espera ou Não selecionado\n\n' +
      'Se selecionado:\n' +
      '• Assine o Termo de Compromisso até 20/06/2026\n' +
      '• Confirme seus dados bancários no SIGAA\n' +
      '• Aguarde contato do seu orientador\n\n' +
      'Em caso de dúvidas, entre em contato com o DEG pelo e-mail deg@unb.br.',
    actions: [
      { label: 'Ver bolsas e auxílios', screen: 'scholarships' },
    ],
    time: '07/06, 16h',
    read: true,
  },
];

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function Notifications({ onNavigate }: NavProps) {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [selected, setSelected] = useState<Notification | null>(null);

  const unreadCount = notifications.filter(n => !n.read).length;
  const unread = notifications.filter(n => !n.read);
  const read   = notifications.filter(n => n.read);

  const markRead = (id: number) =>
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));

  const markAllRead = () =>
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));

  const openModal = (notif: Notification) => {
    markRead(notif.id);
    setSelected(notif);
  };

  const closeModal = () => setSelected(null);

  return (
    <div className="h-full flex flex-col" style={{ background: '#f0f4f8', position: 'relative' }}>

      {/* Header */}
      <div style={{ background: '#1a3a6b', padding: '16px 20px 20px', flexShrink: 0 }}>
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex items-center justify-center"
            style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'rgba(255,255,255,0.15)' }}
          >
            <ChevronLeft className="w-4 h-4 text-white" />
          </button>
          <div className="flex-1">
            <h2 className="font-bold" style={{ color: '#fff', fontSize: '20px' }}>Notificações</h2>
            <p style={{ color: '#93c5fd', fontSize: '13px' }}>
              {unreadCount > 0 ? `${unreadCount} não lidas` : 'Tudo em dia ✓'}
            </p>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl"
              style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', fontSize: '12px', fontWeight: '500' }}
            >
              <Check className="w-3 h-3" />
              Marcar todas
            </button>
          )}
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        {unread.length > 0 && (
          <>
            <p style={{ color: '#64748b', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Não lidas — {unread.length}
            </p>
            {unread.map(n => <NotifCard key={n.id} notif={n} onOpen={openModal} />)}
          </>
        )}

        {read.length > 0 && (
          <>
            <p style={{ color: '#94a3b8', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: unread.length ? '4px' : '0' }}>
              Anteriores — {read.length}
            </p>
            {read.map(n => <NotifCard key={n.id} notif={n} onOpen={openModal} />)}
          </>
        )}

        {notifications.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16" style={{ color: '#94a3b8' }}>
            <Bell className="w-10 h-10 mb-3 opacity-30" />
            <p style={{ fontSize: '14px' }}>Nenhuma notificação</p>
          </div>
        )}
        <div style={{ height: '16px' }} />
      </div>

      {/* ── Modal ── */}
      {selected && (
        <NotifModal
          notif={selected}
          onClose={closeModal}
          onNavigate={(screen) => { closeModal(); onNavigate(screen); }}
        />
      )}
    </div>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────

interface CardProps {
  notif: Notification;
  onOpen: (n: Notification) => void;
}

function NotifCard({ notif, onOpen }: CardProps) {
  const cfg = typeConfig[notif.type];

  return (
    <button
      onClick={() => onOpen(notif)}
      className="w-full text-left"
      style={{
        background: notif.read ? '#fff' : cfg.bg,
        borderRadius: '16px',
        border: notif.read ? '1px solid #e2e8f0' : `1.5px solid ${cfg.border}`,
        boxShadow: notif.read ? 'none' : '0 2px 8px rgba(0,0,0,0.06)',
        overflow: 'hidden',
      }}
    >
      <div className="flex items-start gap-3" style={{ padding: '14px' }}>
        {/* Icon */}
        

        {/* Text */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <p style={{
              color: notif.read ? '#334155' : '#0f172a',
              fontSize: '13px', fontWeight: notif.read ? '500' : '700',
              lineHeight: 1.3, flex: 1,
            }}>
              {notif.title}
            </p>
            {!notif.read && (
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: cfg.color, flexShrink: 0, marginTop: '3px' }} />
            )}
          </div>

          <p style={{ color: '#64748b', fontSize: '12px', lineHeight: 1.4, marginBottom: '6px' }}
            className="line-clamp-2">
            {notif.summary}
          </p>

          <div className="flex items-center justify-between">
            <span style={{ color: '#94a3b8', fontSize: '11px' }}>{notif.time}</span>
            <span style={{ color: cfg.color, fontSize: '11px', fontWeight: '600' }}>
              Toque para ver mais →
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────

interface ModalProps {
  notif: Notification;
  onClose: () => void;
  onNavigate: (screen: Screen) => void;
}

function NotifModal({ notif, onClose, onNavigate }: ModalProps) {
  const cfg = typeConfig[notif.type];

  return (
    <div
      style={{ position: 'absolute', inset: 0, zIndex: 50, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'flex-end' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{
        width: '100%', background: '#fff',
        borderRadius: '24px 24px 0 0',
        maxHeight: '82%', display: 'flex', flexDirection: 'column',
      }}>
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1" style={{ flexShrink: 0 }}>
          <div style={{ width: '36px', height: '4px', borderRadius: '2px', background: '#e2e8f0' }} />
        </div>

        {/* Modal header */}
        <div className="flex items-start gap-3 px-5 pt-3 pb-4" style={{ flexShrink: 0, borderBottom: '1px solid #f1f5f9' }}>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span
                className="px-2 py-0.5 rounded-full"
                style={{ background: cfg.bg, color: cfg.color, fontSize: '10px', fontWeight: '700', border: `1px solid ${cfg.border}` }}
              >
                {cfg.label}
              </span>
              <span style={{ color: '#94a3b8', fontSize: '11px' }}>{notif.time}</span>
            </div>
            <p style={{ color: '#0f172a', fontSize: '15px', fontWeight: '700', lineHeight: 1.3 }}>
              {notif.title}
            </p>
          </div>
          <button onClick={onClose} style={{ flexShrink: 0, marginTop: '2px' }}>
            <X className="w-5 h-5" style={{ color: '#94a3b8' }} />
          </button>
        </div>

        {/* Modal body — scrollable */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          <p style={{
            color: '#334155', fontSize: '14px', lineHeight: 1.75,
            whiteSpace: 'pre-line',
          }}>
            {notif.detail}
          </p>
        </div>

        {/* Actions */}
        {notif.actions.length > 0 && (
          <div
            className="flex flex-col gap-2 px-5 py-4"
            style={{ flexShrink: 0, borderTop: '1px solid #f1f5f9' }}
          >
            {notif.actions.map((action, i) => (
              <button
                key={i}
                onClick={() => onNavigate(action.screen)}
                className="w-full flex items-center justify-center gap-2 font-semibold"
                style={{
                  padding: '14px',
                  borderRadius: '14px',
                  background: i === 0 ? cfg.color : 'transparent',
                  color: i === 0 ? '#fff' : cfg.color,
                  fontSize: '14px',
                  border: i === 0 ? 'none' : `1.5px solid ${cfg.border}`,
                }}
              >
                {action.label}
                {i === 0 && <ArrowRight className="w-4 h-4" />}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
