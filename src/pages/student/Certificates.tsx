import StudentLayout from '../../layouts/StudentLayout';
import CertificateCard from '../../components/CertificateCard';
import { mockCertificates } from '../../data/mockData';
import { Info } from 'lucide-react';

export default function Certificates() {
  const handleDownload = (id: string) => {
    console.log(`Downloading certificate ${id}`);
    // Mock download action
  };

  const handleShare = (id: string) => {
    console.log(`Sharing certificate ${id}`);
    // Mock share action
  };

  return (
    <StudentLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">
            My Certificates
          </h1>
          <p className="text-gray-600">
            View and download your earned professional certifications
          </p>
        </div>

        {/* Certificates Grid */}
        {mockCertificates.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            {mockCertificates.map((cert) => (
              <CertificateCard
                key={cert.id}
                certificate={cert}
                onDownload={() => handleDownload(cert.id)}
                onShare={() => handleShare(cert.id)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-200 text-center mb-12">
            <div className="text-6xl mb-4">🏆</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No certificates earned yet
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Complete your learning paths and pass the final tests to earn your professional certificates.
            </p>
          </div>
        )}

        {/* Info Box */}
        <div className="bg-primary-50 rounded-xl p-6 border border-primary-100">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <Info className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-1">
                How to earn certificates?
              </h4>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                Trextechies Academy certificates are awarded upon the successful completion of a curriculum's modules and passing the final comprehensive test with a score of 80% or higher.
              </p>
              <div className="flex gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary-600 rounded-full" />
                  <span className="text-xs font-medium text-gray-600">Verified Skills</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary-600 rounded-full" />
                  <span className="text-xs font-medium text-gray-600">Professional Recognition</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary-600 rounded-full" />
                  <span className="text-xs font-medium text-gray-600">Career Advancement</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
