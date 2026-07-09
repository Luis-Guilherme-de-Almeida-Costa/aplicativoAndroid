import { useState } from 'react';
import { Wifi, Battery } from 'lucide-react';
import type { Screen } from './components/uniguia/types';
import BottomNav from './components/uniguia/BottomNav';
import WelcomeScreen from './components/uniguia/WelcomeScreen';
import LoginScreen from './components/uniguia/LoginScreen';
import ProfileSetup from './components/uniguia/ProfileSetup';
import Dashboard from './components/uniguia/Dashboard';
import Subjects from './components/uniguia/Subjects';
import PlanSemester from './components/uniguia/PlanSemester';
import ScheduleBuilder from './components/uniguia/ScheduleBuilder';
import Timetable from './components/uniguia/Timetable';
import Tasks from './components/uniguia/Tasks';
import Scholarships from './components/uniguia/Scholarships';
import Notices from './components/uniguia/Notices';
import DocumentChecklist from './components/uniguia/DocumentChecklist';
import AIAssistant from './components/uniguia/AIAssistant';
import Profile from './components/uniguia/Profile';
import ExamManager from './components/uniguia/ExamManager';
import Notifications from './components/uniguia/Notifications';
import Internships from './components/uniguia/Internships';
import Research from './components/uniguia/Research';
import Extension from './components/uniguia/Extension';
import WorkloadAnalysis from './components/uniguia/WorkloadAnalysis';
import Courses from './components/uniguia/Courses';
import Faculty from './components/uniguia/Faculty';

const bottomNavScreens: Screen[] = ['dashboard', 'subjects', 'timetable', 'scholarships', 'internships', 'research', 'extension', 'workload', 'courses', 'faculty', 'profile'];

const screensThatNeedAvatar: Screen[] = [];

export default function App() {
  const [screen, setScreen] = useState<Screen>('welcome');

  const showBottomNav = bottomNavScreens.includes(screen);
  const isWelcome = screen === 'welcome';

  // Status bar colors
  const statusBg = isWelcome ? 'transparent' : '#1a3a6b';

  const renderScreen = () => {
    switch (screen) {
      case 'welcome':           return <WelcomeScreen onNavigate={setScreen} />;
      case 'login':             return <LoginScreen onNavigate={setScreen} />;
      case 'profile-setup':     return <ProfileSetup onNavigate={setScreen} />;
      case 'dashboard':         return <Dashboard onNavigate={setScreen} />;
      case 'subjects':          return <Subjects onNavigate={setScreen} />;
      case 'plan-semester':     return <PlanSemester onNavigate={setScreen} />;
      case 'schedule-builder':  return <ScheduleBuilder onNavigate={setScreen} />;
      case 'timetable':         return <Timetable onNavigate={setScreen} />;
      case 'tasks':             return <Tasks onNavigate={setScreen} />;
      case 'scholarships':      return <Scholarships onNavigate={setScreen} />;
      case 'notices':           return <Notices onNavigate={setScreen} />;
      case 'document-checklist':return <DocumentChecklist onNavigate={setScreen} />;
      case 'ai-assistant':      return <AIAssistant onNavigate={setScreen} />;
      case 'profile':           return <Profile onNavigate={setScreen} />;
      case 'exams':             return <ExamManager onNavigate={setScreen} />;
      case 'notifications':     return <Notifications onNavigate={setScreen} />;
      case 'internships':       return <Internships onNavigate={setScreen} />;
      case 'research':          return <Research onNavigate={setScreen} />;
      case 'extension':         return <Extension onNavigate={setScreen} />;
      case 'workload':          return <WorkloadAnalysis onNavigate={setScreen} />;
      case 'courses':           return <Courses onNavigate={setScreen} />;
      case 'faculty':           return <Faculty onNavigate={setScreen} />;
      default:                  return <Dashboard onNavigate={setScreen} />;
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #94a3b8 0%, #64748b 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* Phone frame */}
      <div
        style={{
          width: '390px',
          height: '844px',
          borderRadius: '54px',
          border: '12px solid #1c1c1e',
          boxShadow: '0 0 0 2px #3a3a3c, 0 40px 100px rgba(0,0,0,0.5), inset 0 0 0 2px #444',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          background: '#f0f4f8',
        }}
      >
        {/* Notch */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '120px',
            height: '32px',
            background: '#1c1c1e',
            borderRadius: '0 0 20px 20px',
            zIndex: 20,
          }}
        />

        {/* Status bar */}
        <div
          style={{
            height: '48px',
            background: statusBg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingLeft: '24px',
            paddingRight: '20px',
            paddingTop: '8px',
            flexShrink: 0,
            zIndex: 10,
            transition: 'background 0.3s ease',
          }}
        >
          <span style={{ color: '#fff', fontSize: '12px', fontWeight: '600' }}>9:41</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {/* Signal bars */}
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1.5px' }}>
              {[4, 6, 8, 10].map((h, i) => (
                <div key={i} style={{ width: '3px', height: `${h}px`, borderRadius: '1px', background: i < 3 ? '#fff' : 'rgba(255,255,255,0.4)' }} />
              ))}
            </div>
            <Wifi style={{ width: '14px', height: '14px', color: '#fff' }} />
            <Battery style={{ width: '18px', height: '14px', color: '#fff' }} />
          </div>
        </div>

        {/* Screen content */}
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', minHeight: 0, position: 'relative' }}>
          {/* Avatar button (only on main screens) */}
          {screensThatNeedAvatar.includes(screen) && (
            <button
              onClick={() => setScreen('profile')}
              style={{
                position: 'absolute',
                top: screen === 'dashboard' ? '68px' : '64px',
                right: '20px',
                zIndex: 15,
                width: '30px',
                height: '30px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                color: '#fff',
                fontSize: '10px',
                fontWeight: '700',
                border: '2px solid rgba(255,255,255,0.3)',
                display: screen === 'dashboard' ? 'none' : 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              RC
            </button>
          )}
          {renderScreen()}
        </div>

        {/* Side navigation */}
        {showBottomNav && (
          <BottomNav currentScreen={screen} onNavigate={setScreen} />
        )}
      </div>

      {/* Screen label */}
      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '6px 16px',
          color: '#fff',
          fontSize: '11px',
          fontWeight: '500',
          letterSpacing: '0.05em',
          pointerEvents: 'none',
        }}
      >
        {screen.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
      </div>
    </div>
  );
}
