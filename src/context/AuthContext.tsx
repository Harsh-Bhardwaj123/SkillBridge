import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, CareerGoal, SkillLevel, LearningStyle } from '../types';
import { supabase, isSupabaseConfigured } from '../services/supabase';

interface AuthContextType {
  user: { id: string; email: string; fullName: string } | null;
  profile: UserProfile | null;
  loading: boolean;
  isDemoMode: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (fullName: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  quickDemoLogin: () => void;
  logout: () => Promise<void>;
  updateProfile: (updated: Partial<UserProfile>) => Promise<void>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
}

const DEFAULT_DEMO_USER = {
  id: 'demo-user-123',
  email: 'alex.morgan@example.com',
  fullName: 'Alex Morgan',
};

const DEFAULT_DEMO_PROFILE: UserProfile = {
  id: 'demo-user-123',
  fullName: 'Alex Morgan',
  email: 'alex.morgan@example.com',
  interests: ['Data Science', 'AI & Machine Learning', 'Web Development'],
  careerGoal: 'Job',
  skillLevel: 'Beginner',
  learningStyle: 'Mixed',
  careerAspiration: 'Aspiring Full Stack Data Scientist building intelligent AI applications',
  createdAt: new Date().toISOString(),
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ id: string; email: string; fullName: string } | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(!isSupabaseConfigured);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        if (isSupabaseConfigured && supabase) {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            setUser({
              id: session.user.id,
              email: session.user.email || '',
              fullName: session.user.user_metadata?.full_name || 'Student',
            });
            // Fetch profile
            const { data: profileData } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();

            if (profileData) {
              setProfile({
                id: profileData.id,
                fullName: profileData.full_name,
                email: profileData.email,
                interests: profileData.interests || [],
                careerGoal: profileData.career_goal || 'Job',
                skillLevel: profileData.skill_level || 'Beginner',
                learningStyle: profileData.learning_style || 'Mixed',
                careerAspiration: profileData.career_aspiration || '',
                createdAt: profileData.created_at,
              });
            }
            setIsDemoMode(false);
          } else {
            // Check local storage demo user
            loadLocalDemoUser();
          }
        } else {
          // In demo mode
          setIsDemoMode(true);
          loadLocalDemoUser();
        }
      } catch (err) {
        console.warn('Auth initialization fallback to demo mode:', err);
        setIsDemoMode(true);
        loadLocalDemoUser();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const loadLocalDemoUser = () => {
    const savedUser = localStorage.getItem('skillbridge_user');
    const savedProfile = localStorage.getItem('skillbridge_profile');
    if (savedUser && savedProfile) {
      setUser(JSON.parse(savedUser));
      setProfile(JSON.parse(savedProfile));
    }
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);
    try {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        if (data.user) {
          const userInfo = {
            id: data.user.id,
            email: data.user.email || email,
            fullName: data.user.user_metadata?.full_name || 'Learner',
          };
          setUser(userInfo);

          const { data: profileData } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .single();

          if (profileData) {
            setProfile({
              id: profileData.id,
              fullName: profileData.full_name,
              email: profileData.email,
              interests: profileData.interests || [],
              careerGoal: profileData.career_goal || 'Job',
              skillLevel: profileData.skill_level || 'Beginner',
              learningStyle: profileData.learning_style || 'Mixed',
              careerAspiration: profileData.career_aspiration || '',
              createdAt: profileData.created_at,
            });
          }
          setIsDemoMode(false);
          return { success: true };
        }
      }

      // Demo login
      const demoUser = {
        id: 'user-' + Date.now().toString(36),
        email,
        fullName: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Learner',
      };
      const demoProfile: UserProfile = {
        id: demoUser.id,
        fullName: demoUser.fullName,
        email,
        interests: ['Data Science', 'Web Development'],
        careerGoal: 'Job',
        skillLevel: 'Beginner',
        learningStyle: 'Mixed',
        careerAspiration: 'Build innovative products and launch a software career.',
        createdAt: new Date().toISOString(),
      };
      setUser(demoUser);
      setProfile(demoProfile);
      localStorage.setItem('skillbridge_user', JSON.stringify(demoUser));
      localStorage.setItem('skillbridge_profile', JSON.stringify(demoProfile));
      setIsDemoMode(true);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Login failed' };
    } finally {
      setLoading(false);
    }
  };

  const register = async (fullName: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);
    try {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName },
          },
        });
        if (error) throw error;
        if (data.user) {
          const newUser = { id: data.user.id, email, fullName };
          setUser(newUser);
          const newProfile: UserProfile = {
            id: data.user.id,
            fullName,
            email,
            interests: [],
            careerGoal: 'Job',
            skillLevel: 'Beginner',
            learningStyle: 'Mixed',
            careerAspiration: '',
            createdAt: new Date().toISOString(),
          };
          setProfile(newProfile);

          // Save to supabase profiles
          await supabase.from('profiles').upsert({
            id: data.user.id,
            full_name: fullName,
            email,
            interests: [],
            career_goal: 'Job',
            skill_level: 'Beginner',
            learning_style: 'Mixed',
            career_aspiration: '',
          });

          setIsDemoMode(false);
          return { success: true };
        }
      }

      // Demo registration
      const newDemoUser = {
        id: 'user-' + Math.random().toString(36).substring(2, 9),
        email,
        fullName,
      };
      const newDemoProfile: UserProfile = {
        id: newDemoUser.id,
        fullName,
        email,
        interests: [],
        careerGoal: 'Job',
        skillLevel: 'Beginner',
        learningStyle: 'Mixed',
        careerAspiration: '',
        createdAt: new Date().toISOString(),
      };
      setUser(newDemoUser);
      setProfile(newDemoProfile);
      localStorage.setItem('skillbridge_user', JSON.stringify(newDemoUser));
      localStorage.setItem('skillbridge_profile', JSON.stringify(newDemoProfile));
      setIsDemoMode(true);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Registration failed' };
    } finally {
      setLoading(false);
    }
  };

  const quickDemoLogin = () => {
    setUser(DEFAULT_DEMO_USER);
    setProfile(DEFAULT_DEMO_PROFILE);
    localStorage.setItem('skillbridge_user', JSON.stringify(DEFAULT_DEMO_USER));
    localStorage.setItem('skillbridge_profile', JSON.stringify(DEFAULT_DEMO_PROFILE));
    setIsDemoMode(true);
  };

  const logout = async () => {
    try {
      if (isSupabaseConfigured && supabase) {
        await supabase.auth.signOut();
      }
    } catch (err) {
      console.warn('Sign out error:', err);
    }
    setUser(null);
    setProfile(null);
    localStorage.removeItem('skillbridge_user');
    localStorage.removeItem('skillbridge_profile');
  };

  const updateProfile = async (updated: Partial<UserProfile>) => {
    if (!profile) return;
    const newProfile = { ...profile, ...updated };
    setProfile(newProfile);
    localStorage.setItem('skillbridge_profile', JSON.stringify(newProfile));

    if (isSupabaseConfigured && supabase && user) {
      try {
        await supabase.from('profiles').upsert({
          id: user.id,
          full_name: newProfile.fullName,
          email: newProfile.email,
          interests: newProfile.interests,
          career_goal: newProfile.careerGoal,
          skill_level: newProfile.skillLevel,
          learning_style: newProfile.learningStyle,
          career_aspiration: newProfile.careerAspiration,
          updated_at: new Date().toISOString(),
        });
      } catch (err) {
        console.error('Failed to sync profile to Supabase:', err);
      }
    }
  };

  const resetPassword = async (email: string): Promise<{ success: boolean; error?: string }> => {
    try {
      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        isDemoMode,
        login,
        register,
        quickDemoLogin,
        logout,
        updateProfile,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
