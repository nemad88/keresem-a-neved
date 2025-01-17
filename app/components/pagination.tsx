"use client";

import { Dispatch, SetStateAction } from "react";

type PaginationProps = {
  setPage: Dispatch<SetStateAction<number>>;
  page: number;
  totalPages: number;
  setPerPage?: Dispatch<SetStateAction<number>>;
};

const Pagination = ({
  setPage,
  page,
  totalPages,
  setPerPage,
}: PaginationProps) => {
  return (
    <div className="flex gap-4">
      <select
        className="bg-gray-400 text-slate-50 p-2 rounded-xl"
        onChange={(e) => setPerPage && setPerPage(Number(e.target.value))}
      >
        <option value={10}>10</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
        <option value={200}>200</option>
      </select>
      <button
        disabled={page === 1}
        className="bg-gray-400 text-slate-50 p-2 rounded-xl"
        onClick={() => {
          if (page > 1) setPage(page - 1);
        }}
      >
        Previous
      </button>
      <span>
        Page {page} of {totalPages}
      </span>
      <button
        disabled={page === totalPages}
        className="bg-gray-400 text-slate-50 p-2 rounded-xl"
        onClick={() => {
          if (page < totalPages) setPage(page + 1);
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
