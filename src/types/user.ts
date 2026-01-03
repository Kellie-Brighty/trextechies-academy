export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'admin';
  avatar?: string;
  createdAt: Date;
}

export interface Student extends User {
  role: 'student';
  enrolledTracks: string[];
  currentCurriculumId?: string;
  progress: number; // 0-100
  hoursLogged: number;
  completedModules: number;
  totalModules: number;
}

export interface Instructor extends User {
  role: 'admin';
  bio?: string;
  specialties: string[];
}
