import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Mail, Lock, User, ArrowRight, AlertCircle } from 'lucide-react';
import { DemoBadge } from '../components/DemoBadge';

export const RegisterPage: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, quickDemoLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName || !email || !password || !confirmPassword) {
      setErrorMessage('All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    setIsSubmitting(true);
    const result = await register(fullName, email, password);
    setIsSubmitting(false);

    if (result.success) {
      navigate('/onboarding');
    } else {
      setErrorMessage(result.error || 'Registration failed. Please try again.');
    }
  };

  const handleDemoSignUp = () => {
    quickDemoLogin();
    navigate('/onboarding');
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
        <h2 className="text-2xl sm:text-3xl font-bold text-[#142a2b]">Create your account</h2>
        <p className="mt-2 text-sm text-[#647878]">
          Get AI-curated skill paths and verifiable digital certificates
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="framer-card py-8 px-6 sm:px-10 bg-white">
          
          {/* Demo Mode Notice */}
          <div className="mb-6 p-3.5 rounded-xl bg-[#f4f8f7] border border-[#e2ece9] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DemoBadge />
            </div>
            <button
              type="button"
              onClick={handleDemoSignUp}
              className="text-xs font-semibold text-[#007f70] hover:text-[#00665a] underline"
            >
              Instant Demo Setup →
            </button>
          </div>

          {errorMessage && (
            <div className="mb-5 p-3.5 rounded-xl bg-[#fff1f2] border border-[#fecdd3] text-[#be123c] text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-[#be123c]" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#647878] uppercase tracking-wider mb-2">
                Full Name
              </label>
              <div className="relative rounded-xl">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#647878]">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Alex Morgan"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#f4f8f7] border border-[#e2ece9] rounded-xl text-[#142a2b] placeholder-[#9abfb6] text-sm focus:outline-none focus:border-[#007f70] transition"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#647878] uppercase tracking-wider mb-2">
                Email Address
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

            <div>
              <label className="block text-xs font-semibold text-[#647878] uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative rounded-xl">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#647878]">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#f4f8f7] border border-[#e2ece9] rounded-xl text-[#142a2b] placeholder-[#9abfb6] text-sm focus:outline-none focus:border-[#007f70] transition"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#647878] uppercase tracking-wider mb-2">
                Confirm Password
              </label>
              <div className="relative rounded-xl">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#647878]">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#f4f8f7] border border-[#e2ece9] rounded-xl text-[#142a2b] placeholder-[#9abfb6] text-sm focus:outline-none focus:border-[#007f70] transition"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 py-3 px-4 rounded-full text-sm font-semibold text-white bg-[#007f70] hover:bg-[#00665a] shadow-sm transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>{isSubmitting ? 'Creating Account...' : 'Continue to Onboarding'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-[#647878]">
              Already registered?{' '}
              <Link to="/login" className="font-semibold text-[#007f70] hover:text-[#00665a]">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
