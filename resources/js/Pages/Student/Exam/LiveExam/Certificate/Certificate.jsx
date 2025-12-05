import React, { useEffect } from "react";
import jsPDF from "jspdf";

export default function Certificate({ name, college, date }) {

  useEffect(() => {
    generateAndDownload();
  }, []);

  const generateAndDownload = () => {
    const pdf = new jsPDF("portrait", "px", [4961, 7016]);

    // Load the certificate image
    const img = new Image();
    img.src = "/assets/images/certificate/certificate.jpg"; // your certificate path
    img.crossOrigin = "anonymous"; // allow CORS if needed

    img.onload = () => {
      // Draw background image
      pdf.addImage(img, "JPEG", 0, 0, 4961, 7016);

      // ==== Add Name ====
      pdf.setFontSize(300);
      pdf.setFont("times", "italic");
      pdf.setTextColor(30, 30, 30);   // premium dark grey

      // Center text horizontally between x1 and x2
      const startX = 1000;
      const endX = 4000;
      const textWidth = pdf.getTextWidth(name);
      const centerX = startX + (endX - startX - textWidth) / 2;
      pdf.text(name, centerX, 2900); // <-- name centered

      // ==== Add College ====
      pdf.setFontSize(150);
      pdf.setFont("helvetica", "normal");
      pdf.text(college, 1900, 3300); // <-- adjust x=1500, y=2600

      // ==== Optional Date ====
      // pdf.setFontSize(100);
      // pdf.text(date, 1900, 3200); // adjust if needed

      // Save PDF
      pdf.save("certificate.pdf");

      // Redirect to route
      setTimeout(() => {
        window.location.href = route('student.video'); // Laravel route helper
      }, 500);
    };
  };

  return null; // Nothing rendered to the page
}
