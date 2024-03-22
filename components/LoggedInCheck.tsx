"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";

function LoggedInCheck({ children }: { children: React.ReactNode }) {
  const { data } = useQuery({
    queryKey: ["loggedInUser"],
    queryFn: async () => {
      const rawRes = await fetch("http://localhost:3010/currentuser", {
        mode: "cors",
        credentials: "include",
      });
      const data = await rawRes.json();
      if (data.success) {
        return data;
      } else {
        throw new Error("user is not logged in");
      }
    },
  });
  if (data) {
    return <>{children}</>;
  } else {
    return null;
  }
}

export default LoggedInCheck;
