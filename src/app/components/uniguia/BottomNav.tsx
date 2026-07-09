import { useState } from 'react';
import { Home, BookOpen, Calendar, Award, Briefcase, FlaskConical, Leaf, User, Menu, X, Trophy, ChevronDown, BarChart2, GraduationCap, Users } from 'lucide-react';
import type { Screen } from './types';

interface BottomNavProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

const inicioScreens: Screen[] = ['dashboard', 'subjects', 'timetable'];
const inicioSubItems = [
  { id: 'dashboard' as Screen, icon: Home,     label: 'Início' },
  { id: 'subjects'  as Screen, icon: BookOpen, label: 'Disciplinas' },
  { id: 'timetable' as Screen, icon: Calendar, label: 'Cronograma' },
];

const opportunityScreens: Screen[] = ['scholarships', 'internships', 'research', 'extension'];
const opportunityItems = [
  { id: 'scholarships' as Screen, icon: Award,        label: 'Bolsas' },
  { id: 'internships'  as Screen, icon: Briefcase,    label: 'Estágios' },
  { id: 'research'     as Screen, icon: FlaskConical, label: 'Pesquisas' },
  { id: 'extension'    as Screen, icon: Leaf,         label: 'Extensão' },
];

const bottomItems = [
  { id: 'workload' as Screen, icon: BarChart2,     label: 'Carga Acadêmica' },
  { id: 'courses'  as Screen, icon: GraduationCap, label: 'Cursos' },
  { id: 'faculty'  as Screen, icon: Users,         label: 'Docentes' },
  { id: 'profile'  as Screen, icon: User,          label: 'Perfil' },
];

