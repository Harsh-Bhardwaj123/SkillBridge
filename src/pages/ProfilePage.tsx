import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { CareerGoal, SkillLevel, LearningStyle } from '../types';
import { 
  User, 
  Mail, 
  Briefcase, 
  Sparkles, 
  Layers, 
  Save, 
  CheckCircle2, 
  Check, 
  AlertCircle 
} from 'lucide-react';

const ALL_INTERESTS = [
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

export const ProfilePage: React.FC = () => {
  const { user, profile, updateProfile, isDemoMode } = useAuth();

  const [fullName, setFullName] = useState(profile?.fullName || user?.fullName || '');
  const [email] = useState(profile?.email || user?.email || '');
  const [interests, setInterests] = useState<string[]>(profile?.interests || []);
  const [careerGoal, setCareerGoal] = useState<CareerGoal>(profile?.careerGoal || 'Job');
  const [skillLevel, setSkillLevel] = useState<SkillLevel>(profile?.skillLevel || 'Beginner');
  const [learningStyle, setLearningStyle] = useState<LearningStyle>(profile?.learningStyle || 'Mixed');
  const [careerAspiration, setCareerAspiration] = useState(profile?.careerAspiration || '');

  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const toggleInterest = (item: string) => {
    if (interests.includes(item)) {
      setInterests(interests.filter(i => i !== item));
    } else {
      setInterests([...interests, item]);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await updateProfile({
      fullName,
      interests,
      careerGoal,
      skillLevel,
      learningStyle,
      careerAspiration,
    });
    setSaving(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#f4f8f7] py-10 px-4 sm:px-6 lg:px-8 selection:bg-[#007f70] selection:text-white">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#e2ece9]">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#007f70] flex items-center justify-center text-white text-2xl font-black shadow-sm">
              {fullName ? fullName.charAt(0).toUpperCase() : 'U'}
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#142a2b]">{fullName || 'Learner Profile'}</h1>
              <p className="text-[#647878] text-xs sm:text-sm font-mono mt-0.5">{email}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#647878] bg-white px-3 py-1.5 rounded-full border border-[#e2ece9] shadow-sm">
              Mode: {isDemoMode ? 'Demo / Local' : 'Supabase Cloud Sync'}
            </span>
          </div>
        </div>

        {/* Success Alert */}
        {savedSuccess && (
          <div className="p-4 rounded-xl bg-[#e6f3f0] border border-[#cde4df] text-[#007f70] text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#007f70] flex-shrink-0" />
            <span>Profile and AI preferences updated successfully!</span>
          </div>
        )}

        {/* Edit Form */}
        <form onSubmit={handleSave} className="framer-card p-6 sm:p-10 bg-white space-y-8">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-[#647878] uppercase tracking-wider mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#f4f8f7] border border-[#e2ece9] rounded-xl text-[#142a2b] placeholder-[#9abfb6] text-sm focus:outline-none focus:border-[#007f70] transition"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#647878] uppercase tracking-wider mb-2">
                Email (Account Primary)
              </label>
              <input
                type="email"
                value={email}
                disabled
                className="w-full px-4 py-2.5 bg-[#f4f8f7]/60 border border-[#e2ece9] rounded-xl text-[#647878] text-sm cursor-not-allowed"
              />
            </div>
          </div>

          {/* Interests */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-[#647878] uppercase tracking-wider">
                Technical Interests
              </label>
              <span className="text-xs text-[#007f70] font-semibold">{interests.length} selected</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {ALL_INTERESTS.map((item) => {
                const isChecked = interests.includes(item);
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleInterest(item)}
                    className={`px-3 py-2 rounded-xl text-xs font-medium border text-left transition flex items-center justify-between ${
                      isChecked
                        ? 'bg-[#e6f3f0] border-[#cde4df] text-[#007f70] font-semibold shadow-sm'
                        : 'bg-[#f4f8f7] border-[#e2ece9] text-[#142a2b] hover:bg-[#eef5f3]'
                    }`}
                  >
                    <span>{item}</span>
                    {isChecked && <Check className="w-3.5 h-3.5 text-[#007f70]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Goal & Level & Style Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-semibold text-[#647878] uppercase tracking-wider mb-2">
                Career Goal
              </label>
              <select
                value={careerGoal}
                onChange={(e) => setCareerGoal(e.target.value as CareerGoal)}
                className="w-full px-3 py-2.5 bg-[#f4f8f7] border border-[#e2ece9] rounded-xl text-[#142a2b] text-xs focus:outline-none focus:border-[#007f70]"
              >
                <option value="Job">Full-Time Job</option>
                <option value="Internship">Internship</option>
                <option value="Freelancing">Freelancing</option>
                <option value="Career Switch">Career Switch</option>
                <option value="Entrepreneurship">Entrepreneurship</option>
                <option value="Upskilling">Upskilling</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#647878] uppercase tracking-wider mb-2">
                Skill Level
              </label>
              <select
                value={skillLevel}
                onChange={(e) => setSkillLevel(e.target.value as SkillLevel)}
                className="w-full px-3 py-2.5 bg-[#f4f8f7] border border-[#e2ece9] rounded-xl text-[#142a2b] text-xs focus:outline-none focus:border-[#007f70]"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#647878] uppercase tracking-wider mb-2">
                Learning Style
              </label>
              <select
                value={learningStyle}
                onChange={(e) => setLearningStyle(e.target.value as LearningStyle)}
                className="w-full px-3 py-2.5 bg-[#f4f8f7] border border-[#e2ece9] rounded-xl text-[#142a2b] text-xs focus:outline-none focus:border-[#007f70]"
              >
                <option value="Video">Video</option>
                <option value="Reading">Reading</option>
                <option value="Practice">Practice</option>
                <option value="Mixed">Mixed</option>
              </select>
            </div>
          </div>

          {/* Career Aspiration */}
          <div>
            <label className="block text-xs font-semibold text-[#647878] uppercase tracking-wider mb-2">
              Career Aspiration Statement
            </label>
            <textarea
              rows={3}
              value={careerAspiration}
              onChange={(e) => setCareerAspiration(e.target.value)}
              className="w-full p-3.5 bg-[#f4f8f7] border border-[#e2ece9] rounded-xl text-[#142a2b] placeholder-[#9abfb6] text-sm focus:outline-none focus:border-[#007f70]"
            />
          </div>

          {/* Submit */}
          <div className="pt-4 border-t border-[#e2ece9] flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold text-white bg-[#007f70] hover:bg-[#00665a] shadow-sm transition disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving changes...' : 'Save Profile Changes'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
