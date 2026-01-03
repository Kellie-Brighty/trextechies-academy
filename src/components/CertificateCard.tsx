import { Award, Download, Share2, ExternalLink } from 'lucide-react';
import type { Certificate } from '../types/certificate';

interface CertificateCardProps {
  certificate: Certificate;
  onDownload?: () => void;
  onShare?: () => void;
}

export default function CertificateCard({ certificate, onDownload, onShare }: CertificateCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow group">
      <div className="flex items-start gap-4">
        {/* Certificate Icon/Badge */}
        <div className="flex-shrink-0 w-20 h-20 bg-primary-50 rounded-xl border border-primary-100 flex items-center justify-center relative overflow-hidden">
          <Award className="w-10 h-10 text-primary-600 relative z-10" />
          <div className="absolute top-0 right-0 w-8 h-8 bg-primary-200 opacity-20 transform rotate-45 translate-x-4 -translate-y-4" />
        </div>
        {/* Certificate Details */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-lg font-bold text-gray-900 leading-tight mb-1">
                {certificate.curriculumTitle}
              </h3>
              <p className="text-sm font-medium text-primary-600 mb-1">
                {certificate.track} Specialist
              </p>
            </div>
            <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded">
              ID: {certificate.id.toUpperCase()}
            </span>
          </div>

          <div className="space-y-1 mb-4">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Issued on:</span>{' '}
              {certificate.issuedAt.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Grade:</span> {certificate.grade}%
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onDownload}
              className="flex items-center gap-2 px-3 py-1.5 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
            <button
              onClick={onShare}
              className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors">
              <ExternalLink className="w-4 h-4" />
              Verify
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
