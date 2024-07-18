import React, { Suspense, useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { Badge } from "../ui/badge";
import { EditButton } from "./editButton";
import Loading from "./loading";


type PriorityType = "outline" | "secondary" | "default" | "destructive";

interface Task {
  _id: string;
  title: string;
  priority: number;
  description: string;
  isComplete: boolean;
  __v: number;
  onDelete: (id: string) => void;
}

interface Priority {
  type: PriorityType;
  value: string;
}

const priorities: Record<number, Priority> = {
  1: {
    type: "outline",
    value: "Low",
  },
  2: {
    type: "secondary",
    value: "Medium",
  },
  3: {
    type: "default",
    value: "Normal",
  },
  4: {
    type: "destructive",
    value: "High",
  },
  5: {
    type: "destructive",
    value: "Very High",
  },
};

const TaskItem = (props: {
  taskData: {
    title: any;
    description: any;
    priority: any;
    isComplete: any;
    _id: any;
    onDelete: any;
  };
  onDelete: (arg0: any) => void;
}) => {
  const { title, description, priority, isComplete, _id, onDelete } =
    props.taskData;

  const [checked, setChecked] = useState(isComplete);
  return (
    <div className="w-full border border-black p-2 my-2 rounded-md flex">
      <Label htmlFor={_id} className="flex w-1/6 items-center justify-center">
        <Checkbox
          id={_id}
          className="h-6 w-6"
          checked={checked}
          onCheckedChange={() => {
            setChecked(!checked);
            changeStatus(_id, !checked);
          }}
        />
      </Label>
      <Label htmlFor={_id} className="w-3/6">
        <h3 className="font-semibold">
          {title}&nbsp;
          <Badge variant={`${priorities[priority].type}`}>
            {priorities[priority].value}
          </Badge>
        </h3>
        <h4 className="text-muted-foreground">{description}</h4>
      </Label>
      <div className="w-2/6 flex gap-2 justify-end items-center">
        <Suspense fallback={<Loading />}>
          <EditButton data={props.taskData} />
        </Suspense>
        <TrashIcon
          className="w-8 h-8 bg-black text-white rounded-full p-1.5 cursor-pointer"
          onClick={() => props.onDelete(_id)}
        />
      </div>
    </div>
  );
};

const changeStatus = async (id: String, completed: boolean) => {
  const change = await fetch("http://localhost:5000/tasks/complete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      completed,
    }),
    credentials: "include"
  });

  const res = await change.json();

  console.log(res);
};

export default TaskItem;
