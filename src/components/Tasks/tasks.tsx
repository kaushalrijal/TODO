import React, { Suspense, useEffect, useState } from "react";
import TaskItem from "./taskItem";
import Loading from "./loading";

interface Task {
  _id: string;
  title: string;
  priority: number;
  description: string;
  isComplete: boolean;
  __v: number;
}

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

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
  }, [tasks]);

  const deleteItem = async (id: any) => {
    const dlt = await fetch("http://localhost:5000/tasks/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    const res = await dlt.json();
    console.log(res);

    setTasks((tasks) => tasks.filter((todo) => todo._id !== id));
  };

  return (
    <div className="p-4">
      <h2 className="font-semibold ">Tasks</h2>
      <div className="grid md:grid-cols-2 md:gap-x-4">
        {tasks.map((task: Task) => {
          return (
            <Suspense key={task._id} fallback={<Loading />}>
              <TaskItem taskData={task} onDelete={deleteItem}/>
            </Suspense>
          );
        })}
      </div>
    </div>
  );
};

export default Tasks;
