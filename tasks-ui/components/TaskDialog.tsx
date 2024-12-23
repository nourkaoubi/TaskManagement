import React, { useState } from "react";

interface TaskDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (task: {
    title: string;
    description: string;
    status: string;
  }) => void;
}

export default function TaskDialog({
  isOpen,
  onClose,
  onAddTask,
}: TaskDialogProps) {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "pending",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTask(newTask);
    console.log("task", newTask);
    setNewTask({ title: "", description: "", status: "pending" }); // Reset form
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h3 className="text-lg font-bold mb-4">Add New Task</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg p-2"
              required
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
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="status" className="block text-sm font-medium mb-1">
              Status
            </label>
            <select
              id="status"
              value={newTask.status}
              onChange={(e) =>
                setNewTask({ ...newTask, status: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            >
              <option value="pending">Pending</option>
              <option value="in progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
