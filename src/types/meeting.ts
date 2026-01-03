export interface Meeting {
  id: string;
  studentId: string;
  studentName: string;
  instructorId: string;
  instructorName: string;
  scheduledAt: Date;
  duration: number; // minutes
  status: 'scheduled' | 'completed' | 'cancelled';
  topic?: string;
  notes?: string;
  recordingUrl?: string;
}

export interface TimeSlot {
  id: string;
  instructorId: string;
  startTime: Date;
  endTime: Date;
  isAvailable: boolean;
  bookedBy?: string;
}
