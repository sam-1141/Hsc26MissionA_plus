import React from "react";
import { usePage } from "@inertiajs/react";
import TitleSlot from "../authentication/TitleSlot";
import Header from "./Header"
export default function Hsc26Video() {
  const { videoUrl, title, message, purchase_link } = usePage().props;

  const videoId = videoUrl?.split("v=")[1]?.split("&")[0];

  if (!videoId) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 font-semibold">
        ⚠️ Invalid YouTube link provided.
      </div>
    );
  }

  const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&showinfo=0&autoplay=1`;

  return (
    
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
        
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl overflow-hidden">
        
        <TitleSlot/>
        {title && (
          <h1 className="text-2xl md:text-3xl font-bold text-center py-5 border-b text-gray-800">
            {title}
          </h1>
        )}

        {/* Video Player */}
        <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
          <iframe
            src={embedUrl}
            title="YouTube video player"
            allow="autoplay; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full border-0"
          ></iframe>
        </div>

        {/* Message */}
        {message && (
          <div className="p-5 border-t text-center">
            <p className="text-gray-700 text-lg">{message}</p>
          </div>
        )}

        {/* Purchase Link */}
        {purchase_link && (
          <div className="p-5 text-center">
            <a
              href={purchase_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full transition duration-300"
            >
              💳 Purchase / Learn More
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
