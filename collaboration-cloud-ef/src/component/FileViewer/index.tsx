import React, { useState, useEffect } from "react";
import DocxViewer from "./drivers/DocxViewer";
import PDFViewer from "./drivers/PDFViewer";
import ExcelViewer from "./drivers/ExcelViewer";
import TextViewer from "./drivers/TextViewer";
import MarkdownViewer from "./drivers/MarkdownViewer";

// 支持 .pdf .xlsx .docx .txt .md .jpg .png .jpeg .gif

interface Props {
  url: string;
  type: string;
}

export default function FileViewer(Props: Props) {
  const [file, setFile] = useState<File>();
  const { url, type } = Props;
  switch (type) {
    case "pdf":
      return <PDFViewer url={url} />;
    case "docx":
      return <DocxViewer url={url} />;
    case "xlsx":
      return <ExcelViewer url={url} />;
    case "txt":
      return <TextViewer url={url} />;
    case "md":
      return <MarkdownViewer url={url} />;
    default:
      return <div>暂不支持该文件类型</div>;
  }
}
