import React, { useState } from "react";
import { Disclosure } from "@headlessui/react";
import { Link, router } from "@inertiajs/react";
import { route } from "ziggy-js";
import { motion } from "framer-motion";
import { CheckCircle, Clock, ChevronDown } from "lucide-react";

export default function ProgressDashboard({ progressData }) {
    const [subjectsState, setSubjectsState] = useState(progressData.subjects);

    // Parse remaining days "D:HH"
    const parseRemainingDays = (str) => {
        if (!str) return 0;
        const [days, hours] = str.split(":").map(Number);
        return days + hours / 24;
    };

    const calculateSubjectProgress = (chapters) => {
        const totalDays = chapters.reduce((sum, ch) => sum + ch.duration_days, 0);
        const totalRemainingDays = chapters.reduce(
            (sum, ch) => sum + parseRemainingDays(ch.remaining_days),
            0
        );
        const percentage = totalDays > 0 ? (totalRemainingDays / totalDays) * 100 : 0;
        return { totalDays, remainingDays: totalRemainingDays, percentage };
    };

    const formatRemainingTime = (floatDays) => {
        const totalSeconds = Math.floor(floatDays * 24 * 60 * 60);
        const days = Math.floor(totalSeconds / (24 * 60 * 60));
        const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        return `${days}d ${hours}h ${minutes}m`;
    };

    const toggleLecture = async (subject, chapterName, lectureNumber) => {
        const updatedSubjects = { ...subjectsState };
        const chapter = updatedSubjects[subject].find(ch => ch.chapter === chapterName);
        const lecture = chapter.lectures_list.find(l => l.lecture_number === lectureNumber);
        lecture.status_of_completion = !lecture.status_of_completion;
        setSubjectsState(updatedSubjects);

        try {
            await router.post(route("toggle.lecture"), {
                subject,
                chapter: chapterName,
                lecture_number: lectureNumber,
            }, { preserveScroll: true });
        } catch (error) {
            lecture.status_of_completion = !lecture.status_of_completion;
            setSubjectsState(updatedSubjects);
            console.error("Toggle lecture error:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-50 p-8">
            {/* Dashboard Link */}
            <div className="mb-6 flex items-center gap-2">
                <Link
                    href={route("dashboard")}
                    className="flex items-center justify-center bg-white/70 backdrop-blur-md text-gray-800 text-xl md:text-2xl px-5 py-3 rounded-full shadow-md hover:shadow-lg border border-gray-200 hover:bg-white transition-all duration-300"
                >
                    🏠
                </Link>
            </div>

            {/* Header */}
            <h2 className="text-[clamp(1.5rem,4vw,3rem)] font-extrabold text-center mb-10 text-indigo-700 tracking-tight">
  Student Progress Dashboard
</h2>




            {Object.entries(subjectsState).map(([subject, chapters]) => {
                const { remainingDays, percentage } = calculateSubjectProgress(chapters);

                return (
                    <div
                        key={subject}
                        className="mb-10 bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-6 border border-gray-100"
                    >
                        {/* Subject Header */}
                       {/* Subject Header */}
<div className="flex justify-between items-center mb-4">
    <h2 className="text-xl font-semibold text-gray-800">{subject}</h2>
    <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
        {formatRemainingTime(remainingDays)} left
    </span>
</div>






                        {/* Progress Bar */}
                        <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden mb-4">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${percentage}%` }}
                                transition={{ duration: 0.8 }}
                                className="h-full bg-gradient-to-r from-indigo-500 to-indigo-700 rounded-full shadow-inner"
                            />
                        </div>

                        {/* Timer Display */}
                        <div className="flex items-center gap-2 text-gray-700 mb-6">
                            <Clock className="w-5 h-5 text-indigo-500" />
                            <p className="text-base font-medium">
                                Remaining:{" "}
                                <span className="font-semibold text-gray-900">
                                    {formatRemainingTime(remainingDays)}
                                </span>{" "}
                                / Total:{" "}
                                <span className="font-semibold text-gray-900">
                                    {chapters.reduce((sum, ch) => sum + ch.duration_days, 0)} days
                                </span>
                            </p>
                        </div>

                        {/* Chapters */}
                        {chapters.map((chapter) => (
                            <Disclosure key={chapter.chapter} as="div" className="mb-3">
                                {({ open }) => (
                                    <>
                                        <Disclosure.Button
                                            className={`w-full flex justify-between items-center px-5 py-3 rounded-2xl font-medium text-gray-800 transition-all duration-300 shadow-sm border ${open
                                                ? "bg-indigo-50 border-indigo-200"
                                                : "bg-gray-50 hover:bg-gray-100 border-gray-200"
                                                }`}
                                        >
                                            <span>{chapter.chapter}</span>
                                            <ChevronDown
                                                className={`w-5 h-5 text-gray-500 transform transition-transform ${open ? "rotate-180" : ""
                                                    }`}
                                            />
                                        </Disclosure.Button>

                                        <Disclosure.Panel className="mt-3 bg-white rounded-xl shadow-inner p-4 border border-gray-100">
                                            {chapter.lectures_list && (
                                                <div className="space-y-3">
                                                    {chapter.lectures_list.map((lec) => (
                                                        <Disclosure key={lec.lecture_number}>
                                                            {({ open: subOpen }) => (
                                                                <>
                                                                    {/* Lecture Row */}
                                                                    <Disclosure.Button className="w-full flex justify-between items-center bg-gray-50 hover:bg-gray-100 rounded-xl px-4 py-2 border border-gray-200 transition-all text-sm">
                                                                        <div className="flex items-center gap-2">
                                                                            {lec.status_of_completion ? (
                                                                                <CheckCircle className="w-5 h-5 text-green-500" />
                                                                            ) : (
                                                                                <Clock className="w-5 h-5 text-gray-400" />
                                                                            )}
                                                                            <span className="text-gray-800">
                                                                                Lecture {lec.lecture_number}{" "}
                                                                                {lec.status_of_completion
                                                                                    ? "(Completed)"
                                                                                    : "(Pending)"}
                                                                            </span>
                                                                        </div>

                                                                        {/* Modern toggle */}
                                                                        <label className="relative inline-flex items-center cursor-pointer">
                                                                            <input
                                                                                type="checkbox"
                                                                                checked={lec.status_of_completion}
                                                                                onChange={() =>
                                                                                    toggleLecture(
                                                                                        subject,
                                                                                        chapter.chapter,
                                                                                        lec.lecture_number
                                                                                    )
                                                                                }
                                                                                className="sr-only peer"
                                                                            />
                                                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-indigo-600 transition-all"></div>
                                                                            <div className="absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full border border-gray-300 peer-checked:translate-x-5 peer-checked:border-indigo-500 transition-all duration-300"></div>
                                                                        </label>
                                                                    </Disclosure.Button>

                                                                    {/* Collapsible Lecture Links */}
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
