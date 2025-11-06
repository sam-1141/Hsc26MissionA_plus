import React from "react";
import { usePage } from "@inertiajs/react";

export default function Hsc26Video() {
    const { videoUrl } = usePage().props;

    // Extract the YouTube video ID (e.g. from https://www.youtube.com/watch?v=VHAK-gU9gi0)
    const videoId = videoUrl?.split("v=")[1]?.split("&")[0];

    if (!videoId) {
        return (
            <div className="min-h-screen flex items-center justify-center text-red-600 font-semibold">
                ⚠️ Invalid YouTube link provided.
            </div>
        );
    }

    const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&showinfo=0`;

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-3xl bg-white shadow-md rounded-2xl overflow-hidden">
                <h1 className="text-2xl font-semibold text-center py-4 border-b">
                    🎥 Lecture Video
                </h1>

                <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                    <iframe
                        src={embedUrl}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute top-0 left-0 w-full h-full border-0"
                    ></iframe>
                </div>
            </div>
        </div>
    );
}
