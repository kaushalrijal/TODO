"use client"

import CreateButton from "@/components/createTask/createButton";
import Header from "@/components/header";
import Tasks from "@/components/Tasks/tasks";
import TaskContext from "@/contexts/taskContext";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Task {
  _id: string;
  title: string;
  priority: number;
  description: string;
  isComplete: boolean;
  __v: number;
  onDelete: (id: string) => void;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);  
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const data = async () =>{
      try{
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/`)
      const result = await response.json();
      console.log(result)
      }
      catch(err) {
      console.log(err)
    }
    }

    data();
  }, [])


  return (
    <main className="w-screen min-h-screen p-2">
      <Header />
      <TaskContext.Provider value={{ tasks, setTasks }}>
      <Tasks />
      <CreateButton />
      </TaskContext.Provider>
    </main>
  );
}
