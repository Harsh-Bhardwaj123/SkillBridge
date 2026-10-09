import React, { createContext, useContext, useState, useEffect } from 'react';
import { Course, Certificate, QuizAttempt, LessonProgress } from '../types';
import { COURSES_DATA } from '../data/coursesData';
import { useAuth } from './AuthContext';
import { supabase, isSupabaseConfigured } from '../services/supabase';

interface LearningContextType {
  courses: Course[];
  enrolledCourseIds: string[];
  completedLessonIds: string[];
  quizAttempts: Record<string, QuizAttempt>;
  certificates: Certificate[];
  enrollInCourse: (courseId: string) => void;
  toggleLessonCompletion: (lessonId: string) => void;
  recordQuizAttempt: (quizId: string, score: number, totalQuestions: number, userAnswers: number[]) => QuizAttempt;
  getCourseProgress: (courseId: string) => {
    percentage: number;
    completedLessons: number;
    totalLessons: number;
    passedQuizzes: number;
    totalQuizzes: number;
    isCompleted: boolean;
  };
  claimCertificate: (courseId: string) => Certificate;
  getCertificateById: (certificateId: string) => Certificate | undefined;
  getCertificateByCourse: (courseId: string) => Certificate | undefined;
}

const LearningContext = createContext<LearningContextType | undefined>(undefined);

