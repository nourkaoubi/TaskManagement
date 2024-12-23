/*"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface NavbarProps {
  user: string | null;
}

export default function Navbar({ user }: NavbarProps) {
  const router = useRouter();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setIsUserLoggedIn(true);
      console.log("USEERRRR", user);
    } else {
      setIsUserLoggedIn(false);
      console.log("NOOOOOO USEERRRR", user);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user session
    setIsUserLoggedIn(false); // Update state to reflect logout
    router.push("/auth/login"); // Redirect to login page
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <nav className="bg-gray-800 text-white px-4 py-2 flex justify-between items-center">
      <h1 className="text-lg font-bold">Task Manager</h1>
      <div>
        {!isUserLoggedIn ? (
          <>
            <Link href="/auth/register" className="mr-2 text-white">
              Register
            </Link>
            <Link href="/auth/login" className="text-white">
              Login
            </Link>
          </>
        ) : (
          <button onClick={handleLogout} className="text-white">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
*/ "use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface NavbarProps {
  user: string | null;
}

export default function Navbar({ user }: NavbarProps) {
  const router = useRouter();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(!!user);

  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem("user");
      setIsUserLoggedIn(!!storedUser);
    };

    // Update state when the component mounts
    handleStorageChange();

    // Listen for `storage` events
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user session
    setIsUserLoggedIn(false); // Update state to reflect logout
    router.push("/auth/login"); // Redirect to login page
    window.dispatchEvent(new Event("storage")); // Notify other tabs/components
  };

  return (
    <nav className="bg-gray-800 text-white px-4 py-2 flex justify-between items-center">
      <h1 className="text-lg font-bold">Task Manager</h1>
      <div>
        {!isUserLoggedIn ? (
          <>
            <Link href="/auth/register" className="mr-2 text-white">
              Register
            </Link>
            <Link href="/auth/login" className="text-white">
              Login
            </Link>
          </>
        ) : (
          <button onClick={handleLogout} className="text-white">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
