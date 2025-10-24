import React, { useState, useEffect } from "react";
import { Disclosure } from "@headlessui/react";
import { Link, router } from "@inertiajs/react";
import { route } from "ziggy-js";

// Subjects, chapters, total lectures
const subjects = {
    'Chemistry | Restart - HSC 2026': {
        'অধ্যায় ২ : জৈব রসায়ন': { lectures: 22, duration_days: 30 },
        'অধ্যায় ৪ : তড়িৎ রসায়ন': { lectures: 8, duration_days: 12 },
    },
    'Physics | Restart - HSC 2026': {
        'অধ্যায় ২ : স্থির তড়িৎ': { lectures: 7, duration_days: 10 },
        'অধ্যায় ৩ : চলতড়িৎ': { lectures: 8, duration_days: 14 },
        'অধ্যায় ৪ : তড়িৎ চুম্বকত্ব': { lectures: 8, duration_days: 14 },
        'অধ্যায় ৭  : ভৌত আলোকবিজ্ঞান': { lectures: 6, duration_days: 10 },
        'অধ্যায় ৮ : আধুনিক পদার্থবিজ্ঞানের সূচনা': { lectures: 5, duration_days: 7 },
    },
    'Higher Math | Restart - HSC 2026': {
        'অধ্যায় ৩ : জটিল সংখ্যা': { lectures: 4, duration_days: 6 },
        'অধ্যায় ৪ : বহুপদী ও বহুপদী সমীকরণ': { lectures: 4, duration_days: 7 },
        'অধ্যায় ৫ : দ্বিপদী বিস্তৃতি': { lectures: 7, duration_days: 8 },
        'অধ্যায় ৬ : কণিক': { lectures: 8, duration_days: 12 },
        'অধ্যায় ৭ : বিপরীত ত্রিকোণমিতিক ফাংশন ও ত্রিকোণমিতিক সমীকরণ': { lectures: 3, duration_days: 5 },
    },
    'Biology | Restart - HSC 2026': {
        'অধ্যায় ৫ : শ্বাসক্রিয়া ও শ্বসন': { lectures: 4, duration_days: 5 },
        'অধ্যায় ৬ : বর্জ্য ও নিষ্কাশন': { lectures: 3, duration_days: 6 },
        'অধ্যায় ৭ : চলন ও অঙ্গচালনা': { lectures: 5, duration_days: 10 },
        'অধ্যায় ৮ : সমন্বয় ও নিয়ন্ত্রণ': { lectures: 7, duration_days: 16 },
        'অধ্যায় ৯ : মানব জীবনের ধারাবাহিকতা': { lectures: 7, duration_days: 12 },
        'অধ্যায় ১০ : মানবদেহের প্রতিরক্ষা': { lectures: 4, duration_days: 9 },
        'অধ্যায় ১১ : জীনতত্ত্ব ও বিবর্তন': { lectures: 6, duration_days: 10 },
    },
};

