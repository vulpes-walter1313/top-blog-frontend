"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import he from "he";
import { ImSpinner } from "react-icons/im";
import { useSearchParams } from "next/navigation";
import { DiVim } from "react-icons/di";
import PaginationLinks from "@/components/PaginationLinks";

type PostType = {
  _id: string;
  title: string;
  body: string;
  author: {
    name: string;
  };
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  commentCount: number;
};

export default function Home() {
  const pageParams = useSearchParams();
  const { data, isLoading, isError, status } = useQuery({
    queryKey: ["posts", `${pageParams.get("page") || "1"}`],
    queryFn: async () => {
      const rawRes = await fetch(
        `http://localhost:3010/posts?page=${pageParams.get("page") || "1"}&comments=true`,
        {
          credentials: "include",
          mode: "cors",
        },
      );
      const data = await rawRes.json();
      if (data.success == false) {
        throw new Error("error getting data from /posts");
      }
      console.log(data);
      return {
        posts: data.posts,
        totalPages: data.totalPages,
        currentPage: data.currentPage,
      };
    },
  });
  return (
    <main className="py-10">
      <div className="mx-auto flex max-w-xl flex-col justify-center gap-4">
        <h1 className="text-4xl font-bold">Read and Learn</h1>
        <div className="flex flex-col gap-6">
          {isLoading ? (
            <ImSpinner className="animate-spin text-emerald-600" />
          ) : null}
          {isError ? (
            <p>
              Sorry, there was an error fetching data. Try refreshing the page,
              if that doesn&apos;t work, try again later.
            </p>
          ) : null}
          {data &&
            data.posts.map((post: PostType) => {
              return (
                <div key={post._id}>
                  <Link href={`/post/${post._id}`}>
                    <h2 className="pb-2 text-3xl font-semibold text-zinc-950 hover:text-emerald-600">
                      {he.decode(post.title)}
                    </h2>
                  </Link>
                  <p className="text-zinc-800">
                    {he.decode(post.body.slice(0, 100)) + "..."}
                  </p>
                  <Link href={`/post/${post._id}`}>
                    <p className="text-zinc-600 hover:text-emerald-600">
                      {post.commentCount} comments
                    </p>
                  </Link>
                </div>
              );
            })}
          {data && (
            <PaginationLinks
              totalPages={data.totalPages}
              currentPage={data.currentPage}
              linkText="/?page="
            />
          )}
        </div>
      </div>
    </main>
  );
}
