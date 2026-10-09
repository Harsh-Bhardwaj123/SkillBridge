import React from 'react';
import { Link } from 'react-router-dom';
import { useLearning } from '../context/LearningContext';
import { 
  CheckSquare, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ArrowRight, 
  HelpCircle
} from 'lucide-react';

export const AssessmentsPage: React.FC = () => {
  const { courses, quizAttempts } = useLearning();

  const allQuizzes: Array<{
    quiz: any;
    course: any;
    moduleTitle: string;
  }> = [];

  courses.forEach(c => {
    c.modules.forEach(m => {
      if (m.quiz) {
        allQuizzes.push({
          quiz: m.quiz,
          course: c,
          moduleTitle: m.title,
        });
      }
    });
  });

  return (
    <div className="min-h-screen bg-[#f4f8f7] text-[#142a2b] py-10 px-4 sm:px-6 lg:px-8 selection:bg-[#007f70] selection:text-white">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#e2ece9]">
          <div className="space-y-1">
            <span className="framer-eyebrow">SKILL CHECK</span>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#142a2b]">
              Test your skills.
            </h1>
            <p className="text-[#647878] text-sm">
              Assessments calibrated across modular curriculum checkpoints. Passing score: 70%.
            </p>
          </div>

          <span className="framer-pill">
            {Object.keys(quizAttempts).length} / {allQuizzes.length} Completed
          </span>
        </div>

        {/* Quizzes List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {allQuizzes.map(({ quiz, course, moduleTitle }) => {
            const attempt = quizAttempts[quiz.id];

            return (
              <div 
                key={quiz.id}
                className="framer-card p-6 bg-white space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono font-bold text-[#007f70] uppercase">
                      {course.title}
                    </span>

                    {attempt ? (
                      attempt.passed ? (
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#e6f3f0] text-[#007f70] border border-[#cde4df] flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Passed ({attempt.percentage}%)
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#fff1f2] text-[#be123c] border border-[#fecdd3] flex items-center gap-1">
                          <XCircle className="w-3 h-3" /> Retake ({attempt.percentage}%)
                        </span>
                      )
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#f4f8f7] text-[#647878] border border-[#e2ece9]">
                        Not Attempted
                      </span>
                    )}
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-[#142a2b]">{quiz.title}</h2>
                    <p className="text-xs text-[#647878] mt-0.5">{moduleTitle}</p>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-[#647878] pt-1">
                    <div className="flex items-center gap-1">
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>{quiz.questions.length} Questions</span>
                    </div>
                    <span>•</span>
                    <span>Min Score: {quiz.passingScore}%</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#e2ece9] flex items-center justify-between gap-3">
                  <span className="text-xs text-[#647878]">
                    {attempt ? `Attempted: ${new Date(attempt.attemptedAt).toLocaleDateString()}` : 'Estimated: 10 mins'}
                  </span>

                  <Link
                    to={`/quiz/${quiz.id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-[#007f70] hover:bg-[#00665a] text-white transition shadow-sm"
                  >
                    <span>{attempt ? 'Retake Quiz' : 'Start Quiz'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
