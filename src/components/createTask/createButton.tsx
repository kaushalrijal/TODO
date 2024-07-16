import React, { useContext, useState } from "react";
import { toast } from "sonner"
import { set, z } from "zod";
import { Button } from "../ui/button";
import { Pencil2Icon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Sonner } from "./sonner";
import TaskContext from "@/contexts/taskContext";

const priorities: { [key: number]: string } = {
  1: "Low",
  2: "Medium",
  3: "Normal",
  4: "High",
  5: "Very High",
};

const formSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters" })
    .max(50),
  priority: z
    .number({
      required_error: "Priority is required",
      invalid_type_error: "Priority must be a number",
    })
    .gte(1)
    .lte(5)
    .int(),
  description: z.string().max(100),
});

const CreateButton = () => {
  const [value, setValue] = useState(1);
  const {setTasks} = useContext(TaskContext);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      priority: 1,
      description: "",
    },
  });

  return (
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit((data, event)=>{
              submitData(data, setTasks);
              form.reset();
          })}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="">Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title" {...field} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <FormControl>
                    <Input
                      type="range"
                      max={5}
                      min={1}
                      {...field}
                      onChange={(event) => {
                        const newValue = parseInt(event.target.value);
                        setValue(newValue);
                        if (field.onChange) {
                          field.onChange(newValue);
                        }
                      }}
                      required
                    />
                  </FormControl>
                  <FormDescription className="text-sm text-muted-foreground text-right">
                    {priorities[value]} priority
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Description of the task."
                      {...field}
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button type="submit">Create</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

const submitData = async (values: z.infer<typeof formSchema>, setTasks: React.Dispatch<React.SetStateAction<any>>) => {
  const { title, priority, description } = values;
  const data = await fetch("http://localhost:5000/tasks/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      priority,
      description,
    }),
  });

  try {
    const result = await data.json();
    console.log(result);
    setTasks((tasks: any) => [...tasks, result.data]);
    toast("Created task succesfully")
  } catch (err) {
    console.log(err);
  }
};

export default CreateButton;
