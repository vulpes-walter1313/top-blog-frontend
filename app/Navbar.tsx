"use client";
import Link from "next/link";
import React from "react";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

function Navbar() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data, isLoading, isError, status } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const rawData = await fetch(`http://localhost:3010/currentuser`, {
        mode: "cors",
        credentials: "include",
      });
      const data = await rawData.json();
      if (data.success) {
        return data;
      } else {
        throw new Error("user is not logged in");
      }
    },
  });
  const logoutMutation = useMutation({
    mutationFn: () => {
      return fetch("http://localhost:3010/logout", {
        mode: "cors",
        credentials: "include",
        method: "GET",
      });
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["user"] });
      router.push("/");
    },
  });
  return (
    <nav className="border-b border-slate-400 bg-slate-50 px-2 py-2 text-slate-800">
      <div className="mx-auto flex max-w-7xl items-center justify-around">
        <p className="text-3xl font-bold">Cool Site</p>
        {status === "success" && data ? (
          <ul className="flex items-center gap-4">
            <li>
              <Link href="/" className="font-medium">
                Home
              </Link>
            </li>
            <li>
              <button
                type="button"
                onClick={() => logoutMutation.mutate()}
                className="rounded-lg bg-emerald-600 px-6 py-2 font-medium text-zinc-100"
              >
                Logout
              </button>
            </li>
          </ul>
        ) : (
          <ul className="flex items-center gap-4">
            <li>
              <Link href="/" className="font-medium">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/login"
                className="block rounded-lg bg-emerald-600 px-6 py-2 font-medium text-zinc-100"
              >
                Login
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
