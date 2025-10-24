import React, { useState } from "react";
import { Disclosure } from "@headlessui/react";
import { Link, router } from "@inertiajs/react";
import { route } from "ziggy-js"; // ✅ named import

export default function ProgressDashboard({ progressData }) {
    // State for live updates
    const [subjectsState, setSubjectsState] = useState(progressData.subjects);

    // Calculate total days and percentage progress
    // Convert "D:HH" to fractional days
const parseRemainingDays = (str) => {
    if (!str) return 0;
    const [days, hours] = str.split(":").map(Number);
    return days + (hours / 24);
};

// Calculate total days and percentage progress
const calculateSubjectProgress = (chapters) => {
    const totalDays = chapters.reduce((sum, ch) => sum + ch.duration_days, 0);
    const remainingDays = chapters.reduce((sum, ch) => sum + parseRemainingDays(ch.remaining_days), 0);
    const percentage = totalDays > 0 ? ((remainingDays) / totalDays) * 100 : 0;
    return { totalDays, remainingDays: chapters.map(ch => ch.remaining_days), percentage };
    
};

     

    const formatRemainingTime = (floatDays) => {
    const totalSeconds = Math.floor(floatDays * 24 * 60 * 60); // convert days to seconds
    const days = Math.floor(totalSeconds / (24 * 60 * 60));
    const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
};

    // Toggle lecture completion
    const toggleLecture = async (subject, chapterName, lectureNumber) => {
        const updatedSubjects = { ...subjectsState };
        const chapter = updatedSubjects[subject].find(ch => ch.chapter === chapterName);
        const lecture = chapter.lectures_list.find(l => l.lecture_number === lectureNumber);

        // Optimistic UI update
        lecture.status_of_completion = !lecture.status_of_completion;
        setSubjectsState(updatedSubjects);

        try {
            await router.post(route("toggle.lecture"), {
                subject,
                chapter: chapterName,
                lecture_number: lectureNumber,
            }, { preserveScroll: true });
        } catch (error) {
            // Revert on error
            lecture.status_of_completion = !lecture.status_of_completion;
            setSubjectsState(updatedSubjects);
            console.error("Toggle lecture error:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Dashboard Link */}
            <div className="mb-6 flex items-center gap-2">
                <Link
                    href={route("dashboard")}
                    className="flex items-center justify-center bg-white bg-opacity-90 text-gray-800 text-xl md:text-2xl px-5 py-3 rounded-full shadow-lg border border-transparent hover:bg-opacity-100 transition-all duration-300"
                >
                    🏠
                </Link>
            </div>

            {/* Header */}
            <h2 className="text-3xl font-bold text-center mb-8 text-indigo-700">
                Student Progress Dashboard
                <div className="mt-4 flex flex-wrap justify-center gap-4 text-lg">
                    <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full flex items-center gap-1">Physics: 🪐⚡🔭</span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center gap-1">Higher Math: ➗➕➖📐</span>
                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full flex items-center gap-1">Biology: 🧬🦠🌱</span>
                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full flex items-center gap-1">Chemistry: ⚗️🧪🧫</span>
                </div>
            </h2>

            {/* Subjects */}
            {Object.entries(subjectsState).map(([subject, chapters]) => {
                const { remainingDays, percentage } = calculateSubjectProgress(chapters);

                return (
                    <div key={subject} className="mb-8 bg-white rounded-2xl shadow p-6">
                        {/* Subject Header */}
                        <h2 className="text-xl font-semibold mb-2">{subject}</h2>

                        {/* Progress Bar */}
                        <div className="w-full bg-gray-200 rounded-full h-4 mb-2 overflow-hidden">
                            <div
                                style={{ width: `${percentage}%` }}
                                className="h-4 bg-indigo-500 transition-all duration-700"
                            />
                        </div>
                        <p className="text-xl md:text-2xl font-bold text-gray-800 mb-4 inline-block bg-white bg-opacity-90 px-5 py-3 rounded-full shadow-xl border border-gray-300">
                            Remaining Time: {(remainingDays)}/
                            {chapters.reduce((sum, ch) => sum + ch.duration_days, 0)}
                        </p>

                        {/* Chapters */}
                        {chapters.map((chapter) => (
                            <Disclosure key={chapter.chapter} as="div" className="mb-4">
                                {({ open }) => (
                                    <>
                                        <Disclosure.Button className="w-full flex justify-between items-center bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-lg font-medium">
                                            <span>{chapter.chapter}</span>
                                        </Disclosure.Button>

                                        <Disclosure.Panel className="mt-2 bg-white rounded-lg shadow-inner p-4">
                                            {chapter.lectures_list && (
                                                <div className="space-y-2">
                                                    {chapter.lectures_list.map((lec) => (
                                                        <Disclosure key={lec.lecture_number}>
                                                            {({ open }) => (
                                                                <>
                                                                    <Disclosure.Button className="w-full flex justify-between items-center bg-gray-100 px-3 py-1 rounded hover:bg-gray-200 text-sm">
                                                                        <span>
                                                                            Lecture {lec.lecture_number} {" "}
                                                                            {lec.status_of_completion ? "(Completed)" : "(Pending)"}
                                                                        </span>
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={lec.status_of_completion}
                                                                            onChange={() => toggleLecture(subject, chapter.chapter, lec.lecture_number)}
                                                                            className="h-5 w-5 accent-indigo-500 cursor-pointer"
                                                                        />
                                                                    </Disclosure.Button>

                                                                    {/* Lecture links */}
                                                                    <Disclosure.Panel className="p-2 pl-6">
                                                                        <ul className="list-disc list-inside space-y-1 text-blue-600">
                                                                            {lec.links.map((link, i) => (
                                                                                <li key={i}>
                                                                                    <a
                                                                                        href={link}
                                                                                        target="_blank"
                                                                                        rel="noopener noreferrer"
                                                                                        className="hover:underline"
                                                                                    >
                                                                                        {link}
                                                                                    </a>
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    </Disclosure.Panel>
                                                                </>
                                                            )}
                                                        </Disclosure>
                                                    ))}
                                                </div>
                                            )}
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        ))}
                    </div>
                );
            })}
        </div>
    );
}