export default function BottomNav({ currentScreen, onNavigate }: BottomNavProps) {
  const [open, setOpen]                       = useState(false);
  const [inicioOpen, setInicioOpen]           = useState(inicioScreens.includes(currentScreen));
  const [opportunitiesOpen, setOpportunitiesOpen] = useState(opportunityScreens.includes(currentScreen));

  const handleNavigate = (id: Screen) => {
    onNavigate(id);
    setOpen(false);
  };

  const isInicioActive      = inicioScreens.includes(currentScreen);
  const isOpportunityActive = opportunityScreens.includes(currentScreen);

  const NavItem = ({ id, icon: Icon, label }: { id: Screen; icon: React.ElementType; label: string }) => {
    const active = currentScreen === id;
    return (
      <button
        onClick={() => handleNavigate(id)}
        className="flex items-center gap-3 rounded-xl transition-all"
        style={{
          background: active ? '#eff6ff' : 'transparent',
          marginBottom: '2px',
          marginLeft: '18px',
          marginRight: '8px',
          padding: '7px 10px',
          width: 'calc(100% - 26px)',
        }}
      >
        <div
          className="flex items-center justify-center rounded-xl flex-shrink-0"
          style={{
            width: '28px', height: '28px',
            background: active ? '#1d4ed8' : '#f8fafc',
            border: active ? 'none' : '1px solid #e2e8f0',
          }}
        >
          <Icon style={{ width: '14px', height: '14px', color: active ? '#fff' : '#64748b' }} />
        </div>
        <span style={{ fontSize: '12px', fontWeight: active ? '700' : '500', color: active ? '#1d4ed8' : '#475569' }}>
          {label}
        </span>
      </button>
    );
  };

  const GroupHeader = ({
    label, icon: Icon, isActive, isOpen, onToggle,
  }: {
    label: string; icon: React.ElementType; isActive: boolean; isOpen: boolean; onToggle: () => void;
  }) => (
    <button
      onClick={onToggle}
      className="flex items-center gap-3 rounded-xl transition-all"
      style={{
        background: isOpen ? '#f8fafc' : 'transparent',
        marginBottom: '2px',
        marginLeft: '8px',
        marginRight: '8px',
        padding: '10px 12px',
        width: 'calc(100% - 16px)',
        border: isOpen ? '1px solid #e2e8f0' : 'none',
      }}
    >
      <div
        className="flex items-center justify-center rounded-xl flex-shrink-0"
        style={{ width: '34px', height: '34px', background: isActive ? '#1d4ed8' : '#f1f5f9' }}
      >
        <Icon style={{ width: '16px', height: '16px', color: isActive ? '#fff' : '#64748b' }} />
      </div>
      <span style={{ flex: 1, textAlign: 'left', fontSize: '13px', fontWeight: isActive ? '700' : '500', color: isActive ? '#1d4ed8' : '#475569' }}>
        {label}
      </span>
      <ChevronDown style={{
        width: '14px', height: '14px', color: '#94a3b8', flexShrink: 0,
        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
        transition: 'transform 0.2s ease',
      }} />
    </button>
  );

  return (
    <>
      {/* Hamburger button */}
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          position: 'absolute', top: '58px', left: '14px', zIndex: 30,
          width: '36px', height: '36px', borderRadius: '12px',
          background: open ? '#1d4ed8' : 'rgba(255,255,255,0.92)',
          border: open ? 'none' : '1px solid #e2e8f0',
          boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'background 0.2s',
        }}
      >
        {open
          ? <X className="w-4 h-4" style={{ color: '#fff' }} />
          : <Menu className="w-4 h-4" style={{ color: '#1d4ed8' }} />
        }
      </button>

      {/* Backdrop */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.25)', zIndex: 20, backdropFilter: 'blur(1px)' }}
        />
      )}

      {/* Sliding sidebar */}
      <div
        style={{
          position: 'absolute', top: 48, left: 0, bottom: 0, width: '190px',
          background: '#ffffff', zIndex: 25, borderRight: '1px solid #e2e8f0',
          boxShadow: open ? '4px 0 20px rgba(0,0,0,0.12)' : 'none',
          transform: open ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.28s cubic-bezier(0.4, 0, 0.2, 1)',
          display: 'flex', flexDirection: 'column',
          paddingTop: '64px', paddingBottom: '20px', overflowY: 'auto',
        }}
      >
        <p style={{ color: '#94a3b8', fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', paddingLeft: '20px', marginBottom: '8px' }}>
          Navegação
        </p>

        {/* Início group */}
        <div style={{ marginBottom: '2px' }}>
          <GroupHeader
            label="Início"
            icon={Home}
            isActive={isInicioActive}
            isOpen={inicioOpen}
            onToggle={() => setInicioOpen(v => !v)}
          />
          <div style={{ overflow: 'hidden', maxHeight: inicioOpen ? '160px' : '0px', transition: 'max-height 0.25s cubic-bezier(0.4, 0, 0.2, 1)' }}>
            <div style={{ paddingBottom: '4px' }}>
              {inicioSubItems.map(item => <NavItem key={item.id} {...item} />)}
            </div>
          </div>
        </div>

        {/* Oportunidades group */}
        <div style={{ marginBottom: '2px' }}>
          <GroupHeader
            label="Oportunidades"
            icon={Trophy}
            isActive={isOpportunityActive}
            isOpen={opportunitiesOpen}
            onToggle={() => setOpportunitiesOpen(v => !v)}
          />
          <div style={{ overflow: 'hidden', maxHeight: opportunitiesOpen ? '200px' : '0px', transition: 'max-height 0.25s cubic-bezier(0.4, 0, 0.2, 1)' }}>
            <div style={{ paddingBottom: '4px' }}>
              {opportunityItems.map(item => <NavItem key={item.id} {...item} />)}
            </div>
          </div>
        </div>

        {/* Perfil */}
        {bottomItems.map(item => {
          const active = currentScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavigate(item.id)}
              className="flex items-center gap-3 rounded-xl transition-all"
              style={{
                background: active ? '#eff6ff' : 'transparent',
                marginBottom: '2px', marginLeft: '8px', marginRight: '8px',
                padding: '10px 12px', width: 'calc(100% - 16px)',
              }}
            >
              <div className="flex items-center justify-center rounded-xl flex-shrink-0"
                style={{ width: '34px', height: '34px', background: active ? '#1d4ed8' : '#f1f5f9' }}>
                <item.icon style={{ width: '16px', height: '16px', color: active ? '#fff' : '#64748b' }} />
              </div>
              <span style={{ fontSize: '13px', fontWeight: active ? '700' : '500', color: active ? '#1d4ed8' : '#475569' }}>
                {item.label}
              </span>
            </button>
          );
        })}

        {/* Branding */}
        <div style={{ marginTop: 'auto', paddingLeft: '20px', paddingRight: '20px' }}>
          <div style={{ height: '1px', background: '#f1f5f9', marginBottom: '14px' }} />
          <p style={{ color: '#94a3b8', fontSize: '10px', fontWeight: '600' }}>UniGuia · UnB 2026/1</p>
        </div>
      </div>
    </>
  );
}
