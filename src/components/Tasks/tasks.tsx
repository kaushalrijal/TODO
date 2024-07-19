"use client"

import React, { Suspense, useContext, useEffect, useState } from "react";
import TaskItem from "./taskItem";
import Loading from "./loading";
import TaskContext from "@/contexts/taskContext";
import { Task } from "@/interface/Task";
import { useRouter } from "next/navigation";

const Tasks = () => {
  const { tasks, setTasks } = useContext(TaskContext);
  const [loading, setLoading] = useState(false)
  const router = useRouter();

  useEffect(() => {
    let isMounted = true; 
    setLoading(true);

    const getTasks = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/tasks/get`, {
          credentials: "include"
        });
        if (!response.ok) {
          router.push("/auth");
          return;
        }
        const result = await response.json();
        if (isMounted) {
          setTasks(result); 
          setLoading(false);
        }
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
        if (isMounted) setLoading(false);
      }
    };

    getTasks();

    return () => {
      isMounted = false; // Cleanup function to avoid state update on unmounted component
    };
  }, []);
  

  const deleteItem = async (id: any) => {
    const dlt = await fetch(`${process.env.NEXT_PUBLIC_URL}/tasks/delete`, {
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
          {loading ? "Loading..." : tasks?.map((task: Task) => {
            return (
              <TaskItem key={task._id} taskData={task} onDelete={deleteItem} />
            );
          })}
        </Suspense>
        {!loading && tasks?.length===0 ? "Nothing to see here... Perhaps create a task" : ""}
      </div>
    </div>
  );
};


export default Tasks;