export default function AdminLectures({ lecturesData }) {
    // Ensure lecturesData is always array
    const [lectures, setLectures] = useState(lecturesData || []);

    const [selectedSubject, setSelectedSubject] = useState("");
    const [selectedChapter, setSelectedChapter] = useState("");
    const [lectureNumber, setLectureNumber] = useState("");
    const [lectureLink, setLectureLink] = useState("");

    const [availableChapters, setAvailableChapters] = useState([]);
    const [maxLectures, setMaxLectures] = useState(0);

    // Update chapters dropdown
    useEffect(() => {
        if (selectedSubject) {
            setAvailableChapters(Object.keys(subjects[selectedSubject]));
            setSelectedChapter("");
        } else {
            setAvailableChapters([]);
            setSelectedChapter("");
        }
        setLectureNumber("");
    }, [selectedSubject]);

    // Update max lectures
    useEffect(() => {
        if (selectedChapter && selectedSubject) {
            setMaxLectures(subjects[selectedSubject][selectedChapter].lectures);
            setLectureNumber("");
        } else {
            setMaxLectures(0);
            setLectureNumber("");
        }
    }, [selectedChapter, selectedSubject]);

    // Add lecture
    const addLecture = (e) => {
        e.preventDefault();
        if (!selectedSubject || !selectedChapter || !lectureNumber || !lectureLink) return;

        if (lectureNumber < 1 || lectureNumber > maxLectures) {
            alert(`Lecture number must be between 1 and ${maxLectures}`);
            return;
        }

        router.post(
            route("admin.lectures.store"),
            {
                subject: selectedSubject,
                chapter: selectedChapter,
                lecture_number: lectureNumber,
                lecture_link: lectureLink,
            },
            {
                onSuccess: (page) => {
                    setLectures(page.props.lecturesData || lectures);
                    setSelectedSubject("");
                    setSelectedChapter("");
                    setLectureNumber("");
                    setLectureLink("");
                },
                preserveScroll: true,
            }
        );
    };

    // Group lectures for display
    const groupedLectures = lectures.reduce((acc, lec) => {
        if (!acc[lec.subject]) acc[lec.subject] = {};
        if (!acc[lec.subject][lec.chapter]) acc[lec.subject][lec.chapter] = [];
        acc[lec.subject][lec.chapter].push({
            lecture_number: lec.lecture_number,
            lecture_link: lec.lecture_link,
        });
        return acc;
    }, {});

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

            <h2 className="text-3xl font-bold text-center mb-8 text-indigo-700">
                Admin Lecture Management
            </h2>

            {/* Form */}
            <form onSubmit={addLecture} className="mb-8 bg-white p-6 rounded-2xl shadow space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Subject */}
                    <select
                        value={selectedSubject}
                        onChange={(e) => setSelectedSubject(e.target.value)}
                        className="border p-2 w-full rounded"
                        required
                    >
                        <option value="">Select Subject</option>
                        {Object.keys(subjects).map((subj, i) => (
                            <option key={i} value={subj}>{subj}</option>
                        ))}
                    </select>

                    {/* Chapter */}
                    <select
                        value={selectedChapter}
                        onChange={(e) => setSelectedChapter(e.target.value)}
                        className="border p-2 w-full rounded"
                        required
                        disabled={!selectedSubject}
                    >
                        <option value="">Select Chapter</option>
                        {availableChapters.map((chap, i) => (
                            <option key={i} value={chap}>{chap}</option>
                        ))}
                    </select>

                    {/* Lecture Number */}
                    <input
                        type="number"
                        placeholder={`Lecture (1-${maxLectures || "-"})`}
                        value={lectureNumber}
                        onChange={(e) => setLectureNumber(e.target.value)}
                        className="border p-2 w-full rounded"
                        required
                        disabled={!selectedChapter}
                        min={1}
                        max={maxLectures}
                    />
                </div>

                {/* Lecture Link */}
                <input
                    type="url"
                    placeholder="Lecture Link"
                    value={lectureLink}
                    onChange={(e) => setLectureLink(e.target.value)}
                    className="border p-2 w-full rounded"
                    required
                />

                <button
                    type="submit"
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-all duration-300"
                >
                    Add Lecture
                </button>
            </form>

            {/* Display Section */}
            {Object.keys(groupedLectures).length === 0 ? (
                <p className="text-center text-gray-500">No lectures added yet.</p>
            ) : (
                Object.entries(groupedLectures).map(([subject, chapters]) => (
                    <div key={subject} className="mb-6">
                        <h3 className="text-2xl font-semibold mb-2">{subject}</h3>
                        {Object.entries(chapters).map(([chapter, lecturesList]) => (
                            <Disclosure key={chapter} as="div" className="mb-4">
                                {({ open }) => (
                                    <>
                                        <Disclosure.Button className="w-full flex justify-between items-center bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-lg font-medium">
                                            <span>{chapter}</span>
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="mt-2 bg-white rounded-lg shadow-inner p-4">
                                            {lecturesList.map((lec) => (
                                                <Disclosure key={lec.lecture_number}>
                                                    {({ open }) => (
                                                        <>
                                                            <Disclosure.Button className="w-full flex justify-between items-center bg-gray-100 px-3 py-1 rounded hover:bg-gray-200 text-sm">
                                                                <span>Lecture {lec.lecture_number}</span>
                                                                <span className="text-blue-600">{lec.lecture_link}</span>
                                                            </Disclosure.Button>
                                                        </>
                                                    )}
                                                </Disclosure>
                                            ))}
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        ))}
                    </div>
                ))
            )}
        </div>
    );
}
