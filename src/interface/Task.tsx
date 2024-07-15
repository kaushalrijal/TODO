interface Task {
  _id: string;
  title: string;
  priority: number;
  description: string;
  isComplete: boolean;
  __v: number;
  onDelete: (id: string) => void;
}

type PriorityType = "outline" | "secondary" | "default" | "destructive";

interface Priority {
  type: PriorityType;
  value: string;
}

export type { Task, Priority };

