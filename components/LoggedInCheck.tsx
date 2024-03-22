"use client";
import { getUserStateFromServer } from "@/lib/fetchFunctions";
import { useQuery } from "@tanstack/react-query";
import React from "react";

function LoggedInCheck({ children }: { children: React.ReactNode }) {
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: getUserStateFromServer,
  });
  if (data) {
    return <>{children}</>;
  } else {
    return null;
  }
}

export default LoggedInCheck;
