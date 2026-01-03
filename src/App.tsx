import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { antdTheme } from './styles/antdTheme';
import HomePage from './pages/public/Home';
import StudentDashboard from './pages/student/Dashboard';
import StudentProfile from './pages/student/Profile';
import CurriculumBrowser from './pages/student/CurriculumBrowser';
import CurriculumDetail from './pages/student/CurriculumDetail';
import LessonViewer from './pages/student/LessonViewer';
import MyCurricula from './pages/student/MyCurricula';
import MyRequests from './pages/student/MyRequests';
import TutorialRequest from './pages/student/TutorialRequest';
import AdminDashboard from './pages/admin/Dashboard';
import AdminRequests from './pages/admin/AdminRequests';
import AdminSettings from './pages/admin/Settings';
import CurriculumEditor from './pages/admin/CurriculumEditor';
import TestBuilder from './pages/admin/TestBuilder';
import MyMeetings from './pages/student/MyMeetings';
import AdminCalendar from './pages/admin/AdminCalendar';
import Certificates from './pages/student/Certificates';
import TakeTest from './pages/student/TakeTest';
import AdminStudents from './pages/admin/Students';
import NotificationSystem from './components/NotificationSystem';
import './index.css';

function App() {
  return (
    <ConfigProvider theme={antdTheme}>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          
          {/* Student routes */}
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/curricula" element={<MyCurricula />} />
          <Route path="/student/browse" element={<CurriculumBrowser />} />
          <Route path="/student/curriculum/:id" element={<CurriculumDetail />} />
          <Route path="/student/lesson/:curriculumId/:moduleId/:lessonId" element={<LessonViewer />} />
          <Route path="/student/requests" element={<MyRequests />} />
          <Route path="/student/request/new" element={<TutorialRequest />} />
          <Route path="/student/meetings" element={<MyMeetings />} />
          <Route path="/student/certificates" element={<Certificates />} />
          <Route path="/student/test/:curriculumId" element={<TakeTest />} />
          <Route path="/student/profile" element={<StudentProfile />} />
          
          {/* Admin routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/students" element={<AdminStudents />} />
          <Route path="/admin/requests" element={<AdminRequests />} />
          <Route path="/admin/curricula" element={<CurriculumEditor />} />
          <Route path="/admin/calendar" element={<AdminCalendar />} />
          <Route path="/admin/tests" element={<TestBuilder />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          
          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <NotificationSystem />
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;

