import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StudentLayout from '../../layouts/StudentLayout';
import { mockCurricula } from '../../data/mockData';
import {
  ArrowLeft,
  Clock,
  BookOpen,
  CheckCircle,
  Lock,
  PlayCircle,
  FileText,
  Code,
  HelpCircle,
} from 'lucide-react';

const lessonTypeIcons = {
  video: PlayCircle,
  article: FileText,
  exercise: Code,
  quiz: HelpCircle,
};

export default function CurriculumDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [expandedModules, setExpandedModules] = useState<string[]>([]);

  const curriculum = mockCurricula.find((c) => c.id === id);

  if (!curriculum) {
    return (
      <StudentLayout>
        <div className="max-w-7xl mx-auto text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Curriculum not found
          </h1>
          <button
            onClick={() => navigate('/student/browse')}
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            ← Back to Browse
          </button>
        </div>
      </StudentLayout>
    );
  }

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const completedModules = curriculum.modules.filter((m) => m.progress === 100).length;
  const totalProgress = Math.round(
    (completedModules / curriculum.modules.length) * 100
  );

  return (
    <StudentLayout>
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/student/browse')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Browse
        </button>

        {/* Header */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-3xl font-heading font-bold text-gray-900">
                  {curriculum.title}
                </h1>
                <span className="px-3 py-1 bg-primary-50 text-primary-600 text-sm font-semibold rounded-full">
                  {curriculum.difficulty}
                </span>
              </div>
              <p className="text-lg text-gray-600 mb-6">
                {curriculum.description}
              </p>
              <div className="flex items-center gap-6 text-gray-600">
                <span className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  {curriculum.modules.length} modules
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  {curriculum.estimatedHours} hours
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  {completedModules}/{curriculum.modules.length} completed
                </span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span className="font-medium">Overall Progress</span>
              <span className="font-semibold">{totalProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-primary-600 h-3 rounded-full transition-all"
                style={{ width: `${totalProgress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Modules */}
        <div className="space-y-4">
          {curriculum.modules.map((module, moduleIndex) => {
            const isExpanded = expandedModules.includes(module.id);
            const isCompleted = module.progress === 100;
            const completedLessons = module.lessons.filter((l) => l.isCompleted).length;

            return (
              <div
                key={module.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              >
                {/* Module Header */}
                <button
                  onClick={() => !module.isLocked && toggleModule(module.id)}
                  disabled={module.isLocked}
                  className={`w-full p-6 text-left transition-colors ${
                    module.isLocked
                      ? 'cursor-not-allowed bg-gray-50'
                      : 'hover:bg-gray-50 cursor-pointer'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      {/* Module Number */}
                      <div
                        className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-bold ${
                          isCompleted
                            ? 'bg-green-100 text-green-600'
                            : module.isLocked
                            ? 'bg-gray-100 text-gray-400'
                            : 'bg-primary-50 text-primary-600'
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : module.isLocked ? (
                          <Lock className="w-5 h-5" />
                        ) : (
                          moduleIndex + 1
                        )}
                      </div>

                      {/* Module Info */}
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {module.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          {module.description}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {module.estimatedHours}h
                          </span>
                          <span className="flex items-center gap-1">
                            <BookOpen className="w-4 h-4" />
                            {completedLessons}/{module.lessons.length} lessons
                          </span>
                        </div>

                        {/* Module Progress */}
                        {!module.isLocked && (
                          <div className="mt-3">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-primary-600 h-2 rounded-full transition-all"
                                style={{ width: `${module.progress}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Expand Icon */}
                    {!module.isLocked && (
                      <div
                        className={`ml-4 transition-transform ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      >
                        ▼
                      </div>
                    )}
                  </div>
                </button>

                {/* Lessons List */}
                {isExpanded && !module.isLocked && (
                  <div className="border-t border-gray-200 bg-gray-50">
                    <div className="p-6 space-y-2">
                      {module.lessons.map((lesson, lessonIndex) => {
                        const LessonIcon = lessonTypeIcons[lesson.type];
                        return (
                          <button
                            key={lesson.id}
                            onClick={() =>
                              navigate(
                                `/student/lesson/${curriculum.id}/${module.id}/${lesson.id}`
                              )
                            }
                            className="w-full flex items-center gap-4 p-4 bg-white rounded-lg hover:bg-primary-50 hover:border-primary-300 border border-gray-200 transition-all text-left group"
                          >
                            <div
                              className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                                lesson.isCompleted
                                  ? 'bg-green-100 text-green-600'
                                  : 'bg-gray-100 text-gray-600 group-hover:bg-primary-100 group-hover:text-primary-600'
                              }`}
                            >
                              {lesson.isCompleted ? (
                                <CheckCircle className="w-4 h-4" />
                              ) : (
                                <LessonIcon className="w-4 h-4" />
                              )}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900 group-hover:text-primary-600">
                                {lessonIndex + 1}. {lesson.title}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {lesson.description}
                              </p>
                            </div>
                            <div className="text-sm text-gray-500">
                              {lesson.estimatedMinutes} min
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </StudentLayout>
  );
}
