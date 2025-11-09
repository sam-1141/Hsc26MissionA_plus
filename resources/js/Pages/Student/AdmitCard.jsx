import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { router } from "@inertiajs/react";
import TitleSlot from "../authentication/TitleSlot";
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
        router.get(route("student.video"));
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
            <div
                ref={cardRef}
                className="bg-white shadow-2xl rounded-2xl w-full max-w-3xl p-10 border border-gray-300"
            >
                {/* Header */}
                <div className="text-center mb-8">
                    <TitleSlot/>
                </div>

                {/* Information Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-800">
                    {/** Left Column **/}
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span className="font-semibold">নাম:</span>
                            <span>{registration.name}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold">মোবাইল:</span>
                            <span>{registration.mobile}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold">ইমেল:</span>
                            <span>{registration.email || "N/A"}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold">কলেজ:</span>
                            <span>{registration.college}</span>
                        </div>
                    </div>

                    {/** Right Column **/}
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span className="font-semibold">এইচএসসি ব্যাচ:</span>
                            <span>{registration.Hsc_Batch}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold">ইআইআইএন:</span>
                            <span>{registration.eiin || "N/A"}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold">ঠিকানা:</span>
                            <span>{registration.address || "N/A"}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold">মিশন:</span>
                            <span>{registration.hsc26Mission}</span>
                        </div>
                    </div>
                </div>

                {/* Exam Roll */}
                <div className="mt-10 text-center">
                    <p className="text-lg font-semibold text-gray-700">পরীক্ষার রোল নম্বর:</p>
                    <p className="text-4xl sm:text-5xl font-extrabold text-blue-800 font-mono tracking-widest mt-2">
                        {registration.unique_key_hscmap26}
                    </p>
                </div>

                {/* Instructions */}
                <div className="mt-8 border-t pt-6 text-center text-sm text-gray-500 space-y-1">
                    <p>আপনার রেজিস্ট্রেশন নম্বর গোপন রাখুন।</p>
                    <p>নির্ধারিত দিনে পরীক্ষায় অংশগ্রহণের জন্য এটি প্রয়োজন হবে।</p>
                </div>
            </div>

            {/* Download Button */}
            <button
                onClick={handleDownload}
                className="mt-6 px-8 py-3 bg-green-600 text-white font-semibold rounded-xl shadow hover:bg-green-700 transition duration-200"
            >
                <p>pdf ডাউনলোড করুন</p><span>⤓</span>
                
            </button>
        </div>
    );
};

export default AdmitCard;
