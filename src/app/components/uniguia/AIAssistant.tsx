import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles } from 'lucide-react';
import type { NavProps } from './types';

interface Message {
  id: number;
  from: 'bot' | 'user';
  text: string;
  time: string;
}

const quickQuestions = [
  'Monte meu cronograma da semana',
  'Quais bolsas combinam comigo?',
  'Tenho prova em 10 dias, como estudar?',
  'Minha grade tem choque de horário?',
];

const initialMessages: Message[] = [
  {
    id: 1,
    from: 'bot',
    text: 'Olá, Roberto! 👋 Sou o UniBot, seu assistente acadêmico inteligente.\n\nPosso te ajudar com:\n• Montar cronogramas de estudo\n• Sugerir disciplinas para o próximo semestre\n• Verificar bolsas compatíveis com seu perfil\n• Organizar tarefas e prazos\n• Verificar conflitos na sua grade\n\nComo posso te ajudar hoje?',
    time: '09:41',
  },
];

const botResponses: Record<string, string> = {
  'Monte meu cronograma da semana': '📅 Cronograma sugerido para sua semana:\n\n**Seg:** Cálculo 08h • Algoritmos 10h • Física 16h • Estudo Cálculo 19h-21h\n**Ter:** Estudo Algoritmos 09h-10h • Humanidades 14h • Revisão Física 19h-21h\n**Qua:** Cálculo 08h • Algoritmos 10h • Descanso 14h • Estudo Humanidades 16h-18h\n**Qui:** Algoritmos 10h • Humanidades 14h • Prova Física 17h ⚠️\n**Sex:** Cálculo 08h • Física 16h • Revisão geral 19h-21h\n\n🎯 Total: ~28h de atividades + 12h de estudo livre.',
  'Quais bolsas combinam comigo?': '🏆 Baseado no seu perfil, encontrei 3 bolsas compatíveis:\n\n1. **Auxílio Socioeconômico** — Prazo: 20/06\n   Renda familiar per capita até 1,5 salários mínimos.\n\n2. **Monitoria — Cálculo 1** — Prazo: 30/06\n   Seu desempenho em Cálculo é compatível com monitoria!\n\n3. **PIBIC — Computação** — Aberto até 25/06\n   Vários projetos de pesquisa no CIC.\n\nQuer que eu monte o checklist de documentos para alguma dessas?',
  'Tenho prova em 10 dias, como estudar?': '📚 Plano de estudos para Cálculo 1 (10 dias):\n\n**Dias 1-3: Revisão teórica**\n• Limites e continuidade (revisão rápida)\n• Derivadas — regras e aplicações\n• Integrais — técnicas básicas\n\n**Dias 4-6: Exercícios práticos**\n• Lista de Cálculo 3 (que está em andamento!)\n• Provas antigas no SIGAA\n• Foco nas questões de maior peso\n\n**Dias 7-8: Tópicos difíceis**\n• Identifique os temas com mais erro\n• Revisão com colegas ou monitor\n\n**Dias 9-10: Revisão final**\n• Simulado completo cronometrado\n• Descanso adequado antes da prova\n\n💡 Dica: Você tem 2h livres todo dia às 19h — use para estudar Cálculo!',
  'Minha grade tem choque de horário?': '⚠️ Detectei 1 conflito na sua grade atual:\n\n**Cálculo 1** (Seg/Qua/Sex 08h-10h)\n**Algoritmos** — nenhum conflito\n**Humanidades** — nenhum conflito\n**Física 1** (Seg/Qua 16h-18h) — OK\n\nSua grade atual está bem organizada! Os únicos choques seriam se você tentasse adicionar disciplinas que ocupam:\n• Seg/Qua/Sex 08h-10h\n• Ter/Qui 10h-12h\n• Ter/Qui 14h-16h\n• Seg/Qua 16h-18h\n\nQuer que eu sugira disciplinas optativas sem choque de horário para 2025/1?',
};

