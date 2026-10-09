import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLearning } from '../context/LearningContext';
import { CertificateView } from '../components/CertificateView';
import { ArrowLeft, Award, AlertCircle } from 'lucide-react';

export const CertificateDetailPage: React.FC = () => {
  const { certificateId } = useParams<{ certificateId: string }>();
  const { getCertificateById } = useLearning();

  const certificate = certificateId ? getCertificateById(certificateId) : undefined;

  return (
    <div className="min-h-screen bg-[#f4f8f7] py-10 px-4 sm:px-6 lg:px-8 selection:bg-[#007f70] selection:text-white">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Back navigation */}
        <div className="flex items-center justify-between pb-4 border-b border-[#e2ece9]">
          <Link
            to="/certificates"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#647878] hover:text-[#142a2b] transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Certificates Gallery</span>
          </Link>
          <span className="text-xs text-[#647878] font-mono">
            Credential ID: {certificateId}
          </span>
        </div>

        {certificate ? (
          <CertificateView certificate={certificate} allowDownload={true} />
        ) : (
          <div className="framer-card p-10 bg-white text-center space-y-4 max-w-md mx-auto">
            <div className="w-12 h-12 rounded-full bg-[#fff1f2] text-[#be123c] flex items-center justify-center mx-auto border border-[#fecdd3]">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-[#142a2b]">Certificate Not Found</h2>
            <p className="text-xs text-[#647878]">
              We couldn't locate a certificate matching ID "{certificateId}".
            </p>
            <Link
              to="/certificates"
              className="inline-block px-5 py-2.5 rounded-full text-xs font-semibold bg-[#007f70] hover:bg-[#00665a] text-white transition shadow-sm"
            >
              Return to Gallery
            </Link>
          </div>
        )}

      </div>
    </div>
  );
};
