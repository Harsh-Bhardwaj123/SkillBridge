import { Recommendation, SkillLevel, CareerGoal, LearningStyle } from '../types';
import { COURSES_DATA } from '../data/coursesData';

export interface RecommendParams {
  interests: string[];
  careerGoal: CareerGoal;
  skillLevel: SkillLevel;
  learningStyle: LearningStyle;
  careerAspiration: string;
}

export async function fetchSkillRecommendations(params: RecommendParams): Promise<Recommendation[]> {
  try {
    const response = await fetch('/api/recommend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data.recommendations) && data.recommendations.length > 0) {
        // Map course IDs to recommendations where possible
        return data.recommendations.map((rec: Recommendation) => {
          const matchedCourse = COURSES_DATA.find(c =>
            c.title.toLowerCase().includes(rec.skill.toLowerCase()) ||
            rec.skill.toLowerCase().includes(c.title.toLowerCase())
          );
          return {
            ...rec,
            skillId: matchedCourse ? matchedCourse.id : 'python-data-science',
          };
        });
      }
    }
  } catch (err) {
    console.warn('[AI Service] Backend API call failed, using client-side intelligent fallback engine:', err);
  }

  // Client-side intelligent fallback recommendations
  return generateClientFallbackRecommendations(params);
}

function generateClientFallbackRecommendations(params: RecommendParams): Recommendation[] {
  const { interests = [], careerGoal, skillLevel, careerAspiration = '' } = params;
  const userInterests = interests.map(i => i.toLowerCase());
  const aspiration = careerAspiration.toLowerCase();

  const candidates: Array<{
    courseId: string;
    skill: string;
    keywords: string[];
    baseScore: number;
    difficulty: SkillLevel;
    estimatedDuration: string;
    reason: string;
    careerRelevance: string;
  }> = [
    {
      courseId: 'python-data-science',
      skill: 'Python for Data Science',
      keywords: ['data science', 'python', 'ai & machine learning', 'business', 'finance'],
      baseScore: 95,
      difficulty: 'Beginner',
      estimatedDuration: '6 Weeks (40 Hours)',
      reason: `Your interest in data analysis and goal of ${careerGoal} strongly align with Python's dominance across modern data analysis and statistical computing.`,
      careerRelevance: 'Aligned with Govt of India NSQF Level 6 & MeitY FutureSkills Prime + Global O*NET (15-2051.00) Data Science standards.'
    },
    {
      courseId: 'fullstack-web-dev',
      skill: 'Full Stack Web Development',
      keywords: ['programming', 'web development', 'ui/ux', 'freelancing', 'entrepreneurship'],
      baseScore: 92,
      difficulty: 'Intermediate',
      estimatedDuration: '8 Weeks (60 Hours)',
      reason: `Full-stack engineering empowers you to construct complete SaaS products from front to back, ideal for ${careerGoal}.`,
      careerRelevance: 'Standardized under National Career Service (NCS) & NASSCOM Qualification Pack + U.S. O*NET (15-1254.00) Web Architecture.'
    },
    {
      courseId: 'ai-deep-learning',
      skill: 'Artificial Intelligence & Deep Learning',
      keywords: ['ai & machine learning', 'programming', 'data science', 'upskilling'],
      baseScore: 90,
      difficulty: 'Intermediate',
      estimatedDuration: '7 Weeks (50 Hours)',
      reason: `Cutting-edge deep learning, LLMs, and neural architectures match your technical interests in building intelligent products.`,
      careerRelevance: 'Calibrated to MeitY IndiaAI Mission standards & European ESCO AI Engineer competency models.'
    },
    {
      courseId: 'cloud-devops',
      skill: 'Cloud Computing & DevOps',
      keywords: ['cloud computing', 'cybersecurity', 'programming', 'job'],
      baseScore: 88,
      difficulty: 'Intermediate',
      estimatedDuration: '6 Weeks (45 Hours)',
      reason: `Modern software systems demand automated container orchestration and cloud resilience to sustain high traffic.`,
      careerRelevance: 'Complies with NSQF Level 7 Cloud Architect qualifications & Global O*NET (15-1252.00) Cloud Infrastructure Systems.'
    },
    {
      courseId: 'cybersecurity',
      skill: 'Cybersecurity Fundamentals & Defense',
      keywords: ['cybersecurity', 'cloud computing', 'programming'],
      baseScore: 86,
      difficulty: 'Beginner',
      estimatedDuration: '5 Weeks (35 Hours)',
      reason: `Critical organizational defense skills against vulnerabilities, network exploits, and unauthorized data breaches.`,
      careerRelevance: 'Aligned with CERT-In Information Security Awareness & U.S. NIST NICE Cybersecurity Workforce Framework.'
    },
    {
      courseId: 'ui-ux-design',
      skill: 'UI/UX Design & Product Strategy',
      keywords: ['ui/ux', 'web development', 'digital marketing', 'freelancing'],
      baseScore: 89,
      difficulty: 'Beginner',
      estimatedDuration: '5 Weeks (30 Hours)',
      reason: `Transforming complex software capabilities into intuitive, elegant human experiences bridges user empathy with business goals.`,
      careerRelevance: 'Directly matched to National Classification of Occupations (NCO) & Global O*NET (27-1024.00) Digital Product Interface Design.'
    }
  ];

  const scored = candidates.map(c => {
    let matchBonus = 0;
    c.keywords.forEach(kw => {
      if (userInterests.some(ui => ui.includes(kw) || kw.includes(ui))) {
        matchBonus += 3;
      }
      if (aspiration.includes(kw)) {
        matchBonus += 2;
      }
    });

    if (c.difficulty === skillLevel) {
      matchBonus += 2;
    }

    const finalScore = Math.min(99, Math.max(76, c.baseScore + matchBonus));
    return {
      skill: c.skill,
      matchScore: finalScore,
      reason: c.reason,
      careerRelevance: c.careerRelevance,
      difficulty: c.difficulty,
      estimatedDuration: c.estimatedDuration,
      skillId: c.courseId,
    };
  });

  scored.sort((a, b) => b.matchScore - a.matchScore);
  return scored.slice(0, 4);
}
