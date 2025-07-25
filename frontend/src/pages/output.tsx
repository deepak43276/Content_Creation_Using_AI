import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ContentOutput from '../components/ContentOutput';
import jsPDF from 'jspdf';

export default function OutputPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const content = location.state?.content as string | undefined;

  useEffect(() => {
    if (!content) {
      navigate('/');
    }
  }, [content, navigate]);

  if (!content) return null;

  const sanitizeContent = (rawText: string): string => {
    return rawText
      .replace(/Ø<ß/g, '✨')
      .replace(/Ø=ÜÚ/g, '🎓')
      .replace(/Ø=Þ€/g, '🔥')
      .replace(/Ø=Ý/g, '🚀')
      .replace(/&Bþ/g, '📘')
      .replace(/&@þ/g, '💡')
      .replace(/[^\x00-\x7F]/g, ''); // Remove other non-ASCII chars
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const margin = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const maxLineWidth = pageWidth - margin * 2;

    doc.setFont('Times', 'Normal');
    doc.setFontSize(12);

    const cleanContent: string = sanitizeContent(content);
    const lines: string[] = doc.splitTextToSize(cleanContent, maxLineWidth);

    let y = margin;

    lines.forEach((line: string) => {
      if (y > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }
      doc.text(line, margin, y);
      y += 7;
    });

    doc.save('generated-content.pdf');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black">
      <div className="max-w-2xl w-full mx-auto p-6">
        {/* Output page. Displays generated content and provides download functionality. */}
        <ContentOutput content={content} />
        <div className="flex justify-center">
          <button
            onClick={handleDownloadPDF}
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Download as PDF
          </button>
        </div>
      </div>
    </div>
  );
}
