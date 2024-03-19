import Link from "next/link";
import React from "react";

type PaginationLinksProps = {
  totalPages: number;
  currentPage: number;
  linkText: string;
};
function PaginationLinks({
  totalPages,
  currentPage,
  linkText,
}: PaginationLinksProps) {
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
            className={`${num === currentPage ? "font-bold underline" : ""}`}
          >
            <Link href={`${linkText}${num}`}>{num}</Link>
          </li>
        );
      })}
    </ul>
  );
}

export default PaginationLinks;
