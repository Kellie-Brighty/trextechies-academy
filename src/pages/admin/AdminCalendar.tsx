import { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import MeetingCard from '../../components/MeetingCard';
import { mockMeetings, mockTimeSlots } from '../../data/mockData';
import { Calendar, Plus, Filter } from 'lucide-react';

type ViewMode = 'upcoming' | 'past' | 'all';

export default function AdminCalendar() {
  const [viewMode, setViewMode] = useState<ViewMode>('upcoming');
  const [showAddSlot, setShowAddSlot] = useState(false);

  const now = new Date();
  const upcomingMeetings = mockMeetings
    .filter((m) => m.status === 'scheduled' && m.scheduledAt > now)
    .sort((a, b) => a.scheduledAt.getTime() - b.scheduledAt.getTime());

  const pastMeetings = mockMeetings
    .filter((m) => m.status === 'completed' || m.scheduledAt < now)
    .sort((a, b) => b.scheduledAt.getTime() - a.scheduledAt.getTime());

  const allMeetings = [...mockMeetings].sort(
    (a, b) => b.scheduledAt.getTime() - a.scheduledAt.getTime()
  );

  const displayedMeetings =
    viewMode === 'upcoming'
      ? upcomingMeetings
      : viewMode === 'past'
      ? pastMeetings
      : allMeetings;

  const availableSlots = mockTimeSlots.filter(
    (slot) => slot.isAvailable && slot.startTime > now
  ).length;

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">
              Meeting Calendar
            </h1>
            <p className="text-gray-600">
              Manage meetings and availability slots
            </p>
          </div>
          <button
            onClick={() => setShowAddSlot(!showAddSlot)}
            className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Time Slot
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {upcomingMeetings.length}
                </h3>
                <p className="text-sm text-gray-600">Upcoming</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-50 rounded-lg">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {pastMeetings.length}
                </h3>
                <p className="text-sm text-gray-600">Completed</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-50 rounded-lg">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {availableSlots}
                </h3>
                <p className="text-sm text-gray-600">Available Slots</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-50 rounded-lg">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {mockMeetings.length}
                </h3>
                <p className="text-sm text-gray-600">Total Meetings</p>
              </div>
            </div>
          </div>
        </div>

        {/* Add Slot Form */}
        {showAddSlot && (
          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-primary-200 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Add Availability Slot
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time
                </label>
                <input
                  type="time"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors">
                Add Slot
              </button>
              <button
                onClick={() => setShowAddSlot(false)}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* View Filter */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-6">
          <div className="flex items-center gap-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <div className="flex gap-2">
              {(['upcoming', 'past', 'all'] as ViewMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${
                    viewMode === mode
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
            <span className="ml-auto text-sm text-gray-600">
              Showing {displayedMeetings.length} meetings
            </span>
          </div>
        </div>

        {/* Meetings List */}
        {displayedMeetings.length > 0 ? (
          <div className="space-y-4">
            {displayedMeetings.map((meeting) => (
              <MeetingCard key={meeting.id} meeting={meeting} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-200 text-center">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No {viewMode} meetings
            </h3>
            <p className="text-gray-600">
              {viewMode === 'upcoming'
                ? 'No upcoming meetings scheduled'
                : viewMode === 'past'
                ? 'No past meetings to display'
                : 'No meetings found'}
            </p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
