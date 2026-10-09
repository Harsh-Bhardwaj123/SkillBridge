import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Interface for recommendation request
interface RecommendRequest {
  interests: string[];
  careerGoal: string;
  skillLevel: string;
  learningStyle: string;
  careerAspiration: string;
}

interface SkillRecommendation {
  id?: string;
  skill: string;
  matchScore: number;
  reason: string;
  careerRelevance: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedDuration: string;
}

// Fallback intelligent recommendation engine
function generateFallbackRecommendations(data: RecommendRequest): SkillRecommendation[] {
  const { interests = [], careerGoal = 'Job', skillLevel = 'Beginner', careerAspiration = '' } = data;
  const userInterests = Array.isArray(interests) ? interests.map(i => i.toLowerCase()) : [];
  const aspiration = (careerAspiration || '').toLowerCase();

  const catalog: Array<{
    skill: string;
    slug: string;
    keywords: string[];
    baseScore: number;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    estimatedDuration: string;
    reasonTemplate: (goal: string) => string;
    careerRelevanceTemplate: (goal: string) => string;
  }> = [
    {
      skill: 'Python for Data Science',
      slug: 'python-data-science',
      keywords: ['data science', 'python', 'ai & machine learning', 'business', 'finance'],
      baseScore: 94,
      difficulty: 'Beginner',
      estimatedDuration: '6 Weeks (40 Hours)',
      reasonTemplate: (goal) => `Your interest in data analysis and goal for ${goal} strongly aligns with Python's industry dominance in analytics and machine learning libraries.`,
      careerRelevanceTemplate: () => 'Aligned with Govt of India NSQF Level 6 & MeitY FutureSkills Prime + Global O*NET (15-2051.00) Data Science occupational standards.'
    },
    {
      skill: 'Full Stack Web Development',
      slug: 'fullstack-web-dev',
      keywords: ['programming', 'web development', 'ui/ux', 'freelancing', 'entrepreneurship'],
      baseScore: 91,
      difficulty: 'Intermediate',
      estimatedDuration: '8 Weeks (60 Hours)',
      reasonTemplate: (goal) => `Full-stack development empowers you to build scalable applications from scratch, matching your objective for ${goal}.`,
      careerRelevanceTemplate: () => 'Standardized under National Career Service (NCS) & NASSCOM Qualification Pack + U.S. O*NET (15-1254.00) Web & Digital Interface Architects.'
    },
    {
      skill: 'Artificial Intelligence & Deep Learning',
      slug: 'ai-deep-learning',
      keywords: ['ai & machine learning', 'programming', 'data science', 'upskilling'],
      baseScore: 89,
      difficulty: 'Intermediate',
      estimatedDuration: '7 Weeks (50 Hours)',
      reasonTemplate: () => 'With modern LLMs and neural architectures transforming tech, this path gives you cutting-edge generative AI and deep learning capabilities.',
      careerRelevanceTemplate: () => 'Calibrated to MeitY IndiaAI Mission standards & European ESCO AI Engineer competency models.'
    },
    {
      skill: 'Cloud Computing & DevOps',
      slug: 'cloud-devops',
      keywords: ['cloud computing', 'cybersecurity', 'programming', 'job'],
      baseScore: 87,
      difficulty: 'Intermediate',
      estimatedDuration: '6 Weeks (45 Hours)',
      reasonTemplate: (goal) => `Cloud infrastructure and CI/CD pipelines are the backbone of modern software reliability, perfectly positioned for your ${goal} target.`,
      careerRelevanceTemplate: () => 'Complies with NSQF Level 7 Cloud Architect qualifications & Global O*NET (15-1252.00) Cloud Infrastructure Systems.'
    },
    {
      skill: 'Cybersecurity Fundamentals & Defense',
      slug: 'cybersecurity',
      keywords: ['cybersecurity', 'cloud computing', 'programming'],
      baseScore: 85,
      difficulty: 'Beginner',
      estimatedDuration: '5 Weeks (35 Hours)',
      reasonTemplate: () => 'Cyber threats and enterprise data governance require rigorous security practices, aligning with your defensive computing interest.',
      careerRelevanceTemplate: () => 'Aligned with CERT-In Information Security Awareness & U.S. NIST NICE Cybersecurity Workforce Framework.'
    },
    {
      skill: 'UI/UX Design & Product Strategy',
      slug: 'ui-ux-design',
      keywords: ['ui/ux', 'web development', 'digital marketing', 'freelancing'],
      baseScore: 88,
      difficulty: 'Beginner',
      estimatedDuration: '5 Weeks (30 Hours)',
      reasonTemplate: () => 'Designing intuitive user interfaces and human-centered user experiences bridges tech functionality with customer engagement.',
      careerRelevanceTemplate: () => 'Directly matched to National Classification of Occupations (NCO) & Global O*NET (27-1024.00) Graphic & User Interface Design.'
    }
  ];

  // Score each skill
  const scored = catalog.map(item => {
    let matchCount = 0;
    item.keywords.forEach(kw => {
      if (userInterests.some(ui => ui.includes(kw) || kw.includes(ui))) {
        matchCount++;
      }
      if (aspiration.includes(kw)) {
        matchCount += 1.5;
      }
    });

    const calculatedScore = Math.min(98, Math.max(74, Math.round(item.baseScore + (matchCount * 4) + (skillLevel === item.difficulty ? 3 : 0))));

    return {
      skill: item.skill,
      matchScore: calculatedScore,
      reason: item.reasonTemplate(careerGoal),
      careerRelevance: item.careerRelevanceTemplate(careerGoal),
      difficulty: item.difficulty,
      estimatedDuration: item.estimatedDuration,
    };
  });

  // Sort descending and take top 4
  scored.sort((a, b) => b.matchScore - a.matchScore);
  return scored.slice(0, 4);
}

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    geminiConfigured: !!process.env.GEMINI_API_KEY,
    timestamp: new Date().toISOString()
  });
});

