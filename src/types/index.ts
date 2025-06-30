// Type definitions for the app

export interface User {
  _id: string;
  email: string;
  name?: string;
  preferences?: {
    units: "metric" | "imperial";
    fitnessLevel: "beginner" | "intermediate" | "advanced";
  };
  createdAt?: number;
}

export interface Exercise {
  name: string;
  sets: number;
  reps: number | string;
  weight?: number;
  duration?: number;
  restTime?: number;
  notes?: string;
}

export interface WorkoutPlan {
  _id: string;
  userId: string;
  name: string;
  description?: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  duration: number;
  exercises: Exercise[];
  tags?: string[];
  isAIGenerated: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface WorkoutSet {
  reps: number;
  weight?: number;
  duration?: number;
  completed: boolean;
  notes?: string;
}

export interface WorkoutExercise {
  name: string;
  sets: WorkoutSet[];
}

export interface Workout {
  _id: string;
  userId: string;
  planId?: string;
  name: string;
  date: number;
  duration?: number;
  exercises: WorkoutExercise[];
  notes?: string;
  rating?: number;
  createdAt: number;
}