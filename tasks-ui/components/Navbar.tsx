"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"; // Import ShadCN components
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

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
    <nav className="  px-4 py-2 flex justify-between items-center border-b-2  shadow-xl">
      <h1 className="text-lg font-bold">Task Manager</h1>

      <NavigationMenu>
        <NavigationMenuList className="flex space-x-4">
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Home
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          {!isUserLoggedIn ? (
            <>
              <NavigationMenuItem>
                <Link href="/auth/register" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Register
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/auth/login" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Login
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </>
          ) : (
            <button onClick={handleLogout} className="text-sm">
              Logout
            </button>
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}
