import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLearning } from '../context/LearningContext';
import { Recommendation } from '../types';
import { fetchSkillRecommendations } from '../services/aiService';
import { 
  Sparkles, 
  RotateCw, 
  ArrowRight, 
  Clock, 
  Layers, 
  CheckCircle2, 
  Briefcase, 
  Compass, 
  ChevronRight
} from 'lucide-react';

export const RecommendationsPage: React.FC = () => {
  const { profile } = useAuth();
  const { enrollInCourse } = useLearning();
  const navigate = useNavigate();

  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadRecommendations = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchSkillRecommendations({
        interests: profile?.interests || ['Data Science', 'AI & Machine Learning'],
        careerGoal: profile?.careerGoal || 'Job',
        skillLevel: profile?.skillLevel || 'Beginner',
        learningStyle: profile?.learningStyle || 'Mixed',
        careerAspiration: profile?.careerAspiration || 'Aspiring Data & AI practitioner',
      });
      setRecommendations(data);
    } catch (err: any) {
      console.error('Error fetching recommendations:', err);
      setError('Unable to fetch live recommendations. Using cached suggestions.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecommendations();
  }, [profile]);

  const handleStartLearning = (courseId: string) => {
    enrollInCourse(courseId);
    navigate(`/learn/${courseId}`);
  };

  return (
    <div className="min-h-screen bg-[#f4f8f7] text-[#142a2b] py-10 px-4 sm:px-6 lg:px-8 selection:bg-[#007f70] selection:text-white">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header (Framer exact title & eyebrow) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-[#e2ece9]">
          <div className="space-y-1">
            <span className="framer-eyebrow">AI SKILL MATCH</span>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#142a2b]">
              Your best-fit skills.
            </h1>
            <p className="text-[#647878] text-sm">
              Matched to your goals and career trajectory.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadRecommendations}
              disabled={loading}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-[#007f70] hover:bg-[#00665a] transition shadow-sm disabled:opacity-50"
            >
              <RotateCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>{loading ? 'Consulting AI...' : 'Regenerate'}</span>
            </button>
          </div>
        </div>

        {/* Main Grid: Recommendations on Left, Match Signals on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Recommendations List (8 cols) */}
          <div className="lg:col-span-8 space-y-5">
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="framer-card p-6 bg-white animate-pulse space-y-3">
                    <div className="h-5 bg-[#e2ece9] rounded w-1/3" />
                    <div className="h-4 bg-[#e2ece9] rounded w-3/4" />
                    <div className="h-10 bg-[#f4f8f7] rounded w-full" />
                  </div>
                ))}
              </div>
            ) : (
              recommendations.map((rec, idx) => {
                const targetCourseId = rec.skillId || 'python-data-science';

                return (
                  <div 
                    key={idx}
                    className="framer-card p-6 sm:p-7 bg-white space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono font-bold text-[#647878] uppercase">
                          {rec.difficulty} · {rec.estimatedDuration}
                        </span>
                        <span className="framer-pill">
                          {rec.matchScore}% MATCH
                        </span>
                      </div>

                      <h2 className="text-2xl font-bold text-[#142a2b]">
                        {rec.skill}
                      </h2>

                      <p className="text-sm text-[#647878] leading-relaxed">
                        {rec.reason}
                      </p>

                      <div className="p-3.5 rounded-2xl bg-[#f4f8f7] border border-[#e2ece9] text-xs text-[#647878] space-y-1">
                        <span className="font-semibold text-[#142a2b] block">Career Relevance:</span>
                        <p>{rec.careerRelevance}</p>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between gap-4 border-t border-[#e2ece9]">
                      <Link
                        to={`/skills/${targetCourseId}`}
                        className="text-xs font-semibold text-[#647878] hover:text-[#142a2b] transition"
                      >
                        Explore roadmap →
                      </Link>

                      <button
                        onClick={() => handleStartLearning(targetCourseId)}
                        className="px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-[#007f70] hover:bg-[#00665a] transition shadow-sm flex items-center gap-1.5"
                      >
                        <span>Start Learning</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Right Side: Your Match Signals Card (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="framer-card p-6 bg-white space-y-5 sticky top-24">
              <div className="space-y-1 pb-3 border-b border-[#e2ece9]">
                <span className="framer-eyebrow">CALIBRATION</span>
                <h3 className="text-lg font-bold text-[#142a2b]">
                  Your match signals
                </h3>
              </div>

              <div className="space-y-4 text-xs text-[#647878]">
                <div>
                  <span className="font-semibold text-[#142a2b] block mb-1">Target Career Goal:</span>
                  <div className="inline-block px-3 py-1 rounded-full bg-[#f4f8f7] border border-[#e2ece9] font-medium text-[#142a2b]">
                    {profile?.careerGoal || 'Full-time Software Career'}
                  </div>
                </div>

                <div>
                  <span className="font-semibold text-[#142a2b] block mb-1">Selected Technical Interests:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {(profile?.interests?.length ? profile.interests : ['Data Science', 'AI', 'Web Dev']).map((item, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-full bg-[#f4f8f7] border border-[#e2ece9] text-[#647878]">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="font-semibold text-[#142a2b] block mb-1">Declared Aspiration:</span>
                  <p className="p-3 rounded-xl bg-[#f4f8f7] border border-[#e2ece9] italic leading-relaxed text-[#647878]">
                    "{profile?.careerAspiration || 'Explore high-demand career skills and build real-world applications.'}"
                  </p>
                </div>
              </div>

              <Link
                to="/onboarding"
                className="w-full py-2.5 rounded-full text-xs font-semibold text-[#142a2b] bg-[#f4f8f7] hover:bg-[#eef5f3] border border-[#e2ece9] transition text-center block"
              >
                Update your interests
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
