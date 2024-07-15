import { createContext } from "react";

interface Task {
    _id: string;
    title: string;
    priority: number;
    description: string;
    isComplete: boolean;
    __v: number;
    onDelete: (id: string) => void;
  }
const TaskContext = createContext<{ tasks: Task[] | undefined, setTasks: (value: (prevTasks: Task[]) => Task[]) => void }>({ tasks: undefined, setTasks: () => {} });

export default TaskContext

