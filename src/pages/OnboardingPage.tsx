import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CareerGoal, SkillLevel, LearningStyle } from '../types';
import { 
  Sparkles, 
  ArrowRight, 
  Compass, 
  Briefcase, 
  Layers, 
  GraduationCap, 
  Check, 
  Target, 
  BookOpen, 
  CheckCircle2
} from 'lucide-react';

const INTEREST_OPTIONS = [
  'Programming',
  'Web Development',
  'AI & Machine Learning',
  'Data Science',
  'Cybersecurity',
  'Cloud Computing',
  'UI/UX Design',
  'Digital Marketing',
  'Business',
  'Finance',
  'Entrepreneurship',
  'Communication'
];

const CAREER_GOALS: { id: CareerGoal; label: string; desc: string }[] = [
  { id: 'Job', label: 'Full-Time Job', desc: 'Secure an entry or mid-level industry tech position' },
  { id: 'Internship', label: 'Internship', desc: 'Land a high-impact summer or semester internship' },
  { id: 'Freelancing', label: 'Freelancing', desc: 'Deliver client contracts and build independent revenue' },
  { id: 'Career Switch', label: 'Career Switch', desc: 'Transition from another field into software/data/AI' },
  { id: 'Entrepreneurship', label: 'Entrepreneurship', desc: 'Build scalable digital products and technical startups' },
  { id: 'Upskilling', label: 'Upskilling', desc: 'Elevate existing capabilities with advanced modern tooling' },
];

const SKILL_LEVELS: { id: SkillLevel; label: string; desc: string }[] = [
  { id: 'Beginner', label: 'Beginner', desc: 'Starting fresh, minimal coding or technical background' },
  { id: 'Intermediate', label: 'Intermediate', desc: 'Familiar with syntax, completed basic tutorials & projects' },
  { id: 'Advanced', label: 'Advanced', desc: 'Comfortable with complex architectures and system design' },
];

const LEARNING_STYLES: { id: LearningStyle; label: string; desc: string }[] = [
  { id: 'Video', label: 'Video Focused', desc: 'Visual walkthroughs & code-along screencasts' },
  { id: 'Reading', label: 'Reading & Docs', desc: 'Structured documentation, articles, & deep reads' },
  { id: 'Practice', label: 'Hands-on Practice', desc: 'Interactive coding exercises & sandbox challenges' },
  { id: 'Mixed', label: 'Mixed / Balanced', desc: 'Harmonious blend of visual, reading, and building' },
];

