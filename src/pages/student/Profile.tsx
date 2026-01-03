import { Link } from 'react-router-dom';
import StudentLayout from '../../layouts/StudentLayout';
import { currentUser, mockCurricula, mockCertificates } from '../../data/mockData';
import {
  Mail,
  Calendar,
  BookOpen,
  Clock,
  Award,
  TrendingUp,
  Edit,
} from 'lucide-react';

export default function StudentProfile() {
  const enrolledCurricula = mockCurricula.filter((c) =>
    currentUser.enrolledTracks.includes(c.track)
  );

  const certificates = mockCertificates.filter(
    (cert) => cert.studentId === currentUser.id
  );

  const stats = [
    {
      label: 'Total Hours',
      value: currentUser.hoursLogged,
      icon: Clock,
      color: 'text-blue-600 bg-blue-50',
    },
    {
      label: 'Modules Completed',
      value: currentUser.completedModules,
      icon: BookOpen,
      color: 'text-green-600 bg-green-50',
    },
    {
      label: 'Certificates Earned',
      value: certificates.length,
      icon: Award,
      color: 'text-purple-600 bg-purple-50',
    },
    {
      label: 'Overall Progress',
      value: `${currentUser.progress}%`,
      icon: TrendingUp,
      color: 'text-orange-600 bg-orange-50',
    },
  ];

  return (
    <StudentLayout>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">
            My Profile
          </h1>
          <p className="text-gray-600">
            Manage your account and view your learning statistics
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
          {/* Cover */}
          <div className="h-32 bg-gradient-to-r from-primary-500 to-primary-600" />

          {/* Profile Info */}
          <div className="px-6 pb-6">
            <div className="flex items-end justify-between -mt-16 mb-6">
              <div className="flex items-end gap-4">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-32 h-32 rounded-xl border-4 border-white shadow-lg"
                />
                <div className="pb-2">
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">
                    {currentUser.name}
                  </h2>
                  <p className="text-gray-600 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {currentUser.email}
                  </p>
                </div>
              </div>
              <button className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center gap-2">
                <Edit className="w-4 h-4" />
                Edit Profile
              </button>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-600">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Joined{' '}
                {currentUser.createdAt.toLocaleDateString('en-US', {
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
              <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                {enrolledCurricula.length} Active Learning Paths
              </span>
            </div>
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
              >
                <div className={`inline-flex p-3 rounded-lg ${stat.color} mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </h3>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Learning Paths */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Enrolled Learning Paths
          </h2>
          <div className="space-y-4">
            {enrolledCurricula.map((curriculum) => {
              const completedModules = curriculum.modules.filter(
                (m) => m.progress === 100
              ).length;
              const totalModules = curriculum.modules.length;
              const progress = Math.round(
                (completedModules / totalModules) * 100
              );

              return (
                <div
                  key={curriculum.id}
                  className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {curriculum.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>{curriculum.difficulty}</span>
                      <span>•</span>
                      <span>{curriculum.estimatedHours} hours</span>
                      <span>•</span>
                      <span>
                        {completedModules}/{totalModules} modules
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary-600 mb-1">
                      {progress}%
                    </div>
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary-600 h-2 rounded-full"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Certificates */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Earned Certificates
            </h2>
            <Link
              to="/student/certificates"
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              View All →
            </Link>
          </div>
          {certificates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="p-4 border-2 border-primary-200 bg-primary-50 rounded-lg"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary-600 rounded-lg">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {cert.curriculumTitle}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        Issued{' '}
                        {cert.issuedAt.toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                      <p className="text-xs text-gray-500 font-mono">
                        {cert.verificationCode}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">No certificates yet</p>
              <p className="text-sm text-gray-500">
                Complete your learning paths to earn certificates
              </p>
            </div>
          )}
        </div>
      </div>
    </StudentLayout>
  );
}
