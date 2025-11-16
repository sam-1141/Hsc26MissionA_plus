import { useState } from "react";
import { router, usePage } from "@inertiajs/react";

export default function Create() {
    const { flash, exam } = usePage().props;

    const [form, setForm] = useState({
    name: exam?.name || "",
    description: exam?.description || "",
    total_questions: exam?.total_questions || "",
    has_negative_marks: exam?.has_negative_marks ? true : false,
    negative_marks_value: exam?.negative_marks_value || "",
    total_marks: exam?.total_marks || "",
    duration: exam?.duration || "",
    start_time: exam?.start_time ? exam.start_time.replace(" ", "T") : "",
    end_time: exam?.end_time ? exam.end_time.replace(" ", "T") : "",
    result_publish_time: exam?.result_publish_time ? exam.result_publish_time.replace(" ", "T") : "",
});


    const handleChange = (e) => {
        const { name, type, value, checked } = e.target;
        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const submit = (e) => {
        e.preventDefault();
        router.post(route("live-exams.store"), form);
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded">
            <h1 className="text-2xl font-bold mb-4">Create Live Exam</h1>

            {flash.success && (
                <div className="bg-green-100 p-3 rounded mb-4 text-green-700">
                    {flash.success}
                </div>
            )}

            <form onSubmit={submit} className="space-y-4">

                <div>
                    <label>Name</label>
                    <input 
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        required
                    />
                </div>

                <div>
                    <label>Description</label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />
                </div>

                <div>
                    <label>Total Questions</label>
                    <input 
                        type="number"
                        name="total_questions"
                        value={form.total_questions}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        required
                    />
                </div>

                <div className="flex items-center space-x-2">
                    <input 
                        type="checkbox"
                        name="has_negative_marks"
                        checked={form.has_negative_marks}
                        onChange={handleChange}
                    />
                    <label>Has Negative Marks</label>
                </div>

                {form.has_negative_marks && (
                    <div>
                        <label>Negative Marks Value</label>
                        <input 
                            type="number"
                            step="0.01"
                            name="negative_marks_value"
                            value={form.negative_marks_value}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />
                    </div>
                )}

                <div>
                    <label>Total Marks</label>
                    <input 
                        type="number"
                        name="total_marks"
                        value={form.total_marks}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />
                </div>

                <div>
                    <label>Duration (minutes)</label>
                    <input 
                        type="number"
                        name="duration"
                        value={form.duration}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />
                </div>

                <div>
                    <label>Start Time</label>
                    <input 
                        type="datetime-local"
                        name="start_time"
                        value={form.start_time}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />
                </div>

                <div>
                    <label>End Time</label>
                    <input 
                        type="datetime-local"
                        name="end_time"
                        value={form.end_time}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />
                </div>

                <div>
                    <label>Result Publish Time</label>
                    <input 
                        type="datetime-local"
                        name="result_publish_time"
                        value={form.result_publish_time}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Create Exam
                </button>
            </form>
        </div>
    );
}
