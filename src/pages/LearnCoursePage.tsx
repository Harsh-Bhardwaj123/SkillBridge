import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLearning } from '../context/LearningContext';
import { 
  BookOpen, 
  CheckCircle2, 
  Circle, 
  ChevronRight, 
  ChevronLeft, 
  ExternalLink, 
  Award, 
  Play, 
  FileText, 
  CheckSquare, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const LearnCoursePage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { courses, completedLessonIds, toggleLessonCompletion, getCourseProgress, claimCertificate } = useLearning();

  const course = courses.find(c => c.id === courseId) || courses[0];
  const allLessons = course.modules.flatMap(m => m.lessons);

  const [activeLessonId, setActiveLessonId] = useState<string>(allLessons[0]?.id || '');
  const activeLesson = allLessons.find(l => l.id === activeLessonId) || allLessons[0];
  const activeModule = course.modules.find(m => m.lessons.some(l => l.id === activeLessonId));

  const progress = getCourseProgress(course.id);
  const isLessonCompleted = completedLessonIds.includes(activeLesson?.id);

  const currentIndex = allLessons.findIndex(l => l.id === activeLesson?.id);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  const handleToggleComplete = () => {
    if (!activeLesson) return;
    toggleLessonCompletion(activeLesson.id);

    if (!isLessonCompleted && progress.percentage >= 65) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#007f70', '#142a2b', '#7fc2b9']
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f8f7] text-[#142a2b] flex flex-col selection:bg-[#007f70] selection:text-white">
      
      {/* Header bar */}
      <header className="bg-white border-b border-[#e2ece9] px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              to={`/skills/${course.id}`}
              className="p-2 rounded-full bg-[#f4f8f7] hover:bg-[#eef5f3] text-[#142a2b] border border-[#e2ece9] transition"
              title="Return to syllabus"
            >
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <div>
              <span className="text-[10px] font-bold text-[#007f70] uppercase tracking-widest block font-mono">
                {course.category}
              </span>
              <h1 className="text-lg sm:text-xl font-bold text-[#142a2b] leading-tight">
                {course.title}
              </h1>
            </div>
          </div>

          {/* Header Progress */}
          <div className="flex items-center gap-4">
            <div className="w-48 sm:w-64 space-y-1">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-[#647878]">Progress</span>
                <span className="text-[#007f70]">{progress.percentage}%</span>
              </div>
              <div className="w-full h-2 bg-[#e6f3f0] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#007f70] rounded-full transition-all duration-300"
                  style={{ width: `${progress.percentage}%` }}
                />
              </div>
            </div>

            {progress.isCompleted && (
              <Link
                to="/certificates"
                onClick={() => claimCertificate(course.id)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-[#007f70] text-white hover:bg-[#00665a] transition shadow-sm"
              >
                <Award className="w-4 h-4 text-white" />
                <span>Claim Certificate</span>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="max-w-7xl mx-auto w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 p-4 sm:p-8">
        
        {/* Left Sidebar: Curriculum Index (4 cols) */}
        <aside className="lg:col-span-4 framer-card bg-white p-5 h-fit max-h-[750px] overflow-y-auto space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#e2ece9]">
            <h2 className="text-xs font-bold text-[#142a2b] uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#007f70]" />
              <span>Curriculum Index</span>
            </h2>
            <span className="text-xs text-[#647878] font-mono">
              {progress.completedLessons}/{progress.totalLessons} Done
            </span>
          </div>

          <div className="space-y-4">
            {course.modules.map((module) => (
              <div key={module.id} className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-[#142a2b] px-1">
                  <span>{module.title}</span>
                  {module.quiz && (
                    <Link
                      to={`/quiz/${module.quiz.id}`}
                      className="text-[10px] text-[#007f70] hover:underline flex items-center gap-0.5"
                    >
                      <span>Quiz</span>
                      <ChevronRight className="w-3 h-3" />
                    </Link>
                  )}
                </div>

                <div className="space-y-1">
                  {module.lessons.map((lesson) => {
                    const isSelected = lesson.id === activeLesson?.id;
                    const isCompleted = completedLessonIds.includes(lesson.id);

                    return (
                      <button
                        key={lesson.id}
                        onClick={() => setActiveLessonId(lesson.id)}
                        className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-medium transition flex items-center justify-between group ${
                          isSelected
                            ? 'bg-[#e6f3f0] text-[#007f70] font-semibold border border-[#cde4df]'
                            : 'text-[#647878] hover:text-[#142a2b] hover:bg-[#f4f8f7]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0 pr-2">
                          {isCompleted ? (
                            <CheckCircle2 className="w-4 h-4 text-[#007f70] flex-shrink-0" />
                          ) : (
                            <Circle className="w-4 h-4 text-[#cde4df] flex-shrink-0 group-hover:text-[#647878]" />
                          )}
                          <span className="truncate">{lesson.title}</span>
                        </div>
                        <span className="text-[10px] text-[#647878] font-mono flex-shrink-0">
                          {lesson.duration}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Right Main Area: Interactive Lesson Reader (8 cols) */}
        <main className="lg:col-span-8 flex flex-col">
          {activeLesson ? (
            <div className="framer-card bg-white p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
              
              <div className="space-y-6">
                <div className="space-y-2 border-b border-[#e2ece9] pb-4">
                  <div className="flex items-center gap-2 text-xs text-[#007f70] font-mono font-semibold">
                    <span>{activeModule?.title}</span>
                    <span>•</span>
                    <span>Lesson {activeLesson.orderNumber}</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold text-[#142a2b]">
                    {activeLesson.title}
                  </h2>

                  <div className="flex items-center gap-4 text-xs text-[#647878] pt-1">
                    <span className="inline-flex items-center gap-1 font-semibold">
                      <FileText className="w-3.5 h-3.5" />
                      <span>{activeLesson.type.toUpperCase()} LESSON</span>
                    </span>
                    <span>•</span>
                    <span>Estimated: {activeLesson.duration}</span>
                  </div>
                </div>

                {/* Lesson Description & Guide */}
                <div className="space-y-4 text-[#647878] text-sm leading-relaxed">
                  <p className="text-base text-[#142a2b] font-medium">
                    {activeLesson.description}
                  </p>

                  <div className="p-4 rounded-2xl bg-[#f4f8f7] border border-[#e2ece9] space-y-2">
                    <h3 className="text-xs font-bold text-[#142a2b] uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#007f70]" />
                      <span>Key Takeaways & Practical Objectives</span>
                    </h3>
                    <ul className="list-disc list-inside space-y-1 text-xs text-[#647878] pl-1">
                      <li>Understand practical implementation patterns and theoretical grounding.</li>
                      <li>Review the official documentation and tutorial resources linked below.</li>
                      <li>Apply the principles to your module knowledge assessment and capstone project.</li>
                    </ul>
                  </div>

                  {/* Resource Card */}
                  <div className="p-4 rounded-2xl bg-[#e6f3f0] border border-[#cde4df] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="text-xs font-bold text-[#142a2b]">Official Learning Resource</h4>
                      <p className="text-xs text-[#647878] mt-0.5">Explore standard specifications and code snippets</p>
                    </div>
                    <a
                      href={activeLesson.resourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-[#007f70] hover:bg-[#00665a] text-white transition self-start sm:self-auto shadow-sm"
                    >
                      <span>Open Learning Resource</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Module Quiz Card */}
                {activeModule?.quiz && (
                  <div className="p-4 rounded-2xl bg-[#f4f8f7] border border-[#e2ece9] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CheckSquare className="w-5 h-5 text-[#007f70]" />
                      <div>
                        <p className="text-xs font-bold text-[#142a2b]">{activeModule.quiz.title}</p>
                        <p className="text-[11px] text-[#647878]">Passing score: 70%+ required for certificate</p>
                      </div>
                    </div>
                    <Link
                      to={`/quiz/${activeModule.quiz.id}`}
                      className="px-4 py-1.5 rounded-full text-xs font-semibold bg-[#142a2b] hover:bg-black text-white transition"
                    >
                      Take Quiz
                    </Link>
                  </div>
                )}
              </div>

              {/* Bottom Actions */}
              <div className="pt-6 border-t border-[#e2ece9] flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  onClick={handleToggleComplete}
                  className={`w-full sm:w-auto px-6 py-2.5 rounded-full text-xs font-semibold transition flex items-center justify-center gap-2 ${
                    isLessonCompleted
                      ? 'bg-[#e6f3f0] text-[#007f70] border border-[#cde4df]'
                      : 'bg-[#142a2b] hover:bg-black text-white'
                  }`}
                >
                  <CheckCircle2 className={`w-4 h-4 ${isLessonCompleted ? 'text-[#007f70]' : 'text-white'}`} />
                  <span>{isLessonCompleted ? 'Marked as Completed ✓' : 'Mark as Complete'}</span>
                </button>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                  {prevLesson && (
                    <button
                      onClick={() => setActiveLessonId(prevLesson.id)}
                      className="px-4 py-2 rounded-full text-xs font-medium text-[#647878] hover:text-[#142a2b] bg-[#f4f8f7] border border-[#e2ece9] transition flex items-center gap-1"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Previous</span>
                    </button>
                  )}

                  {nextLesson && (
                    <button
                      onClick={() => setActiveLessonId(nextLesson.id)}
                      className="px-5 py-2 rounded-full text-xs font-semibold text-white bg-[#007f70] hover:bg-[#00665a] transition shadow-sm flex items-center gap-1.5"
                    >
                      <span>Next Lesson</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

            </div>
          ) : (
            <div className="p-8 text-center text-[#647878]">Select a lesson from the curriculum</div>
          )}
        </main>

      </div>
    </div>
  );
};
