import { Chapter, Resource } from '../types/course';

export const credibleResources: Resource[] = [
  {
    id: 'irs-pub17',
    title: 'IRS Publication 17 - Your Federal Income Tax',
    url: 'https://www.irs.gov/publications/p17',
    type: 'irs',
    description: 'Comprehensive guide to federal income tax for individuals'
  },
  {
    id: 'irs-pub334',
    title: 'IRS Publication 334 - Tax Guide for Small Business',
    url: 'https://www.irs.gov/publications/p334',
    type: 'irs',
    description: 'Essential tax information for small business owners'
  },
  {
    id: 'aicpa-tax-guide',
    title: 'AICPA Tax Practice Guides',
    url: 'https://www.aicpa.org/resources/download/tax-practice-guides',
    type: 'aicpa',
    description: 'Professional tax preparation standards and best practices'
  },
  {
    id: 'irs-form-1040',
    title: 'Form 1040 - U.S. Individual Income Tax Return',
    url: 'https://www.irs.gov/forms-pubs/about-form-1040',
    type: 'form',
    description: 'Primary individual income tax return form'
  },
  {
    id: 'irs-schedule-a',
    title: 'Schedule A - Itemized Deductions',
    url: 'https://www.irs.gov/forms-pubs/about-schedule-a-form-1040',
    type: 'form',
    description: 'Form for claiming itemized deductions'
  }
];

