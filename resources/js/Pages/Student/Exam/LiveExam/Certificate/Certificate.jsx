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
      pdf.setFont("helvetica", "italic");
      pdf.text(name, 1900, 2900); // <-- adjust x=1500, y=2200

      // ==== Add College ====
      pdf.setFontSize(150);
      pdf.setFont("helvetica", "normal");
      pdf.text(college, 1900, 3300); // <-- adjust x=1500, y=2600

      // ==== Optional Date ====
    //   pdf.setFontSize(100);
    //   pdf.text(date, 1900, 3200); // adjust if needed

      // Save PDF
      pdf.save("certificate.pdf");

      // Redirect to link2
      setTimeout(() => {
        window.location.href = "/link2"; // change to your link
      }, 500);
    };
  };

  return null; // Nothing rendered to the page
}
