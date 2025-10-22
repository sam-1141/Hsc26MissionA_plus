import React, { useEffect } from "react";
import { Disclosure } from "@headlessui/react";
import { Link } from '@inertiajs/react';


export default function ProgressDashboard({ progressData }) {
    // Calculate total days for subject progress bar
    const calculateSubjectProgress = (chapters) => {
        const totalDays = chapters.reduce(
            (sum, ch) => sum + ch.duration_days,
            0
        );
        const remainingDays = chapters.reduce(
            (sum, ch) => sum + (ch.remaining_days || 0),
            0
        );
        const percentage = ((totalDays - remainingDays) / totalDays) * 100;
        return { totalDays, remainingDays, percentage };
    };

    // Auto-refresh every hour
    useEffect(() => {
        const interval = setInterval(() => {
            window.location.reload();
        }, 1000 * 60 * 60); // 1 hour
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="mb-6 flex items-center gap-2">
                <Link
                    href="/dashboard"
                    className="flex items-center justify-center bg-white bg-opacity-90 text-gray-800 text-xl md:text-2xl px-5 py-3 rounded-full shadow-lg border border-transparent hover:bg-opacity-100 transition-all duration-300"
                >
                    🏠
                </Link>
            </div>



            <h2 className="text-3xl font-bold text-center mb-8 text-indigo-700">
                Student Progress Dashboard
                <div className="mt-4 flex flex-wrap justify-center gap-4 text-lg">
                    <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full flex items-center gap-1">
                        Physics: 🪐⚡🔭
                    </span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center gap-1">
                        Higher Math: ➗➕➖📐
                    </span>
                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full flex items-center gap-1">
                        Biology: 🧬🦠🌱
                    </span>
                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full flex items-center gap-1">
                        Chemistry: ⚗️🧪🧫
                    </span>
                </div>
            </h2>

            <br />


            {Object.entries(progressData.subjects).map(
                ([subject, chapters]) => {
                    const { remainingDays, percentage } =
                        calculateSubjectProgress(chapters);

                    return (
                        <div
                            key={subject}
                            className="mb-8 bg-white rounded-2xl shadow p-6"
                        >
                            {/* Subject Header */}
                            <h2 className="text-xl font-semibold mb-2">
                                {subject}
                            </h2>

                            {/* Subject Progress Bar */}
                            <div className="w-full bg-gray-200 rounded-full h-4 mb-2 overflow-hidden">
                                <div
                                    style={{ width: `${percentage}%` }}
                                    className="h-4 bg-indigo-500 transition-all duration-700"
                                />
                            </div>
                            <p className="text-xl md:text-2xl font-bold text-gray-800 mb-4 inline-block bg-white bg-opacity-90 px-5 py-3 rounded-full shadow-xl border border-gray-300">
                                Remaining Days: {Math.floor(remainingDays)}/
                                {chapters.reduce((sum, ch) => sum + ch.duration_days, 0)}
                            </p>



                            {/* Chapters */}
                            {chapters.map((chapter) => (
                                <Disclosure
                                    key={chapter.chapter}
                                    as="div"
                                    className="mb-4"
                                >
                                    {({ open }) => (
                                        <>
                                            <Disclosure.Button className="w-full flex justify-between items-center bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-lg font-medium">
                                                <span>{chapter.chapter}</span>
                                                {/* <span className="text-sm text-gray-700">
                                                    {Math.floor(
                                                        chapter.remaining_days ||
                                                            0
                                                    )}{" "}
                                                    days left
                                                </span> */}
                                            </Disclosure.Button>

                                            <Disclosure.Panel className="mt-2 bg-white rounded-lg shadow-inner p-4">
                                                {/* Lectures */}
                                                {chapter.lectures_list && (
                                                    <div className="space-y-2">
                                                        {chapter.lectures_list.map(
                                                            (lec) => (
                                                                <Disclosure
                                                                    key={
                                                                        lec.lecture_number
                                                                    }
                                                                >
                                                                    {({
                                                                        open: openLec,
                                                                    }) => (
                                                                        <>
                                                                            <Disclosure.Button className="w-full flex justify-between items-center bg-gray-100 px-3 py-1 rounded hover:bg-gray-200 text-sm">
                                                                                Lecture{" "}
                                                                                {
                                                                                    lec.lecture_number
                                                                                }
                                                                            </Disclosure.Button>
                                                                            <Disclosure.Panel className="p-2 pl-6">
                                                                                <ul className="list-disc list-inside space-y-1 text-blue-600">
                                                                                    {lec.links.map(
                                                                                        (
                                                                                            link,
                                                                                            i
                                                                                        ) => (
                                                                                            <li
                                                                                                key={
                                                                                                    i
                                                                                                }
                                                                                            >
                                                                                                <a
                                                                                                    href={
                                                                                                        link
                                                                                                    }
                                                                                                    target="_blank"
                                                                                                    rel="noopener noreferrer"
                                                                                                    className="hover:underline"
                                                                                                >
                                                                                                    {
                                                                                                        link
                                                                                                    }
                                                                                                </a>
                                                                                            </li>
                                                                                        )
                                                                                    )}
                                                                                </ul>
                                                                            </Disclosure.Panel>
                                                                        </>
                                                                    )}
                                                                </Disclosure>
                                                            )
                                                        )}
                                                    </div>
                                                )}
                                            </Disclosure.Panel>
                                        </>
                                    )}
                                </Disclosure>
                            ))}
                        </div>
                    );
                }
            )}
        </div>
    );
}
