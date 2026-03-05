export type Role = 'STUDENT' | 'INSTRUCTOR' | 'ADMIN';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Course {
  id: string;
  instructorId: string;
  title: string;
  description: string;
  price: number;
  thumbnailUrl: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  modules?: Module[];
}

export interface Module {
  id: string;
  courseId: string;
  title: string;
  order: number;
  lessons?: Lesson[];
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  type: 'VIDEO' | 'PDF' | 'TEXT' | 'QUIZ';
  contentUrl?: string; // S3 URL
  textContent?: string;
  duration?: number; // in seconds
  order: number;
}

export interface Quiz {
  id: string;
  lessonId: string;
  questions: Question[];
}

export interface Question {
  id: string;
  quizId: string;
  text: string;
  type: 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'TEXT';
  options?: string[];
  correctAnswer: string;
}

export interface Progress {
  id: string;
  userId: string;
  courseId: string;
  completedLessons: string[]; // Array of Lesson IDs
  completionPercentage: number;
  lastAccessed: Date;
}

export interface Transaction {
  id: string;
  userId: string;
  courseId: string;
  amount: number;
  status: 'PENDING' | 'SUCCESS' | 'FAILED';
  stripePaymentIntentId: string;
  createdAt: Date;
}
