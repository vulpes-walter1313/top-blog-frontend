"use client";

import React from "react";

type ClientPaginationLinksProps = {
  totalPages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

function ClientPaginationLinks({
  totalPages,
  currentPage,
  setCurrentPage,
}: ClientPaginationLinksProps) {
  let pageNums: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNums.push(i);
  }

  return (
    <ul className="flex gap-4">
      {pageNums.map((num) => {
        return (
          <li
            key={num}
            onClick={() => setCurrentPage(num)}
            className={`${num === currentPage ? "font-bold underline" : ""} cursor-pointer`}
          >
            {num}
          </li>
        );
      })}
    </ul>
  );
}

export default ClientPaginationLinks;
