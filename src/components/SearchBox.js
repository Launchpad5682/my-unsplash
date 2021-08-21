import React from "react";

function SearchBox() {
  return (
    <form className="flex rounded-3xl border-2 border-gray-300 w-min h-8 ml-4 bg-white px-2 pt-1 xs:mt-8 lg:mt-0">
      <input className="focus:outline-none w-60 px-2 py-2 rounded-3xl"></input>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </form>
  );
}

export default SearchBox;
