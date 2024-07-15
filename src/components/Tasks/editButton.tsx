import { Pencil1Icon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import { z } from "zod";
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
import { useContext, useState } from "react";
import TaskContext from "@/contexts/taskContext";

const priorities: { [key: number]: string } = {
  1: "Low",
  2: "Medium",
  3: "Normal",
  4: "High",
  5: "Very High",
};

const formSchema = z.object({
  id: z.string(),
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
  isComplete: z.boolean(),
});

export function EditButton(props: { data: { title: any; description: any; priority: any; isComplete: any; _id: any; }; }) {
  const { title, description, priority, isComplete, _id } = props.data;

  const { tasks, setTasks } = useContext(TaskContext);

  const [value, setValue] = useState(1);

  const { reset } = useForm();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: _id,
      title: title,
      priority: priority,
      description: description,
      isComplete,
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Pencil1Icon className="w-8 h-8 bg-black text-white rounded-full p-1.5 cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your task here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data, event) => {
              updateData(data, setTasks);
              form.reset();
            })}
          >
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
                <Button type="submit">Save changes</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

const updateData = async (
  values: z.infer<typeof formSchema>,
  setTasks: React.Dispatch<React.SetStateAction<{ _id: string; }[]>>
) => {
  const { title, priority, description, id, isComplete } = values;
  const data = await fetch("http://localhost:5000/tasks/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      priority,
      description,
      id,
      isComplete,
    }),
  });

  try {
    const result = await data.json();
    console.log(result);
    setTasks((tasks: { _id: string; }[]) => {
        return tasks.map((task: { _id: string; }) => {
            if (task._id === id) {
            return { ...task, title, priority, description, isComplete };
            }
            return task;
        });
        });
    
    // toast("Task updated succesfully");
  } catch (err) {
    console.log(err);
  }
};
