"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface TaskCardProps {
  task: Task;
  onDragStart: (task: Task) => void;
  onClick?: () => void;
}

interface Task {
  id: number | null;
  title: string;
  description: string;
  status: "pending" | "in progress" | "completed";
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onDragStart, onClick }) => {
  const router = useRouter();

  return (
    <div
      draggable
      onDragStart={() => onDragStart(task)}
      onClick={onClick}
      className={`shadow-lg rounded-lg p-4 cursor-pointer 
        bg-white dark:bg-black dark:bg-opacity-75
        hover:bg-gray-100 dark:hover:bg-black dark:hover:bg-opacity-80
      `}
    >
      <h4 className="font-semibold text-lg text-black dark:text-white">
        {task.title}
      </h4>
      <p className="text-gray-600">{task.description}</p>
      <p
        className={`mt-2 text-sm ${
          task.status === "completed"
            ? "text-green-600"
            : task.status === "in progress"
            ? "text-blue-600"
            : "text-yellow-600"
        }`}
      >
        {task.status}
      </p>
    </div>
  );
};

export default TaskCard;
