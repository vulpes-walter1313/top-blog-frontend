"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";
import he from "he";
import { getComments, getPost } from "@/lib/fetchFunctions";
import { DateTime } from "luxon";
import LoggedInCheck from "@/components/LoggedInCheck";
import CommentForm from "./CommentForm";

type CommentType = {
  _id: string;
  commentAuthor: {
    _id: string;
    name: string;
  };
  postId: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
function PostPage({ params }: { params: { postId: string } }) {
  const postId = params.postId;
  const postQuery = useQuery({
    queryKey: ["post", params.postId],
    queryFn: async () => {
      const data = await getPost(postId);
      return data;
    },
  });
  const commentsQuery = useQuery({
    queryKey: ["comments", postId],
    queryFn: async () => {
      const data = await getComments(postId);
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
        {commentsQuery.isLoading ? <p>Comments are loading...</p> : null}
        {commentsQuery.data ? (
          <>
            <h2 className="text-2xl font-medium">
              {commentsQuery.data.numComments} Comments
            </h2>
            {/* implement add comment */}
            <LoggedInCheck>
              <CommentForm postId={postId} />
            </LoggedInCheck>
            <div className="flex flex-col gap-4">
              {commentsQuery.data.numComments === 0 ? (
                <p>No comments here</p>
              ) : null}
              {commentsQuery.data.comments.map((comment: CommentType) => {
                return (
                  <div
                    key={comment._id}
                    className="border-l-4 border-emerald-400 px-4"
                  >
                    <p>{he.decode(comment.commentAuthor.name)}</p>
                    <p className="pb-2 text-xs text-zinc-600">
                      {DateTime.fromISO(comment.updatedAt).toLocaleString(
                        DateTime.DATETIME_MED,
                      )}
                    </p>
                    <p>{he.decode(comment.body)}</p>
                  </div>
                );
              })}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default PostPage;
