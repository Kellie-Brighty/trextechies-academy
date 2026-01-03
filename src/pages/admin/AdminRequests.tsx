import { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { mockRequests } from '../../data/mockData';
import { Search, Clock, CheckCircle, PlayCircle, Eye } from 'lucide-react';

type StatusFilter = 'all' | 'pending' | 'approved' | 'in-progress' | 'completed';

const statusConfig = {
  pending: {
    icon: Clock,
    color: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    label: 'Pending',
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

export default function AdminRequests() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);

  const filteredRequests = mockRequests.filter((request) => {
    const matchesSearch =
      request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.studentName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    all: mockRequests.length,
    pending: mockRequests.filter((r) => r.status === 'pending').length,
    approved: mockRequests.filter((r) => r.status === 'approved').length,
    'in-progress': mockRequests.filter((r) => r.status === 'in-progress').length,
    completed: mockRequests.filter((r) => r.status === 'completed').length,
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">
            Tutorial Requests
          </h1>
          <p className="text-gray-600">
            Review and manage student tutorial requests
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          {(Object.keys(statusCounts) as StatusFilter[]).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`p-4 rounded-xl border-2 transition-all ${
                statusFilter === status
                  ? 'border-primary-600 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <div className="text-2xl font-bold text-gray-900">
                {statusCounts[status]}
              </div>
              <div className="text-sm text-gray-600 capitalize">
                {status === 'all' ? 'Total' : status.replace('-', ' ')}
              </div>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title or student name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
            />
          </div>
        </div>

        {/* Requests List */}
        {filteredRequests.length > 0 ? (
          <div className="space-y-4">
            {filteredRequests.map((request) => {
              const config = statusConfig[request.status];
              const StatusIcon = config.icon;
              const isExpanded = selectedRequest === request.id;

              return (
                <div
                  key={request.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {request.title}
                          </h3>
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${config.color}`}
                          >
                            <StatusIcon className="w-4 h-4" />
                            {config.label}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          Student: <span className="font-medium">{request.studentName}</span>
                        </p>
                        <p className="text-gray-700 mb-3">{request.description}</p>

                        {/* Quick Info */}
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="capitalize">
                            {request.skillLevel} level
                          </span>
                          <span>•</span>
                          <span>
                            {request.submittedAt.toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() =>
                          setSelectedRequest(isExpanded ? null : request.id)
                        }
                        className="ml-4 px-4 py-2 text-primary-600 hover:bg-primary-50 rounded-lg font-medium transition-colors flex items-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        {isExpanded ? 'Hide' : 'View'} Details
                      </button>
                    </div>

                    {/* Expanded Details */}
                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-gray-200 space-y-4">
                        {/* Learning Goals */}
                        <div>
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

                        {/* Schedule */}
                        <div>
                          <h4 className="text-sm font-semibold text-gray-700 mb-2">
                            Preferred Schedule:
                          </h4>
                          <p className="text-sm text-gray-600">
                            {request.preferredSchedule}
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3 pt-4">
                          {request.status === 'pending' && (
                            <>
                              <button className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
                                Approve & Assign Curriculum
                              </button>
                              <button className="px-4 py-2 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors">
                                Request More Info
                              </button>
                            </>
                          )}
                          {request.status === 'approved' && (
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                              Mark as In Progress
                            </button>
                          )}
                          {request.status === 'in-progress' && (
                            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors">
                              Mark as Completed
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-200 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No requests found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filter
            </p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
