"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";

function LoginPage() {
  // TODO: add use states for error messages
  const router = useRouter();
  const queryClient = useQueryClient();
  const loginMutation = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      // TODO: clear error messages in UI
      const rawRes = await fetch("http://localhost:3010/login", {
        mode: "cors",
        credentials: "include",
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await rawRes.json();
      if (res.success) {
        return;
      } else {
        // TODO: set error messages in UI
        throw new Error("there is an error logging in");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["user"]});
      router.push("/");

    }
  });
  const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form as HTMLFormElement);
    const payload = {
      email: (formData.get("email") as string) || "",
      password: (formData.get("password") as string) || "",
    };
    console.dir(payload);
    loginMutation.mutate(payload);
  };
  // TODO: Add Error messages from the failed statuses of login fetch call
  return (
    <div className="mx-auto flex max-w-4xl flex-col items-center justify-center py-10">
      <h1 className="pb-14 text-3xl font-bold">Login</h1>
      <form
        onSubmit={submitHandler}
        className="flex flex-col items-start gap-4 rounded-md border border-zinc-300 p-4"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-semibold">
            Email:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="rounded-md border border-zinc-300 px-2 py-1 text-base"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="font-semibold">
            Password:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="rounded-md border border-zinc-300 px-2 py-1 text-base"
          />
        </div>
        <button
          type="submit"
          className="rounded-md bg-emerald-600 px-6 py-2 font-bold text-zinc-50"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
