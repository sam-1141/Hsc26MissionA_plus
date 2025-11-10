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
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      // --- Page 1: Admit Card Image ---
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

      // --- Add clickable link overlay on top of the image ---
      const linkUrl = exam?.exam_url
        ? exam.exam_url.startsWith("http")
          ? exam.exam_url
          : `https://${exam.exam_url}`
        : null;

      if (linkUrl) {
        // Example: overlay rectangle on the exam roll number area
        const rectWidth = pdfWidth * 0.8; // 80% of page width
        const rectHeight = 20; // 20mm height
        const rectX = pdfWidth * 0.1; // center horizontally
        const rectY = pdfHeight * 0.6; // roughly where roll number is

        pdf.link(rectX, rectY, rectWidth, rectHeight, { url: linkUrl });
      }

      // --- Page 2: Backup page with clickable text link ---
      pdf.addPage();
      const pageWidth = pdf.internal.pageSize.getWidth();

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(18);
      const title = "অনলাইন পরীক্ষার লিংক";
      const titleWidth = pdf.getTextWidth(title);
      pdf.text(title, (pageWidth - titleWidth) / 2, 40);

      if (linkUrl) {
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(14);
        pdf.setTextColor(0, 0, 255);

        const linkText = "🔗 এখানে ক্লিক করুন পরীক্ষায় অংশগ্রহণ করতে";
        const linkWidth = pdf.getTextWidth(linkText);
        const linkX = (pageWidth - linkWidth) / 2;
        const linkY = 80;

        pdf.text(linkText, linkX, linkY);
        pdf.link(linkX, linkY - 5, linkWidth, 10, { url: linkUrl });
      } else {
        pdf.setTextColor(150, 0, 0);
        pdf.setFontSize(14);
        const msg = "❌ পরীক্ষার লিংক এখনো প্রকাশিত হয়নি";
        const msgWidth = pdf.getTextWidth(msg);
        pdf.text(msg, (pageWidth - msgWidth) / 2, 80);
      }

      // Optional note
      pdf.setTextColor(100);
      pdf.setFontSize(10);
      const note = "এই লিংকটি শুধুমাত্র ডিজিটাল অ্যাডমিট কার্ডের জন্য ক্লিকযোগ্য।";
      const noteWidth = pdf.getTextWidth(note);
      pdf.text(note, (pageWidth - noteWidth) / 2, 100);

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
