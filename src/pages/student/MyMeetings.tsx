import { useState } from 'react';
import StudentLayout from '../../layouts/StudentLayout';
import MeetingCard from '../../components/MeetingCard';
import { currentUser, mockMeetings, mockTimeSlots, mockInstructors } from '../../data/mockData';
import { Plus, Calendar, Clock } from 'lucide-react';

export default function MyMeetings() {
  const [showBooking, setShowBooking] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [meetingTopic, setMeetingTopic] = useState('');

  const myMeetings = mockMeetings
    .filter((m) => m.studentId === currentUser.id)
    .sort((a, b) => b.scheduledAt.getTime() - a.scheduledAt.getTime());

  const upcomingMeetings = myMeetings.filter(
    (m) => m.status === 'scheduled' && m.scheduledAt > new Date()
  );
  const pastMeetings = myMeetings.filter(
    (m) => m.status === 'completed' || m.scheduledAt < new Date()
  );

  const availableSlots = mockTimeSlots
    .filter((slot) => slot.isAvailable && slot.startTime > new Date())
    .sort((a, b) => a.startTime.getTime() - b.startTime.getTime());

  const handleBookMeeting = () => {
    if (!selectedSlot || !meetingTopic.trim()) return;
    // In a real app, this would submit to the backend
    console.log('Booking meeting:', { slotId: selectedSlot, topic: meetingTopic });
    setShowBooking(false);
    setSelectedSlot(null);
    setMeetingTopic('');
  };

  return (
    <StudentLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">
              My Meetings
            </h1>
            <p className="text-gray-600">
              Schedule and manage your clarification meetings with instructors
            </p>
          </div>
          <button
            onClick={() => setShowBooking(!showBooking)}
            className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Book Meeting
          </button>
        </div>

        {/* Booking Modal */}
        {showBooking && (
          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-primary-200 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Book a Clarification Meeting
            </h2>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meeting Topic *
                </label>
                <input
                  type="text"
                  value={meetingTopic}
                  onChange={(e) => setMeetingTopic(e.target.value)}
                  placeholder="e.g., JavaScript Functions Clarification"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Time Slot *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                  {availableSlots.length > 0 ? (
                    availableSlots.map((slot) => {
                      const instructor = mockInstructors.find(
                        (i) => i.id === slot.instructorId
                      );
                      return (
                        <button
                          key={slot.id}
                          onClick={() => setSelectedSlot(slot.id)}
                          className={`p-4 border-2 rounded-lg text-left transition-all ${
                            selectedSlot === slot.id
                              ? 'border-primary-600 bg-primary-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <Calendar className="w-4 h-4 text-gray-600" />
                            <span className="font-medium text-gray-900">
                              {slot.startTime.toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                              })}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock className="w-4 h-4" />
                            <span>
                              {slot.startTime.toLocaleTimeString('en-US', {
                                hour: 'numeric',
                                minute: '2-digit',
                              })}{' '}
                              -{' '}
                              {slot.endTime.toLocaleTimeString('en-US', {
                                hour: 'numeric',
                                minute: '2-digit',
                              })}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-2">
                            with {instructor?.name}
                          </p>
                        </button>
                      );
                    })
                  ) : (
                    <div className="col-span-2 text-center py-8 text-gray-500">
                      No available time slots at the moment
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleBookMeeting}
                disabled={!selectedSlot || !meetingTopic.trim()}
                className="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirm Booking
              </button>
              <button
                onClick={() => {
                  setShowBooking(false);
                  setSelectedSlot(null);
                  setMeetingTopic('');
                }}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Upcoming Meetings */}
        {upcomingMeetings.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Upcoming Meetings
            </h2>
            <div className="space-y-4">
              {upcomingMeetings.map((meeting) => (
                <MeetingCard
                  key={meeting.id}
                  meeting={meeting}
                  onJoin={() => console.log('Join meeting:', meeting.id)}
                  onCancel={() => console.log('Cancel meeting:', meeting.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Past Meetings */}
        {pastMeetings.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Past Meetings
            </h2>
            <div className="space-y-4">
              {pastMeetings.map((meeting) => (
                <MeetingCard key={meeting.id} meeting={meeting} />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {myMeetings.length === 0 && (
          <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-200 text-center">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No meetings scheduled
            </h3>
            <p className="text-gray-600 mb-6">
              Book a clarification meeting with your instructor to get help
            </p>
            <button
              onClick={() => setShowBooking(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Book Your First Meeting
            </button>
          </div>
        )}
      </div>
    </StudentLayout>
  );
}
