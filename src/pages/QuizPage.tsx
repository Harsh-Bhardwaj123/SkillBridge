import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useLearning } from '../context/LearningContext';
import { 
  CheckSquare, 
  CheckCircle2, 
  XCircle, 
  RotateCw, 
  ArrowRight, 
  ArrowLeft, 
  Award, 
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const QuizPage: React.FC = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const { courses, recordQuizAttempt, quizAttempts, claimCertificate } = useLearning();
  const navigate = useNavigate();

  let currentQuiz: any = null;
  let currentCourse: any = null;

  for (const course of courses) {
    for (const module of course.modules) {
      if (module.quiz && module.quiz.id === quizId) {
        currentQuiz = module.quiz;
        currentCourse = course;
        break;
      }
    }
    if (currentQuiz) break;
  }

  if (!currentQuiz) {
    const firstCourse = courses[0];
    currentQuiz = firstCourse.modules[0].quiz;
    currentCourse = firstCourse;
  }

  const existingAttempt = quizAttempts[currentQuiz.id];

  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState<boolean>(!!existingAttempt);
  const [latestAttempt, setLatestAttempt] = useState<any>(existingAttempt || null);

  const handleSelect = (questionIndex: number, optionIndex: number) => {
    if (submitted) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: optionIndex,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.keys(selectedAnswers).length < currentQuiz.questions.length) {
      alert('Please answer all questions before submitting.');
      return;
    }

    let calculatedScore = 0;
    const answersArray: number[] = [];

    currentQuiz.questions.forEach((q: any, idx: number) => {
      const selected = selectedAnswers[idx];
      answersArray.push(selected);
      if (selected === q.correctAnswer) {
        calculatedScore++;
      }
    });

    const attempt = recordQuizAttempt(
      currentQuiz.id,
      calculatedScore,
      currentQuiz.questions.length,
      answersArray
    );

    setLatestAttempt(attempt);
    setSubmitted(true);

    if (attempt.passed) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#007f70', '#142a2b', '#7fc2b9']
      });
    }
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setLatestAttempt(null);
  };

  return (
    <div className="min-h-screen bg-[#f4f8f7] text-[#142a2b] py-10 px-4 sm:px-6 lg:px-8 selection:bg-[#007f70] selection:text-white">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Navigation & Header */}
        <div className="flex items-center justify-between pb-2 border-b border-[#e2ece9]">
          <Link
            to={`/learn/${currentCourse.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#647878] hover:text-[#142a2b] transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Learning Studio</span>
          </Link>

          <span className="framer-pill">
            Passing: {currentQuiz.passingScore}%
          </span>
        </div>

        {/* Framer Header */}
        <div className="framer-card p-6 sm:p-8 bg-white space-y-2">
          <div className="flex items-center gap-2">
            <span className="framer-eyebrow">SKILL CHECK</span>
            <span className="text-xs text-[#647878]">•</span>
            <span className="text-xs text-[#647878]">{currentCourse.title} · Assessment</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-[#142a2b]">
            Test your skills.
          </h1>
          <p className="text-xs sm:text-sm text-[#647878]">
            {currentQuiz.title} · Select the single best answer for each question.
          </p>
        </div>

        {/* Submission Feedback */}
        {submitted && latestAttempt && (
          <div className={`p-6 sm:p-7 rounded-3xl border transition ${
            latestAttempt.passed 
              ? 'bg-[#e6f3f0] border-[#cde4df] text-[#007f70]' 
              : 'bg-[#fff1f2] border-[#fecdd3] text-[#be123c]'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  latestAttempt.passed ? 'bg-white text-[#007f70]' : 'bg-white text-[#be123c]'
                }`}>
                  {latestAttempt.passed ? <CheckCircle2 className="w-7 h-7" /> : <XCircle className="w-7 h-7" />}
                </div>

                <div>
                  <h2 className="text-xl font-bold text-[#142a2b]">
                    {latestAttempt.passed ? 'Assessment Passed! 🎉' : 'Assessment Needs Retake'}
                  </h2>
                  <p className="text-xs text-[#647878] mt-0.5">
                    Score: <span className="font-bold text-[#142a2b]">{latestAttempt.score} / {latestAttempt.totalQuestions}</span> ({latestAttempt.percentage}%)
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleRetry}
                  className="px-4 py-2 rounded-full text-xs font-semibold bg-white border border-[#e2ece9] text-[#142a2b] hover:bg-[#f4f8f7] transition flex items-center gap-1.5"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>Retry Quiz</span>
                </button>

                {latestAttempt.passed && (
                  <Link
                    to="/certificates"
                    onClick={() => claimCertificate(currentCourse.id)}
                    className="px-5 py-2 rounded-full text-xs font-semibold bg-[#007f70] hover:bg-[#00665a] text-white shadow-sm transition flex items-center gap-1.5"
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>View Certificate</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Questions Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {currentQuiz.questions.map((question: any, qIdx: number) => {
            const selectedOption = selectedAnswers[qIdx] ?? latestAttempt?.userAnswers?.[qIdx];
            const isCorrect = selectedOption === question.correctAnswer;

            return (
              <div 
                key={question.id}
                className="framer-card p-6 sm:p-7 bg-white space-y-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold tracking-wider text-[#647878] uppercase font-mono block mb-1">
                      QUESTION {qIdx + 1} OF {currentQuiz.questions.length}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-[#142a2b]">
                      {question.question}
                    </h3>
                  </div>

                  {submitted && (
                    <span className="flex-shrink-0">
                      {isCorrect ? (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#007f70] bg-[#e6f3f0] px-3 py-1 rounded-full border border-[#cde4df]">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#be123c] bg-[#fff1f2] px-3 py-1 rounded-full border border-[#fecdd3]">
                          <XCircle className="w-3.5 h-3.5" /> Incorrect
                        </span>
                      )}
                    </span>
                  )}
                </div>

                {/* Options List */}
                <div className="space-y-2.5">
                  {question.options.map((opt: string, optIdx: number) => {
                    const isChecked = selectedOption === optIdx;
                    const isTheCorrectAnswer = question.correctAnswer === optIdx;

                    let optionStyle = 'bg-[#f4f8f7] border-[#e2ece9] text-[#142a2b] hover:bg-[#eef5f3]';
                    if (submitted) {
                      if (isTheCorrectAnswer) {
                        optionStyle = 'bg-[#e6f3f0] border-[#007f70] text-[#007f70] font-bold';
                      } else if (isChecked && !isCorrect) {
                        optionStyle = 'bg-[#fff1f2] border-[#be123c] text-[#be123c]';
                      }
                    } else if (isChecked) {
                      optionStyle = 'bg-[#e6f3f0] border-[#007f70] text-[#007f70] font-bold shadow-sm';
                    }

                    return (
                      <div
                        key={optIdx}
                        onClick={() => handleSelect(qIdx, optIdx)}
                        className={`p-3.5 rounded-2xl border text-xs sm:text-sm cursor-pointer transition flex items-center justify-between ${optionStyle}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-lg bg-white border border-[#e2ece9] text-[#647878] flex items-center justify-center font-mono text-xs font-bold">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span>{opt}</span>
                        </div>

                        {submitted && isTheCorrectAnswer && (
                          <span className="text-xs text-[#007f70] font-semibold">✓ Correct</span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation */}
                {submitted && (
                  <div className="p-3.5 rounded-2xl bg-[#f4f8f7] border border-[#e2ece9] text-xs text-[#647878] space-y-1">
                    <span className="font-bold text-[#142a2b] block">Explanation:</span>
                    <p className="leading-relaxed">{question.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}

          {!submitted && (
            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-8 py-3.5 rounded-full text-xs font-semibold text-white bg-[#007f70] hover:bg-[#00665a] shadow-sm transition flex items-center gap-2"
              >
                <span>Submit Assessment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </form>

      </div>
    </div>
  );
};
