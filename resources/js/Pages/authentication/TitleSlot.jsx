// components/TitleSlot.jsx
import React from "react";

const TitleSlot = ({ logoAlt = "Logo", headline = "#One Mission, One Goal", subtitle = "Place for Logo" }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-white py-4">
      <h3 className="text-xl font-semibold text-gray-800">{subtitle}</h3>

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 text-center leading-snug mt-2">
        {headline.split(",").map((part, idx) => (
          <span
            key={idx}
            className={idx === 0 ? "text-indigo-600" : "text-indigo-500"}
          >
            {part.trim()}
            {idx === 0 ? "," : ""}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default TitleSlot;
