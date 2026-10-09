import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useLearning } from '../context/LearningContext';
import { 
  BookOpen, 
  Clock, 
  CheckCircle2, 
  Circle, 
  Briefcase, 
  ExternalLink, 
  Play, 
  CheckSquare,
  Sparkles,
  Lock,
  ChevronRight
} from 'lucide-react';

export const SkillDetailsPage: React.FC = () => {
  const { skillId } = useParams<{ skillId: string }>();
  const { 
    courses, 
    completedLessonIds, 
    toggleLessonCompletion, 
    getCourseProgress, 
    enrollInCourse,
    enrolledCourseIds
  } = useLearning();
  const navigate = useNavigate();

  const course = courses.find(c => c.id === skillId) || courses[0];
  const progress = getCourseProgress(course.id);
  const isEnrolled = enrolledCourseIds.includes(course.id);

  const handleEnrollAndStart = () => {
    enrollInCourse(course.id);
    navigate(`/learn/${course.id}`);
  };

  return (
    <div className="min-h-screen bg-[#f4f8f7] text-[#142a2b] py-10 px-4 sm:px-6 lg:px-8 selection:bg-[#007f70] selection:text-white">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header (Framer exact title & eyebrow) */}
        <div className="space-y-3 pb-4 border-b border-[#e2ece9]">
          <div className="flex items-center justify-between">
            <span className="framer-eyebrow">YOUR ROADMAP</span>
            <span className="framer-pill">
              {progress.percentage}% complete · {progress.completedLessons} / {progress.totalLessons} lessons
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#142a2b]">
            Your learning roadmap.
          </h1>

          <p className="text-sm sm:text-base text-[#647878] max-w-2xl">
            {course.title} · {course.difficulty} path · {course.duration}
          </p>
        </div>

        {/* Course Summary Card */}
        <div className="framer-card p-6 sm:p-8 bg-white space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#007f70] uppercase tracking-wider">
                {course.category}
              </span>
              <h2 className="text-2xl font-bold text-[#142a2b]">{course.title}</h2>
              <p className="text-sm text-[#647878] leading-relaxed max-w-xl">
                {course.description}
              </p>
            </div>

            <button
              onClick={handleEnrollAndStart}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-semibold text-white bg-[#007f70] hover:bg-[#00665a] transition shadow-sm whitespace-nowrap self-start sm:self-auto"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>{isEnrolled ? 'Continue Interactive Learning' : 'Start Learning Path'}</span>
            </button>
          </div>

          {/* Progress bar */}
          <div className="space-y-2 pt-2 border-t border-[#e2ece9]">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-[#647878]">Roadmap Completion</span>
              <span className="text-[#007f70]">{progress.percentage}%</span>
            </div>
            <div className="w-full h-2 bg-[#e6f3f0] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#007f70] rounded-full transition-all duration-300"
                style={{ width: `${progress.percentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* 5-MODULE ROADMAP ITEMS (Framer Stepper Style) */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-[#142a2b] uppercase tracking-wider">
            Curriculum Milestones
          </h3>

          <div className="space-y-4">
            {course.modules.map((module, idx) => {
              const moduleLessonsCompleted = module.lessons.filter(l => completedLessonIds.includes(l.id)).length;
              const isModuleComplete = moduleLessonsCompleted === module.lessons.length && module.lessons.length > 0;
              const isInProgress = moduleLessonsCompleted > 0 && !isModuleComplete;

              return (
                <div 
                  key={module.id}
                  className="framer-card p-6 bg-white space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#e2ece9]">
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-mono font-bold text-[#007f70]">
                        0{module.orderNumber}
                      </span>
                      <div>
                        <h4 className="text-lg font-bold text-[#142a2b]">{module.title}</h4>
                        <p className="text-xs text-[#647878]">{module.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      {isModuleComplete ? (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#e6f3f0] text-[#007f70] border border-[#cde4df] flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Complete
                        </span>
                      ) : isInProgress ? (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#fef7ee] text-[#b45309] border border-[#fde68a]">
                          In progress
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#f4f8f7] text-[#647878] border border-[#e2ece9]">
                          Upcoming
                        </span>
                      )}

                      {module.quiz && (
                        <Link
                          to={`/quiz/${module.quiz.id}`}
                          className="px-3.5 py-1 rounded-full text-xs font-semibold bg-[#f4f8f7] hover:bg-[#eef5f3] text-[#142a2b] border border-[#e2ece9] transition flex items-center gap-1"
                        >
                          <CheckSquare className="w-3.5 h-3.5 text-[#007f70]" />
                          <span>Quiz</span>
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Module Lessons */}
                  <div className="space-y-2">
                    {module.lessons.map((lesson) => {
                      const isCompleted = completedLessonIds.includes(lesson.id);

                      return (
                        <div
                          key={lesson.id}
                          className="flex items-center justify-between p-3 rounded-2xl bg-[#f4f8f7] border border-[#e2ece9] text-xs transition"
                        >
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => toggleLessonCompletion(lesson.id)}
                              className="text-[#647878] hover:text-[#007f70] transition"
                            >
                              {isCompleted ? (
                                <CheckCircle2 className="w-4 h-4 text-[#007f70]" />
                              ) : (
                                <Circle className="w-4 h-4 text-[#cde4df]" />
                              )}
                            </button>

                            <span className={`font-semibold ${isCompleted ? 'line-through text-[#647878]' : 'text-[#142a2b]'}`}>
                              {lesson.title}
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="text-[#647878] font-mono">{lesson.duration}</span>
                            <a
                              href={lesson.resourceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#007f70] hover:underline flex items-center gap-1 font-semibold"
                            >
                              <span>Resource</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
