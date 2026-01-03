import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StudentLayout from '../../layouts/StudentLayout';
import { mockCurricula } from '../../data/mockData';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  ExternalLink,
  PlayCircle,
} from 'lucide-react';

export default function LessonViewer() {
  const { curriculumId, moduleId, lessonId } = useParams<{
    curriculumId: string;
    moduleId: string;
    lessonId: string;
  }>();
  const navigate = useNavigate();
  const [isCompleted, setIsCompleted] = useState(false);

  const curriculum = mockCurricula.find((c) => c.id === curriculumId);
  const module = curriculum?.modules.find((m) => m.id === moduleId);
  const lesson = module?.lessons.find((l) => l.id === lessonId);

  if (!curriculum || !module || !lesson) {
    return (
      <StudentLayout>
        <div className="max-w-7xl mx-auto text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Lesson not found
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

  // Find current lesson index and navigation
  const currentLessonIndex = module.lessons.findIndex((l) => l.id === lessonId);
  const previousLesson = currentLessonIndex > 0 ? module.lessons[currentLessonIndex - 1] : null;
  const nextLesson =
    currentLessonIndex < module.lessons.length - 1
      ? module.lessons[currentLessonIndex + 1]
      : null;

  const handleMarkComplete = () => {
    setIsCompleted(true);
    // In a real app, this would update the backend
  };

  const renderLessonContent = () => {
    switch (lesson.type) {
      case 'video':
        return (
          <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
            <iframe
              src={lesson.content}
              title={lesson.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        );

      case 'article':
        return (
          <div className="prose prose-lg max-w-none">
            <div className="bg-white rounded-lg p-8">
              {lesson.content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        );

      case 'exercise':
        return (
          <div className="bg-white rounded-lg p-8">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Exercise Instructions
              </h3>
              <p className="text-gray-700 mb-4">{lesson.content}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">
                Code Editor (Mock)
              </h4>
              <textarea
                className="w-full h-64 p-4 font-mono text-sm bg-gray-900 text-green-400 rounded-lg border-0 focus:ring-2 focus:ring-primary-500 outline-none"
                placeholder="// Write your code here..."
                defaultValue="function solution() {\n  // Your code here\n}"
              />
              <button className="mt-4 px-6 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors">
                Submit Solution
              </button>
            </div>
          </div>
        );

      case 'quiz':
        return (
          <div className="bg-white rounded-lg p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Quiz: {lesson.title}
            </h3>
            <div className="space-y-6">
              {/* Mock quiz questions */}
              <div className="p-6 border border-gray-200 rounded-lg">
                <p className="font-medium text-gray-900 mb-4">
                  1. What is the purpose of this lesson?
                </p>
                <div className="space-y-2">
                  {['Option A', 'Option B', 'Option C', 'Option D'].map((option) => (
                    <label
                      key={option}
                      className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="question1"
                        className="w-4 h-4 text-primary-600"
                      />
                      <span className="text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
              <button className="px-6 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors">
                Submit Quiz
              </button>
            </div>
          </div>
        );

      default:
        return <div>Unknown lesson type</div>;
    }
  };

  return (
    <StudentLayout>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate(`/student/curriculum/${curriculumId}`)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to {curriculum.title}
          </button>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="text-sm text-gray-600 mb-2">
                  {module.title} • Lesson {currentLessonIndex + 1} of {module.lessons.length}
                </div>
                <h1 className="text-2xl font-heading font-bold text-gray-900 mb-2">
                  {lesson.title}
                </h1>
                <p className="text-gray-600">{lesson.description}</p>
              </div>
              <div className="ml-4">
                {lesson.isCompleted || isCompleted ? (
                  <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Completed</span>
                  </div>
                ) : (
                  <button
                    onClick={handleMarkComplete}
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
                  >
                    Mark as Complete
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <PlayCircle className="w-4 h-4" />
                {lesson.type}
              </span>
              <span>•</span>
              <span>{lesson.estimatedMinutes} minutes</span>
            </div>
          </div>
        </div>

        {/* Lesson Content */}
        <div className="mb-6">{renderLessonContent()}</div>

        {/* Resources */}
        {lesson.resources && lesson.resources.length > 0 && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Additional Resources
            </h3>
            <div className="space-y-3">
              {lesson.resources.map((resource) => (
                <a
                  key={resource.id}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all group"
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 group-hover:text-primary-600">
                      {resource.title}
                    </h4>
                    {resource.description && (
                      <p className="text-sm text-gray-600">{resource.description}</p>
                    )}
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-primary-600" />
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between">
          {previousLesson ? (
            <button
              onClick={() =>
                navigate(
                  `/student/lesson/${curriculumId}/${moduleId}/${previousLesson.id}`
                )
              }
              className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              Previous Lesson
            </button>
          ) : (
            <div />
          )}

          {nextLesson ? (
            <button
              onClick={() =>
                navigate(`/student/lesson/${curriculumId}/${moduleId}/${nextLesson.id}`)
              }
              className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              Next Lesson
              <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={() => navigate(`/student/curriculum/${curriculumId}`)}
              className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              Complete Module
            </button>
          )}
        </div>
      </div>
    </StudentLayout>
  );
}
