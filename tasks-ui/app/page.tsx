"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axiosClient from "@/lib/axiosClient";
import TaskCard from "@/components/TaskCard";
import TaskDialog from "@/components/TaskDialog";
import TaskDetailsDialog from "@/components/TaskDetailsDialog";
import { toast } from "react-toastify";
import { ModeToggle } from "@/components/ModeToggle";
interface Task {
  id: number | null;
  title: string;
  description: string;
  status: "pending" | "in progress" | "completed";
}

export default function Home() {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [toUpdateTask, setToUpdateTask] = useState<Task | null>(null);
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser({ email: parsedUser.email });
      fetchTasks(parsedUser.accessToken);
    } else {
      router.push("/auth/login");
    }
  }, [router]);

  const fetchTasks = async (token: string) => {
    try {
      const response = await axiosClient.get("/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(response.data);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    }
  };

  const handleAddTask = async (task: {
    title: string;
    description: string;
    status: string;
  }) => {
    const userData = localStorage.getItem("user");
    if (!userData) return;

    const { accessToken } = JSON.parse(userData);
    try {
      const response = await axiosClient.post(
        "/tasks",
        { ...task },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setTasks([...tasks, response.data]);
      setIsDialogOpen(false); // Close dialog
    } catch (error) {
      console.error("Failed to add task", error);
    }
  };

  // Segment tasks by status
  const pendingTasks = tasks.filter((task) => task.status === "pending");
  const inProgressTasks = tasks.filter((task) => task.status === "in progress");
  const completedTasks = tasks.filter((task) => task.status === "completed");

  // Handle the drop event
  // Updated handleDragStart
  const handleDragStart = (task: Task) => {
    // Store only the task's ID when dragging
    localStorage.setItem("draggedTaskId", JSON.stringify(task.id));
  };

  // Updated handleDrop
  const handleDrop = (newStatus: string) => {
    const draggedTaskId = JSON.parse(
      localStorage.getItem("draggedTaskId") || "null"
    );

    if (!draggedTaskId) {
      console.error("No task ID found in localStorage");
      return;
    }

    const updatedTasks: any = tasks.map((task) =>
      task.id === draggedTaskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);

    // Optionally, update the backend with the new status
    const userData = localStorage.getItem("user");
    if (userData) {
      const { accessToken } = JSON.parse(userData);
      axiosClient
        .put(
          `/tasks/${draggedTaskId}`,
          { status: newStatus },
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        )
        .catch((error) => {
          console.error("Failed to update task status:", error);
        });
    }
  };
  const fetchTaskById = async (taskId: number) => {
    const userData = localStorage.getItem("user");
    if (!userData) return;
    const { accessToken } = JSON.parse(userData);
    try {
      const response = await axiosClient.get(`/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setToUpdateTask(response.data);
      setIsDetailsDialogOpen(true);
    } catch (error) {
      console.error("Failed to fetch task details", error);
    }
  };
  const handleUpdateTask = async (updatedTask: Task) => {
    try {
      await axiosClient.put(`/tasks/${updatedTask.id}`, updatedTask);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );
      setIsDetailsDialogOpen(false); // Close the dialog
    } catch (error) {
      console.error("Failed to update task", error);
    }
  };

  const handleDelete = async (taskId: number) => {
    try {
      await axiosClient.delete(`/tasks/${taskId}`);
      toast.success("Task deleted successfully!");
      setTasks(tasks.filter((task) => task.id !== taskId)); // Remove task from state
      setIsDetailsDialogOpen(false); // Close dialog
    } catch (error) {
      console.error("Failed to delete task", error);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md px-4 py-2 flex justify-between items-center">
        <h1 className="text-lg font-bold">Tasks</h1>
        {user && (
          <div className="flex items-center space-x-4">
            <p className="text-gray-600">{user.email}</p>
          </div>
        )}
      </nav>

      <section className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Pending Tasks */}
          <div
            className="space-y-4 p-4 bg-yellow-100"
            onDrop={() => handleDrop("pending")}
            onDragOver={(e) => e.preventDefault()}
          >
            <h3 className="text-lg font-bold mb-2 text-yellow-600">Pending</h3>
            {pendingTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onDragStart={handleDragStart}
                onClick={() => {
                  fetchTaskById(task.id!);
                }}
              />
            ))}
          </div>

          {/* In Progress Tasks */}
          <div
            className="space-y-4 p-4 bg-blue-100"
            onDrop={() => handleDrop("in progress")}
            onDragOver={(e) => e.preventDefault()}
          >
            <h3 className="text-lg font-bold mb-2 text-blue-600">
              In Progress
            </h3>
            {inProgressTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onDragStart={handleDragStart}
                onClick={() => {
                  fetchTaskById(task.id!);
                }}
              />
            ))}
          </div>

          {/* Completed Tasks */}
          <div
            className="space-y-4 p-4 bg-green-100"
            onDrop={() => handleDrop("completed")}
            onDragOver={(e) => e.preventDefault()}
          >
            <h3 className="text-lg font-bold mb-2 text-green-600">Completed</h3>
            {completedTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onDragStart={handleDragStart}
                onClick={() => {
                  fetchTaskById(task.id!);
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Floating Action Button */}
      <button
        onClick={() => setIsDialogOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-500 text-white rounded-full p-4 shadow-lg hover:bg-blue-600"
        aria-label="Add Task"
      >
        +
      </button>

      {/* Dialog Component */}
      <TaskDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onAddTask={handleAddTask}
      />
      <TaskDetailsDialog
        isOpen={isDetailsDialogOpen}
        onClose={() => setIsDetailsDialogOpen(false)}
        onUpdateTask={handleUpdateTask}
        onDelete={handleDelete}
        task={toUpdateTask}
      />
    </main>
  );
}
