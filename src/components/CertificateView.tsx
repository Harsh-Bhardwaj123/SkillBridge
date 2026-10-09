import React, { useRef, useState } from 'react';
import { Certificate } from '../types';
import { Download, Share2, CheckCircle2, ShieldCheck, ExternalLink, Sparkles, Printer } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Link } from 'react-router-dom';

interface CertificateViewProps {
  certificate: Certificate;
  allowDownload?: boolean;
}

export const CertificateView: React.FC<CertificateViewProps> = ({ certificate, allowDownload = true }) => {
  const certRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleDownloadPdf = async () => {
    if (!certRef.current) return;
    setDownloading(true);
    try {
      const element = certRef.current;
      const canvas = await html2canvas(element, {
        scale: 2.5,
        useCORS: true,
        logging: false,
        backgroundColor: '#0F172A',
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width, canvas.height],
      });
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`SkillBridge_Certificate_${certificate.certificateId}.pdf`);
    } catch (err) {
      console.error('Failed to export certificate PDF:', err);
      // Fallback print dialog
      window.print();
    } finally {
      setDownloading(false);
    }
  };

  const handleCopyLink = () => {
    const url = `${window.location.origin}/verify/${certificate.certificateId}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* Actions Bar */}
      {allowDownload && (
        <div className="flex flex-wrap items-center justify-between w-full max-w-4xl mb-6 gap-4 px-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#e6f3f0] text-[#007f70] border border-[#cde4df]">
              <ShieldCheck className="w-4 h-4 text-[#007f70]" />
              Cryptographically Verified
            </span>
            <span className="text-xs text-[#647878] font-mono">
              ID: {certificate.certificateId}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-white hover:bg-[#eef5f3] text-[#142a2b] border border-[#e2ece9] shadow-sm transition"
              title="Copy verification link"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? 'Copied Link!' : 'Share Link'}</span>
            </button>

            <Link
              to={`/verify/${certificate.certificateId}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-white hover:bg-[#eef5f3] text-[#007f70] border border-[#e2ece9] shadow-sm transition"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Verify Portal</span>
            </Link>

            <button
              onClick={handleDownloadPdf}
              disabled={downloading}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold text-white bg-[#007f70] hover:bg-[#00665a] shadow-sm transition disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{downloading ? 'Generating PDF...' : 'Download PDF'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Renderable Certificate Document */}
      <div 
        id="certificate-print-area"
        ref={certRef}
        className="w-full max-w-4xl aspect-[1.414/1] bg-gradient-to-br from-[#0D1527] via-[#0F172A] to-[#1E1B4B] rounded-2xl p-8 sm:p-12 border-4 border-amber-500/30 shadow-2xl relative overflow-hidden flex flex-col justify-between select-none text-slate-100"
      >
        {/* Decorative Guilloche Border & Corners */}
        <div className="absolute inset-3 border-2 border-dashed border-amber-400/20 rounded-xl pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Certificate Header */}
        <div className="relative z-10 text-center space-y-3">
          <div className="inline-flex items-center gap-2 text-brand-400 font-extrabold tracking-widest text-sm uppercase">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>SkillBridge Professional Learning Academy</span>
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif tracking-wider font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-100 to-yellow-300">
            CERTIFICATE OF COMPLETION
          </h1>

          <p className="text-xs sm:text-sm text-slate-400 tracking-widest uppercase font-mono">
            This certifies that
          </p>
        </div>

        {/* Recipient Name */}
        <div className="relative z-10 text-center my-4 sm:my-6">
          <div className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white border-b-2 border-amber-400/30 pb-3 inline-block px-8 max-w-full">
            {certificate.learnerName}
          </div>
          <p className="text-xs sm:text-sm text-slate-300 mt-4 max-w-xl mx-auto leading-relaxed">
            has demonstrated exceptional mastery and successfully satisfied all curriculum, 
            practical modules, hands-on capstone milestones, and assessment criteria for:
          </p>
        </div>

        {/* Course / Skill Completed */}
        <div className="relative z-10 text-center">
          <div className="inline-block px-6 py-2.5 rounded-xl bg-brand-500/10 border border-brand-400/30 text-xl sm:text-2xl font-bold text-brand-300 shadow-inner">
            {certificate.skillName}
          </div>
          <div className="mt-2 text-xs text-emerald-400 font-semibold tracking-wide flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            Graduated with Distinction ({certificate.scorePercentage}% Assessment Score)
          </div>
        </div>

        {/* Certificate Footer with Seal & Signatures */}
        <div className="relative z-10 grid grid-cols-3 items-end pt-6 border-t border-white/10 mt-6 text-xs text-slate-400">
          {/* Issue Date & ID */}
          <div className="text-left space-y-1 font-mono text-[11px]">
            <p><span className="text-slate-500">Date:</span> {certificate.completionDate}</p>
            <p><span className="text-slate-500">Credential ID:</span> <span className="text-amber-300 font-bold">{certificate.certificateId}</span></p>
            <p><span className="text-slate-500">Framework:</span> <span className="text-cyan-300">NSQF & O*NET Aligned</span></p>
            <p><span className="text-slate-500">Verify at:</span> skillbridge.edu/verify</p>
          </div>

          {/* Official Gold Embossed Seal */}
          <div className="flex flex-col items-center justify-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-amber-600 via-yellow-400 to-amber-200 p-1 shadow-lg shadow-amber-500/20 flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-[#0D1527] border border-amber-300/40 flex flex-col items-center justify-center text-center p-1">
                <ShieldCheck className="w-6 h-6 text-amber-400" />
                <span className="text-[7px] font-extrabold uppercase tracking-tighter text-amber-200 mt-0.5">
                  OFFICIAL SEAL
                </span>
              </div>
            </div>
          </div>

          {/* Signature */}
          <div className="text-right space-y-1">
            <div className="font-serif italic text-lg sm:text-xl text-slate-200 pr-2">
              Dr. Marcus Vance
            </div>
            <div className="h-0.5 w-36 ml-auto bg-slate-500/40" />
            <p className="text-[11px] text-slate-400">Academic Director, SkillBridge</p>
          </div>
        </div>
      </div>
    </div>
  );
};