export const courseChapters: Chapter[] = [
  {
    id: 'chapter-1',
    title: 'Introduction to Tax Preparation',
    description: 'Fundamentals of tax law, ethics, and professional standards for accounting firms',
    duration: '2 hours',
    completed: false,
    progress: 0,
    modules: [
      {
        id: 'mod-1-1',
        title: 'Tax System Overview',
        type: 'video',
        content: 'Understanding the U.S. tax system structure and key principles',
        duration: '30 min',
        completed: false,
        resources: [credibleResources[0], credibleResources[2]]
      },
      {
        id: 'mod-1-2',
        title: 'Professional Ethics & Standards',
        type: 'reading',
        content: 'AICPA Code of Professional Conduct and IRS Circular 230 requirements',
        duration: '45 min',
        completed: false,
        resources: [credibleResources[2]]
      },
      {
        id: 'mod-1-3',
        title: 'Client Confidentiality & Privacy',
        type: 'interactive',
        content: 'Understanding client privacy laws and data protection requirements',
        duration: '30 min',
        completed: false,
        resources: []
      },
      {
        id: 'mod-1-4',
        title: 'Chapter 1 Assessment',
        type: 'quiz',
        content: 'Test your understanding of tax preparation fundamentals',
        duration: '15 min',
        completed: false,
        resources: []
      }
    ],
    homework: [
      {
        id: 'hw-1-1',
        title: 'Ethics Case Study Analysis',
        description: 'Analyze three ethical scenarios commonly faced by tax preparers',
        type: 'case-study',
        dueDate: '2024-02-15',
        completed: false
      }
    ]
  },
  {
    id: 'chapter-2',
    title: 'Individual Income Tax Basics',
    description: 'Core concepts of individual taxation including filing status and income types',
    duration: '3 hours',
    completed: false,
    progress: 0,
    modules: [
      {
        id: 'mod-2-1',
        title: 'Filing Status Determination',
        type: 'video',
        content: 'Single, Married Filing Jointly, Head of Household, and other filing statuses',
        duration: '45 min',
        completed: false,
        resources: [credibleResources[0]]
      },
      {
        id: 'mod-2-2',
        title: 'Types of Income',
        type: 'reading',
        content: 'Wages, interest, dividends, capital gains, and other income sources',
        duration: '60 min',
        completed: false,
        resources: [credibleResources[0], credibleResources[3]]
      },
      {
        id: 'mod-2-3',
        title: 'Form 1040 Walkthrough',
        type: 'interactive',
        content: 'Step-by-step completion of Form 1040 with real examples',
        duration: '60 min',
        completed: false,
        resources: [credibleResources[3]]
      },
      {
        id: 'mod-2-4',
        title: 'Chapter 2 Assessment',
        type: 'quiz',
        content: 'Test your knowledge of individual income tax basics',
        duration: '15 min',
        completed: false,
        resources: []
      }
    ],
    homework: [
      {
        id: 'hw-2-1',
        title: 'Form 1040 Practice',
        description: 'Complete three sample Form 1040 returns with different scenarios',
        type: 'form-practice',
        dueDate: '2024-02-22',
        completed: false
      }
    ]
  },
  {
    id: 'chapter-3',
    title: 'Deductions and Credits',
    description: 'Standard vs. itemized deductions, tax credits, and optimization strategies',
    duration: '4 hours',
    completed: false,
    progress: 0,
    modules: [
      {
        id: 'mod-3-1',
        title: 'Standard vs. Itemized Deductions',
        type: 'video',
        content: 'When to itemize and how to maximize deduction benefits',
        duration: '45 min',
        completed: false,
        resources: [credibleResources[0], credibleResources[4]]
      },
      {
        id: 'mod-3-2',
        title: 'Schedule A Deep Dive',
        type: 'interactive',
        content: 'Medical expenses, taxes, interest, gifts, and miscellaneous deductions',
        duration: '90 min',
        completed: false,
        resources: [credibleResources[4]]
      },
      {
        id: 'mod-3-3',
        title: 'Tax Credits Overview',
        type: 'reading',
        content: 'Child Tax Credit, EITC, Education Credits, and other common credits',
        duration: '60 min',
        completed: false,
        resources: [credibleResources[0]]
      },
      {
        id: 'mod-3-4',
        title: 'Chapter 3 Assessment',
        type: 'quiz',
        content: 'Test your understanding of deductions and credits',
        duration: '25 min',
        completed: false,
        resources: []
      }
    ],
    homework: [
      {
        id: 'hw-3-1',
        title: 'Deduction Optimization Exercise',
        description: 'Analyze client scenarios to determine optimal deduction strategy',
        type: 'calculation',
        dueDate: '2024-03-01',
        completed: false
      }
    ]
  },
  {
    id: 'chapter-4',
    title: 'Business Income and Expenses',
    description: 'Self-employment income, Schedule C, and business deductions',
    duration: '3.5 hours',
    completed: false,
    progress: 0,
    modules: [
      {
        id: 'mod-4-1',
        title: 'Self-Employment Basics',
        type: 'video',
        content: 'Understanding self-employment income and Schedule SE',
        duration: '45 min',
        completed: false,
        resources: [credibleResources[1]]
      },
      {
        id: 'mod-4-2',
        title: 'Schedule C Preparation',
        type: 'interactive',
        content: 'Profit or loss from business - line-by-line completion',
        duration: '90 min',
        completed: false,
        resources: [credibleResources[1]]
      },
      {
        id: 'mod-4-3',
        title: 'Business Expense Categories',
        type: 'reading',
        content: 'Ordinary and necessary business expenses, home office deduction',
        duration: '60 min',
        completed: false,
        resources: [credibleResources[1]]
      },
      {
        id: 'mod-4-4',
        title: 'Chapter 4 Assessment',
        type: 'quiz',
        content: 'Test your knowledge of business income and expenses',
        duration: '15 min',
        completed: false,
        resources: []
      }
    ],
    homework: [
      {
        id: 'hw-4-1',
        title: 'Schedule C Case Study',
        description: 'Complete Schedule C for a freelance consultant with mixed expenses',
        type: 'form-practice',
        dueDate: '2024-03-08',
        completed: false
      }
    ]
  },
  {
    id: 'chapter-5',
    title: 'Investment Income and Capital Gains',
    description: 'Stocks, bonds, mutual funds, and capital gains/losses reporting',
    duration: '3 hours',
    completed: false,
    progress: 0,
    modules: [
      {
        id: 'mod-5-1',
        title: 'Investment Income Types',
        type: 'video',
        content: 'Interest, dividends, and capital distributions',
        duration: '45 min',
        completed: false,
        resources: [credibleResources[0]]
      },
      {
        id: 'mod-5-2',
        title: 'Capital Gains and Losses',
        type: 'interactive',
        content: 'Schedule D preparation and capital loss limitations',
        duration: '75 min',
        completed: false,
        resources: [credibleResources[0]]
      },
      {
        id: 'mod-5-3',
        title: 'Form 8949 Requirements',
        type: 'reading',
        content: 'Detailed capital gains reporting and basis calculations',
        duration: '45 min',
        completed: false,
        resources: [credibleResources[0]]
      },
      {
        id: 'mod-5-4',
        title: 'Chapter 5 Assessment',
        type: 'quiz',
        content: 'Test your understanding of investment income',
        duration: '15 min',
        completed: false,
        resources: []
      }
    ],
    homework: [
      {
        id: 'hw-5-1',
        title: 'Investment Portfolio Analysis',
        description: 'Calculate capital gains/losses for a complex investment portfolio',
        type: 'calculation',
        dueDate: '2024-03-15',
        completed: false
      }
    ]
  },
  {
    id: 'chapter-6',
    title: 'Retirement and Education Planning',
    description: 'IRA contributions, 401(k) plans, and education tax benefits',
    duration: '2.5 hours',
    completed: false,
    progress: 0,
    modules: [
      {
        id: 'mod-6-1',
        title: 'Retirement Account Contributions',
        type: 'video',
        content: 'Traditional vs. Roth IRA, 401(k) contributions and limits',
        duration: '45 min',
        completed: false,
        resources: [credibleResources[0]]
      },
      {
        id: 'mod-6-2',
        title: 'Education Tax Benefits',
        type: 'reading',
        content: 'American Opportunity Credit, Lifetime Learning Credit, and 529 plans',
        duration: '60 min',
        completed: false,
        resources: [credibleResources[0]]
      },
      {
        id: 'mod-6-3',
        title: 'Retirement Distribution Rules',
        type: 'interactive',
        content: 'Early withdrawal penalties and required minimum distributions',
        duration: '30 min',
        completed: false,
        resources: [credibleResources[0]]
      },
      {
        id: 'mod-6-4',
        title: 'Chapter 6 Assessment',
        type: 'quiz',
        content: 'Test your knowledge of retirement and education planning',
        duration: '15 min',
        completed: false,
        resources: []
      }
    ],
    homework: [
      {
        id: 'hw-6-1',
        title: 'Retirement Planning Scenario',
        description: 'Optimize retirement contributions for different age groups and income levels',
        type: 'case-study',
        dueDate: '2024-03-22',
        completed: false
      }
    ]
  },
  {
    id: 'chapter-7',
    title: 'Special Situations and Advanced Topics',
    description: 'Rental property, foreign income, and complex tax situations',
    duration: '4 hours',
    completed: false,
    progress: 0,
    modules: [
      {
        id: 'mod-7-1',
        title: 'Rental Property Income',
        type: 'video',
        content: 'Schedule E preparation and rental property deductions',
        duration: '60 min',
        completed: false,
        resources: [credibleResources[0]]
      },
      {
        id: 'mod-7-2',
        title: 'Foreign Income Reporting',
        type: 'reading',
        content: 'FBAR requirements and foreign tax credit',
        duration: '45 min',
        completed: false,
        resources: [credibleResources[0]]
      },
      {
        id: 'mod-7-3',
        title: 'Alternative Minimum Tax',
        type: 'interactive',
        content: 'AMT calculation and planning strategies',
        duration: '60 min',
        completed: false,
        resources: [credibleResources[0]]
      },
      {
        id: 'mod-7-4',
        title: 'Divorce and Separation Issues',
        type: 'reading',
        content: 'Alimony, child support, and property transfers',
        duration: '30 min',
        completed: false,
        resources: [credibleResources[0]]
      },
      {
        id: 'mod-7-5',
        title: 'Chapter 7 Assessment',
        type: 'quiz',
        content: 'Test your understanding of special tax situations',
        duration: '25 min',
        completed: false,
        resources: []
      }
    ],
    homework: [
      {
        id: 'hw-7-1',
        title: 'Complex Tax Return Project',
        description: 'Complete a comprehensive tax return with multiple schedules and forms',
        type: 'form-practice',
        dueDate: '2024-03-29',
        completed: false
      }
    ]
  },
  {
    id: 'chapter-8',
    title: 'Professional Practice and Client Management',
    description: 'Client communication, documentation, and professional development',
    duration: '2 hours',
    completed: false,
    progress: 0,
    modules: [
      {
        id: 'mod-8-1',
        title: 'Client Interview Techniques',
        type: 'video',
        content: 'Effective client communication and information gathering',
        duration: '45 min',
        completed: false,
        resources: [credibleResources[2]]
      },
      {
        id: 'mod-8-2',
        title: 'Documentation and Record Keeping',
        type: 'reading',
        content: 'Professional documentation standards and audit preparation',
        duration: '30 min',
        completed: false,
        resources: [credibleResources[2]]
      },
      {
        id: 'mod-8-3',
        title: 'Continuing Education Requirements',
        type: 'interactive',
        content: 'Professional development and staying current with tax law changes',
        duration: '30 min',
        completed: false,
        resources: [credibleResources[2]]
      },
      {
        id: 'mod-8-4',
        title: 'Final Comprehensive Assessment',
        type: 'quiz',
        content: 'Comprehensive test covering all course material',
        duration: '15 min',
        completed: false,
        resources: []
      }
    ],
    homework: [
      {
        id: 'hw-8-1',
        title: 'Professional Portfolio Development',
        description: 'Create a professional portfolio showcasing your tax preparation skills',
        type: 'research',
        dueDate: '2024-04-05',
        completed: false
      }
    ]
  }
];