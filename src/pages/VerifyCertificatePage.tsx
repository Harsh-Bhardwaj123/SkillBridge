import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useLearning } from '../context/LearningContext';
import { 
  ShieldCheck, 
  XCircle, 
  Search, 
  CheckCircle2, 
  Calendar, 
  Award, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';

export const VerifyCertificatePage: React.FC = () => {
  const { certificateId } = useParams<{ certificateId: string }>();
  const { getCertificateById } = useLearning();
  const navigate = useNavigate();

  const [searchId, setSearchId] = useState(certificateId || '');

  const currentCertId = certificateId || searchId;
  const certificate = currentCertId ? getCertificateById(currentCertId) : undefined;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchId.trim()) {
      navigate(`/verify/${searchId.trim().toUpperCase()}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f8f7] text-[#142a2b] py-12 px-4 sm:px-6 lg:px-8 selection:bg-[#007f70] selection:text-white">
      <div className="max-w-2xl mx-auto space-y-8">
        
        {/* Verification Brand Header */}
        <div className="text-center space-y-3">
          <Link to="/" className="inline-flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-[#007f70] flex items-center justify-center text-white font-black text-sm shadow-sm group-hover:scale-105 transition">
              SB
            </div>
            <span className="text-2xl font-bold tracking-tight text-[#142a2b]">
              SkillBridge
            </span>
          </Link>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#142a2b]">
            Official Credential Verification Registry
          </h1>
          <p className="text-xs sm:text-sm text-[#647878]">
            Verify the authenticity and graduation status of SkillBridge certificates
          </p>
        </div>

        {/* Search Bar for Lookups */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#647878]">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="Enter Certificate ID (e.g. SB-2026-X892B)"
              className="w-full pl-10 pr-4 py-2.5 bg-[#f4f8f7] border border-[#e2ece9] rounded-full text-[#142a2b] placeholder-[#9abfb6] text-sm focus:outline-none focus:border-[#007f70] uppercase font-mono transition"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-full text-xs font-semibold text-white bg-[#007f70] hover:bg-[#00665a] shadow-sm transition"
          >
            Verify
          </button>
        </form>

        {/* Verification Result Card */}
        {certificate ? (
          <div className="framer-card p-6 sm:p-8 bg-white border-2 border-[#007f70]/30 shadow-lg relative overflow-hidden space-y-6">
            {/* Verified Badge Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#e2ece9]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#e6f3f0] text-[#007f70] flex items-center justify-center border border-[#cde4df]">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#007f70] uppercase tracking-wide">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Certificate Verified</span>
                  </div>
                  <p className="text-xs text-[#647878] font-mono">
                    Official SkillBridge Credential
                  </p>
                </div>
              </div>

              <span className="text-xs font-mono font-bold text-[#007f70] bg-[#e6f3f0] px-3 py-1 rounded-full border border-[#cde4df]">
                {certificate.certificateId}
              </span>
            </div>

            {/* Recipient Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-[#f4f8f7] border border-[#e2ece9] space-y-1">
                <span className="text-[#647878] block">Recipient Learner:</span>
                <span className="text-base font-bold text-[#142a2b] block">
                  {certificate.learnerName}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#f4f8f7] border border-[#e2ece9] space-y-1">
                <span className="text-[#647878] block">Certified Skill:</span>
                <span className="text-base font-bold text-[#007f70] block">
                  {certificate.skillName}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#f4f8f7] border border-[#e2ece9] space-y-1">
                <span className="text-[#647878] block">Date of Completion:</span>
                <span className="text-sm font-semibold text-[#142a2b] block">
                  {certificate.completionDate}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#f4f8f7] border border-[#e2ece9] space-y-1">
                <span className="text-[#647878] block">Assessment Distinction:</span>
                <span className="text-sm font-semibold text-[#007f70] block">
                  {certificate.scorePercentage}% Final Score (Passed)
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-2 flex items-center justify-between border-t border-[#e2ece9]">
              <Link
                to={`/certificate/${certificate.certificateId}`}
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#007f70] hover:text-[#00665a]"
              >
                <span>View Full Certificate Document</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>

              <span className="text-[11px] text-[#647878] font-mono">
                Status: Active & Valid
              </span>
            </div>

          </div>
        ) : (
          <div className="framer-card p-8 bg-white border border-[#fecdd3] text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-[#fff1f2] text-[#be123c] flex items-center justify-center mx-auto border border-[#fecdd3]">
              <XCircle className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#142a2b]">Certificate Not Found</h2>
              <p className="text-xs text-[#647878] mt-1 max-w-sm mx-auto">
                No active certificate matching credential ID <span className="font-mono text-[#142a2b] font-medium">"{currentCertId}"</span> was found in the SkillBridge registry.
              </p>
            </div>

            <div className="pt-2 text-xs text-[#647878]">
              Try searching sample demo credential:{' '}
              <button
                onClick={() => navigate('/verify/SB-2026-X892B')}
                className="text-[#007f70] underline font-mono font-bold"
              >
                SB-2026-X892B
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
