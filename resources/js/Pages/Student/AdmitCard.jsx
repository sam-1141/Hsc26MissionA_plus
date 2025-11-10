import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { router } from "@inertiajs/react";
import TitleSlot from "../authentication/TitleSlot";
import { CalendarDays, MapPin } from "lucide-react";

const AdmitCard = ({ registration, exam, examInfoUrl }) => {
  const cardRef = useRef();

  const handleDownload = async () => {
  try {
    const element = cardRef.current;

    // Capture the card as an image
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
    });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // Fit the image into the A4 page, keeping aspect ratio
    const imgProps = {
      width: canvas.width,
      height: canvas.height,
    };
    const ratio = Math.min(pdfWidth / imgProps.width, pdfHeight / imgProps.height);
    const imgWidth = imgProps.width * ratio;
    const imgHeight = imgProps.height * ratio;
    const x = (pdfWidth - imgWidth) / 2;
    const y = (pdfHeight - imgHeight) / 2;

    // Add the admit card image to the PDF
    pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);

    // --- Add clickable link overlay ---
    const linkUrl = exam?.exam_url
      ? exam.exam_url.startsWith("http")
        ? exam.exam_url
        : `https://${exam.exam_url}`
      : null;

    if (linkUrl) {
      // Approximate area for clickable link on the roll number
      const rectWidth = imgWidth * 0.8;
      const rectHeight = 20;
      const rectX = x + (imgWidth - rectWidth) / 2;
      const rectY = y + imgHeight * 0.6;
      pdf.link(rectX, rectY, rectWidth, rectHeight, { url: linkUrl });
    }

    pdf.save(`${registration.unique_key_hscmap26}_AdmitCard.pdf`);

    router.get(route("student.video"));
  } catch (err) {
    console.error("handleDownload error:", err);
    alert("PDF তৈরিতে সমস্যা হয়েছে — কনসোলে দেখুন।");
  }
};

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <div
        ref={cardRef}
        className="bg-white shadow-2xl rounded-2xl w-full max-w-3xl p-10 border border-gray-300"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <TitleSlot />
        </div>

        {/* Info Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-800">
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

        {/* Exam Info */}
        {exam && (
          <div className="mt-10 border-t pt-6 text-gray-700">
            <h2 className="text-xl font-semibold text-center mb-4 text-blue-700">
  <a
    href={examInfoUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-center gap-2 hover:underline"
  >
    📅 পরীক্ষার তথ্য
  </a>
</h2>


            {exam.exam_url && (
              <div className="flex justify-center mt-4">
                <a
                  href={exam.exam_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-md transition-transform transform hover:scale-105"
                >
                  <MapPin size={18} /> অনলাইন পরীক্ষা যোগ দিন
                </a>
              </div>
            )}
          </div>
        )}

        {/* Instructions */}
        <div className="mt-8 border-t pt-6 text-center text-sm text-gray-500 space-y-1">
          <p>আপনার রেজিস্ট্রেশন নম্বর গোপন 🗝️ রাখুন।</p>
          <p>নির্ধারিত দিনে পরীক্ষায় অংশগ্রহণের জন্য এটি প্রয়োজন হবে।</p>
          <a
            href={examInfoUrl}
            className="block text-blue-600 hover:text-blue-800 text-sm mt-3"
          >
            ℹ️ পরীক্ষার বিস্তারিত জানুন
          </a>
        </div>
      </div>

      {/* Download Button */}
      <button
        onClick={handleDownload}
        className="mt-6 px-8 py-3 bg-green-600 text-white font-semibold rounded-xl shadow hover:bg-green-700 transition duration-200 flex items-center gap-2"
      >
        <span>⤓ PDF ডাউনলোড করুন</span>
      </button>
    </div>
  );
};

export default AdmitCard;
