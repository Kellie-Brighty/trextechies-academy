import { useNavigate, Link } from 'react-router-dom';
import StudentLayout from '../../layouts/StudentLayout';
import CurriculumCard from '../../components/CurriculumCard';
import { currentUser, mockCurricula } from '../../data/mockData';
import { BookOpen, TrendingUp } from 'lucide-react';

export default function MyCurricula() {
  const navigate = useNavigate();

  // Get only enrolled curricula
  const enrolledCurricula = mockCurricula.filter((c) =>
    currentUser.enrolledTracks.includes(c.track)
  );

  const totalModules = enrolledCurricula.reduce(
    (sum, c) => sum + c.modules.length,
    0
  );
  const completedModules = enrolledCurricula.reduce(
    (sum, c) => sum + c.modules.filter((m) => m.progress === 100).length,
    0
  );
  const overallProgress = totalModules > 0
    ? Math.round((completedModules / totalModules) * 100)
    : 0;

  return (
    <StudentLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">
            My Learning Paths
          </h1>
          <p className="text-gray-600">
            Continue your learning journey with your enrolled curricula
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 bg-primary-50 rounded-lg">
                <BookOpen className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {enrolledCurricula.length}
                </h3>
                <p className="text-sm text-gray-600">Enrolled Curricula</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 bg-green-50 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {overallProgress}%
                </h3>
                <p className="text-sm text-gray-600">Overall Progress</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {completedModules}/{totalModules}
                </h3>
                <p className="text-sm text-gray-600">Modules Completed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Enrolled Curricula */}
        {enrolledCurricula.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Continue Learning
              </h2>
              <Link
                to="/student/browse"
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                Browse More Courses →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCurricula.map((curriculum) => (
                <CurriculumCard
                  key={curriculum.id}
                  curriculum={curriculum}
                  onClick={() => navigate(`/student/curriculum/${curriculum.id}`)}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-200 text-center">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No enrolled curricula yet
            </h3>
            <p className="text-gray-600 mb-6">
              Start your learning journey by browsing our available courses
            </p>
            <button
              onClick={() => navigate('/student/browse')}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              Browse Courses
            </button>
          </div>
        )}
      </div>
    </StudentLayout>
  );
}
