"use client";

import React, { useEffect, useState } from "react";

interface Task {
  id: number | null;
  title: string;
  description: string;
  status: "pending" | "in progress" | "completed";
}

interface TaskDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateTask: (task: Task) => void; // Ensure this takes the updated task
  onDelete: (taskId: number) => void; // Delete task by ID
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
    status: "pending", // Default status or set from `task`
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
        status: task.status || "pending", // Set default if necessary
      });
    }
  }, [task]);
  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h3 className="text-lg font-bold mb-4">Task Details</h3>
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
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Update
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsDialog;
