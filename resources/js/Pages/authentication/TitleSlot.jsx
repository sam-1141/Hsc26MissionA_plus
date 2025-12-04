// components/TitleSlot.jsx
import React from "react";

const TitleSlot = ({
  logoSrc = "/assets/images/logo/title.png",
  logoAlt = "Logo",
  headline = "#One Mission, One Goal",
  subtitle = "",
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ffffff",
        paddingTop: "1.5rem",
        paddingBottom: "1.5rem",
      }}
    >
      {/* Logo Section */}
      <div
        style={{
          marginBottom: "1rem",
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <img
          src={logoSrc}
          alt={logoAlt}
          style={{
            width: "55vw",           // mobile width approximation
            maxWidth: "200px",
            objectFit: "contain",
            transition: "all 0.3s",
          }}
        />
      </div>

      {/* Optional Subtitle */}
      {subtitle && (
        <h3
          style={{
            fontSize: "1.125rem", // text-lg
            fontWeight: 500,      // font-medium
            color: "#4b5563",     // text-gray-600
            marginBottom: "0.5rem",
            textAlign: "center",
          }}
        >
          {subtitle}
        </h3>
      )}

      {/* Headline */}
      <h1
        style={{
          fontSize: "2rem",          // base text-2xl
          fontWeight: 800,           // font-extrabold
          color: "#111827",          // text-gray-900
          textAlign: "center",
          lineHeight: 1.2,           // leading-snug
        }}
      >
        {headline.split(",").map((part, idx) => (
          <span
            key={idx}
            style={{
              color: idx === 0 ? "#4f46e5" : "#6366f1", // indigo shades
            }}
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
