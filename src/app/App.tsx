import { useState } from 'react';
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
        height: '100vh',
        width: '100vw',
        background: '#f0f4f8',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        // Aqui está a mágica da Safe Area real:
        paddingTop: 'env(safe-area-inset-top)',
        paddingBottom: 'env(safe-area-inset-bottom)',
        overflow: 'hidden'
      }}
    >
      {/* Screen content */}
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        {/* Avatar button (only on main screens) */}
        {screensThatNeedAvatar.includes(screen) && (
          <button
            onClick={() => setScreen('profile')}
            style={{
              position: 'absolute',
              top: '20px',
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
  );
}1