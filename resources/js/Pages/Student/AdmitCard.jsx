import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { router } from "@inertiajs/react";

const AdmitCard = ({ registration }) => {
    const cardRef = useRef();

    const handleDownload = async () => {
        const element = cardRef.current;
        const canvas = await html2canvas(element, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${registration.unique_key_hscmap26}_AdmitCard.pdf`);
        router.get(route('student.video'));
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
            <div ref={cardRef} className="bg-white shadow-2xl rounded-2xl w-full max-w-3xl p-10 border border-gray-300">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-extrabold text-blue-700 mb-2">HSC 26 Mission A+</h1>
                    <p className="text-gray-600">Official Examination Admit Card</p>
                </div>

                <div className="grid grid-cols-2 gap-6 text-gray-800">
                    <div>
                        <p><span className="font-semibold">Name:</span> {registration.name}</p>
                        <p><span className="font-semibold">Mobile:</span> {registration.mobile}</p>
                        <p><span className="font-semibold">Email:</span> {registration.email || "N/A"}</p>
                        <p><span className="font-semibold">College:</span> {registration.college}</p>
                    </div>
                    <div>
                        <p><span className="font-semibold">HSC Batch:</span> {registration.Hsc_Batch}</p>
                        <p><span className="font-semibold">EIIN:</span> {registration.eiin || "N/A"}</p>
                        <p><span className="font-semibold">Address:</span> {registration.address || "N/A"}</p>
                        <p><span className="font-semibold">Mission:</span> {registration.hsc26Mission}</p>
                    </div>
                </div>

                <div className="mt-10 text-center">
                    <p className="text-lg font-semibold text-gray-700">Exam Roll:</p>
                    <p className="text-4xl font-extrabold text-blue-800 font-mono tracking-widest">
                        {registration.unique_key_hscmap26}
                    </p>
                </div>

                <div className="mt-8 border-t pt-6 text-center text-sm text-gray-500">
                    <p>Bring this admit card on your exam day. Without it, entry will not be permitted.</p>
                </div>
            </div>

            <button
                onClick={handleDownload}
                className="mt-6 px-8 py-3 bg-green-600 text-white font-semibold rounded-xl shadow hover:bg-green-700 transition"
            >
                Download as PDF
            </button>
        </div>
    );
};

export default AdmitCard;
