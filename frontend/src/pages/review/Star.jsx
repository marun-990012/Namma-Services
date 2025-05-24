// Star.jsx
import React from "react";

const Star = ({ filled, onClick, onMouseEnter, onMouseLeave }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={filled ? "#facc15" : "none"} // yellow-400
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      className="w-8 h-8 cursor-pointer transition-all duration-200 text-yellow-400"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.916c.969 0 1.371 1.24.588 1.81l-3.978 2.89a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.54 1.118l-3.978-2.89a1 1 0 00-1.176 0l-3.978 2.89c-.784.57-1.838-.197-1.539-1.118l1.518-4.674a1 1 0 00-.364-1.118L2.097 10.1c-.783-.57-.38-1.81.588-1.81h4.916a1 1 0 00.951-.69l1.517-4.674z"
      />
    </svg>
  );
};

export default Star;
