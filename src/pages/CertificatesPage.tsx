import React from 'react';
import { Link } from 'react-router-dom';
import { useLearning } from '../context/LearningContext';
import { useAuth } from '../context/AuthContext';
import { 
  Award, 
  Download, 
  ExternalLink, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const CertificatesPage: React.FC = () => {
  const { certificates, courses, getCourseProgress, claimCertificate } = useLearning();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#f4f8f7] text-[#142a2b] py-10 px-4 sm:px-6 lg:px-8 selection:bg-[#007f70] selection:text-white">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#e2ece9]">
          <div className="space-y-1">
            <span className="framer-eyebrow">OFFICIAL CREDENTIALS</span>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#142a2b]">
              Digital Certificates
            </h1>
            <p className="text-[#647878] text-xs sm:text-sm">
              Download, share, and verify your cryptographically registered credentials.
            </p>
          </div>

          <Link
            to="/verify/SB-2026-X892B"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-white hover:bg-[#eef5f3] text-[#007f70] border border-[#e2ece9] shadow-sm transition"
          >
            <ShieldCheck className="w-4 h-4 text-[#007f70]" />
            <span>Public Verification Portal</span>
          </Link>
        </div>

        {/* Claimable / Eligible Courses Section */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-[#142a2b] flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#007f70]" />
            <span>Course Completion Status</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courses.map((course) => {
              const progress = getCourseProgress(course.id);
              const alreadyClaimed = certificates.some(c => c.courseId === course.id);

              return (
                <div 
                  key={course.id}
                  className="framer-card p-5 bg-white flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-[#647878] uppercase">{course.category}</span>
                      <h3 className="text-base font-bold text-[#142a2b] mt-0.5">{course.title}</h3>
                    </div>
                    <span className="text-xs font-bold text-[#007f70] font-mono">
                      {progress.percentage}%
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-1.5 bg-[#e6f3f0] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#007f70] rounded-full transition-all duration-300"
                      style={{ width: `${progress.percentage}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-[#647878]">
                      Criteria: {progress.percentage >= 70 ? 'Satisfied (70%+)' : 'In Progress (<70%)'}
                    </span>

                    {alreadyClaimed ? (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#007f70]">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Certificate Claimed</span>
                      </span>
                    ) : progress.isCompleted ? (
                      <button
                        onClick={() => claimCertificate(course.id)}
                        className="px-4 py-1.5 rounded-full text-xs font-bold bg-[#007f70] hover:bg-[#00665a] text-white transition shadow-sm"
                      >
                        Claim Certificate 🎉
                      </button>
                    ) : (
                      <Link
                        to={`/learn/${course.id}`}
                        className="text-xs font-semibold text-[#007f70] hover:underline"
                      >
                        Complete Course →
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Earned Certificates Gallery */}
        <div className="space-y-4 pt-4">
          <h2 className="text-base font-bold text-[#142a2b] flex items-center gap-2">
            <Award className="w-4 h-4 text-[#007f70]" />
            <span>Earned Certificates ({certificates.length})</span>
          </h2>

          {certificates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificates.map((cert) => (
                <div 
                  key={cert.id}
                  className="framer-card p-6 bg-white flex flex-col justify-between space-y-4 relative overflow-hidden group"
                >
                  <div className="space-y-3 relative z-10">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#e6f3f0] text-[#007f70] border border-[#cde4df] font-bold">
                        {cert.certificateId}
                      </span>
                      <ShieldCheck className="w-4 h-4 text-[#007f70]" />
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-[#142a2b] group-hover:text-[#007f70] transition">
                        {cert.skillName}
                      </h3>
                      <p className="text-xs text-[#647878] mt-1">Recipient: {cert.learnerName}</p>
                    </div>

                    <div className="text-[11px] text-[#647878] space-y-0.5 pt-2 border-t border-[#e2ece9]">
                      <p>Completed on: <span className="text-[#142a2b] font-medium">{cert.completionDate}</span></p>
                      <p>Graduation Score: <span className="text-[#007f70] font-bold">{cert.scorePercentage}%</span></p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#e2ece9] flex items-center gap-2 relative z-10">
                    <Link
                      to={`/certificate/${cert.certificateId}`}
                      className="flex-1 text-center py-2 rounded-full text-xs font-semibold bg-[#007f70] hover:bg-[#00665a] text-white transition shadow-sm"
                    >
                      View & Print
                    </Link>

                    <Link
                      to={`/verify/${cert.certificateId}`}
                      className="px-3 py-2 rounded-full text-xs font-semibold bg-white hover:bg-[#eef5f3] text-[#007f70] border border-[#e2ece9] transition flex items-center justify-center shadow-sm"
                      title="Verify Certificate"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="framer-card p-8 bg-white text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-[#e6f3f0] text-[#007f70] flex items-center justify-center mx-auto border border-[#cde4df]">
                <Award className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-[#142a2b]">No certificates claimed yet</h3>
                <p className="text-xs text-[#647878] max-w-md mx-auto">
                  Satisfy the completion criteria for any course (70%+ lesson completion and quiz pass) to unlock your official credential.
                </p>
              </div>

              {/* Demo button to immediately test certificate generation */}
              <div className="pt-2">
                <button
                  onClick={() => claimCertificate('python-data-science')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-[#007f70] hover:bg-[#00665a] shadow-sm transition"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Generate Demo Certificate for Python</span>
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
