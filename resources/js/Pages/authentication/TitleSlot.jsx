// components/TitleSlot.jsx
import React from "react";

const TitleSlot = ({
  logoSrc = "/assets/images/logo/title.png",
  logoAlt = "Logo",
  headline = "#One Mission, One Goal",
  subtitle = "",
}) => {
  return (
    <div className="flex flex-col items-center justify-center bg-white py-6">
      {/* Logo Section */}
      <div className="mb-4">
        <img
          src={logoSrc}
          alt={logoAlt}
          className="h-20 sm:h-24 md:h-28 object-contain"
        />
      </div>

      {/* Optional Subtitle */}
      {subtitle && (
        <h3 className="text-lg sm:text-xl font-medium text-gray-600 mb-2">
          {subtitle}
        </h3>
      )}

      {/* Headline */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 text-center leading-snug">
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
