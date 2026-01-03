export interface Certificate {
  id: string;
  studentId: string;
  studentName: string;
  curriculumId: string;
  curriculumTitle: string;
  track: string;
  issuedAt: Date;
  certificateUrl: string;
  verificationCode: string;
  grade?: number; // 0-100
}
