import type { Student, Instructor } from '../types/user';
import type { Curriculum } from '../types/curriculum';
import type { Meeting, TimeSlot } from '../types/meeting';
import type { Submission } from '../types/submission';
import type { Certificate } from '../types/certificate';

// Mock Users
export const mockStudents: Student[] = [
  {
    id: '1',
    email: 'john.doe@example.com',
    name: 'John Doe',
    role: 'student',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    createdAt: new Date('2024-01-15'),
    enrolledTracks: ['web-dev', 'backend'],
    currentCurriculumId: 'curr-1',
    progress: 65,
    hoursLogged: 120,
    completedModules: 8,
    totalModules: 12,
  },
  {
    id: '2',
    email: 'jane.smith@example.com',
    name: 'Jane Smith',
    role: 'student',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
    createdAt: new Date('2024-02-01'),
    enrolledTracks: ['mobile'],
    currentCurriculumId: 'curr-2',
    progress: 40,
    hoursLogged: 75,
    completedModules: 4,
    totalModules: 10,
  },
];

export const mockInstructors: Instructor[] = [
  {
    id: 'inst-1',
    email: 'kelly@trextechies.com',
    name: 'Kelly Owoju',
    role: 'admin',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kelly',
    createdAt: new Date('2023-01-01'),
    bio: 'Founder of Trextechies. 10+ years of software development experience.',
    specialties: ['Web Development', 'Backend Architecture', 'DevOps'],
  },
];

// Mock Curricula
export const mockCurricula: Curriculum[] = [
  {
    id: 'curr-1',
    title: 'Full-Stack Web Development Bootcamp',
    description: 'Master modern web development from frontend to backend. Learn React, Node.js, databases, and deployment.',
    track: 'web-dev',
    difficulty: 'beginner',
    estimatedHours: 200,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    modules: [
      {
        id: 'mod-1',
        title: 'HTML & CSS Fundamentals',
        description: 'Learn the building blocks of web development',
        order: 1,
        estimatedHours: 20,
        isLocked: false,
        progress: 100,
        lessons: [
          {
            id: 'lesson-1',
            title: 'Introduction to HTML',
            description: 'Learn HTML tags, elements, and structure',
            order: 1,
            type: 'video',
            content: 'https://www.youtube.com/embed/UB1O30fR-EE',
            resources: [
              {
                id: 'res-1',
                title: 'MDN HTML Guide',
                type: 'documentation',
                url: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
                description: 'Official HTML documentation',
              },
            ],
            isCompleted: true,
            estimatedMinutes: 45,
          },
          {
            id: 'lesson-2',
            title: 'CSS Styling Basics',
            description: 'Style your web pages with CSS',
            order: 2,
            type: 'article',
            content: '# CSS Basics\n\nCSS (Cascading Style Sheets) is used to style HTML elements...',
            resources: [],
            isCompleted: true,
            estimatedMinutes: 60,
          },
        ],
      },
      {
        id: 'mod-2',
        title: 'JavaScript Essentials',
        description: 'Master JavaScript programming fundamentals',
        order: 2,
        estimatedHours: 40,
        isLocked: false,
        progress: 75,
        lessons: [
          {
            id: 'lesson-3',
            title: 'Variables and Data Types',
            description: 'Understanding JavaScript variables',
            order: 1,
            type: 'video',
            content: 'https://www.youtube.com/embed/W6NZfCO5SIk',
            resources: [],
            isCompleted: true,
            estimatedMinutes: 50,
          },
          {
            id: 'lesson-4',
            title: 'Functions and Scope',
            description: 'Learn about JavaScript functions',
            order: 2,
            type: 'exercise',
            content: 'Write a function that calculates the sum of an array of numbers.',
            resources: [],
            isCompleted: false,
            estimatedMinutes: 90,
          },
        ],
      },
      {
        id: 'mod-3',
        title: 'React Fundamentals',
        description: 'Build modern UIs with React',
        order: 3,
        estimatedHours: 50,
        isLocked: true,
        progress: 0,
        lessons: [],
      },
    ],
  },
  {
    id: 'curr-2',
    title: 'Mobile App Development with React Native',
    description: 'Build cross-platform mobile apps for iOS and Android using React Native.',
    track: 'mobile',
    difficulty: 'intermediate',
    estimatedHours: 180,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    modules: [
      {
        id: 'mod-4',
        title: 'React Native Setup',
        description: 'Set up your development environment',
        order: 1,
        estimatedHours: 10,
        isLocked: false,
        progress: 100,
        lessons: [],
      },
      {
        id: 'mod-5',
        title: 'Core Components',
        description: 'Learn React Native components',
        order: 2,
        estimatedHours: 30,
        isLocked: false,
        progress: 50,
        lessons: [],
      },
    ],
  },
  {
    id: 'curr-3',
    title: 'Backend Development with Node.js',
    description: 'Build scalable server-side applications with Node.js, Express, and databases.',
    track: 'backend',
    difficulty: 'intermediate',
    estimatedHours: 150,
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01'),
    modules: [],
  },
];

