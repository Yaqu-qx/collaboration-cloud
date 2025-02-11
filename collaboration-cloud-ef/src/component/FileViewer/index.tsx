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
  const { url, type } = Props;
  console.log(type);
  switch (type) {
    case "pdf":
    case "docx":
    case "xlsx":
      return <iframe src={url} className="file-viewer-iframe" title="file-viewer"/>;
    case "txt":
    case "md":
      return <TextViewer url={url} />;
    case "jpg":
    case "png":
    case "jpeg":
    case "gif":
      return <img src={url} alt="file-viewer" className="file-viewer-img" />;
    default:
      return <div style={{ fontSize: '1.5rem' }}>暂不支持该文件类型</div>;
  }
}
