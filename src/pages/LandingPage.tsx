import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Award, 
  BookOpen, 
  ChevronRight,
  ShieldCheck,
  TrendingUp,
  BrainCircuit,
  Compass,
  Layers,
  Clock
} from 'lucide-react';
import { COURSES_DATA } from '../data/coursesData';
import { useAuth } from '../context/AuthContext';
import { useLearning } from '../context/LearningContext';

export const LandingPage: React.FC = () => {
  const { user, quickDemoLogin } = useAuth();
  const { courses } = useLearning();
  const navigate = useNavigate();

  const topCourse = courses[0] || COURSES_DATA[0];

  return (
    <div className="min-h-screen bg-[#f4f8f7] text-[#142a2b] flex flex-col selection:bg-[#007f70] selection:text-white">
      
      {/* HERO SECTION */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden border-b border-[#e2ece9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Headline and Call to Actions */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e6f3f0] border border-[#cde4df] text-[#007f70] text-xs font-semibold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[#007f70]" />
                <span>YOUR NEXT CHAPTER</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#142a2b] leading-[1.08]">
                Discover Your <br className="hidden sm:inline" />
                <span className="text-[#007f70]">Best Skill</span>
              </h1>

              <p className="text-lg sm:text-xl text-[#647878] max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
                AI finds your fit. You build the future. Learn. Practice. Get Certified. 
                Your skill. Your roadmap.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                {user ? (
                  <Link
                    to="/dashboard"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white bg-[#007f70] hover:bg-[#00665a] shadow-sm transition"
                  >
                    <span>Go to Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/onboarding"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-semibold text-white bg-[#007f70] hover:bg-[#00665a] shadow-sm transition transform hover:-translate-y-0.5 active:translate-y-0"
                    >
                      <span>Find my skill</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    <button
                      onClick={() => {
                        quickDemoLogin();
                        navigate('/dashboard');
                      }}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-[#142a2b] bg-white hover:bg-[#eef5f3] border border-[#e2ece9] transition"
                    >
                      <Sparkles className="w-4 h-4 text-[#007f70]" />
                      <span>Instant Demo Mode</span>
                    </button>
                  </>
                )}
              </div>

              {/* National & International Accreditation badges */}
              <div className="pt-6 border-t border-[#e2ece9] flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-[#647878]">
                <div className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#007f70]" />
                  <span>🇮🇳 Govt of India NSQF & MeitY Aligned</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#007f70]" />
                  <span>🌐 Global U.S. O*NET Standard</span>
                </div>
              </div>
            </div>

            {/* Right Column: Framer Match Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Hero Top Match Card */}
                <div className="framer-card p-6 sm:p-8 space-y-5 bg-white border border-[#e2ece9] rounded-3xl shadow-[0_4px_24px_rgba(20,42,43,0.06)]">
                  
                  {/* Card Header with Top Match pill */}
                  <div className="flex items-center justify-between pb-3 border-b border-[#e2ece9]">
                    <span className="text-[11px] font-bold tracking-widest text-[#647878] uppercase">
                      YOUR TOP MATCH
                    </span>
                    <span className="framer-pill">
                      96% MATCH
                    </span>
                  </div>

                  {/* Skill Details */}
                  <div className="space-y-3">
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#142a2b]">
                      {topCourse.title}
                    </h2>
                    
                    <p className="text-sm text-[#647878] leading-relaxed">
                      Built for creative problem-solvers. Beginner · 4 weeks · High career relevance.
                    </p>

                    <div className="p-3.5 rounded-2xl bg-[#f4f8f7] border border-[#e2ece9] space-y-1.5 text-xs text-[#647878]">
                      <div className="flex justify-between font-semibold text-[#142a2b]">
                        <span>Curriculum Blueprint</span>
                        <span className="text-[#007f70]">5 Modular Milestones</span>
                      </div>
                      <p>
                        Structured progression with interactive code sandbox, self-paced readings, and capstone.
                      </p>
                    </div>
                  </div>

                  {/* Card Action Button */}
                  <Link
                    to={`/skills/${topCourse.id}`}
                    className="w-full py-3 rounded-full bg-[#007f70] hover:bg-[#00665a] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition"
                  >
                    <span>Explore your path</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4 FEATURE MARQUEE / GRID (Exact Framer Pillars) */}
      <section className="py-12 bg-white border-b border-[#e2ece9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-5 rounded-2xl bg-[#f4f8f7] border border-[#e2ece9] space-y-2">
              <div className="w-8 h-8 rounded-full bg-[#e6f3f0] text-[#007f70] flex items-center justify-center font-bold">
                <BrainCircuit className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-[#142a2b]">AI-powered fit</h3>
              <p className="text-xs text-[#647878] leading-relaxed">
                Skills matched to your strengths.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#f4f8f7] border border-[#e2ece9] space-y-2">
              <div className="w-8 h-8 rounded-full bg-[#e6f3f0] text-[#007f70] flex items-center justify-center font-bold">
                <Compass className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-[#142a2b]">A clear next step</h3>
              <p className="text-xs text-[#647878] leading-relaxed">
                Bite-sized lessons. Real projects.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#f4f8f7] border border-[#e2ece9] space-y-2">
              <div className="w-8 h-8 rounded-full bg-[#e6f3f0] text-[#007f70] flex items-center justify-center font-bold">
                <TrendingUp className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-[#142a2b]">See your growth</h3>
              <p className="text-xs text-[#647878] leading-relaxed">
                Progress you can see, every day.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#f4f8f7] border border-[#e2ece9] space-y-2">
              <div className="w-8 h-8 rounded-full bg-[#e6f3f0] text-[#007f70] flex items-center justify-center font-bold">
                <Award className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-[#142a2b]">Make it official</h3>
              <p className="text-xs text-[#647878] leading-relaxed">
                Turn your learning into credentials.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION: From curious to capable (4-Step Pathway) */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="framer-eyebrow">A GUIDED JOURNEY</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#142a2b]">
            From curious to capable.
          </h2>
          <p className="text-[#647878] text-sm sm:text-base">
            Follow a proven path from raw ambition to recognized certification.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              num: '01',
              title: 'Discover',
              desc: 'Find your best-fit skill.',
            },
            {
              num: '02',
              title: 'Learn',
              desc: 'Follow your personal roadmap.',
            },
            {
              num: '03',
              title: 'Practice',
              desc: 'Test it. Build something.',
            },
            {
              num: '04',
              title: 'Get certified',
              desc: 'Show what you can do.',
            },
          ].map((step, idx) => (
            <div key={idx} className="framer-card p-6 bg-white space-y-3 relative">
              <div className="text-2xl font-mono font-bold text-[#007f70]">
                {step.num}
              </div>
              <h3 className="text-lg font-bold text-[#142a2b]">{step.title}</h3>
              <p className="text-sm text-[#647878]">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION: Make it official (Certificate Showcase) */}
      <section className="py-20 bg-white border-y border-[#e2ece9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-5 text-center lg:text-left">
              <span className="framer-eyebrow">YOUR ACHIEVEMENTS</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#142a2b]">
                Make it official.
              </h2>
              <p className="text-[#647878] text-base leading-relaxed">
                Complete a skill. Earn your certificate. Download an official PDF with cryptographic verification ID that employers can verify online.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                <Link
                  to="/certificates"
                  className="px-6 py-3 rounded-full font-semibold text-white bg-[#007f70] hover:bg-[#00665a] transition text-xs shadow-sm"
                >
                  See a certificate
                </Link>
                <Link
                  to="/verify/SB-2026-X892B"
                  className="px-5 py-3 rounded-full font-semibold text-[#142a2b] bg-[#f4f8f7] border border-[#e2ece9] hover:bg-[#eef5f3] transition text-xs"
                >
                  Verification Registry
                </Link>
              </div>
            </div>

            {/* Certificate Preview Card */}
            <div className="lg:col-span-7">
              <div className="p-8 sm:p-10 rounded-3xl bg-[#f4f8f7] border-2 border-[#cde4df] shadow-md space-y-6 text-center">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-[#007f70] uppercase">
                    SKILLBRIDGE
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#142a2b]">
                    Certificate of Achievement
                  </h3>
                  <p className="text-xs text-[#647878] italic">Presented to</p>
                </div>

                <div className="text-2xl sm:text-3xl font-bold text-[#142a2b] border-b border-[#cde4df] pb-2 inline-block px-8">
                  {user?.fullName || 'Alex Morgan'}
                </div>

                <div className="space-y-1">
                  <div className="text-lg font-bold text-[#007f70]">
                    Web Development & Applied Data Science
                  </div>
                  <p className="text-xs text-[#647878]">
                    Learned. Practiced. Certified.
                  </p>
                </div>

                <div className="pt-4 border-t border-[#e2ece9] text-[11px] text-[#647878] flex justify-between font-mono">
                  <span>Completed 01 October 2026</span>
                  <span className="text-[#007f70] font-bold">SB-WD-2026-001</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 bg-[#f4f8f7] border-t border-[#e2ece9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <div className="w-5 h-5 rounded-md bg-[#007f70] flex items-center justify-center text-white text-[10px] font-bold">
                  SB
                </div>
                <span className="font-bold text-[#142a2b]">SkillBridge</span>
              </div>
              <p className="text-xs text-[#647878]">
                SkillBridge. Your next chapter starts here.
              </p>
            </div>

            <div className="flex items-center gap-6 text-xs text-[#647878]">
              <Link to="/dashboard" className="hover:text-[#142a2b] transition">Dashboard</Link>
              <Link to="/recommendations" className="hover:text-[#142a2b] transition">Recommendations</Link>
              <Link to="/certificates" className="hover:text-[#142a2b] transition">Certificates</Link>
              <Link to="/verify/SB-2026-X892B" className="hover:text-[#142a2b] transition">Verify Portal</Link>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};
