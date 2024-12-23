"use client";

import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import axiosClient from "@/lib/axiosClient";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"; // to handle the redirection
import Link from "next/link";

interface RegisterForm {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Register() {
  const router = useRouter();
  useEffect(() => {
    const user = localStorage.getItem("user"); // Adjust based on how you store user data
    if (user) {
      router.push("/"); // Redirect to the homepage if user is already logged in
    }
  }, [router]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>();

  const onSubmit: SubmitHandler<RegisterForm> = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await axiosClient.post("/auth/register", {
        email: data.email,
        password: data.password,
      });
      toast.success("Registration successful!");
      router.push("/auth/login");
      console.log(response.data); // Handle redirection
    } catch (error) {
      toast.error("Registration failed. Please try again.");
      console.error(error);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 shadow-md rounded-lg">
        <h1 className="text-xl font-bold mb-4">Register</h1>
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
          <div>
            <label className="block text-sm font-medium mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg"
              {...register("confirmPassword", {
                required: "Confirm password is required",
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <Button type="submit">Register</Button>
        </form>
        <div className="mt-4 text-center">
          <p>
            Already have an account?{" "}
            <Link href="/auth/login" className="text-blue-500 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