export const LearningProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [courses] = useState<Course[]>(COURSES_DATA);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>(['python-data-science']);
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(['pds-l1-1', 'pds-l1-2']);
  const [quizAttempts, setQuizAttempts] = useState<Record<string, QuizAttempt>>({});
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  // Load from local storage on mount / user change
  useEffect(() => {
    if (!user) return;
    const storagePrefix = `skillbridge_${user.id}_`;
    
    const savedEnrolled = localStorage.getItem(`${storagePrefix}enrolled`);
    if (savedEnrolled) {
      setEnrolledCourseIds(JSON.parse(savedEnrolled));
    } else {
      // Default initial course
      setEnrolledCourseIds(['python-data-science']);
    }

    const savedCompleted = localStorage.getItem(`${storagePrefix}completed_lessons`);
    if (savedCompleted) {
      setCompletedLessonIds(JSON.parse(savedCompleted));
    }

    const savedQuizzes = localStorage.getItem(`${storagePrefix}quiz_attempts`);
    if (savedQuizzes) {
      setQuizAttempts(JSON.parse(savedQuizzes));
    }

    const savedCerts = localStorage.getItem(`${storagePrefix}certificates`);
    if (savedCerts) {
      setCertificates(JSON.parse(savedCerts));
    }

    // If Supabase is connected, attempt sync
    if (isSupabaseConfigured && supabase) {
      fetchSupabaseProgress(user.id);
    }
  }, [user]);

  const fetchSupabaseProgress = async (userId: string) => {
    if (!supabase) return;
    try {
      const { data: lessonData } = await supabase
        .from('lesson_progress')
        .select('lesson_id, completed')
        .eq('user_id', userId)
        .eq('completed', true);

      if (lessonData && lessonData.length > 0) {
        setCompletedLessonIds(lessonData.map(l => l.lesson_id));
      }

      const { data: certData } = await supabase
        .from('certificates')
        .select('*')
        .eq('user_id', userId);

      if (certData && certData.length > 0) {
        setCertificates(certData.map(c => ({
          id: c.id,
          certificateId: c.certificate_id,
          userId: c.user_id,
          courseId: c.course_id,
          skillName: c.skill_name,
          learnerName: c.learner_name,
          completionDate: c.completion_date,
          scorePercentage: c.score_percentage,
        })));
      }
    } catch (err) {
      console.warn('Could not sync with Supabase progress tables:', err);
    }
  };

  const persistToStorage = (key: string, data: any) => {
    if (!user) return;
    localStorage.setItem(`skillbridge_${user.id}_${key}`, JSON.stringify(data));
  };

  const enrollInCourse = (courseId: string) => {
    if (!enrolledCourseIds.includes(courseId)) {
      const updated = [...enrolledCourseIds, courseId];
      setEnrolledCourseIds(updated);
      persistToStorage('enrolled', updated);
    }
  };

  const toggleLessonCompletion = async (lessonId: string) => {
    let updated: string[];
    const isCompleted = completedLessonIds.includes(lessonId);
    if (isCompleted) {
      updated = completedLessonIds.filter(id => id !== lessonId);
    } else {
      updated = [...completedLessonIds, lessonId];
    }
    setCompletedLessonIds(updated);
    persistToStorage('completed_lessons', updated);

    if (isSupabaseConfigured && supabase && user) {
      try {
        await supabase.from('lesson_progress').upsert({
          user_id: user.id,
          lesson_id: lessonId,
          completed: !isCompleted,
          completed_at: !isCompleted ? new Date().toISOString() : null,
        });
      } catch (err) {
        console.warn('Failed to sync lesson progress to Supabase:', err);
      }
    }
  };

  const recordQuizAttempt = (quizId: string, score: number, totalQuestions: number, userAnswers: number[]): QuizAttempt => {
    const percentage = Math.round((score / totalQuestions) * 100);
    const passed = percentage >= 70;
    const attempt: QuizAttempt = {
      id: 'attempt-' + Math.random().toString(36).substring(2, 9),
      quizId,
      userId: user?.id || 'demo-user',
      score,
      totalQuestions,
      percentage,
      passed,
      attemptedAt: new Date().toISOString(),
      userAnswers,
    };

    const updated = { ...quizAttempts, [quizId]: attempt };
    setQuizAttempts(updated);
    persistToStorage('quiz_attempts', updated);

    if (isSupabaseConfigured && supabase && user) {
      supabase.from('quiz_attempts').insert({
        user_id: user.id,
        quiz_id: quizId,
        score,
        total_questions: totalQuestions,
        percentage,
        passed,
        answers: userAnswers,
      }).then();
    }

    return attempt;
  };

  const getCourseProgress = (courseId: string) => {
    const course = courses.find(c => c.id === courseId);
    if (!course) {
      return { percentage: 0, completedLessons: 0, totalLessons: 0, passedQuizzes: 0, totalQuizzes: 0, isCompleted: false };
    }

    const allLessons = course.modules.flatMap(m => m.lessons);
    const totalLessons = allLessons.length;
    const completedLessons = allLessons.filter(l => completedLessonIds.includes(l.id)).length;

    const allQuizzes = course.modules.map(m => m.quiz).filter((q): q is NonNullable<typeof q> => !!q);
    const totalQuizzes = allQuizzes.length;
    const passedQuizzes = allQuizzes.filter(q => quizAttempts[q.id]?.passed).length;

    // Weight: 70% lessons + 30% quizzes
    const lessonWeight = totalLessons > 0 ? (completedLessons / totalLessons) * 70 : 0;
    const quizWeight = totalQuizzes > 0 ? (passedQuizzes / totalQuizzes) * 30 : 30; // if no quizzes, 100% on lessons
    const rawPercentage = Math.round(lessonWeight + quizWeight);
    const percentage = Math.min(100, Math.max(0, rawPercentage));

    // Criteria: >= 70% overall completion AND at least 1 quiz passed
    const isCompleted = percentage >= 70 && (totalQuizzes === 0 || passedQuizzes > 0);

    return {
      percentage,
      completedLessons,
      totalLessons,
      passedQuizzes,
      totalQuizzes,
      isCompleted,
    };
  };

  const claimCertificate = (courseId: string): Certificate => {
    const existing = certificates.find(c => c.courseId === courseId);
    if (existing) return existing;

    const course = courses.find(c => c.id === courseId);
    const courseName = course ? course.title : 'Professional Certification';
    const learnerName = user?.fullName || 'Alex Morgan';

    // Generate unique Certificate ID e.g., SB-2026-A8K9Q
    const randomHex = Math.random().toString(36).substring(2, 7).toUpperCase();
    const certificateId = `SB-2026-${randomHex}`;

    const newCert: Certificate = {
      id: 'cert-' + Math.random().toString(36).substring(2, 9),
      certificateId,
      userId: user?.id || 'demo-user',
      courseId,
      skillName: courseName,
      learnerName,
      completionDate: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      scorePercentage: 92,
    };

    const updated = [...certificates, newCert];
    setCertificates(updated);
    persistToStorage('certificates', updated);

    // Also persist in global verification registry so /verify/:certificateId can always look it up
    const globalCerts = JSON.parse(localStorage.getItem('skillbridge_global_certificates') || '[]');
    globalCerts.push(newCert);
    localStorage.setItem('skillbridge_global_certificates', JSON.stringify(globalCerts));

    if (isSupabaseConfigured && supabase && user) {
      supabase.from('certificates').insert({
        user_id: user.id,
        course_id: courseId,
        skill_name: courseName,
        learner_name: learnerName,
        certificate_id: certificateId,
        score_percentage: newCert.scorePercentage,
      }).then();
    }

    return newCert;
  };

  const getCertificateById = (certificateId: string): Certificate | undefined => {
    // Check user certs first
    const cert = certificates.find(c => c.certificateId.toLowerCase() === certificateId.toLowerCase());
    if (cert) return cert;

    // Check global verification registry in localStorage
    try {
      const globalCerts: Certificate[] = JSON.parse(localStorage.getItem('skillbridge_global_certificates') || '[]');
      const found = globalCerts.find(c => c.certificateId.toLowerCase() === certificateId.toLowerCase());
      if (found) return found;
    } catch (e) {
      // ignore
    }

    // Default sample certificate if ID matches demo format e.g. SB-DEMO-SAMPLE
    if (certificateId.toUpperCase() === 'SB-DEMO-SAMPLE' || certificateId.toUpperCase() === 'SB-2026-X892B') {
      return {
        id: 'cert-sample',
        certificateId: certificateId.toUpperCase(),
        userId: 'demo-user',
        courseId: 'python-data-science',
        skillName: 'Python for Data Science',
        learnerName: 'Alex Morgan',
        completionDate: 'October 15, 2026',
        scorePercentage: 94,
      };
    }

    return undefined;
  };

  const getCertificateByCourse = (courseId: string): Certificate | undefined => {
    return certificates.find(c => c.courseId === courseId);
  };

  return (
    <LearningContext.Provider
      value={{
        courses,
        enrolledCourseIds,
        completedLessonIds,
        quizAttempts,
        certificates,
        enrollInCourse,
        toggleLessonCompletion,
        recordQuizAttempt,
        getCourseProgress,
        claimCertificate,
        getCertificateById,
        getCertificateByCourse,
      }}
    >
      {children}
    </LearningContext.Provider>
  );
};

export const useLearning = () => {
  const context = useContext(LearningContext);
  if (!context) {
    throw new Error('useLearning must be used within a LearningProvider');
  }
  return context;
};
