// app/auth/login/page.tsx
"use client";

import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import axiosClient from "@/lib/axiosClient";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"; // to handle the redirection
import Link from "next/link";

interface LoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
  useEffect(() => {
    const user = localStorage.getItem("user"); // Check if user is logged in
    if (user) {
      router.push("/"); // Redirect to the homepage if user is already logged in
    }
  }, [router]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    try {
      const response = await axiosClient.post("/auth/login", data);
      toast.success("Login successful!");
      localStorage.setItem("user", JSON.stringify(response.data));
      router.push("/");
      window.dispatchEvent(new Event("storage"));
      console.log(response.data); // Handle token or redirect
    } catch (error) {
      toast.error("Login failed. Please try again.");
      console.error(error);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 shadow-md rounded-lg">
        <h1 className="text-xl font-bold mb-4">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <Button type="submit">Login</Button>
        </form>
        <div className="mt-4 text-center">
          <p>
            Don't have an account?{" "}
            <Link
              href="/auth/register"
              className="text-blue-500 hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
