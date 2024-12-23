"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axiosClient from "@/lib/axiosClient";
import { toast } from "react-toastify";

interface Task {
  id: number; // Make it required
  title: string;
  description: string;
}

export default function TaskDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axiosClient.get(`/tasks/${id}`);
        setTask(response.data);
      } catch (error) {
        console.error("Failed to fetch task", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTask();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axiosClient.delete(`/tasks/${id}`);
      toast.success("Task deleted successffully!!!");
      router.push("/"); // Redirect back to the home page after deletion
    } catch (error) {
      console.error("Failed to delete task", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const updatedTask: Task = {
        id: task!.id, // Ensure `id` is always included
        title: "Updated Title", // Update with your own logic
        description: "Updated Description",
      };
      await axiosClient.put(`/tasks/${id}`, updatedTask);
      setTask(updatedTask); // Update the local state
    } catch (error) {
      console.error("Failed to update task", error);
    }
  };

  if (isLoading) return <p>Loading...</p>;

  if (!task) return <p>Task not found.</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{task.title}</h1>
      <p className="text-gray-600 mb-4">{task.description}</p>
      <div className="flex space-x-4">
        <button
          onClick={handleUpdate}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