// AI recommendation endpoint
app.post('/api/recommend', async (req: Request, res: Response) => {
  try {
    const { interests, careerGoal, skillLevel, learningStyle, careerAspiration }: RecommendRequest = req.body;

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey.trim() === '' || apiKey === 'your_gemini_api_key_here') {
      console.log('[SkillBridge AI] GEMINI_API_KEY not configured. Generating intelligent fallback recommendations.');
      const fallback = generateFallbackRecommendations({ interests, careerGoal, skillLevel, learningStyle, careerAspiration });
      return res.json({ recommendations: fallback, source: 'intelligent-engine' });
    }

    try {
      console.log('[SkillBridge AI] Requesting recommendations from Google Gemini API...');
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const prompt = `
You are the AI Academic & Career Advisor for "SkillBridge", an intelligent skill learning platform.
Ground your career relevance recommendations in recognized occupational standards:
- India: National Skills Qualification Framework (NSQF - MSDE), FutureSkills Prime (MeitY/NASSCOM), National Career Service (NCS).
- International: U.S. Department of Labor O*NET (Occupational Information Network) & European ESCO models.

Analyze this user profile:
- Interests: ${Array.isArray(interests) ? interests.join(', ') : interests}
- Career Goal: ${careerGoal}
- Current Skill Level: ${skillLevel}
- Preferred Learning Style: ${learningStyle}
- Career Aspiration: "${careerAspiration || 'Explore high-demand career skills'}"

Task:
Recommend exactly 3 to 4 high-value technical skills from our core catalog:
- Python for Data Science
- Full Stack Web Development
- Artificial Intelligence & Deep Learning
- Cloud Computing & DevOps
- Cybersecurity Fundamentals & Defense
- UI/UX Design & Product Strategy

You MUST return a STRICT JSON object in this exact schema with no surrounding Markdown code fence ticks (or strictly valid JSON inside \`\`\`json):
{
  "recommendations": [
    {
      "skill": "exact skill title",
      "matchScore": number between 75 and 99,
      "reason": "Clear explanation of why this skill fits their interests and aspirations",
      "careerRelevance": "Specific jobs and real-world market relevance referencing Indian (NSQF/MeitY) and International (O*NET) labor standards",
      "difficulty": "Beginner" | "Intermediate" | "Advanced",
      "estimatedDuration": "X Weeks (Y Hours)"
    }
  ]
}
`;

      const result = await model.generateContent(prompt);
      const responseText = result.response.text();

      // Clean markdown code blocks if present
      const cleanJson = responseText
        .replace(/^```json\s*/i, '')
        .replace(/^```\s*/i, '')
        .replace(/\s*```$/, '')
        .trim();

      const parsed = JSON.parse(cleanJson);

      if (parsed && Array.isArray(parsed.recommendations) && parsed.recommendations.length > 0) {
        return res.json({ recommendations: parsed.recommendations, source: 'gemini' });
      } else {
        throw new Error('Gemini returned empty or invalid recommendations structure.');
      }
    } catch (geminiError: any) {
      console.warn('[SkillBridge AI] Gemini API call failed or timed out:', geminiError.message);
      console.log('[SkillBridge AI] Using robust fallback recommendations engine.');
      const fallback = generateFallbackRecommendations({ interests, careerGoal, skillLevel, learningStyle, careerAspiration });
      return res.json({ recommendations: fallback, source: 'intelligent-engine-fallback' });
    }
  } catch (error: any) {
    console.error('[SkillBridge AI] Server error handling recommendation:', error);
    res.status(500).json({
      error: 'Failed to generate recommendations',
      message: error.message
    });
  }
});

app.listen(port, () => {
  console.log(`🚀 SkillBridge Backend running on http://localhost:${port}`);
  console.log(`AI Status: ${process.env.GEMINI_API_KEY ? 'Gemini API Connected' : 'Fallback Engine Ready (Demo Mode)'}`);
});
