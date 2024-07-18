import React, { Suspense, useContext, useEffect, useState } from "react";
import TaskItem from "./taskItem";
import Loading from "./loading";
import TaskContext from "@/contexts/taskContext";
import { Task } from "@/interface/Task";

const Tasks = () => {

  const { tasks, setTasks } = useContext(TaskContext);

  useEffect(() => {
    const getTasks = async () => {
      const response = await fetch("http://localhost:5000/tasks/get", {
        credentials: "include"
      });
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

  const deleteItem = async (id: any) => {
    const dlt = await fetch("http://localhost:5000/tasks/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ id }),
    });

    const res = await dlt.json();
    console.log(res);

    setTasks((tasks: Task[]) => tasks.filter((todo) => todo._id !== id));
  };


  return (
    <div className="p-4">   
      <h2 className="font-semibold ">Your Tasks</h2>
      <div className="grid md:grid-cols-2 md:gap-x-4">
        <Suspense fallback={<Loading />}>
          {tasks?.map((task: Task) => {
            return (
              <TaskItem key={task._id} taskData={task} onDelete={deleteItem} />
            );
          })}
        </Suspense>

      </div>
    </div>
  );
};

export default Tasks;
