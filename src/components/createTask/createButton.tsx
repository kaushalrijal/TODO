import React, { useState } from "react";
import { Button } from "../ui/button";
import { Pencil2Icon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";

const priorities: { [key: number]: string } = {
  1: "Low",
  2: "Medium",
  3: "Normal",
  4: "High",
  5: "Very High"
}

const CreateButton = () => {
  const [value, setValue] = useState(0);

  return (
    <form>
      <Dialog>
        <DialogTrigger asChild>
          <Button size="icon" className="fixed bottom-4 right-4">
            <Pencil2Icon className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Task</DialogTitle>
            <DialogDescription>Create a new task.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input id="title" placeholder="Title" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="priority" className="text-right">
                Priority
              </Label>
              <Input
                id="priority"
                placeholder="Title"
                type="range"
                min={1}
                max={5}
                className="col-span-3"
                onChange={(event)=>{setValue(event.target.value)}}
              />
              <p className="text-sm text-muted-foreground col-span-4 text-right">
                {priorities[value]} priority
              </p>
            </div>

            <div className="grid grid-cols-4 items-top gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                placeholder="Description of the task."
                className="col-span-3"
                id="description"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </form>
  );
};

const SubmitAction = async (e) => {
  e.preventDefault();
  const data = await fetch("http://localhost:5000/test", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      bhaisiko: "tauko",
    }),
  });

  const result = await data.json();
  console.log(result);
};

export default CreateButton;
