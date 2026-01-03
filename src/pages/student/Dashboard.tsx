import { Link } from 'react-router-dom';
import StudentLayout from '../../layouts/StudentLayout';
import ProgressCard from '../../components/ProgressCard';
import { currentUser, mockCurricula, mockMeetings } from '../../data/mockData';
import {
  BookOpen,
  Clock,
  Award,
  TrendingUp,
  Calendar,
  CheckCircle,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// Mock data for charts
const weeklyProgressData = [
  { day: 'Mon', hours: 2 },
  { day: 'Tue', hours: 3 },
  { day: 'Wed', hours: 1.5 },
  { day: 'Thu', hours: 4 },
  { day: 'Fri', hours: 2.5 },
  { day: 'Sat', hours: 5 },
  { day: 'Sun', hours: 3 },
];

const monthlyProgressData = [
  { month: 'Jan', modules: 2 },
  { month: 'Feb', modules: 3 },
  { month: 'Mar', modules: 4 },
];

export default function StudentDashboard() {
  // Get enrolled curricula
  const enrolledCurricula = mockCurricula.filter((c) =>
    currentUser.enrolledTracks.includes(c.track)
  );

  // Get upcoming meetings
  const upcomingMeetings = mockMeetings
    .filter((m) => m.status === 'scheduled' && m.studentId === currentUser.id)
    .sort((a, b) => a.scheduledAt.getTime() - b.scheduledAt.getTime());

  return (
    <StudentLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">
            Welcome back, {currentUser.name.split(' ')[0]}! 👋
          </h1>
          <p className="text-gray-600">
            Here's your learning progress and upcoming activities
          </p>
        </div>

        {/* Progress Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <ProgressCard
            title="Overall Progress"
            value={`${currentUser.progress}%`}
            subtitle="Keep up the great work!"
            icon={<TrendingUp className="w-6 h-6" />}
            trend={{ value: 12, isPositive: true }}
            color="primary"
          />
          <ProgressCard
            title="Hours Logged"
            value={currentUser.hoursLogged}
            subtitle="This month"
            icon={<Clock className="w-6 h-6" />}
            trend={{ value: 8, isPositive: true }}
            color="accent"
          />
          <ProgressCard
            title="Modules Completed"
            value={`${currentUser.completedModules}/${currentUser.totalModules}`}
            subtitle={`${Math.round((currentUser.completedModules / currentUser.totalModules) * 100)}% complete`}
            icon={<CheckCircle className="w-6 h-6" />}
            color="success"
          />
          <ProgressCard
            title="Active Tracks"
            value={currentUser.enrolledTracks.length}
            subtitle="Learning paths"
            icon={<BookOpen className="w-6 h-6" />}
            color="purple"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Weekly Activity */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Weekly Activity
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={weeklyProgressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="hours"
                  stroke="#1e40af"
                  strokeWidth={2}
                  dot={{ fill: '#1e40af', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Monthly Progress */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Modules Completed
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={monthlyProgressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="modules" fill="#1e40af" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Enrolled Curricula */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                My Learning Paths
              </h2>
              <Link
                to="/student/browse"
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                Browse More →
              </Link>
            </div>
            <div className="space-y-4">
              {enrolledCurricula.map((curriculum) => {
                const completedModules = curriculum.modules.filter(
                  (m) => m.progress === 100
                ).length;
                const totalModules = curriculum.modules.length;
                const progress = Math.round(
                  (completedModules / totalModules) * 100
                );

                return (
                  <div
                    key={curriculum.id}
                    className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {curriculum.title}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {curriculum.description}
                        </p>
                      </div>
                      <span className="ml-4 px-3 py-1 bg-primary-50 text-primary-600 text-xs font-semibold rounded-full">
                        {curriculum.difficulty}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        {completedModules}/{totalModules} modules
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {curriculum.estimatedHours}h total
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary-600 h-2 rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-600 mt-2">{progress}% complete</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Upcoming Meetings */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Upcoming Meetings
              </h2>
              <Link
                to="/student/meetings"
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                View All →
              </Link>
            </div>
            <div className="space-y-4">
              {upcomingMeetings.length > 0 ? (
                upcomingMeetings.map((meeting) => (
                  <div
                    key={meeting.id}
                    className="p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-primary-50 rounded-lg">
                        <Calendar className="w-5 h-5 text-primary-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 text-sm mb-1">
                          {meeting.topic}
                        </h3>
                        <p className="text-xs text-gray-600 mb-2">
                          with {meeting.instructorName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {meeting.scheduledAt.toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}{' '}
                          at{' '}
                          {meeting.scheduledAt.toLocaleTimeString('en-US', {
                            hour: 'numeric',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm text-gray-500">No upcoming meetings</p>
                  <Link
                    to="/student/meetings"
                    className="text-sm text-primary-600 hover:text-primary-700 font-medium mt-2 inline-block"
                  >
                    Schedule a meeting →
                  </Link>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Quick Actions
              </h3>
              <div className="space-y-2">
                <Link
                  to="/student/requests"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  📝 Submit Tutorial Request
                </Link>
                <Link
                  to="/student/certificates"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Award className="w-4 h-4 inline mr-2" />
                  View Certificates
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
