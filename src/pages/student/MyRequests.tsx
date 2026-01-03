import { Link } from 'react-router-dom';
import StudentLayout from '../../layouts/StudentLayout';
import { currentUser, mockRequests } from '../../data/mockData';
import { Plus, Clock, CheckCircle, AlertCircle, PlayCircle } from 'lucide-react';

const statusConfig = {
  pending: {
    icon: Clock,
    color: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    label: 'Pending Review',
  },
  approved: {
    icon: CheckCircle,
    color: 'bg-green-100 text-green-700 border-green-200',
    label: 'Approved',
  },
  'in-progress': {
    icon: PlayCircle,
    color: 'bg-blue-100 text-blue-700 border-blue-200',
    label: 'In Progress',
  },
  completed: {
    icon: CheckCircle,
    color: 'bg-purple-100 text-purple-700 border-purple-200',
    label: 'Completed',
  },
};

export default function MyRequests() {
  const myRequests = mockRequests.filter((r) => r.studentId === currentUser.id);

  return (
    <StudentLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">
              My Tutorial Requests
            </h1>
            <p className="text-gray-600">
              Track your tutorial requests and assigned curricula
            </p>
          </div>
          <Link
            to="/student/request/new"
            className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            New Request
          </Link>
        </div>

        {/* Requests List */}
        {myRequests.length > 0 ? (
          <div className="space-y-4">
            {myRequests.map((request) => {
              const config = statusConfig[request.status];
              const StatusIcon = config.icon;

              return (
                <div
                  key={request.id}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {request.title}
                        </h3>
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${config.color}`}
                        >
                          <StatusIcon className="w-4 h-4" />
                          {config.label}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">{request.description}</p>

                      {/* Learning Goals */}
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">
                          Learning Goals:
                        </h4>
                        <ul className="list-disc list-inside space-y-1">
                          {request.learningGoals.map((goal, index) => (
                            <li key={index} className="text-sm text-gray-600">
                              {goal}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Details */}
                      <div className="flex items-center gap-6 text-sm text-gray-600">
                        <span className="capitalize">
                          <span className="font-medium">Skill Level:</span>{' '}
                          {request.skillLevel}
                        </span>
                        <span>•</span>
                        <span>
                          <span className="font-medium">Schedule:</span>{' '}
                          {request.preferredSchedule}
                        </span>
                        <span>•</span>
                        <span>
                          Submitted{' '}
                          {request.submittedAt.toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Assigned Curriculum */}
                  {request.assignedCurriculumId && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">
                            Assigned Curriculum
                          </p>
                          <p className="font-medium text-gray-900">
                            Backend Development with Node.js
                          </p>
                        </div>
                        <Link
                          to={`/student/curriculum/${request.assignedCurriculumId}`}
                          className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
                        >
                          View Curriculum
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-200 text-center">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No tutorial requests yet
            </h3>
            <p className="text-gray-600 mb-6">
              Submit a request to get a personalized curriculum designed just for you
            </p>
            <Link
              to="/student/request/new"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Submit Your First Request
            </Link>
          </div>
        )}
      </div>
    </StudentLayout>
  );
}
