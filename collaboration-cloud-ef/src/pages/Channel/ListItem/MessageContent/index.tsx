import React, { useState } from "react";
import { fileTypes } from "@/constant/const";
import { getFilesPreview } from "@/utils/server";
import mdIcon from "@/assets/fileIcons/mdIcon.png";
import pdfIcon from "@/assets/fileIcons/pdfIcon.png";
import wordIcon from "@/assets/fileIcons/wordIcon.png";
import xlsxIcon from "@/assets/fileIcons/xlsxIcon.png";
import pptIcon from "@/assets/fileIcons/pptIcon.png";
import txtIcon from "@/assets/fileIcons/txtIcon.png";
import unknowFileIcon from "@/assets/fileIcons/unknowFileIcon.png";
import { formatSize } from "@/utils/utils";
import './index.scss';

interface MessageContentProps {
    isFile: boolean;
    isImage: boolean;
    content?: string;
    fileInfo?: any;
    imageUrl?: string;
    onFileClick: (fileKey: string) => void;
    onFilePreview: (isVisible: boolean) => void;
    onFileViewType: (type: string) => void;
  }
  
 export default function MessageContent(props: MessageContentProps) {
    const { isFile, isImage, content, fileInfo, imageUrl, onFileClick, onFilePreview, onFileViewType } = props;
    const handleFileClick = (fileKey: string, ) => {
      const type = fileKey.split(".").pop() || "";
      if(fileTypes.includes(type)){
        getFilesPreview(fileKey)
          .then(res => res.json())
          .then((res) => {
            console.log("res", res);
            onFileClick(res.previewUrl);
            onFilePreview(true);
            onFileViewType(type);
          })
          .catch((err) => {
            console.log(err);
          }); 
      }
    }
  
    if (!isFile && !isImage) {
      console.log("content", content, isFile, isImage);
      return <div className="message-content">{content}</div>;
    }
  
    if (isFile) {
      let fileIcon: React.ReactNode = null;
      const type = fileInfo.key.split(".").pop() || "";
      // console.log("fileType", fileType);
      switch (type) {
        case "pdf":
          fileIcon = <img src={pdfIcon} className="file-icon" />;
          break;
        case "doc":
        case "docx":
          fileIcon = <img src={wordIcon} className="file-icon" />;
          break;
        case "xls":
        case "xlsx":
          fileIcon = <img src={xlsxIcon} className="file-icon" />;
          break;
        case "ppt":
        case "pptx":
          fileIcon = <img src={pptIcon} className="file-icon" />;
          break;
        case "txt":
          fileIcon = <img src={txtIcon} className="file-icon" />;
          break;
        case "md":
          fileIcon = <img src={mdIcon} className="file-icon" />;
          break;
        default:
          fileIcon = <img src={unknowFileIcon} className="file-icon" />;
      }
      return (
        <div className="message-content">
          <div className="file-info-container" onClick={() => handleFileClick(fileInfo.key)}>
            {fileIcon}
            <div className="file-title-size">
              <span style={{fontSize: '1.1rem', fontWeight: 'bold'}}>{fileInfo?.title || 'xxx.docx'}</span>
              <span style={{color: '#999', fontWeight: 'bold'}}>{formatSize(fileInfo?.size) || '20KB'}</span>
            </div>
          </div>
        </div>
      );
    }
  
    if (isImage) {
      return <img src={imageUrl} alt="图片" className="message-content" />;
    }
    return null;
  }