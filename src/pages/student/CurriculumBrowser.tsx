import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentLayout from '../../layouts/StudentLayout';
import CurriculumCard from '../../components/CurriculumCard';
import { mockCurricula } from '../../data/mockData';
import { Search, Filter } from 'lucide-react';

type DifficultyFilter = 'all' | 'beginner' | 'intermediate' | 'advanced';
type TrackFilter = 'all' | 'web-dev' | 'mobile' | 'backend' | 'data-science' | 'devops';

export default function CurriculumBrowser() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>('all');
  const [trackFilter, setTrackFilter] = useState<TrackFilter>('all');

  // Filter curricula
  const filteredCurricula = mockCurricula.filter((curriculum) => {
    const matchesSearch = curriculum.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase()) ||
      curriculum.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDifficulty =
      difficultyFilter === 'all' || curriculum.difficulty === difficultyFilter;
    
    const matchesTrack = trackFilter === 'all' || curriculum.track === trackFilter;

    return matchesSearch && matchesDifficulty && matchesTrack;
  });

  return (
    <StudentLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">
            Browse Learning Paths
          </h1>
          <p className="text-gray-600">
            Explore our comprehensive curricula designed by Kelly Owoju and the Trextechies team
          </p>
        </div>

        {/* Search & Filters */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="md:col-span-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search curricula..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                />
              </div>
            </div>

            {/* Difficulty Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Filter className="w-4 h-4 inline mr-1" />
                Difficulty
              </label>
              <select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value as DifficultyFilter)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            {/* Track Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Filter className="w-4 h-4 inline mr-1" />
                Track
              </label>
              <select
                value={trackFilter}
                onChange={(e) => setTrackFilter(e.target.value as TrackFilter)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
              >
                <option value="all">All Tracks</option>
                <option value="web-dev">Web Development</option>
                <option value="mobile">Mobile Development</option>
                <option value="backend">Backend Development</option>
                <option value="data-science">Data Science</option>
                <option value="devops">DevOps</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="flex items-end">
              <p className="text-sm text-gray-600">
                Showing <span className="font-semibold">{filteredCurricula.length}</span> curricula
              </p>
            </div>
          </div>
        </div>

        {/* Curricula Grid */}
        {filteredCurricula.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCurricula.map((curriculum) => (
              <CurriculumCard
                key={curriculum.id}
                curriculum={curriculum}
                onClick={() => navigate(`/student/curriculum/${curriculum.id}`)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-200 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No curricula found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search or filters
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setDifficultyFilter('all');
                setTrackFilter('all');
              }}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </StudentLayout>
  );
}
