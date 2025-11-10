import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { router } from "@inertiajs/react";
import TitleSlot from "../authentication/TitleSlot";
import { CalendarDays, MapPin } from "lucide-react";

const AdmitCard = ({ registration, exam, examInfoUrl,reg_link,promo_page }) => {
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
      const ratio = Math.min(
        pdfWidth / imgProps.width,
        pdfHeight / imgProps.height
      );
      const imgWidth = imgProps.width * ratio;
      const imgHeight = imgProps.height * ratio;
      const x = (pdfWidth - imgWidth) / 2;
      const y = (pdfHeight - imgHeight) / 2;

      // Add the admit card image to the PDF
      pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);

      pdf.save(`${registration.unique_key_hscmap26}_AdmitCard.pdf`);

      router.get(route("student.video"));
    } catch (err) {
      console.error("handleDownload error:", err);
      alert("PDF তৈরিতে সমস্যা হয়েছে — কনসোলে দেখুন।");
    }
  };

  const isValid = (field) => field && field.toString().trim() !== "";

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
            {isValid(registration.name) && (
              <div className="flex justify-between">
                <span className="font-semibold">নাম:</span>
                <span>{registration.name}</span>
              </div>
            )}
            {isValid(registration.mobile) && (
              <div className="flex justify-between">
                <span className="font-semibold">মোবাইল:</span>
                <span>{registration.mobile}</span>
              </div>
            )}
            {isValid(registration.email) && (
              <div className="flex justify-between">
                <span className="font-semibold">ইমেল:</span>
                <span>{registration.email}</span>
              </div>
            )}
            {isValid(registration.college) && (
              <div className="flex justify-between">
                <span className="font-semibold">কলেজ:</span>
                <span>{registration.college}</span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            {isValid(registration.Hsc_Batch) && (
              <div className="flex justify-between">
                <span className="font-semibold">এইচএসসি ব্যাচ:</span>
                <span>{registration.Hsc_Batch.slice(4)}</span>
              </div>
            )}
            {isValid(registration.eiin) && (
              <div className="flex justify-between">
                <span className="font-semibold">ইআইআইএন:</span>
                <span>{registration.eiin}</span>
              </div>
            )}
            {isValid(registration.address) && (
              <div className="flex justify-between">
                <span className="font-semibold">ঠিকানা:</span>
                <span>{registration.address}</span>
              </div>
            )}
            {isValid(registration.hsc26Mission) && (
              <div className="flex justify-between">
                <span className="font-semibold">মিশন:</span>
                <span>{registration.hsc26Mission}</span>
              </div>
            )}
          </div>
        </div>

        {/* Exam Roll */}
        <div className="mt-10 text-center">
          <p className="text-lg font-semibold text-gray-700">
            পরীক্ষার রোল নম্বর:
          </p>
          <p className="text-4xl sm:text-5xl font-extrabold text-blue-800 font-mono tracking-widest mt-2">
            {registration.unique_key_hscmap26}
          </p>
        </div>

        {/* Exam Info */}
        {exam && (
  <div className="mt-10 border-t pt-6 text-gray-700 space-y-6 text-center">
    {/* Exam Title */}
    {isValid(exam.title) && (
      <div>
        <h2 className="text-xl font-semibold text-blue-700 mb-2">
          📅 পরীক্ষার তারিখ:
:
        </h2>
        <a
  href={exam.tttle}
  target="_blank"
  rel="noopener noreferrer"
  className="text-blue-700 hover:text-blue-900 font-semibold bg-blue-50 px-3 py-1 rounded-md inline-block break-keep leading-relaxed"
  style={{ wordBreak: "keep-all", whiteSpace: "normal" }}
>
  {exam.title}
</a>

      </div>
    )}

    {/* Exam Info URL */}
    {isValid(examInfoUrl) && (
      <div>
        <h2 className="text-xl font-semibold text-blue-700 mb-2">
          𝞹📈 পরীক্ষার লিংক:
🧠📚
        </h2>
        <a
          href={examInfoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline break-all"
        >
          {examInfoUrl}
        </a>
      </div>
    )}

    {/* Course Link */}
    {isValid(promo_page) && (
      <div>
        <h2 className="text-xl font-semibold text-blue-700 mb-2">
          🎓 Hsc 26 Missiona A+ (কোর্স লিংক)
:
        </h2>
        <a
          href={promo_page}
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-600 hover:underline break-all"
        >
           {promo_page}
        </a>
      </div>
    )}
  </div>
)}

        {/* Instructions */}
        <div className="mt-8 border-t pt-6 text-center text-sm text-gray-500 space-y-1">
          <p>আপনার রেজিস্ট্রেশন নম্বর গোপন 🗝️ রাখুন।</p>
          <p>নির্ধারিত দিনে পরীক্ষায় অংশগ্রহণের জন্য এটি প্রয়োজন হবে।</p>
          {isValid(reg_link) && (
            
            <a
              href={reg_link}
              className="block text-blue-600 hover:text-blue-800 text-sm mt-3 break-all"
            >
              <span className="font-semibold text-gray-800">📜 Registration Link:</span>{" "}
<a
  href={reg_link}
  target="_blank"
  rel="noopener noreferrer"
  className="text-blue-600 hover:underline break-all"
>
  {reg_link}
</a>

            </a>
          )}
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