export const OnboardingPage: React.FC = () => {
  const { user, profile, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState(user?.fullName || profile?.fullName || 'Alex Morgan');
  const [selectedInterests, setSelectedInterests] = useState<string[]>(
    profile?.interests?.length ? profile.interests : ['Data Science', 'AI & Machine Learning']
  );
  const [skillLevel, setSkillLevel] = useState<SkillLevel>(profile?.skillLevel || 'Beginner');
  const [careerGoal, setCareerGoal] = useState<CareerGoal>(profile?.careerGoal || 'Job');
  const [learningStyle, setLearningStyle] = useState<LearningStyle>(profile?.learningStyle || 'Mixed');
  const [careerAspiration, setCareerAspiration] = useState(
    profile?.careerAspiration || 'I want to become a proficient Data Scientist and Applied AI Engineer capable of building predictive applications.'
  );

  const [saving, setSaving] = useState(false);

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleComplete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedInterests.length === 0) {
      alert('Please select at least one interest.');
      return;
    }

    setSaving(true);
    await updateProfile({
      fullName,
      interests: selectedInterests,
      skillLevel,
      careerGoal,
      learningStyle,
      careerAspiration,
    });
    setSaving(false);

    // Head directly to AI recommendation generation
    navigate('/recommendations');
  };

  return (
    <div className="min-h-screen bg-[#f4f8f7] py-12 px-4 sm:px-6 lg:px-8 selection:bg-[#007f70] selection:text-white">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Header Title */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#e6f3f0] border border-[#cde4df] text-[#007f70]">
            <Sparkles className="w-3.5 h-3.5 text-[#007f70]" />
            <span>AI Calibration Setup</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#142a2b]">
            Tailor Your Skill Matrix
          </h1>
          <p className="text-[#647878] text-sm max-w-xl mx-auto">
            Provide your aspirations and background. Our Gemini AI engine will map out your optimal 
            learning curve, career relevance, and structured roadmap.
          </p>
        </div>

        {/* Setup Form Card */}
        <form onSubmit={handleComplete} className="framer-card p-6 sm:p-10 bg-white space-y-8">
          
          {/* Step 1: Full Name */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-[#647878] uppercase tracking-wider">
              Full Name (for your official certificates)
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#f4f8f7] border border-[#e2ece9] rounded-xl text-[#142a2b] placeholder-[#9abfb6] text-sm focus:outline-none focus:border-[#007f70] transition"
              required
            />
          </div>

          {/* Step 2: Interests Multi-Select */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-[#647878] uppercase tracking-wider">
                Select Your Technical Interests
              </label>
              <span className="text-xs text-[#007f70] font-semibold">
                {selectedInterests.length} selected
              </span>
            </div>
            <p className="text-xs text-[#647878]">Choose all domains that spark your curiosity:</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
              {INTEREST_OPTIONS.map((interest) => {
                const isSelected = selectedInterests.includes(interest);
                return (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`px-3.5 py-2.5 rounded-xl text-xs font-medium border text-left transition flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#e6f3f0] border-[#cde4df] text-[#007f70] font-semibold shadow-sm'
                        : 'bg-[#f4f8f7] border-[#e2ece9] text-[#142a2b] hover:bg-[#eef5f3]'
                    }`}
                  >
                    <span>{interest}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#007f70] flex-shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Current Skill Level */}
          <div className="space-y-3">
            <label className="block text-xs font-semibold text-[#647878] uppercase tracking-wider">
              Current Skill Level
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {SKILL_LEVELS.map((level) => {
                const isSelected = skillLevel === level.id;
                return (
                  <div
                    key={level.id}
                    onClick={() => setSkillLevel(level.id)}
                    className={`cursor-pointer p-3.5 rounded-xl border transition ${
                      isSelected
                        ? 'bg-[#e6f3f0] border-[#007f70] text-[#142a2b] ring-1 ring-[#007f70]'
                        : 'bg-[#f4f8f7] border-[#e2ece9] text-[#142a2b] hover:bg-[#eef5f3]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-bold text-[#142a2b]">{level.label}</span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-[#007f70]" />}
                    </div>
                    <p className="text-xs text-[#647878] leading-snug">{level.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 4: Career Goal */}
          <div className="space-y-3">
            <label className="block text-xs font-semibold text-[#647878] uppercase tracking-wider">
              Primary Career Goal
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CAREER_GOALS.map((goal) => {
                const isSelected = careerGoal === goal.id;
                return (
                  <div
                    key={goal.id}
                    onClick={() => setCareerGoal(goal.id)}
                    className={`cursor-pointer p-3.5 rounded-xl border transition flex items-start gap-3 ${
                      isSelected
                        ? 'bg-[#e6f3f0] border-[#007f70] text-[#142a2b] ring-1 ring-[#007f70]'
                        : 'bg-[#f4f8f7] border-[#e2ece9] text-[#142a2b] hover:bg-[#eef5f3]'
                    }`}
                  >
                    <div className="mt-0.5">
                      <Briefcase className={`w-4 h-4 ${isSelected ? 'text-[#007f70]' : 'text-[#647878]'}`} />
                    </div>
                    <div className="flex-1">
                      <span className="text-sm font-bold text-[#142a2b] block">{goal.label}</span>
                      <span className="text-xs text-[#647878] leading-snug block mt-0.5">{goal.desc}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 5: Preferred Learning Style */}
          <div className="space-y-3">
            <label className="block text-xs font-semibold text-[#647878] uppercase tracking-wider">
              Preferred Learning Style
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {LEARNING_STYLES.map((style) => {
                const isSelected = learningStyle === style.id;
                return (
                  <button
                    key={style.id}
                    type="button"
                    onClick={() => setLearningStyle(style.id)}
                    className={`p-3 rounded-xl border text-center transition ${
                      isSelected
                        ? 'bg-[#e6f3f0] border-[#007f70] text-[#007f70] font-semibold ring-1 ring-[#007f70]'
                        : 'bg-[#f4f8f7] border-[#e2ece9] text-[#647878] hover:bg-[#eef5f3] hover:text-[#142a2b]'
                    }`}
                  >
                    <span className="text-xs font-bold block">{style.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 6: Career Aspiration Textarea */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-[#647878] uppercase tracking-wider flex items-center justify-between">
              <span>Tell us what you want to become...</span>
              <span className="text-[11px] text-[#007f70] font-medium lowercase">context for gemini ai</span>
            </label>
            <textarea
              rows={3}
              value={careerAspiration}
              onChange={(e) => setCareerAspiration(e.target.value)}
              placeholder="e.g. I want to become a Senior Data Analyst at a financial firm or build an AI SaaS application..."
              className="w-full p-3.5 bg-[#f4f8f7] border border-[#e2ece9] rounded-xl text-[#142a2b] placeholder-[#9abfb6] text-sm focus:outline-none focus:border-[#007f70] transition"
              required
            />
          </div>

          {/* Submit Action */}
          <div className="pt-4 border-t border-[#e2ece9] flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-[#647878]">
              * Preferences can be edited at any time in Profile
            </span>

            <button
              type="submit"
              disabled={saving}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white bg-[#007f70] hover:bg-[#00665a] shadow-sm transition disabled:opacity-50"
            >
              <span>{saving ? 'Saving Profile...' : 'Generate AI Recommendations'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