export default function AIAssistant({ onNavigate }: NavProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { id: Date.now(), from: 'user', text, time: '09:4' + messages.length };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = botResponses[text] ||
        'Entendi! Estou analisando sua situação acadêmica... 🤔\n\nBaseado no seu perfil (Engenharia de Software, 4º semestre, 20h disponíveis/semana), posso te ajudar a organizar melhor sua rotina. Pode me contar mais sobre o que precisa?';

      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        from: 'bot',
        text: response,
        time: '09:4' + (messages.length + 1),
      }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="h-full flex flex-col" style={{ background: '#f0f4f8' }}>
      {/* Header */}
      <div style={{ background: '#1a3a6b', padding: '16px 20px 16px' }}>
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center"
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #7c3aed, #1d4ed8)',
            }}
          >
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-bold" style={{ color: '#ffffff', fontSize: '17px' }}>UniBot</h2>
            <div className="flex items-center gap-1.5">
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80' }} />
              <span style={{ color: '#93c5fd', fontSize: '12px' }}>Assistente acadêmico online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.from === 'bot' && (
              <div
                className="flex items-center justify-center flex-shrink-0 self-end mr-2"
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '9px',
                  background: 'linear-gradient(135deg, #7c3aed, #1d4ed8)',
                  marginBottom: '2px',
                }}
              >
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
            )}
            <div
              style={{
                maxWidth: '80%',
                padding: '10px 14px',
                borderRadius: msg.from === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                background: msg.from === 'user' ? '#1d4ed8' : '#fff',
                boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
                border: msg.from === 'bot' ? '1px solid #e2e8f0' : 'none',
              }}
            >
              <p style={{
                color: msg.from === 'user' ? '#fff' : '#334155',
                fontSize: '13px',
                lineHeight: 1.5,
                whiteSpace: 'pre-line',
              }}>
                {msg.text}
              </p>
              <p style={{
                color: msg.from === 'user' ? 'rgba(255,255,255,0.6)' : '#94a3b8',
                fontSize: '10px',
                marginTop: '4px',
                textAlign: 'right',
              }}>
                {msg.time}
              </p>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div
              className="flex items-center justify-center flex-shrink-0 self-end mr-2"
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '9px',
                background: 'linear-gradient(135deg, #7c3aed, #1d4ed8)',
              }}
            >
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <div
              style={{
                padding: '12px 16px',
                borderRadius: '18px 18px 18px 4px',
                background: '#fff',
                border: '1px solid #e2e8f0',
              }}
            >
              <div className="flex gap-1 items-center">
                {[0, 1, 2].map(i => (
                  <div
                    key={i}
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: '#94a3b8',
                      animation: `bounce ${0.6 + i * 0.15}s ease-in-out infinite`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Quick questions */}
      {messages.length <= 2 && (
        <div className="px-4 pb-2">
          <p style={{ color: '#94a3b8', fontSize: '11px', marginBottom: '6px' }}>Perguntas rápidas:</p>
          <div className="flex flex-col gap-1.5">
            {quickQuestions.map(q => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="text-left px-3 py-2.5 rounded-xl"
                style={{
                  background: '#fff',
                  border: '1px solid #e2e8f0',
                  color: '#1d4ed8',
                  fontSize: '12px',
                  fontWeight: '500',
                }}
              >
                💬 {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div
        className="flex items-center gap-2 px-4 pb-4 pt-2"
        style={{ borderTop: '1px solid #e2e8f0', background: '#fff' }}
      >
        <input
          className="flex-1 outline-none"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
          placeholder="Pergunte algo ao UniBot..."
          style={{
            background: '#f8fafc',
            border: '1.5px solid #e2e8f0',
            borderRadius: '14px',
            padding: '10px 14px',
            fontSize: '13px',
            color: '#334155',
          }}
        />
        <button
          onClick={() => sendMessage(input)}
          disabled={!input.trim()}
          className="flex items-center justify-center flex-shrink-0"
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: input.trim() ? '#1d4ed8' : '#e2e8f0',
          }}
        >
          <Send className="w-4 h-4" style={{ color: input.trim() ? '#fff' : '#94a3b8' }} />
        </button>
      </div>
    </div>
  );
}
