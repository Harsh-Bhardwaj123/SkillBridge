export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type CareerGoal = 
  | 'Job'
  | 'Internship'
  | 'Freelancing'
  | 'Career Switch'
  | 'Entrepreneurship'
  | 'Upskilling';

export type LearningStyle = 
  | 'Video'
  | 'Reading'
  | 'Practice'
  | 'Mixed';

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  interests: string[];
  careerGoal: CareerGoal;
  skillLevel: SkillLevel;
  learningStyle: LearningStyle;
  careerAspiration: string;
  createdAt: string;
}

export interface Recommendation {
  skill: string;
  matchScore: number;
  reason: string;
  careerRelevance: string;
  difficulty: SkillLevel;
  estimatedDuration: string;
  skillId?: string;
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  resourceUrl: string;
  duration: string;
  orderNumber: number;
  type: 'video' | 'reading' | 'code';
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  moduleId: string;
  courseId: string;
  title: string;
  passingScore: number; // percentage, e.g. 70
  questions: Question[];
}

export interface Module {
  id: string;
  courseId: string;
  title: string;
  orderNumber: number;
  description: string;
  lessons: Lesson[];
  quiz?: Quiz;
}

export interface Course {
  id: string;
  skillId: string;
  title: string;
  tagline: string;
  description: string;
  difficulty: SkillLevel;
  duration: string;
  category: string;
  modules: Module[];
  careerOpportunities: string[];
  whySuitable: string;
}

export interface LessonProgress {
  lessonId: string;
  completed: boolean;
  completedAt?: string;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  userId: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  passed: boolean;
  attemptedAt: string;
  userAnswers: number[];
}

export interface Certificate {
  id: string;
  certificateId: string; // e.g. SB-2026-X892B
  userId: string;
  courseId: string;
  skillName: string;
  learnerName: string;
  completionDate: string;
  scorePercentage: number;
}
