import { type ReactNode } from 'react';
import { Clock, BookOpen, BarChart } from 'lucide-react';
import type { Curriculum } from '../types/curriculum';

interface CurriculumCardProps {
  curriculum: Curriculum;
  onClick?: () => void;
}

const difficultyColors = {
  beginner: 'bg-green-100 text-green-700',
  intermediate: 'bg-blue-100 text-blue-700',
  advanced: 'bg-purple-100 text-purple-700',
};

const trackIcons: Record<string, ReactNode> = {
  'web-dev': '🌐',
  mobile: '📱',
  backend: '⚙️',
  'data-science': '📊',
  devops: '🚀',
};

export default function CurriculumCard({ curriculum, onClick }: CurriculumCardProps) {
  const completedModules = curriculum.modules.filter((m) => m.progress === 100).length;
  const progress = curriculum.modules.length > 0
    ? Math.round((completedModules / curriculum.modules.length) * 100)
    : 0;

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg hover:border-primary-300 transition-all cursor-pointer group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="text-3xl">{trackIcons[curriculum.track] || '📚'}</div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            difficultyColors[curriculum.difficulty]
          }`}
        >
          {curriculum.difficulty}
        </span>
      </div>

      {/* Title & Description */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
        {curriculum.title}
      </h3>
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
        {curriculum.description}
      </p>

      {/* Stats */}
      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
        <span className="flex items-center gap-1">
          <BookOpen className="w-4 h-4" />
          {curriculum.modules.length} modules
        </span>
        <span className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          {curriculum.estimatedHours}h
        </span>
      </div>

      {/* Progress Bar (if enrolled) */}
      {progress > 0 && (
        <div>
          <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
            <span className="flex items-center gap-1">
              <BarChart className="w-3 h-3" />
              Progress
            </span>
            <span className="font-semibold">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
