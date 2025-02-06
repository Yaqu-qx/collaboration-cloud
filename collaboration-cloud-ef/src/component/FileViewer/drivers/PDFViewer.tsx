import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import { useState } from'react';

// 配置 PDF.js 的 worker 路径（必须）
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PDFViewer = ({ url }: { url: string }) => {
  const [numPages, setNumPages] = useState<number | null>(null);

  return (
    <Document
      file={url}
      onLoadSuccess={({ numPages }) => setNumPages(numPages)}
    >
      {Array.from(new Array(numPages), (_, index) => (
        <Page key={`page_${index + 1}`} pageNumber={index + 1} />
      ))}
    </Document>
  );
};

export default PDFViewer;