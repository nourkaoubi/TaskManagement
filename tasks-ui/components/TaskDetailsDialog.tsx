"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"; // Import ShadCN Dialog components
import { Button } from "./ui/button";

interface Task {
  id: number | null;
  title: string;
  description: string;
  status: "pending" | "in progress" | "completed";
}

interface TaskDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateTask: (task: Task) => void;
  onDelete: (taskId: number) => void;
  task: any;
}

const TaskDetailsDialog: React.FC<TaskDetailsDialogProps> = ({
  isOpen,
  onClose,
  onUpdateTask,
  onDelete,
  task,
}) => {
  const [updatedTask, setUpdatedTask] = useState<Task>({
    id: null,
    title: "",
    description: "",
    status: "pending",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (updatedTask) {
      onUpdateTask(updatedTask);
    } else {
      console.log("no task");
    }
  };

  useEffect(() => {
    if (task) {
      setUpdatedTask({
        id: task.id,
        title: task.title || "",
        description: task.description || "",
        status: task.status || "pending",
      });
    }
  }, [task]);

  if (!isOpen || !task) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>
        {/* The trigger could be any button or event that opens the dialog */}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Task Details</DialogTitle>
          <DialogDescription>Update or delete this task</DialogDescription>
        </DialogHeader>

        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={updatedTask.title}
            onChange={(e) =>
              setUpdatedTask({ ...updatedTask, title: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            value={updatedTask.description}
            onChange={(e) =>
              setUpdatedTask({ ...updatedTask, description: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <Button onClick={() => onDelete(task.id)} variant="destructive">
            Delete
          </Button>
          <Button onClick={handleSubmit}>Update</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDetailsDialog;
