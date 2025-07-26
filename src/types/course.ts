export interface Chapter {
  id: string;
  title: string;
  description: string;
  duration: string;
  modules: Module[];
  homework: HomeworkAssignment[];
  completed: boolean;
  progress: number;
}

export interface Module {
  id: string;
  title: string;
  type: 'video' | 'reading' | 'interactive' | 'quiz';
  content: string;
  duration: string;
  completed: boolean;
  resources: Resource[];
}

export interface HomeworkAssignment {
  id: string;
  title: string;
  description: string;
  type: 'form-practice' | 'case-study' | 'calculation' | 'research';
  dueDate: string;
  completed: boolean;
  submittedAt?: string;
  grade?: number;
  feedback?: string;
}

export interface Resource {
  id: string;
  title: string;
  url: string;
  type: 'irs' | 'aicpa' | 'publication' | 'form' | 'guide';
  description: string;
}

export interface UserProgress {
  userId: string;
  chaptersCompleted: string[];
  modulesCompleted: string[];
  homeworkCompleted: string[];
  overallProgress: number;
  certificateEarned: boolean;
  lastAccessed: string;
}

export interface Quiz {
  id: string;
  title: string;
  questions: QuizQuestion[];
  passingScore: number;
  timeLimit?: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'true-false' | 'fill-blank';
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
}