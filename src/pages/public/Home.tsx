import { Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-accent-50">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-primary-600 rounded-2xl flex items-center justify-center">
            <Home className="w-10 h-10 text-white" />
          </div>
        </div>
        <h1 className="text-5xl font-heading font-bold text-gray-900 mb-4">
          Welcome to Trextechies Academy
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Expert-led curriculum, personalized mentorship from Kelly Owoju and the Trextechies team,
          and professional certificates to take you from beginner to professional.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/student/dashboard"
            className="px-8 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            Student Portal
          </Link>
          <Link
            to="/admin/dashboard"
            className="px-8 py-3 border-2 border-primary-600 text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
          >
            Admin Portal
          </Link>
        </div>
      </div>
    </div>
  );
}
