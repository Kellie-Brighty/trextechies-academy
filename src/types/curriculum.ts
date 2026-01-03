export interface Curriculum {
  id: string;
  title: string;
  description: string;
  track: 'web-dev' | 'mobile' | 'backend' | 'data-science' | 'devops';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedHours: number;
  modules: Module[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  order: number;
  estimatedHours: number;
  lessons: Lesson[];
  isLocked: boolean;
  progress: number; // 0-100
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  order: number;
  type: 'video' | 'article' | 'exercise' | 'quiz';
  content: string;
  resources: Resource[];
  isCompleted: boolean;
  estimatedMinutes: number;
}

export interface Resource {
  id: string;
  title: string;
  type: 'article' | 'video' | 'documentation' | 'code' | 'pdf';
  url: string;
  description?: string;
}
