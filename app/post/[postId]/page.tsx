"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";
import he from "he";
import { getPost } from "@/lib/fetchFunctions";
import ReadComments from "@/components/ReadComments";

function PostPage({ params }: { params: { postId: string } }) {
  const postId = params.postId;
  const postQuery = useQuery({
    queryKey: ["post", params.postId],
    queryFn: async () => {
      const data = await getPost(postId);
      return data;
    },
  });

  return (
    <div>
      <article className="mx-auto max-w-xl">
        {postQuery.isLoading ? <p>Loading... Please wait.</p> : null}
        {postQuery.data ? (
          <div className="py-14">
            <h1 className="pb-1 text-4xl font-semibold text-zinc-950">
              {he.decode(postQuery.data.title)}
            </h1>
            <p className="pb-4 text-sm text-zinc-600">
              Written by: {he.decode(postQuery.data.author.name)}
            </p>
            <p className="whitespace-pre-line">
              {he.decode(postQuery.data.body)}
            </p>
          </div>
        ) : null}
      </article>
      <div className="mx-auto flex max-w-xl flex-col gap-4">
        <ReadComments postId={postId} />
      </div>
    </div>
  );
}

export default PostPage;
