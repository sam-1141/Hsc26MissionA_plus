import React from "react";
import { usePage } from "@inertiajs/react";
import TitleSlot from "../authentication/TitleSlot";
import Header from "./Header";

export default function Hsc26Video() {
  const { videoUrl, title, message, purchase_link } = usePage().props;

  // Extract YouTube Video ID
  const videoId = videoUrl?.split("v=")[1]?.split("&")[0];

  if (!videoId) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f9fafb",
          color: "#b91c1c",
          fontWeight: "600",
          textAlign: "center",
          padding: "1rem",
        }}
      >
        ⚠️ Invalid YouTube link provided.
      </div>
    );
  }

  const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&showinfo=0&autoplay=1`;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #f3f4f6, #e5e7eb)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1536px", // max-w-6xl
          backgroundColor: "#ffffff",
          boxShadow:
            "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 10px 10px -5px rgba(0,0,0,0.1)",
          borderRadius: "1.5rem",
          overflow: "hidden",
          border: "1px solid #f3f4f6",
        }}
      >
        {/* Title Slot */}
        <div
          style={{
            backgroundColor: "#f9fafb",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          <TitleSlot />
        </div>

        {/* Video Player */}
        <div
          style={{
            position: "relative",
            width: "100%",
            paddingBottom: "56.25%", // 16:9 aspect ratio
          }}
        >
          <iframe
            src={embedUrl}
            title="YouTube video player"
            allow="autoplay; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: "0",
              borderBottomLeftRadius: "1.5rem",
              borderBottomRightRadius: "1.5rem",
            }}
          ></iframe>
        </div>

        {/* Message Section */}
        {message && (
          <div
            style={{
              padding: "1.5rem",
              borderTop: "1px solid #e5e7eb",
              backgroundColor: "#f9fafb",
              textAlign: "center",
            }}
          >
            <p
              style={{
                color: "#374151",
                fontSize: "1.125rem",
                lineHeight: "1.75rem",
                whiteSpace: "pre-line",
                fontWeight: 500,
                wordBreak: "break-word",
              }}
            >
              {message}
            </p>
          </div>
        )}

        {/* Purchase Button */}
        {purchase_link && (
          <div
            style={{
              padding: "2rem 1.5rem",
              textAlign: "center",
              backgroundColor: "#f9fafb",
              borderBottomLeftRadius: "0.5rem",
              borderBottomRightRadius: "0.5rem",
            }}
          >
            {/* Prominent Label above button */}
            <p
              style={{
                fontSize: "1.125rem",
                fontWeight: "700",
                color: "#2563eb",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: "0.75rem",
              }}
            >
              Join Now
            </p>

            {/* Button */}
            <a
              href={purchase_link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                background: "linear-gradient(to right, #2563eb, #4f46e5)",
                color: "#ffffff",
                padding: "0.75rem 2rem",
                borderRadius: "9999px",
                fontSize: "1.125rem",
                fontWeight: 600,
                boxShadow:
                  "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)",
                transition: "transform 0.2s ease",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              Hsc Mission A+
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
