
import { Calendar, Clock, User, Video } from 'lucide-react';
import type { Meeting } from '../types/meeting';

interface MeetingCardProps {
  meeting: Meeting;
  onJoin?: () => void;
  onCancel?: () => void;
}

const statusConfig = {
  scheduled: {
    color: 'bg-blue-100 text-blue-700 border-blue-200',
    label: 'Scheduled',
  },
  completed: {
    color: 'bg-green-100 text-green-700 border-green-200',
    label: 'Completed',
  },
  cancelled: {
    color: 'bg-gray-100 text-gray-700 border-gray-200',
    label: 'Cancelled',
  },
};

export default function MeetingCard({ meeting, onJoin, onCancel }: MeetingCardProps) {
  const config = statusConfig[meeting.status];
  const isPast = meeting.scheduledAt < new Date();
  const isUpcoming = meeting.status === 'scheduled' && !isPast;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">
              {meeting.topic || 'Clarification Meeting'}
            </h3>
            <span
              className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${config.color}`}
            >
              {config.label}
            </span>
          </div>

          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>with {meeting.instructorName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>
                {meeting.scheduledAt.toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>
                {meeting.scheduledAt.toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                })}{' '}
                ({meeting.duration} minutes)
              </span>
            </div>
          </div>

          {meeting.notes && meeting.status === 'completed' && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700">
                <span className="font-medium">Notes:</span> {meeting.notes}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {isUpcoming && onJoin && (
          <button
            onClick={onJoin}
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
          >
            <Video className="w-4 h-4" />
            Join Meeting
          </button>
        )}
        {meeting.status === 'completed' && meeting.recordingUrl && (
          <a
            href={meeting.recordingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
          >
            <Video className="w-4 h-4" />
            View Recording
          </a>
        )}
        {isUpcoming && onCancel && (
          <button
            onClick={onCancel}
            className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}