// Mock Meetings
export const mockMeetings: Meeting[] = [
  {
    id: 'meet-1',
    studentId: '1',
    studentName: 'John Doe',
    instructorId: 'inst-1',
    instructorName: 'Kelly Owoju',
    scheduledAt: new Date('2024-03-15T14:00:00'),
    duration: 30,
    status: 'scheduled',
    topic: 'JavaScript Functions Clarification',
    notes: undefined,
  },
  {
    id: 'meet-2',
    studentId: '1',
    studentName: 'John Doe',
    instructorId: 'inst-1',
    instructorName: 'Kelly Owoju',
    scheduledAt: new Date('2024-03-01T10:00:00'),
    duration: 30,
    status: 'completed',
    topic: 'React State Management',
    notes: 'Discussed useState and useEffect hooks. Student understands the concepts well.',
    recordingUrl: 'https://example.com/recording/meet-2',
  },
];

export const mockTimeSlots: TimeSlot[] = [
  {
    id: 'slot-1',
    instructorId: 'inst-1',
    startTime: new Date('2024-03-20T10:00:00'),
    endTime: new Date('2024-03-20T10:30:00'),
    isAvailable: true,
  },
  {
    id: 'slot-2',
    instructorId: 'inst-1',
    startTime: new Date('2024-03-20T14:00:00'),
    endTime: new Date('2024-03-20T14:30:00'),
    isAvailable: true,
  },
  {
    id: 'slot-3',
    instructorId: 'inst-1',
    startTime: new Date('2024-03-21T11:00:00'),
    endTime: new Date('2024-03-21T11:30:00'),
    isAvailable: false,
    bookedBy: '1',
  },
];

// Mock Submissions
export const mockSubmissions: Submission[] = [
  {
    id: 'sub-1',
    studentId: '1',
    studentName: 'John Doe',
    moduleId: 'mod-2',
    moduleName: 'JavaScript Essentials',
    lessonId: 'lesson-4',
    lessonName: 'Functions and Scope',
    content: 'function sumArray(arr) { return arr.reduce((a, b) => a + b, 0); }',
    submittedAt: new Date('2024-03-10T15:30:00'),
    status: 'approved',
    review: {
      id: 'rev-1',
      submissionId: 'sub-1',
      reviewerId: 'inst-1',
      reviewerName: 'Kelly Owoju',
      finalGrade: 95,
      status: 'approved',
      manualGrade: 95,
      manualFeedback: 'Excellent work! Clean and efficient solution.',
      reviewedAt: new Date('2024-03-11T09:00:00'),
    },
  },
];

// Mock Certificates
export const mockCertificates: Certificate[] = [
  {
    id: 'cert-1',
    studentId: '1',
    studentName: 'John Doe',
    curriculumId: 'curr-1',
    curriculumTitle: 'Full-Stack Web Development Bootcamp',
    track: 'web-dev',
    issuedAt: new Date('2024-03-01'),
    certificateUrl: 'https://example.com/certificates/cert-1.pdf',
    verificationCode: 'TREX-2024-001',
  },
];

// Mock Tutorial Requests
export interface TutorialRequest {
  id: string;
  studentId: string;
  studentName: string;
  title: string;
  description: string;
  learningGoals: string[];
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
  preferredSchedule: string;
  status: 'pending' | 'approved' | 'in-progress' | 'completed';
  submittedAt: Date;
  assignedCurriculumId?: string;
  assignedInstructorId?: string;
}

export const mockRequests: TutorialRequest[] = [
  {
    id: 'req-1',
    studentId: '1',
    studentName: 'John Doe',
    title: 'Learn Backend Development',
    description: 'I want to learn how to build REST APIs and work with databases.',
    learningGoals: ['Build REST APIs', 'Database design', 'Authentication'],
    skillLevel: 'intermediate',
    preferredSchedule: 'Evenings and weekends',
    status: 'approved',
    submittedAt: new Date('2024-02-15'),
    assignedCurriculumId: 'curr-3',
    assignedInstructorId: 'inst-1',
  },
  {
    id: 'req-2',
    studentId: '2',
    studentName: 'Jane Smith',
    title: 'Mobile App Development',
    description: 'Want to build mobile apps for iOS and Android.',
    learningGoals: ['React Native basics', 'Navigation', 'API integration'],
    skillLevel: 'beginner',
    preferredSchedule: 'Flexible',
    status: 'pending',
    submittedAt: new Date('2024-03-01'),
  },
];

// Current user (for demo purposes)
export const currentUser: Student = mockStudents[0];
export const isAdmin = false; // Toggle this to switch between student and admin views
