import React from 'react'
import { Link } from "react-router-dom";

function UserNav({ search, setSearch }) {
  return (
    <nav className="flex flex-col md:flex-row justify-between items-center px-5 py-3 shadow">
      <div className="flex flex-row gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-shopping-basket-icon lucide-shopping-basket"
        >
          <path d="m15 11-1 9" />
          <path d="m19 11-4-7" />
          <path d="M2 11h20" />
          <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4" />
          <path d="M4.5 15.5h15" />
          <path d="m5 11 4-7" />
          <path d="m9 11 1 9" />
        </svg>
        <h2 className="font-semibold">Products</h2>
      </div>
      <input
        placeholder="Search by name or category..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border px-2 py-1 rounded-sm w-full md:w-1/3 mt-4 md:mt-0"
      />
    </nav>
  )
}

export default UserNav