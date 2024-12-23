"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, setUser] = useState<string | null>(null);

  // Check if a user is stored in localStorage when the component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser.email);
      console.log("userrrrrrr", storedUser); // Adjust based on your data structure
    } else {
      console.log("nooo user", storedUser);
    }
  }, []);

  // Listen for changes in localStorage and update state
  const handleUserChange = (event: StorageEvent) => {
    if (event.key === "user") {
      const storedUser = event.newValue;
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser.email); // Adjust based on your data structure
      } else {
        setUser(null);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("storage", handleUserChange);

    return () => {
      window.removeEventListener("storage", handleUserChange);
    };
  }, []);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar user={user} /> {/* Pass user state as a prop */}
        <main className="container mx-auto p-4">
          {" "}
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </main>
      </body>
    </html>
  );
}
