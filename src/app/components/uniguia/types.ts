export type Screen =
  | 'welcome'
  | 'login'
  | 'profile-setup'
  | 'dashboard'
  | 'subjects'
  | 'plan-semester'
  | 'schedule-builder'
  | 'timetable'
  | 'tasks'
  | 'scholarships'
  | 'notices'
  | 'document-checklist'
  | 'ai-assistant'
  | 'profile'
  | 'exams'
  | 'notifications'
  | 'internships'
  | 'research'
  | 'extension'
  | 'workload'
  | 'courses'
  | 'faculty';

export interface NavProps {
  onNavigate: (screen: Screen) => void;
}
