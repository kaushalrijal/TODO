import React, { Suspense, useEffect, useState } from "react";
import TaskItem from "./taskItem";
import Loading from "./loading";

interface Task {
  _id: string;
  title: string;
  priority: number;
  description: string;
  __v: number;
}

const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const response = await fetch("http://localhost:5000/tasks/");
      const result = await response.json();
      console.log(result);
      setTasks(result);
    };
    try {
      getTasks();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div className="p-4">
      <h2 className="font-semibold ">Tasks</h2>
      <div className="grid md:grid-cols-2 md:gap-x-4">
      {tasks.map((task: Task) => {
        return (
          <Suspense key={task._id} fallback={<Loading />}>
            <TaskItem taskData={task} idt={task._id} />
          </Suspense>
        );
      })}
      </div>
    </div>
  );
};

export default Tasks;
