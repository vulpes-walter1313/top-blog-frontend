"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getComments } from "@/lib/fetchFunctions";
import LoggedInCheck from "./LoggedInCheck";
import CommentForm from "./CommentForm";
import { DateTime } from "luxon";
import ClientPaginationLinks from "./ClientPaginationLinks";
import he from "he";

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

type ReadCommentsProps = {
  postId: string;
};
function ReadComments({ postId }: ReadCommentsProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const commentsQuery = useQuery({
    queryKey: ["comments", postId, `${currentPage}`],
    queryFn: async () => {
      const data = await getComments(postId, String(currentPage));
      return data;
    },
  });
  return (
    <>
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
      {commentsQuery.data ? (
        <ClientPaginationLinks
          totalPages={commentsQuery.data.totalPages}
          currentPage={commentsQuery.data.currentPage}
          setCurrentPage={setCurrentPage}
        />
      ) : null}
    </>
  );
}

export default ReadComments;
