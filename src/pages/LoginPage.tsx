import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { DemoBadge } from '../components/DemoBadge';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, quickDemoLogin, isDemoMode } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (!email || !password) {
      setErrorMessage('Please fill in both email and password.');
      return;
    }

    setIsSubmitting(true);
    const result = await login(email, password);
    setIsSubmitting(false);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setErrorMessage(result.error || 'Failed to sign in. Please verify your credentials.');
    }
  };

  const handleDemoSignIn = () => {
    quickDemoLogin();
    navigate('/dashboard');
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
        <h2 className="text-2xl sm:text-3xl font-bold text-[#142a2b]">Welcome back</h2>
        <p className="mt-2 text-sm text-[#647878]">
          Sign in to resume your personalized learning journey
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
              onClick={handleDemoSignIn}
              className="text-xs font-semibold text-[#007f70] hover:text-[#00665a] underline"
            >
              One-Click Demo Login →
            </button>
          </div>

          {errorMessage && (
            <div className="mb-5 p-3.5 rounded-xl bg-[#fff1f2] border border-[#fecdd3] text-[#be123c] text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-[#be123c]" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
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
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold text-[#647878] uppercase tracking-wider">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-medium text-[#007f70] hover:text-[#00665a] transition"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative rounded-xl">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#647878]">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#f4f8f7] border border-[#e2ece9] rounded-xl text-[#142a2b] placeholder-[#9abfb6] text-sm focus:outline-none focus:border-[#007f70] transition"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 rounded-full text-sm font-semibold text-white bg-[#007f70] hover:bg-[#00665a] shadow-sm transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>{isSubmitting ? 'Authenticating...' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Access Button */}
          <div className="mt-6 pt-6 border-t border-[#e2ece9]">
            <button
              onClick={handleDemoSignIn}
              type="button"
              className="w-full py-2.5 px-4 rounded-full text-xs font-semibold text-[#142a2b] bg-[#f4f8f7] hover:bg-[#eef5f3] border border-[#e2ece9] transition flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#007f70]" />
              <span>Explore as Demo Student (Alex Morgan)</span>
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-[#647878]">
              Don't have an account?{' '}
              <Link to="/register" className="font-semibold text-[#007f70] hover:text-[#00665a]">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
