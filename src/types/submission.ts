export interface Submission {
  id: string;
  studentId: string;
  studentName: string;
  moduleId: string;
  moduleName: string;
  lessonId: string;
  lessonName: string;
  content: string;
  fileUrls?: string[];
  submittedAt: Date;
  status: 'pending' | 'reviewed' | 'approved' | 'revision-requested';
  review?: Review;
}

export interface Review {
  id: string;
  submissionId: string;
  reviewerId: string;
  reviewerName: string;
  aiGrade?: number; // 0-100
  aiFeeback?: string;
  manualGrade?: number; // 0-100
  manualFeedback?: string;
  finalGrade: number; // 0-100
  status: 'approved' | 'revision-requested';
  reviewedAt: Date;
}
