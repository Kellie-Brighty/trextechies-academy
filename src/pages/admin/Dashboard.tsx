import AdminLayout from '../../layouts/AdminLayout';
import ProgressCard from '../../components/ProgressCard';
import {
  Users,
  BookOpen,
  MessageSquare,
  Award,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Cell,
} from 'recharts';
import { mockRequests, mockCurricula, mockStudents, mockSubmissions } from '../../data/mockData';

const COLORS = ['#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function AdminDashboard() {
  // Mock Analytics Data
  const enrollmentData = [
    { name: 'Mon', count: 12 },
    { name: 'Tue', count: 18 },
    { name: 'Wed', count: 15 },
    { name: 'Thu', count: 25 },
    { name: 'Fri', count: 22 },
    { name: 'Sat', count: 30 },
    { name: 'Sun', count: 28 },
  ];

  const trackDistribution = [
    { name: 'Web Dev', value: 45 },
    { name: 'Mobile App', value: 25 },
    { name: 'Backend', value: 20 },
    { name: 'UI/UX', value: 10 },
  ];

  const pendingRequests = mockRequests.filter(r => r.status === 'pending');
  const activeStudents = mockStudents.length;
  const submissionsToReview = mockSubmissions.filter(s => s.status === 'pending');

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">
            Executive Overview
          </h1>
          <p className="text-gray-600">
            Platform performance and key metrics at a glance.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <ProgressCard
            title="Total Students"
            value={activeStudents.toString()}
            icon={<Users className="w-6 h-6 text-white" />}
            trend={{ value: 12, isPositive: true }}
            color="primary"
          />
          <ProgressCard
            title="Active Curricula"
            value={mockCurricula.length.toString()}
            icon={<BookOpen className="w-6 h-6 text-white" />}
            color="success"
          />
          <ProgressCard
            title="Pending Requests"
            value={pendingRequests.length.toString()}
            icon={<MessageSquare className="w-6 h-6 text-white" />}
            trend={{ value: 5, isPositive: false }}
            color="warning"
          />
          <ProgressCard
            title="Graduates"
            value="156"
            icon={<Award className="w-6 h-6 text-white" />}
            trend={{ value: 8, isPositive: true }}
            color="info"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Weekly Enrollments */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary-500" />
                Student Activity (Weekly)
              </h3>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={enrollmentData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      borderRadius: '8px',
                      border: 'none',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#0ea5e9"
                    strokeWidth={3}
                    dot={{ r: 4, fill: '#0ea5e9' }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Track Distribution */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <Target className="w-5 h-5 text-emerald-500" />
                Track Popularity
              </h3>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trackDistribution}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {trackDistribution.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Alerts & Tasks */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Recent Activity</h3>
            <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
              <div className="divide-y divide-gray-100">
                {mockRequests.slice(0, 5).map((request) => (
                  <div key={request.id} className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                    <div className={`p-2 rounded-lg ${
                      request.status === 'pending' ? 'bg-yellow-50' : 'bg-green-50'
                    }`}>
                      {request.status === 'pending' ? (
                        <Clock className="w-5 h-5 text-yellow-600" />
                      ) : (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">
                        {request.studentName} requested {request.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {request.submittedAt.toLocaleDateString()} at {request.submittedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                      request.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {request.status.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Action Center</h3>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-center gap-4">
                <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{submissionsToReview.length} Submissions</p>
                  <p className="text-xs text-gray-500">Awaiting your review</p>
                </div>
                <button className="ml-auto text-primary-600 font-bold text-sm">Review</button>
              </div>

              <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-center gap-4">
                <div className="w-12 h-12 bg-yellow-50 rounded-full flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-yellow-500" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{pendingRequests.length} New Requests</p>
                  <p className="text-xs text-gray-500">Curricula to assign</p>
                </div>
                <button className="ml-auto text-primary-600 font-bold text-sm">Assign</button>
              </div>

              <div className="bg-primary-600 p-6 rounded-xl text-white">
                <h4 className="font-bold mb-2">Need Help?</h4>
                <p className="text-sm text-primary-100 mb-4 text-pretty">
                  Check out the internal documentation for managing students and content.
                </p>
                <button className="w-full bg-white text-primary-600 py-2 rounded-lg font-bold">
                  View Docs
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

// Missing Lucide target icon
function Target(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}
