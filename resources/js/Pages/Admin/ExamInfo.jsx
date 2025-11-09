import React from "react";
import { usePage } from "@inertiajs/react";

export default function ExamInfo() {
  const { exam } = usePage().props;

  if (!exam) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
        ⚠️ No exam information found.
      </div>
    );
  }

  const { exam_description_bn, exam_url } = exam;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl bg-white shadow-2xl rounded-3xl border border-gray-100 p-8">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          🎓 Upcoming Exam Information
        </h1>

        {/* Description */}
        {exam_description_bn ? (
          <div
            className="text-gray-700 text-lg leading-relaxed mb-8 prose max-w-none"
            dangerouslySetInnerHTML={{ __html: exam_description_bn }}
          ></div>
        ) : (
          <p className="text-gray-600 italic text-center mb-8">
            Exam description not available.
          </p>
        )}

        {/* Exam Link */}
        {exam_url && (
          <div className="text-center">
            <a
              href={exam_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-md transition-transform transform hover:scale-105"
            >
              🔗 Go to Exam Portal
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
