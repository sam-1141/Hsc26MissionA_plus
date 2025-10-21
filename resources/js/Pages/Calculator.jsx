import { useState } from "react";
import { useForm, usePage,Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import { router } from "@inertiajs/react";
import Header from "../Pages/Student/Header";

export default function Calculator({ subjects }) {
    const { props } = usePage();
    const result = props.flash?.result;

    const { post } = useForm();
    const [selected, setSelected] = useState({});

    const toggleChapter = (subject, chapter, data) => {
        setSelected((prev) => {
            const copy = { ...prev };
            if (!copy[subject]) copy[subject] = {};
            if (copy[subject][chapter]) {
                delete copy[subject][chapter];
            } else {
                copy[subject][chapter] = data;
            }
            return { ...copy };
        });
    };

    const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Sending selected:", selected);

    router.post(
        route("calculator.calculate"), // ✅ correct order: router.post(route(...))
        { selected },
        {
            forceFormData: false,
            onSuccess: () => console.log("Sent successfully!"),
        }
    );
};

    return (
        <>

            <Header />
            <div className="min-h-screen bg-gray-50 p-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8"
                >
                    <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">
                        📘 Syllabus Calculator
                    </h1>
                    <Link
        href={route('dashboard')}
        method="get"
        className="text-2xl hover:text-indigo-600 transition"
        title="Go to Dashboard"
    >
        <span role="img" aria-label="dashboard">🏠</span>
    </Link>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {Object.entries(subjects).map(([subject, chapters]) => (
                            <div key={subject}>
                                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                    {subject}
                                </h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {Object.entries(chapters).map(
                                        ([chapter, info]) => {
                                            const isSelected =
                                                selected[subject] &&
                                                selected[subject][chapter];
                                            return (
                                                <motion.button
                                                    type="button"
                                                    key={chapter}
                                                    onClick={() =>
                                                        toggleChapter(
                                                            subject,
                                                            chapter,
                                                            info
                                                        )
                                                    }
                                                    whileHover={{ scale: 1.03 }}
                                                    className={`p-3 rounded-lg border transition ${
                                                        isSelected
                                                            ? "bg-indigo-500 text-white border-indigo-600"
                                                            : "bg-white border-gray-300 text-gray-800 hover:bg-indigo-50"
                                                    }`}
                                                >
                                                    <div className="font-medium">
                                                        {chapter}
                                                    </div>
                                                    <div className="text-xs opacity-80">
                                                        🎓 {info.lectures}{" "}
                                                        lectures • ⏱{" "}
                                                        {info.duration_days}{" "}
                                                        days
                                                    </div>
                                                </motion.button>
                                            );
                                        }
                                    )}
                                </div>
                            </div>
                        ))}

                        <div className="text-center">
                            <button
                                type="submit"
                                className="mt-6 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow hover:bg-indigo-700 transition"
                            >
                                Calculate Total
                            </button>
                        </div>
                    </form>

                    {result && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-8 text-center p-4 bg-green-50 border border-green-200 rounded-xl"
                        >
                            <h3 className="text-xl font-semibold text-green-700">
                                Result
                            </h3>
                            <p className="text-gray-700 mt-2">
                                Total Lectures: <b>{result.lectures}</b>
                            </p>
                            <p className="text-gray-700">
                                Estimated Duration: <b>{result.days}</b> days
                            </p>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </>
    );
}
