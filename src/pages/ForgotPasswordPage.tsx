import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, ArrowRight, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email) {
      setError('Please provide your email address.');
      return;
    }

    setLoading(true);
    const res = await resetPassword(email);
    setLoading(false);

    if (res.success) {
      setSubmitted(true);
    } else {
      setError(res.error || 'Failed to send reset link.');
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f8f7] flex flex-col justify-center py-12 sm:px-6 lg:px-8 selection:bg-[#007f70] selection:text-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2.5 mb-4 group">
          <div className="w-10 h-10 rounded-xl bg-[#007f70] flex items-center justify-center text-white font-black text-sm shadow-sm group-hover:scale-105 transition">
            SB
          </div>
          <span className="text-2xl font-bold tracking-tight text-[#142a2b]">
            SkillBridge
          </span>
        </Link>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#142a2b]">Reset your password</h2>
        <p className="mt-2 text-sm text-[#647878]">
          Enter your registered email to receive a password recovery link
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="framer-card py-8 px-6 sm:px-10 bg-white">
          {submitted ? (
            <div className="text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#e6f3f0] text-[#007f70] flex items-center justify-center mx-auto border border-[#cde4df]">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#142a2b]">Check your email</h3>
              <p className="text-xs text-[#647878] leading-relaxed">
                If an account exists for <span className="text-[#142a2b] font-mono font-medium">{email}</span>, 
                we've sent password reset instructions.
              </p>
              <div className="pt-4">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#007f70] hover:text-[#00665a]"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Return to Sign In</span>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-3.5 rounded-xl bg-[#fff1f2] border border-[#fecdd3] text-[#be123c] text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-[#647878] uppercase tracking-wider mb-2">
                  Account Email
                </label>
                <div className="relative rounded-xl">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#647878]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex.morgan@example.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-[#f4f8f7] border border-[#e2ece9] rounded-xl text-[#142a2b] placeholder-[#9abfb6] text-sm focus:outline-none focus:border-[#007f70] transition"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-full text-sm font-semibold text-white bg-[#007f70] hover:bg-[#00665a] shadow-sm transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <span>{loading ? 'Sending link...' : 'Send Recovery Link'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center pt-2">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#647878] hover:text-[#142a2b] transition"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Sign In</span>
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
