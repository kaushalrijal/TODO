"use client"

import CreateButton from "@/components/createTask/createButton";
import Header from "@/components/header";
import Tasks from "@/components/Tasks/tasks";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {

  useEffect(() => {
    const data = async () =>{
      try{
      const response = await fetch("http://localhost:5000/test/")
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
      <Tasks />
      <CreateButton />
    </main>
  );
}
