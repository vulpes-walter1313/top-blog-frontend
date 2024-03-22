"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useRef } from "react";

function CommentForm({ postId }: { postId: string }) {
  const queryClient = useQueryClient();
  const inputRef = useRef(null);
  const submitCommentMutation = useMutation({
    mutationFn: (payload: { body: string }) => {
      return fetch(`http://localhost:3010/posts/${postId}/comments`, {
        mode: "cors",
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
    onError: (err) => {
      console.error(err);
    },
  });
  const onFormSubmitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form as HTMLFormElement);
    const payload = {
      body: formData.get("commentbody") as string,
    };
    console.log(
      "the comment payload going to submitCommentMutation is: ",
      payload,
    );
    console.log(inputRef);
    // @ts-ignore
    inputRef.current.value = "";
    submitCommentMutation.mutate(payload);
  };
  return (
    <form
      className="flex flex-col items-start gap-4"
      onSubmit={onFormSubmitHandler}
    >
      <textarea
        name="commentbody"
        id="commentbody"
        className="h-20 w-72 rounded-md border border-zinc-300 px-4 py-2"
        ref={inputRef}
      ></textarea>
      <button
        type="submit"
        className="rounded-md border-2 border-emerald-500 px-6 py-2 text-emerald-500"
      >
        Submit Comment
      </button>
    </form>
  );
}

export default CommentForm;
