
export type Subject = {
  id: number;
  name: string;
  topics: Topic[];
};

export type Topic = {
  id: number;
  name: string;
  topic: string;
  isDone: boolean;
  isReviewed: boolean;
  importance: 1 | 2 | 3 | 4 | 5;
  difficulty: "Muito Difícil" | "Difícil" | "Médio" | "Fácil" | "Muito Fácil";
  exercisesDone: number;
  hits: number;
  errors: number;
  performance: number;
};

export type SubjectStats = {
  exercisesDone: number;
  hits: number;
  errors: number;
  completedTopics: number;
  totalTopics: number;
};

export type OverallStats = {
  totalExercises: number;
  totalHits: number;
  totalErrors: number;
  completedTopics: number;
  totalTopics: number;
};
