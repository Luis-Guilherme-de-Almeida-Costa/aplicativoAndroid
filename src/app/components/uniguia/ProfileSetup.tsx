import { useState } from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import type { NavProps } from './types';

const goals = [
  'Conseguir bolsa PIBIC',
  'Manter bom desempenho',
  'Graduar no prazo',
  'Participar de extensão',
  'Fazer estágio',
  'Reduzir reprovações',
];

export default function ProfileSetup({ onNavigate }: NavProps) {
  const [step, setStep] = useState(1);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [form, setForm] = useState({
    nome: '',
    curso: 'Engenharia de Software',
    campus: 'Darcy Ribeiro',
    semestre: '4º Semestre',
    turno: 'Diurno',
    trabalha: 'Não',
    horasEstudo: '20h/semana',
  });

  const toggleGoal = (goal: string) => {
    setSelectedGoals(prev =>
      prev.includes(goal) ? prev.filter(g => g !== goal) : [...prev, goal]
    );
  };

  return (
    <div className="h-full flex flex-col" style={{ background: '#f0f4f8' }}>
      {/* Header */}
      <div style={{ background: '#1a3a6b', padding: '16px 20px 20px' }}>
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => step === 1 ? onNavigate('welcome') : setStep(1)}
            className="flex items-center justify-center"
            style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'rgba(255,255,255,0.15)' }}
          >
            <ChevronLeft className="w-4 h-4 text-white" />
          </button>
          <h2 className="font-semibold" style={{ color: '#ffffff', fontSize: '17px' }}>
            Cadastro de Perfil
          </h2>
        </div>

        {/* Progress steps */}
        <div className="flex items-center gap-2">
          {[1, 2].map(s => (
            <div key={s} className="flex items-center gap-2">
              <div
                className="flex items-center justify-center rounded-full"
                style={{
                  width: '28px',
                  height: '28px',
                  background: s <= step ? '#ffffff' : 'rgba(255,255,255,0.2)',
                  color: s <= step ? '#1a3a6b' : 'rgba(255,255,255,0.5)',
                  fontSize: '12px',
                  fontWeight: '600',
                }}
              >
                {s < step ? <Check className="w-3 h-3" /> : s}
              </div>
              <span style={{ color: s <= step ? '#fff' : 'rgba(255,255,255,0.5)', fontSize: '12px' }}>
                {s === 1 ? 'Dados acadêmicos' : 'Objetivos'}
              </span>
              {s < 2 && <div style={{ flex: 1, height: '2px', background: 'rgba(255,255,255,0.2)', width: '20px', borderRadius: '1px' }} />}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
        {step === 1 ? (
          <>
            <div>
              <p className="font-medium mb-3" style={{ color: '#334155', fontSize: '15px' }}>
                Informe seus dados acadêmicos
              </p>
              <div className="flex flex-col gap-3">
                {[
                  { label: 'Nome completo', value: form.nome, key: 'nome', placeholder: 'Seu nome completo' },
                ].map(({ label, value, key, placeholder }) => (
                  <div key={key}>
                    <label style={{ color: '#64748b', fontSize: '12px', fontWeight: '500', display: 'block', marginBottom: '4px' }}>
                      {label}
                    </label>
                    <input
                      className="w-full"
                      value={value}
                      onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                      placeholder={placeholder}
                      style={{
                        border: '1.5px solid #e2e8f0',
                        borderRadius: '12px',
                        padding: '12px 14px',
                        background: '#fff',
                        color: '#0f172a',
                        fontSize: '14px',
                        outline: 'none',
                      }}
                    />
                  </div>
                ))}

                {[
                  { label: 'Curso', value: form.curso, key: 'curso', options: ['Engenharia de Software', 'Ciência da Computação', 'Engenharia Elétrica', 'Matemática', 'Física', 'Administração', 'Direito'] },
                  { label: 'Campus', value: form.campus, key: 'campus', options: ['Darcy Ribeiro', 'Faculdade de Saúde', 'Ceilândia', 'Gama', 'Planaltina'] },
                  { label: 'Semestre atual', value: form.semestre, key: 'semestre', options: ['1º Semestre', '2º Semestre', '3º Semestre', '4º Semestre', '5º Semestre', '6º Semestre', '7º Semestre', '8º Semestre'] },
                  { label: 'Turno preferido', value: form.turno, key: 'turno', options: ['Diurno', 'Noturno', 'Integral'] },
                ].map(({ label, value, key, options }) => (
                  <div key={key}>
                    <label style={{ color: '#64748b', fontSize: '12px', fontWeight: '500', display: 'block', marginBottom: '4px' }}>
                      {label}
                    </label>
                    <select
                      className="w-full"
                      value={value}
                      onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                      style={{
                        border: '1.5px solid #e2e8f0',
                        borderRadius: '12px',
                        padding: '12px 14px',
                        background: '#fff',
                        color: '#0f172a',
                        fontSize: '14px',
                        outline: 'none',
                        appearance: 'none',
                        WebkitAppearance: 'none',
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 14px center',
                      }}
                    >
                      {options.map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                ))}

                {/* Trabalha? */}
                <div>
                  <label style={{ color: '#64748b', fontSize: '12px', fontWeight: '500', display: 'block', marginBottom: '6px' }}>
                    Você trabalha?
                  </label>
                  <div className="flex gap-2">
                    {['Sim', 'Não'].map(opt => (
                      <button
                        key={opt}
                        onClick={() => setForm(f => ({ ...f, trabalha: opt }))}
                        style={{
                          flex: 1,
                          padding: '10px',
                          borderRadius: '12px',
                          fontSize: '14px',
                          fontWeight: '500',
                          border: form.trabalha === opt ? '2px solid #1d4ed8' : '1.5px solid #e2e8f0',
                          background: form.trabalha === opt ? '#eff6ff' : '#fff',
                          color: form.trabalha === opt ? '#1d4ed8' : '#64748b',
                        }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Horas de estudo */}
                <div>
                  <label style={{ color: '#64748b', fontSize: '12px', fontWeight: '500', display: 'block', marginBottom: '6px' }}>
                    Disponibilidade semanal de estudo
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['5h/semana', '10h/semana', '15h/semana', '20h/semana', '30h/semana', '+30h/semana'].map(h => (
                      <button
                        key={h}
                        onClick={() => setForm(f => ({ ...f, horasEstudo: h }))}
                        style={{
                          padding: '8px 14px',
                          borderRadius: '10px',
                          fontSize: '13px',
                          fontWeight: '500',
                          border: form.horasEstudo === h ? '2px solid #1d4ed8' : '1.5px solid #e2e8f0',
                          background: form.horasEstudo === h ? '#eff6ff' : '#fff',
                          color: form.horasEstudo === h ? '#1d4ed8' : '#64748b',
                        }}
                      >
                        {h}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div>
              <p className="font-medium mb-1" style={{ color: '#334155', fontSize: '15px' }}>
                Quais são seus objetivos acadêmicos?
              </p>
              <p style={{ color: '#64748b', fontSize: '13px', marginBottom: '16px' }}>
                Selecione todos que se aplicam
              </p>
              <div className="flex flex-col gap-2">
                {goals.map(goal => (
                  <button
                    key={goal}
                    onClick={() => toggleGoal(goal)}
                    className="flex items-center gap-3 text-left"
                    style={{
                      padding: '14px',
                      borderRadius: '14px',
                      border: selectedGoals.includes(goal) ? '2px solid #1d4ed8' : '1.5px solid #e2e8f0',
                      background: selectedGoals.includes(goal) ? '#eff6ff' : '#fff',
                    }}
                  >
                    <div
                      className="flex items-center justify-center flex-shrink-0"
                      style={{
                        width: '22px',
                        height: '22px',
                        borderRadius: '6px',
                        border: selectedGoals.includes(goal) ? 'none' : '1.5px solid #cbd5e1',
                        background: selectedGoals.includes(goal) ? '#1d4ed8' : 'transparent',
                      }}
                    >
                      {selectedGoals.includes(goal) && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <span style={{ color: selectedGoals.includes(goal) ? '#1d4ed8' : '#334155', fontSize: '14px', fontWeight: '500' }}>
                      {goal}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Footer button */}
      <div className="p-5 pt-0">
        <button
          onClick={() => step === 1 ? setStep(2) : onNavigate('dashboard')}
          className="w-full flex items-center justify-center gap-2 font-semibold"
          style={{
            background: '#1d4ed8',
            color: '#fff',
            padding: '16px',
            borderRadius: '16px',
            fontSize: '15px',
          }}
        >
          {step === 1 ? 'Continuar' : 'Criar perfil'}
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
