import { Course } from '../types';

export const COURSES_DATA: Course[] = [
  {
    id: 'python-data-science',
    skillId: 'python-data-science',
    title: 'Python for Data Science',
    tagline: 'Master Python, NumPy, Pandas, Data Visualization, and Machine Learning workflows.',
    description: 'A comprehensive journey into modern data analysis using Python. From core language constructs to manipulating tabular datasets and building predictive insights.',
    difficulty: 'Beginner',
    duration: '6 Weeks (40 Hours)',
    category: 'Data Science & Analytics',
    whySuitable: 'Python is the undisputed gold standard in data science, artificial intelligence, and automated analytics. Learning Python opens direct pathways to high-paying analyst and data engineering roles.',
    careerOpportunities: [
      'Data Scientist',
      'Data Analyst',
      'Machine Learning Engineer',
      'Business Intelligence Specialist',
      'Quantitative Researcher'
    ],
    modules: [
      {
        id: 'pds-m1',
        courseId: 'python-data-science',
        title: 'Module 1 – Python Fundamentals',
        orderNumber: 1,
        description: 'Variables, primitive data types, operators, conditional branches, and iterative loops.',
        lessons: [
          {
            id: 'pds-l1-1',
            moduleId: 'pds-m1',
            title: 'Variables, Expressions, and Built-in Types',
            description: 'Learn how variables store state in memory, working with integers, floats, strings, and boolean values.',
            resourceUrl: 'https://docs.python.org/3/tutorial/introduction.html',
            duration: '25 min',
            orderNumber: 1,
            type: 'reading'
          },
          {
            id: 'pds-l1-2',
            moduleId: 'pds-m1',
            title: 'Control Flow: if-elif-else Statements',
            description: 'Implement conditional branching logic to direct program execution based on logical evaluations.',
            resourceUrl: 'https://realpython.com/python-conditional-statements/',
            duration: '20 min',
            orderNumber: 2,
            type: 'video'
          },
          {
            id: 'pds-l1-3',
            moduleId: 'pds-m1',
            title: 'Loops and Iterators (for, while, range)',
            description: 'Master loop constructs, list comprehensions, break/continue statements, and iterator protocols.',
            resourceUrl: 'https://docs.python.org/3/tutorial/controlflow.html',
            duration: '30 min',
            orderNumber: 3,
            type: 'code'
          }
        ],
        quiz: {
          id: 'quiz-pds-m1',
          moduleId: 'pds-m1',
          courseId: 'python-data-science',
          title: 'Quiz: Python Fundamentals',
          passingScore: 70,
          questions: [
            {
              id: 'q-pds-1',
              question: 'What is the output of the expression: type([1, 2, 3])?',
              options: ['<class "tuple">', '<class "list">', '<class "array">', '<class "dict">'],
              correctAnswer: 1,
              explanation: 'Square brackets denote lists in Python, so type([1, 2, 3]) evaluates to <class "list">.'
            },
            {
              id: 'q-pds-2',
              question: 'Which keyword is used to skip the rest of the current loop iteration and move to the next?',
              options: ['break', 'pass', 'continue', 'return'],
              correctAnswer: 2,
              explanation: 'The continue statement rejects all the remaining statements in the current iteration of the loop and moves the control back to the top.'
            },
            {
              id: 'q-pds-3',
              question: 'What is the result of 2 ** 3 in Python?',
              options: ['6', '8', '9', '5'],
              correctAnswer: 1,
              explanation: 'The double asterisk ** operator in Python represents exponentiation (2 to the power of 3 = 8).'
            }
          ]
        }
      },
      {
        id: 'pds-m2',
        courseId: 'python-data-science',
        title: 'Module 2 – Core Structures & Functions',
        orderNumber: 2,
        description: 'First-class functions, lambda expressions, lists, tuples, sets, and hash dictionaries.',
        lessons: [
          {
            id: 'pds-l2-1',
            moduleId: 'pds-m2',
            title: 'Functions, Arguments, and Return Values',
            description: 'Define reusable functions, handle *args and **kwargs, and structure clean modular routines.',
            resourceUrl: 'https://realpython.com/defining-your-own-python-function/',
            duration: '35 min',
            orderNumber: 1,
            type: 'reading'
          },
          {
            id: 'pds-l2-2',
            moduleId: 'pds-m2',
            title: 'Dictionaries and Set Operations',
            description: 'Harness O(1) hash table lookups, dictionary transformations, and mathematical set unions/intersections.',
            resourceUrl: 'https://docs.python.org/3/tutorial/datastructures.html',
            duration: '30 min',
            orderNumber: 2,
            type: 'code'
          }
        ],
        quiz: {
          id: 'quiz-pds-m2',
          moduleId: 'pds-m2',
          courseId: 'python-data-science',
          title: 'Quiz: Functions & Data Structures',
          passingScore: 70,
          questions: [
            {
              id: 'q-pds-4',
              question: 'Which of the following data structures in Python is immutable?',
              options: ['List', 'Dictionary', 'Set', 'Tuple'],
              correctAnswer: 3,
              explanation: 'Tuples are immutable sequences in Python; their elements cannot be modified once instantiated.'
            },
            {
              id: 'q-pds-5',
              question: 'What does a Python function return by default if no return statement is specified?',
              options: ['0', 'False', 'None', 'undefined'],
              correctAnswer: 2,
              explanation: 'Python functions implicitly return None if no explicit return statement is encountered.'
            }
          ]
        }
      },
      {
        id: 'pds-m3',
        courseId: 'python-data-science',
        title: 'Module 3 – Practical Data Wrangling with NumPy & Pandas',
        orderNumber: 3,
        description: 'Vectorized operations, broadcasting, DataFrames, indexing, filtering, and grouping.',
        lessons: [
          {
            id: 'pds-l3-1',
            moduleId: 'pds-m3',
            title: 'NumPy N-Dimensional Arrays & Vectorization',
            description: 'High-performance numerical computing without explicit for-loops using ndarray slicing and broadcasting.',
            resourceUrl: 'https://numpy.org/doc/stable/user/quickstart.html',
            duration: '40 min',
            orderNumber: 1,
            type: 'video'
          },
          {
            id: 'pds-l3-2',
            moduleId: 'pds-m3',
            title: 'Pandas DataFrames, GroupBy, and Aggregations',
            description: 'Reading CSV/JSON files, querying rows with boolean masks, and aggregating business metrics.',
            resourceUrl: 'https://pandas.pydata.org/docs/getting_started/index.html',
            duration: '45 min',
            orderNumber: 2,
            type: 'code'
          }
        ],
        quiz: {
          id: 'quiz-pds-m3',
          moduleId: 'pds-m3',
          courseId: 'python-data-science',
          title: 'Quiz: NumPy & Pandas',
          passingScore: 70,
          questions: [
            {
              id: 'q-pds-6',
              question: 'In Pandas, which method is used to inspect the first 5 rows of a DataFrame?',
              options: ['df.top(5)', 'df.first(5)', 'df.head(5)', 'df.show(5)'],
              correctAnswer: 2,
              explanation: 'df.head(n) returns the first n rows of the dataset (defaulting to 5).'
            },
            {
              id: 'q-pds-7',
              question: 'What is the primary benefit of NumPy vectorized operations over Python loops?',
              options: ['Lower memory overhead and C-level execution speed', 'Easier syntax only', 'Automatic database storage', 'Web browser compatibility'],
              correctAnswer: 0,
              explanation: 'NumPy executes vector calculations in optimized contiguous memory buffers written in C/Fortran, yielding massive speedups.'
            }
          ]
        }
      },
      {
        id: 'pds-m4',
        courseId: 'python-data-science',
        title: 'Module 4 – Advanced Data Visualization & Insights',
        orderNumber: 4,
        description: 'Exploratory data analysis, Matplotlib charts, Seaborn statistical plots, and interactive dashboards.',
        lessons: [
          {
            id: 'pds-l4-1',
            moduleId: 'pds-m4',
            title: 'Matplotlib & Seaborn Chart Architecture',
            description: 'Crafting publication-grade heatmaps, scatter plots, distributions, and multi-faceted charts.',
            resourceUrl: 'https://seaborn.pydata.org/tutorial.html',
            duration: '35 min',
            orderNumber: 1,
            type: 'video'
          },
          {
            id: 'pds-l4-2',
            moduleId: 'pds-m4',
            title: 'Handling Missing Data & Outliers',
            description: 'Imputation strategies, outlier detection using IQR and z-scores, and categorical encoding.',
            resourceUrl: 'https://scikit-learn.org/stable/modules/impute.html',
            duration: '30 min',
            orderNumber: 2,
            type: 'reading'
          }
        ],
        quiz: {
          id: 'quiz-pds-m4',
          moduleId: 'pds-m4',
          courseId: 'python-data-science',
          title: 'Quiz: Data Visualization & Preprocessing',
          passingScore: 70,
          questions: [
            {
              id: 'q-pds-8',
              question: 'Which plot type in Seaborn is best suited to display correlations across numeric columns?',
              options: ['violinplot', 'heatmap', 'countplot', 'barplot'],
              correctAnswer: 1,
              explanation: 'A heatmap with a correlation matrix (sns.heatmap(df.corr())) is the standard way to inspect pairwise feature relationships.'
            }
          ]
        }
      },
      {
        id: 'pds-m5',
        courseId: 'python-data-science',
        title: 'Module 5 – Capstone Project: End-to-End Analytics',
        orderNumber: 5,
        description: 'Complete hands-on project analyzing real-world customer churn, generating business insights, and packaging results.',
        lessons: [
          {
            id: 'pds-l5-1',
            moduleId: 'pds-m5',
            title: 'Project Setup & Dataset Ingestion',
            description: 'Load real-world sales transactions, clean inconsistent records, and perform exploratory data analysis.',
            resourceUrl: 'https://github.com/topics/data-science-project',
            duration: '45 min',
            orderNumber: 1,
            type: 'code'
          },
          {
            id: 'pds-l5-2',
            moduleId: 'pds-m5',
            title: 'Feature Engineering & Executive Summary Report',
            description: 'Derive customer lifetime value metrics and summarize predictive signals in a professional presentation.',
            resourceUrl: 'https://towardsdatascience.com/',
            duration: '50 min',
            orderNumber: 2,
            type: 'code'
          }
        ],
        quiz: {
          id: 'quiz-pds-m5',
          moduleId: 'pds-m5',
          courseId: 'python-data-science',
          title: 'Quiz: Capstone Project Evaluation',
          passingScore: 70,
          questions: [
            {
              id: 'q-pds-9',
              question: 'Why should training and testing data splits be kept strictly separated during feature scaling?',
              options: ['To avoid data leakage from test into training models', 'To save disk space', 'Because Python cannot scale both simultaneously', 'To prevent syntax errors in Scikit-Learn'],
              correctAnswer: 0,
              explanation: 'Fitting scalers on test data causes data leakage, artificially inflating accuracy and misrepresenting model generalization.'
            },
            {
              id: 'q-pds-10',
              question: 'What is the ultimate goal of exploratory data analysis (EDA)?',
              options: ['To create complicated charts', 'To understand patterns, anomalies, and hypothesis validity before modeling', 'To delete all rows with zeros', 'To replace SQL databases'],
              correctAnswer: 1,
              explanation: 'EDA ensures data integrity, uncovers patterns, tests assumptions, and guides correct feature engineering.'
            }
          ]
        }
      }
    ]
  },
  {
    id: 'fullstack-web-dev',
    skillId: 'fullstack-web-dev',
    title: 'Full Stack Web Development',
    tagline: 'Build modern, responsive, full-stack applications with React, Node.js, Express, and PostgreSQL.',
    description: 'Master client-side user interfaces, RESTful API design, server architecture, authentication protocols, and production deployment strategies.',
    difficulty: 'Intermediate',
    duration: '8 Weeks (60 Hours)',
    category: 'Software Engineering',
    whySuitable: 'Full-stack engineering represents one of the largest talent shortages globally. Being able to independently build both the client and server side provides extreme career mobility and entrepreneurial flexibility.',
    careerOpportunities: [
      'Full Stack Developer',
      'Frontend Engineer',
      'Backend Engineer',
      'Technical Co-Founder',
      'Software Consultant'
    ],
    modules: [
      {
        id: 'fs-m1',
        courseId: 'fullstack-web-dev',
        title: 'Module 1 – Modern JavaScript & DOM Architecture',
        orderNumber: 1,
        description: 'ES6+ syntax, asynchronous JavaScript, Promises, async/await, and event loops.',
        lessons: [
          {
            id: 'fs-l1-1',
            moduleId: 'fs-m1',
            title: 'ES6+ Syntax: Destructuring, Modules & Arrow Functions',
            description: 'Leverage modern syntactic features to write concise, maintainable JavaScript code.',
            resourceUrl: 'https://javascript.info/',
            duration: '30 min',
            orderNumber: 1,
            type: 'reading'
          },
          {
            id: 'fs-l1-2',
            moduleId: 'fs-m1',
            title: 'Async Programming: Promises & Async/Await',
            description: 'Handle network requests, microtasks, error propagation, and asynchronous control flows.',
            resourceUrl: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous',
            duration: '35 min',
            orderNumber: 2,
            type: 'video'
          }
        ],
        quiz: {
          id: 'quiz-fs-m1',
          moduleId: 'fs-m1',
          courseId: 'fullstack-web-dev',
          title: 'Quiz: Modern JavaScript Core',
          passingScore: 70,
          questions: [
            {
              id: 'q-fs-1',
              question: 'What is the keyword used to pause execution until a Promise settles inside an async function?',
              options: ['wait', 'await', 'pause', 'yield'],
              correctAnswer: 1,
              explanation: 'await pauses execution in an async function until the Promise resolves or rejects.'
            },
            {
              id: 'q-fs-2',
              question: 'Which array method produces a new array by transforming each element through a callback?',
              options: ['forEach()', 'filter()', 'map()', 'reduce()'],
              correctAnswer: 2,
              explanation: 'Array.prototype.map() returns a brand-new array containing the results of calling the function on every element.'
            }
          ]
        }
      },
      {
        id: 'fs-m2',
        courseId: 'fullstack-web-dev',
        title: 'Module 2 – React & State Management',
        orderNumber: 2,
        description: 'Components, hooks (useState, useEffect, useContext), and virtual DOM reconciliation.',
        lessons: [
          {
            id: 'fs-l2-1',
            moduleId: 'fs-m2',
            title: 'Component Architecture & Props',
            description: 'Decompose monolithic UIs into modular, reusable functional components with typed properties.',
            resourceUrl: 'https://react.dev/learn',
            duration: '30 min',
            orderNumber: 1,
            type: 'video'
          },
          {
            id: 'fs-l2-2',
            moduleId: 'fs-m2',
            title: 'Mastering React Hooks: useState & useEffect',
            description: 'Manage component life cycles, side effects, subscriptions, and cleanup functions properly.',
            resourceUrl: 'https://react.dev/reference/react',
            duration: '40 min',
            orderNumber: 2,
            type: 'code'
          }
        ],
        quiz: {
          id: 'quiz-fs-m2',
          moduleId: 'fs-m2',
          courseId: 'fullstack-web-dev',
          title: 'Quiz: React & State Management',
          passingScore: 70,
          questions: [
            {
              id: 'q-fs-3',
              question: 'What is the purpose of the dependency array in useEffect()?',
              options: ['To determine when the effect re-runs', 'To pass parameters to other hooks', 'To define CSS styling', 'To export components'],
              correctAnswer: 0,
              explanation: 'React compares values in the dependency array between renders to decide whether to re-execute the effect.'
            }
          ]
        }
      },
      {
        id: 'fs-m3',
        courseId: 'fullstack-web-dev',
        title: 'Module 3 – Backend APIs with Node.js & Express',
        orderNumber: 3,
        description: 'RESTful API principles, Express routing, middleware, CORS, and request validation.',
        lessons: [
          {
            id: 'fs-l3-1',
            moduleId: 'fs-m3',
            title: 'REST Architecture & HTTP Verbs',
            description: 'Design uniform resource endpoints adhering to standard GET, POST, PUT, DELETE semantics.',
            resourceUrl: 'https://expressjs.com/en/guide/routing.html',
            duration: '35 min',
            orderNumber: 1,
            type: 'reading'
          },
          {
            id: 'fs-l3-2',
            moduleId: 'fs-m3',
            title: 'Building Middleware & Input Validation',
            description: 'Intercept HTTP requests for logging, token authentication, and body schema validation.',
            resourceUrl: 'https://expressjs.com/en/guide/using-middleware.html',
            duration: '40 min',
            orderNumber: 2,
            type: 'code'
          }
        ],
        quiz: {
          id: 'quiz-fs-m3',
          moduleId: 'fs-m3',
          courseId: 'fullstack-web-dev',
          title: 'Quiz: Express & API Design',
          passingScore: 70,
          questions: [
            {
              id: 'q-fs-4',
              question: 'Which HTTP status code indicates a successful creation of a new resource on the server?',
              options: ['200 OK', '201 Created', '204 No Content', '302 Found'],
              correctAnswer: 1,
              explanation: 'HTTP 201 Created explicitly confirms that the request succeeded and resulted in creation of one or more new resources.'
            }
          ]
        }
      },
      {
        id: 'fs-m4',
        courseId: 'fullstack-web-dev',
        title: 'Module 4 – Database Integration & Authentication',
        orderNumber: 4,
        description: 'Relational database schema modeling, Supabase/PostgreSQL queries, JWT authentication, and RLS.',
        lessons: [
          {
            id: 'fs-l4-1',
            moduleId: 'fs-m4',
            title: 'SQL Fundamentals & PostgreSQL Relations',
            description: 'Write SELECT, INSERT, UPDATE, JOIN queries and implement primary and foreign keys.',
            resourceUrl: 'https://supabase.com/docs',
            duration: '45 min',
            orderNumber: 1,
            type: 'reading'
          },
          {
            id: 'fs-l4-2',
            moduleId: 'fs-m4',
            title: 'JWT Authentication & Row Level Security',
            description: 'Secure API routes and database tables using cryptographic tokens and user ownership policies.',
            resourceUrl: 'https://jwt.io/introduction',
            duration: '35 min',
            orderNumber: 2,
            type: 'video'
          }
        ],
        quiz: {
          id: 'quiz-fs-m4',
          moduleId: 'fs-m4',
          courseId: 'fullstack-web-dev',
          title: 'Quiz: Databases & Auth Security',
          passingScore: 70,
          questions: [
            {
              id: 'q-fs-5',
              question: 'What does RLS (Row Level Security) enforce in PostgreSQL / Supabase?',
              options: ['Encrypts the database hard drive', 'Restricts which rows users can read or modify based on their session identity', 'Renders database backups automatically', 'Limits the number of database connections'],
              correctAnswer: 1,
              explanation: 'Row Level Security ensures that database queries are restricted at the row level according to security policies matching auth.uid().'
            }
          ]
        }
      },
      {
        id: 'fs-m5',
        courseId: 'fullstack-web-dev',
        title: 'Module 5 – Capstone Project: SaaS Web Application',
        orderNumber: 5,
        description: 'Develop a fully integrated web platform with authentication, CRUD operations, state persistence, and responsive UI.',
        lessons: [
          {
            id: 'fs-l5-1',
            moduleId: 'fs-m5',
            title: 'Full Stack App Architecture & Endpoints',
            description: 'Connect frontend React hooks to backend API endpoints with robust error handling and loading states.',
            resourceUrl: 'https://github.com',
            duration: '50 min',
            orderNumber: 1,
            type: 'code'
          },
          {
            id: 'fs-l5-2',
            moduleId: 'fs-m5',
            title: 'Production Build, CI/CD, & Cloud Deployment',
            description: 'Bundle assets with Vite, set up environment variables securely, and deploy to Vercel/Render.',
            resourceUrl: 'https://vercel.com/docs',
            duration: '40 min',
            orderNumber: 2,
            type: 'video'
          }
        ],
        quiz: {
          id: 'quiz-fs-m5',
          moduleId: 'fs-m5',
          courseId: 'fullstack-web-dev',
          title: 'Quiz: Full Stack Capstone Mastery',
          passingScore: 70,
          questions: [
            {
              id: 'q-fs-6',
              question: 'Why should secret keys like API tokens never be committed into client-side code?',
              options: ['They slow down browser rendering', 'Anyone can inspect client bundles and steal the credentials', 'They make CSS invalid', 'They prevent TypeScript from compiling'],
              correctAnswer: 1,
              explanation: 'Client-side assets are downloaded and readable by anyone inspecting network traffic or bundles, exposing secrets immediately.'
            }
          ]
        }
      }
    ]
  },
  {
    id: 'ai-deep-learning',
    skillId: 'ai-deep-learning',
    title: 'Artificial Intelligence & Deep Learning',
    tagline: 'Understand Neural Networks, Transformers, LLMs, and Generative AI application engineering.',
    description: 'Explore neural network math, PyTorch foundations, transformer architectures, prompt engineering, and LLM orchestration.',
    difficulty: 'Intermediate',
    duration: '7 Weeks (50 Hours)',
    category: 'Artificial Intelligence',
    whySuitable: 'Generative AI and foundation models are reshaping every industry. Mastering AI architectures positions you at the very frontier of modern tech innovation.',
    careerOpportunities: [
      'AI Engineer',
      'Machine Learning Scientist',
      'Prompt Engineer & LLM Specialist',
      'Computer Vision Researcher',
      'AI Product Manager'
    ],
    modules: [
      {
        id: 'ai-m1',
        courseId: 'ai-deep-learning',
        title: 'Module 1 – Foundations of Machine Learning & Neurons',
        orderNumber: 1,
        description: 'Perceptrons, activation functions, loss gradients, and backpropagation principles.',
        lessons: [
          {
            id: 'ai-l1-1',
            moduleId: 'ai-m1',
            title: 'From Linear Classifiers to Perceptrons',
            description: 'Understand linear decision boundaries, bias weights, and biological neuron analogies.',
            resourceUrl: 'https://www.deeplearningbook.org/',
            duration: '35 min',
            orderNumber: 1,
            type: 'reading'
          },
          {
            id: 'ai-l1-2',
            moduleId: 'ai-m1',
            title: 'Gradient Descent & Backpropagation',
            description: 'Calculate gradients via chain rule to minimize error loss across dense neural layers.',
            resourceUrl: 'https://developers.google.com/machine-learning/crash-course',
            duration: '40 min',
            orderNumber: 2,
            type: 'video'
          }
        ],
        quiz: {
          id: 'quiz-ai-m1',
          moduleId: 'ai-m1',
          courseId: 'ai-deep-learning',
          title: 'Quiz: AI Foundations',
          passingScore: 70,
          questions: [
            {
              id: 'q-ai-1',
              question: 'What is the primary role of an activation function in a neural network?',
              options: ['To initialize weights to zero', 'To introduce non-linearity so networks can learn complex patterns', 'To speed up file reading', 'To connect to database servers'],
              correctAnswer: 1,
              explanation: 'Without non-linear activations (like ReLU, Sigmoid), stacking layers would only calculate linear combinations equivalent to a single layer.'
            }
          ]
        }
      },
      {
        id: 'ai-m2',
        courseId: 'ai-deep-learning',
        title: 'Module 2 – Deep Neural Networks with PyTorch',
        orderNumber: 2,
        description: 'Tensors, autograd, forward passes, optimizer loops, and regularization techniques.',
        lessons: [
          {
            id: 'ai-l2-1',
            moduleId: 'ai-m2',
            title: 'PyTorch Tensors & Automatic Differentiation',
            description: 'Build computational graphs dynamically with torch.Tensor and autograd.',
            resourceUrl: 'https://pytorch.org/tutorials/beginner/basics/intro.html',
            duration: '45 min',
            orderNumber: 1,
            type: 'code'
          }
        ],
        quiz: {
          id: 'quiz-ai-m2',
          moduleId: 'ai-m2',
          courseId: 'ai-deep-learning',
          title: 'Quiz: PyTorch & Network Training',
          passingScore: 70,
          questions: [
            {
              id: 'q-ai-2',
              question: 'Which PyTorch method clears previously accumulated gradients before the backward pass?',
              options: ['loss.backward()', 'optimizer.zero_grad()', 'torch.clear()', 'model.reset()'],
              correctAnswer: 1,
              explanation: 'In PyTorch, gradients accumulate by default, so optimizer.zero_grad() is called prior to backpropagation.'
            }
          ]
        }
      },
      {
        id: 'ai-m3',
        courseId: 'ai-deep-learning',
        title: 'Module 3 – Natural Language Processing & Transformers',
        orderNumber: 3,
        description: 'Tokenization, embeddings, self-attention mechanisms, and the Transformer encoder-decoder design.',
        lessons: [
          {
            id: 'ai-l3-1',
            moduleId: 'ai-m3',
            title: 'The Self-Attention Mechanism Explained',
            description: 'Understand Query, Key, Value matrices and how attention weights capture contextual relationships.',
            resourceUrl: 'https://jalammar.github.io/illustrated-transformer/',
            duration: '45 min',
            orderNumber: 1,
            type: 'video'
          }
        ],
        quiz: {
          id: 'quiz-ai-m3',
          moduleId: 'ai-m3',
          courseId: 'ai-deep-learning',
          title: 'Quiz: Transformers & Attention',
          passingScore: 70,
          questions: [
            {
              id: 'q-ai-3',
              question: 'What are the three core vector representations in self-attention?',
              options: ['Input, Hidden, Output', 'Query, Key, Value', 'Alpha, Beta, Gamma', 'Encoder, Decoder, Attention'],
              correctAnswer: 1,
              explanation: 'Self-attention maps Query and Key vectors via dot product to calculate softmax attention weights over Value vectors.'
            }
          ]
        }
      },
      {
        id: 'ai-m4',
        courseId: 'ai-deep-learning',
        title: 'Module 4 – Generative AI, LLMs & Retrieval Augmented Generation (RAG)',
        orderNumber: 4,
        description: 'Prompt engineering, temperature parameters, vector embeddings, vector databases, and RAG pipelines.',
        lessons: [
          {
            id: 'ai-l4-1',
            moduleId: 'ai-m4',
            title: 'Building RAG Pipelines with Vector Databases',
            description: 'Ground LLM responses in proprietary knowledge bases using semantic vector search.',
            resourceUrl: 'https://platform.openai.com/docs/guides/prompt-engineering',
            duration: '40 min',
            orderNumber: 1,
            type: 'code'
          }
        ],
        quiz: {
          id: 'quiz-ai-m4',
          moduleId: 'ai-m4',
          courseId: 'ai-deep-learning',
          title: 'Quiz: LLMs & RAG Architectures',
          passingScore: 70,
          questions: [
            {
              id: 'q-ai-4',
              question: 'What does RAG primarily mitigate when building LLM applications?',
              options: ['High GPU clock speeds', 'Hallucinations and outdated knowledge by retrieving relevant factual documents', 'HTML styling bugs', 'Database network timeouts'],
              correctAnswer: 1,
              explanation: 'RAG supplies verified retrieved context chunks in the model prompt, drastically reducing hallucinations.'
            }
          ]
        }
      },
      {
        id: 'ai-m5',
        courseId: 'ai-deep-learning',
        title: 'Module 5 – Capstone Project: Intelligent AI Agent & Classifier',
        orderNumber: 5,
        description: 'Deploy an interactive AI-powered assistant with structured JSON responses, contextual memory, and evaluation metrics.',
        lessons: [
          {
            id: 'ai-l5-1',
            moduleId: 'ai-m5',
            title: 'Capstone Agent Implementation & Deployment',
            description: 'Integrate Google Gemini API or custom PyTorch model into a responsive web application.',
            resourceUrl: 'https://ai.google.dev/',
            duration: '50 min',
            orderNumber: 1,
            type: 'code'
          }
        ],
        quiz: {
          id: 'quiz-ai-m5',
          moduleId: 'ai-m5',
          courseId: 'ai-deep-learning',
          title: 'Quiz: AI Capstone Evaluation',
          passingScore: 70,
          questions: [
            {
              id: 'q-ai-5',
              question: 'Which metric measures the balance between precision and recall in classification models?',
              options: ['Mean Squared Error', 'F1-Score', 'R-Squared', 'Perplexity'],
              correctAnswer: 1,
              explanation: 'F1-Score is the harmonic mean of precision and recall, especially useful for imbalanced datasets.'
            }
          ]
        }
      }
    ]
  },
  {
    id: 'cloud-devops',
    skillId: 'cloud-devops',
    title: 'Cloud Computing & DevOps',
    tagline: 'Master AWS architecture, Docker containerization, Kubernetes, and CI/CD automation.',
    description: 'Learn modern infrastructure as code, container orchestration, microservices communication, and resilient cloud architectures.',
    difficulty: 'Intermediate',
    duration: '6 Weeks (45 Hours)',
    category: 'Cloud Infrastructure',
    whySuitable: 'Enterprise scalability depends entirely on automated cloud pipelines. DevOps engineers bridge code and operations, commanding exceptional industry compensation.',
    careerOpportunities: [
      'DevOps Engineer',
      'Cloud Solutions Architect',
      'Site Reliability Engineer (SRE)',
      'Platform Engineer',
      'Infrastructure Developer'
    ],
    modules: [
      {
        id: 'cdo-m1',
        courseId: 'cloud-devops',
        title: 'Module 1 – Cloud Fundamentals & AWS Core Services',
        orderNumber: 1,
        description: 'VPC networking, EC2 compute instances, S3 object storage, and IAM policies.',
        lessons: [
          {
            id: 'cdo-l1-1',
            moduleId: 'cdo-m1',
            title: 'AWS Infrastructure, Regions, and IAM Security',
            description: 'Architect secure accounts with least-privilege policies, security groups, and multi-factor auth.',
            resourceUrl: 'https://aws.amazon.com/training/',
            duration: '35 min',
            orderNumber: 1,
            type: 'reading'
          }
        ],
        quiz: {
          id: 'quiz-cdo-m1',
          moduleId: 'cdo-m1',
          courseId: 'cloud-devops',
          title: 'Quiz: Cloud Architecture Basics',
          passingScore: 70,
          questions: [
            {
              id: 'q-cdo-1',
              question: 'What is the primary characteristic of Amazon S3 storage?',
              options: ['Block storage for OS boot', 'Object storage with virtually unlimited scalability and high durability', 'Relational database engine', 'DNS routing table'],
              correctAnswer: 1,
              explanation: 'Amazon S3 is an object storage service offering 99.999999999% (11 9s) of data durability.'
            }
          ]
        }
      },
      {
        id: 'cdo-m2',
        courseId: 'cloud-devops',
        title: 'Module 2 – Docker Containerization',
        orderNumber: 2,
        description: 'Dockerfiles, multi-stage builds, container networking, and Docker Compose.',
        lessons: [
          {
            id: 'cdo-l2-1',
            moduleId: 'cdo-m2',
            title: 'Writing Production Dockerfiles & Image Optimization',
            description: 'Minimize container footprints with alpine bases, layer caching, and non-root users.',
            resourceUrl: 'https://docs.docker.com/get-started/',
            duration: '35 min',
            orderNumber: 1,
            type: 'code'
          }
        ],
        quiz: {
          id: 'quiz-cdo-m2',
          moduleId: 'cdo-m2',
          courseId: 'cloud-devops',
          title: 'Quiz: Docker & Containers',
          passingScore: 70,
          questions: [
            {
              id: 'q-cdo-2',
              question: 'What command creates a running container from an image?',
              options: ['docker build', 'docker run', 'docker push', 'docker pull'],
              correctAnswer: 1,
              explanation: 'docker run instantiates and starts a container process from the specified image.'
            }
          ]
        }
      },
      {
        id: 'cdo-m3',
        courseId: 'cloud-devops',
        title: 'Module 3 – CI/CD Pipelines with GitHub Actions',
        orderNumber: 3,
        description: 'Automated testing, linters, semantic versioning, and zero-downtime deployment workflows.',
        lessons: [
          {
            id: 'cdo-l3-1',
            moduleId: 'cdo-m3',
            title: 'GitHub Actions Workflows & Secrets Management',
            description: 'Trigger automated testing on pull requests and auto-deploy container releases on merge.',
            resourceUrl: 'https://docs.github.com/en/actions',
            duration: '40 min',
            orderNumber: 1,
            type: 'video'
          }
        ],
        quiz: {
          id: 'quiz-cdo-m3',
          moduleId: 'cdo-m3',
          courseId: 'cloud-devops',
          title: 'Quiz: CI/CD Pipelines',
          passingScore: 70,
          questions: [
            {
              id: 'q-cdo-3',
              question: 'In GitHub Actions, which file directory houses workflow definitions?',
              options: ['/workflows', '.github/workflows', '/config/ci', '.actions/scripts'],
              correctAnswer: 1,
              explanation: 'GitHub Actions workflow YAML files must reside inside the .github/workflows directory in the repository root.'
            }
          ]
        }
      },
      {
        id: 'cdo-m4',
        courseId: 'cloud-devops',
        title: 'Module 4 – Kubernetes & Microservices Orchestration',
        orderNumber: 4,
        description: 'Pods, Deployments, Services, Ingress controllers, and Horizontal Pod Autoscaling (HPA).',
        lessons: [
          {
            id: 'cdo-l4-1',
            moduleId: 'cdo-m4',
            title: 'Kubernetes Cluster Architecture & Manifests',
            description: 'Deploy self-healing container workloads using declarative YAML definitions.',
            resourceUrl: 'https://kubernetes.io/docs/tutorials/',
            duration: '45 min',
            orderNumber: 1,
            type: 'code'
          }
        ],
        quiz: {
          id: 'quiz-cdo-m4',
          moduleId: 'cdo-m4',
          courseId: 'cloud-devops',
          title: 'Quiz: Kubernetes Fundamentals',
          passingScore: 70,
          questions: [
            {
              id: 'q-cdo-4',
              question: 'What is the smallest deployable computing unit in Kubernetes?',
              options: ['Cluster', 'Pod', 'Service', 'Namespace'],
              correctAnswer: 1,
              explanation: 'A Pod represents a single instance of a running process in a cluster, containing one or more containers.'
            }
          ]
        }
      },
      {
        id: 'cdo-m5',
        courseId: 'cloud-devops',
        title: 'Module 5 – Capstone Project: High-Availability Cloud Deployment',
        orderNumber: 5,
        description: 'End-to-end automation of a multi-tier web application with load balancing and Prometheus monitoring.',
        lessons: [
          {
            id: 'cdo-l5-1',
            moduleId: 'cdo-m5',
            title: 'Architecting Resilient Cloud Infrastructure',
            description: 'Deploy autoscaled web tier, relational database failover, and metrics dashboard.',
            resourceUrl: 'https://aws.amazon.com/architecture/',
            duration: '50 min',
            orderNumber: 1,
            type: 'code'
          }
        ],
        quiz: {
          id: 'quiz-cdo-m5',
          moduleId: 'cdo-m5',
          courseId: 'cloud-devops',
          title: 'Quiz: Cloud DevOps Capstone',
          passingScore: 70,
          questions: [
            {
              id: 'q-cdo-5',
              question: 'What is the role of a reverse proxy / load balancer in high-availability deployments?',
              options: ['Distribute incoming traffic across healthy target nodes and handle SSL termination', 'Run unit tests', 'Compile source code', 'Replace the database'],
              correctAnswer: 0,
              explanation: 'Load balancers evenly distribute traffic, execute health checks, and prevent individual server bottlenecks.'
            }
          ]
        }
      }
    ]
  },
  {
    id: 'cybersecurity',
    skillId: 'cybersecurity',
    title: 'Cybersecurity Fundamentals & Defense',
    tagline: 'Defend networks, analyze vulnerabilities, master cryptographic protocols, and incident response.',
    description: 'Learn foundational defense tactics, OWASP Top 10 vulnerabilities, penetration testing concepts, and threat intelligence.',
    difficulty: 'Beginner',
    duration: '5 Weeks (35 Hours)',
    category: 'Security & Operations',
    whySuitable: 'Cyberattacks have surged worldwide. Organizations urgently need professionals who understand vulnerability landscapes and regulatory compliance.',
    careerOpportunities: [
      'Cybersecurity Analyst',
      'SOC Analyst',
      'Penetration Tester',
      'Information Security Officer',
      'Compliance Consultant'
    ],
    modules: [
      {
        id: 'cs-m1',
        courseId: 'cybersecurity',
        title: 'Module 1 – Security Fundamentals & Threat Landscape',
        orderNumber: 1,
        description: 'CIA Triad, attack vectors, social engineering, and security policies.',
        lessons: [
          {
            id: 'cs-l1-1',
            moduleId: 'cs-m1',
            title: 'The CIA Triad: Confidentiality, Integrity, Availability',
            description: 'Framework for assessing and maintaining institutional security postures.',
            resourceUrl: 'https://csrc.nist.gov/',
            duration: '30 min',
            orderNumber: 1,
            type: 'reading'
          }
        ],
        quiz: {
          id: 'quiz-cs-m1',
          moduleId: 'cs-m1',
          courseId: 'cybersecurity',
          title: 'Quiz: Security Principles',
          passingScore: 70,
          questions: [
            {
              id: 'q-cs-1',
              question: 'In the CIA Triad, what does Integrity signify?',
              options: ['Keeping systems always online', 'Ensuring data is accurate and has not been tampered with or altered', 'Making data public', 'Encrypting cables'],
              correctAnswer: 1,
              explanation: 'Integrity guarantees data accuracy and authenticity, guarding against unauthorized alteration.'
            }
          ]
        }
      },
      {
        id: 'cs-m2',
        courseId: 'cybersecurity',
        title: 'Module 2 – Network Security & Cryptography',
        orderNumber: 2,
        description: 'TLS/SSL, symmetric vs asymmetric encryption, firewalls, and packet analysis.',
        lessons: [
          {
            id: 'cs-l2-1',
            moduleId: 'cs-m2',
            title: 'Symmetric vs Asymmetric Encryption & Public Keys',
            description: 'AES, RSA, Diffie-Hellman key exchanges, and digital signatures.',
            resourceUrl: 'https://www.cloudflare.com/learning/ssl/what-is-encryption/',
            duration: '35 min',
            orderNumber: 1,
            type: 'video'
          }
        ],
        quiz: {
          id: 'quiz-cs-m2',
          moduleId: 'cs-m2',
          courseId: 'cybersecurity',
          title: 'Quiz: Cryptography & Networks',
          passingScore: 70,
          questions: [
            {
              id: 'q-cs-2',
              question: 'In asymmetric cryptography, which key can be safely shared with anyone?',
              options: ['Private Key', 'Public Key', 'Hash Salt', 'Root Password'],
              correctAnswer: 1,
              explanation: 'The public key can be openly distributed; anyone can encrypt messages with it, but only the corresponding private key can decrypt them.'
            }
          ]
        }
      },
      {
        id: 'cs-m3',
        courseId: 'cybersecurity',
        title: 'Module 3 – Web Application Security & OWASP Top 10',
        orderNumber: 3,
        description: 'SQL injection, Cross-Site Scripting (XSS), CSRF, and broken access controls.',
        lessons: [
          {
            id: 'cs-l3-1',
            moduleId: 'cs-m3',
            title: 'Preventing SQL Injection & XSS Attacks',
            description: 'Parameterized queries, content security policies (CSP), and sanitized user input.',
            resourceUrl: 'https://owasp.org/www-project-top-ten/',
            duration: '40 min',
            orderNumber: 1,
            type: 'code'
          }
        ],
        quiz: {
          id: 'quiz-cs-m3',
          moduleId: 'cs-m3',
          courseId: 'cybersecurity',
          title: 'Quiz: Web Application Defense',
          passingScore: 70,
          questions: [
            {
              id: 'q-cs-3',
              question: 'What is the primary countermeasure against SQL Injection vulnerabilities?',
              options: ['Using parameterized queries / prepared statements', 'Increasing database RAM', 'Closing port 80', 'Storing passwords in plain text'],
              correctAnswer: 0,
              explanation: 'Parameterized queries separate SQL instructions from user parameters, stopping malicious query concatenation.'
            }
          ]
        }
      },
      {
        id: 'cs-m4',
        courseId: 'cybersecurity',
        title: 'Module 4 – Vulnerability Assessment & Penetration Testing',
        orderNumber: 4,
        description: 'Nmap scanning, Wireshark packet capture, Metasploit fundamentals, and remediation.',
        lessons: [
          {
            id: 'cs-l4-1',
            moduleId: 'cs-m4',
            title: 'Reconnaissance & Port Scanning Methodologies',
            description: 'Identify exposed network services, banner grabbing, and CVE matching.',
            resourceUrl: 'https://nmap.org/book/man.html',
            duration: '35 min',
            orderNumber: 1,
            type: 'reading'
          }
        ],
        quiz: {
          id: 'quiz-cs-m4',
          moduleId: 'cs-m4',
          courseId: 'cybersecurity',
          title: 'Quiz: Vulnerability Scanning',
          passingScore: 70,
          questions: [
            {
              id: 'q-cs-4',
              question: 'What is Nmap primarily used for in cybersecurity assessments?',
              options: ['Video editing', 'Network discovery and vulnerability port scanning', 'Compressing files', 'Sending email campaigns'],
              correctAnswer: 1,
              explanation: 'Nmap is a standard network utility for mapping networks, discovering hosts, and identifying open service ports.'
            }
          ]
        }
      },
      {
        id: 'cs-m5',
        courseId: 'cybersecurity',
        title: 'Module 5 – Capstone Project: Incident Response & Audit',
        orderNumber: 5,
        description: 'Analyze an attack log simulation, identify the breach vector, execute containment, and draft remediation.',
        lessons: [
          {
            id: 'cs-l5-1',
            moduleId: 'cs-m5',
            title: 'Incident Response Lifecycle & Forensic Analysis',
            description: 'Follow the 6 stages of NIST incident response: preparation, identification, containment, eradication, recovery, lessons learned.',
            resourceUrl: 'https://csrc.nist.gov/publications/detail/sp/800-61/rev-2/final',
            duration: '45 min',
            orderNumber: 1,
            type: 'code'
          }
        ],
        quiz: {
          id: 'quiz-cs-m5',
          moduleId: 'cs-m5',
          courseId: 'cybersecurity',
          title: 'Quiz: Incident Response Capstone',
          passingScore: 70,
          questions: [
            {
              id: 'q-cs-5',
              question: 'What should be the immediate priority upon identifying an active network intrusion?',
              options: ['Delete the entire server', 'Isolate and contain the compromised system to stop lateral movement', 'Email the attackers', 'Turn off all building lights'],
              correctAnswer: 1,
              explanation: 'Containment prevents an attacker from spreading further across the internal network while preserving forensic evidence.'
            }
          ]
        }
      }
    ]
  },
  {
    id: 'ui-ux-design',
    skillId: 'ui-ux-design',
    title: 'UI/UX Design & Product Strategy',
    tagline: 'Design intuitive, human-centered digital experiences using Figma, design systems, and wireframing.',
    description: 'Master user research, wireframing, interactive prototyping, color theory, typography, and production design handoff.',
    difficulty: 'Beginner',
    duration: '5 Weeks (30 Hours)',
    category: 'Design & Product',
    whySuitable: 'Great software starts with exceptional user experience. Product designers who balance aesthetic beauty with human ergonomics command immense influence in tech.',
    careerOpportunities: [
      'UI/UX Designer',
      'Product Designer',
      'Design Systems Architect',
      'UX Researcher',
      'Interaction Designer'
    ],
    modules: [
      {
        id: 'ux-m1',
        courseId: 'ui-ux-design',
        title: 'Module 1 – Design Thinking & User Research',
        orderNumber: 1,
        description: 'Empathize, Define, Ideate, Prototype, Test methodology and persona development.',
        lessons: [
          {
            id: 'ux-l1-1',
            moduleId: 'ux-m1',
            title: 'User Personas and Empathy Mapping',
            description: 'Conduct qualitative user interviews and synthesize actionable mental models.',
            resourceUrl: 'https://www.nngroup.com/articles/design-thinking/',
            duration: '30 min',
            orderNumber: 1,
            type: 'reading'
          }
        ],
        quiz: {
          id: 'quiz-ux-m1',
          moduleId: 'ux-m1',
          courseId: 'ui-ux-design',
          title: 'Quiz: Design Thinking Foundations',
          passingScore: 70,
          questions: [
            {
              id: 'q-ux-1',
              question: 'What is the primary objective of user research in UX design?',
              options: ['To confirm developer assumptions without changes', 'To uncover genuine user behaviors, pain points, and motivations', 'To design logos faster', 'To write database queries'],
              correctAnswer: 1,
              explanation: 'User research grounds product decisions in empirical understanding of actual user needs.'
            }
          ]
        }
      },
      {
        id: 'ux-m2',
        courseId: 'ui-ux-design',
        title: 'Module 2 – Information Architecture & Wireframing',
        orderNumber: 2,
        description: 'Site mapping, user flows, low-fidelity wireframing, and usability heuristics.',
        lessons: [
          {
            id: 'ux-l2-1',
            moduleId: 'ux-m2',
            title: 'Nielsen Norman 10 Usability Heuristics',
            description: 'Evaluate software interfaces against industry-standard usability principles.',
            resourceUrl: 'https://www.nngroup.com/articles/ten-usability-heuristics/',
            duration: '35 min',
            orderNumber: 1,
            type: 'video'
          }
        ],
        quiz: {
          id: 'quiz-ux-m2',
          moduleId: 'ux-m2',
          courseId: 'ui-ux-design',
          title: 'Quiz: Wireframes & Heuristics',
          passingScore: 70,
          questions: [
            {
              id: 'q-ux-2',
              question: 'Which heuristic states that the system should always keep users informed about what is going on through appropriate feedback?',
              options: ['Visibility of system status', 'Flexibility and efficiency of use', 'Error prevention', 'Aesthetic and minimalist design'],
              correctAnswer: 0,
              explanation: 'Visibility of system status ensures users know system progress (e.g. loaders, progress bars, notifications).'
            }
          ]
        }
      },
      {
        id: 'ux-m3',
        courseId: 'ui-ux-design',
        title: 'Module 3 – Visual Design & Design Systems in Figma',
        orderNumber: 3,
        description: 'Typography scales, WCAG accessibility color contrasts, 8pt grid systems, and Figma auto-layout.',
        lessons: [
          {
            id: 'ux-l3-1',
            moduleId: 'ux-m3',
            title: 'Auto Layout, Components, and Design Tokens in Figma',
            description: 'Create responsive UI components with variants and reusable design tokens.',
            resourceUrl: 'https://help.figma.com/hc/en-us/articles/360040451373-Explore-Auto-layout',
            duration: '40 min',
            orderNumber: 1,
            type: 'code'
          }
        ],
        quiz: {
          id: 'quiz-ux-m3',
          moduleId: 'ux-m3',
          courseId: 'ui-ux-design',
          title: 'Quiz: Figma & Visual Design',
          passingScore: 70,
          questions: [
            {
              id: 'q-ux-3',
              question: 'What minimum contrast ratio is required by WCAG AA for normal body text?',
              options: ['2:1', '3:1', '4.5:1', '7:1'],
              correctAnswer: 2,
              explanation: 'WCAG AA requires at least 4.5:1 contrast ratio for normal text and 3:1 for large text.'
            }
          ]
        }
      },
      {
        id: 'ux-m4',
        courseId: 'ui-ux-design',
        title: 'Module 4 – Prototyping & Usability Testing',
        orderNumber: 4,
        description: 'Interactive micro-animations, smart animate in Figma, usability testing protocols.',
        lessons: [
          {
            id: 'ux-l4-1',
            moduleId: 'ux-m4',
            title: 'Planning and Moderating Usability Test Sessions',
            description: 'Formulate task scenarios, observe user friction without bias, and quantify task success rates.',
            resourceUrl: 'https://www.interaction-design.org/',
            duration: '35 min',
            orderNumber: 1,
            type: 'video'
          }
        ],
        quiz: {
          id: 'quiz-ux-m4',
          moduleId: 'ux-m4',
          courseId: 'ui-ux-design',
          title: 'Quiz: Usability Testing Protocols',
          passingScore: 70,
          questions: [
            {
              id: 'q-ux-4',
              question: 'What is the Think-Aloud Protocol during usability testing?',
              options: ['Users speak their thoughts continuously while attempting tasks', 'Facilitators tell users where to click', 'Users debate in groups', 'Developers read code out loud'],
              correctAnswer: 0,
              explanation: 'The Think-Aloud protocol asks participants to verbalize their thoughts and expectations as they navigate the UI.'
            }
          ]
        }
      },
      {
        id: 'ux-m5',
        courseId: 'ui-ux-design',
        title: 'Module 5 – Capstone Project: SaaS Design & Developer Handoff',
        orderNumber: 5,
        description: 'Design a complete modern SaaS web platform prototype ready for developer implementation.',
        lessons: [
          {
            id: 'ux-l5-1',
            moduleId: 'ux-m5',
            title: 'Design Handoff: Specs, Assets, & Interactive Flows',
            description: 'Document component states (hover, active, disabled) and create frictionless handoffs for frontend developers.',
            resourceUrl: 'https://figma.com',
            duration: '45 min',
            orderNumber: 1,
            type: 'code'
          }
        ],
        quiz: {
          id: 'quiz-ux-m5',
          moduleId: 'ui-ux-design',
          courseId: 'ui-ux-design',
          title: 'Quiz: Design Capstone & Handoff',
          passingScore: 70,
          questions: [
            {
              id: 'q-ux-5',
              question: 'Why are design tokens critical in scalable modern design systems?',
              options: ['They replace all images with vectors', 'They establish a single source of truth for design values (colors, spacing) shared between design and code', 'They allow offline hosting only', 'They make websites load automatically'],
              correctAnswer: 1,
              explanation: 'Design tokens synchronize typography, colors, and spatial parameters across design libraries and codebases.'
            }
          ]
        }
      }
    ]
  }
];
