import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLearning } from '../context/LearningContext';
import { 
  Sparkles, 
  ArrowRight, 
  Clock, 
  Play, 
  Award, 
  CheckSquare, 
  BookOpen, 
  ChevronRight,
  TrendingUp,
  Flame,
  Layers
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { courses, enrolledCourseIds, getCourseProgress, quizAttempts, certificates } = useLearning();
  const navigate = useNavigate();

  const currentCourseId = enrolledCourseIds[0] || 'python-data-science';
  const currentCourse = courses.find(c => c.id === currentCourseId) || courses[0];
  const progress = getCourseProgress(currentCourse.id);

  const recommendedCourse = courses.find(c => c.id !== currentCourseId) || courses[1];

  return (
    <div className="min-h-screen bg-[#f4f8f7] text-[#142a2b] py-10 px-4 sm:px-6 lg:px-8 selection:bg-[#007f70] selection:text-white">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header (Exact Framer Eyebrow & Title) */}
        <div className="space-y-2 pb-2">
          <div className="flex items-center gap-2">
            <span className="framer-eyebrow">YOUR LEARNING SPACE</span>
            <span className="text-xs text-[#647878]">•</span>
            <span className="text-xs text-[#647878]">Welcome back, {user?.fullName?.split(' ')[0] || 'Alex'}.</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#142a2b]">
            Your next step is ready.
          </h1>
        </div>

        {/* 4 STAT CARDS (Exact Framer Dashboard Metrics) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          {/* Card 1: Overall Progress */}
          <div className="framer-card p-5 bg-white space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-[#647878]">
              <span className="uppercase tracking-wider text-[10px]">OVERALL</span>
              <span className="text-[#007f70] font-mono text-[11px] font-bold">{progress.completedLessons} of {progress.totalLessons} lessons</span>
            </div>
            <div className="text-3xl font-extrabold text-[#142a2b]">
              {progress.percentage}%
            </div>
            <div className="w-full h-1.5 bg-[#e6f3f0] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#007f70] rounded-full transition-all duration-300"
                style={{ width: `${progress.percentage}%` }}
              />
            </div>
          </div>

          {/* Card 2: Learning Streak */}
          <div className="framer-card p-5 bg-white space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-[#647878]">
              <span className="uppercase tracking-wider text-[10px]">STREAK</span>
              <Flame className="w-3.5 h-3.5 text-[#007f70]" />
            </div>
            <div className="text-3xl font-extrabold text-[#142a2b]">
              7 days
            </div>
            <p className="text-xs text-[#647878]">Learning streak</p>
          </div>

          {/* Card 3: Certificates Earned */}
          <div className="framer-card p-5 bg-white space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-[#647878]">
              <span className="uppercase tracking-wider text-[10px]">CREDENTIALS</span>
              <Award className="w-3.5 h-3.5 text-[#007f70]" />
            </div>
            <div className="text-3xl font-extrabold text-[#142a2b]">
              {certificates.length || 1}
            </div>
            <Link to="/certificates" className="text-xs text-[#007f70] hover:underline block font-medium">
              Certificates earned →
            </Link>
          </div>

          {/* Card 4: Skill Level */}
          <div className="framer-card p-5 bg-white space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-[#647878]">
              <span className="uppercase tracking-wider text-[10px]">TIER</span>
              <Sparkles className="w-3.5 h-3.5 text-[#007f70]" />
            </div>
            <div className="text-3xl font-extrabold text-[#142a2b]">
              Explorer
            </div>
            <p className="text-xs text-[#647878]">Skill level · Level 3</p>
          </div>

        </div>

        {/* PRIMARY CONTINUE LEARNING & RECOMMENDATIONS (Framer Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Continue Learning Card (8 cols) */}
          <div className="lg:col-span-7 framer-card p-6 sm:p-7 bg-white space-y-5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold tracking-wider text-[#647878] uppercase">
                  ACTIVE TRACK
                </span>
                <span className="framer-pill">
                  {progress.percentage}% COMPLETE
                </span>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#142a2b]">
                  {currentCourse.title}
                </h2>
                <p className="text-sm text-[#647878] mt-1">
                  Up next: Core Concepts & Practice Exercises · 12 min
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#f4f8f7] border border-[#e2ece9] flex items-center justify-between text-xs text-[#647878]">
                <span>Progress Milestone</span>
                <span className="text-[#142a2b] font-semibold">
                  Module 3 of 5
                </span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between gap-4">
              <Link
                to={`/learn/${currentCourse.id}`}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold text-white bg-[#007f70] hover:bg-[#00665a] transition shadow-sm"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Continue learning</span>
              </Link>

              <Link
                to={`/skills/${currentCourse.id}`}
                className="text-xs font-semibold text-[#647878] hover:text-[#142a2b] transition"
              >
                View full roadmap →
              </Link>
            </div>
          </div>

          {/* Right Side Recommendation Quick Card (5 cols) */}
          <div className="lg:col-span-5 framer-card p-6 sm:p-7 bg-white space-y-5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold tracking-wider text-[#647878] uppercase">
                  AI RECOMMENDATION
                </span>
                <span className="framer-pill">
                  92% MATCH
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#142a2b]">
                  {recommendedCourse.title}
                </h3>
                <p className="text-xs text-[#647878] mt-1">
                  Beginner · 6 weeks · High market relevance
                </p>
              </div>

              <p className="text-xs text-[#647878] leading-relaxed">
                Calculated by Gemini AI based on your declared aspirations in technology and analytical thinking.
              </p>
            </div>

            <Link
              to="/recommendations"
              className="w-full py-2.5 rounded-full text-xs font-semibold text-[#142a2b] bg-[#f4f8f7] hover:bg-[#eef5f3] border border-[#e2ece9] transition text-center"
            >
              View matches
            </Link>
          </div>

        </div>

        {/* BOTTOM SECTION: QUIZ SCORES & LEARNING ACTIVITY */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Quiz Scores (6 cols) */}
          <div className="lg:col-span-6 framer-card p-6 bg-white space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#e2ece9]">
              <h3 className="text-sm font-bold text-[#142a2b] uppercase tracking-wider">
                Quiz scores
              </h3>
              <Link to="/assessments" className="text-xs text-[#007f70] font-semibold hover:underline">
                All quizzes →
              </Link>
            </div>

            <div className="grid grid-cols-4 gap-3 text-center pt-2">
              {[
                { label: 'Q1', score: '60%' },
                { label: 'Q2', score: '72%' },
                { label: 'Q3', score: '85%' },
                { label: 'Q4', score: '92%' },
              ].map((q, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-[#f4f8f7] border border-[#e2ece9] space-y-1">
                  <span className="text-xs text-[#647878] font-mono block">{q.label}</span>
                  <span className="text-lg font-bold text-[#142a2b] block">{q.score}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Learning Activity Heatmap / Progress (6 cols) */}
          <div className="lg:col-span-6 framer-card p-6 bg-white space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#e2ece9]">
              <h3 className="text-sm font-bold text-[#142a2b] uppercase tracking-wider">
                Learning activity
              </h3>
              <span className="text-xs text-[#647878]">This month · 18 active days</span>
            </div>

            <div className="pt-2 space-y-3">
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 28 }).map((_, i) => {
                  const level = (i % 5 === 0) ? 'bg-[#cde4df]' : (i % 3 === 0) ? 'bg-[#007f70]' : (i % 2 === 0) ? 'bg-[#7fc2b9]' : 'bg-[#e6f3f0]';
                  return (
                    <div 
                      key={i} 
                      className={`h-4 rounded-md ${level} transition hover:scale-110`}
                      title={`Day ${i + 1}`}
                    />
                  );
                })}
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#647878] pt-1">
                <span>Less activity</span>
                <div className="flex gap-1.5 items-center">
                  <div className="w-2.5 h-2.5 rounded-sm bg-[#e6f3f0]" />
                  <div className="w-2.5 h-2.5 rounded-sm bg-[#7fc2b9]" />
                  <div className="w-2.5 h-2.5 rounded-sm bg-[#007f70]" />
                </div>
                <span>More activity</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
