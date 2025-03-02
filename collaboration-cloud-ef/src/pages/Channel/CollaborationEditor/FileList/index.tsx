import React, { useState } from "react";
import "./index.scss";
import { FileTextOutlined } from "@ant-design/icons";

type IProps = {
  fileList: string[];
  showHeader: boolean;
  openFile: (fileName: string) => void;
};

export default function FileList(props: IProps) {
  const { fileList, showHeader, openFile } = props;
  return (
    <div className="modal-file-container">
      {showHeader && <span className="modal-file-hint">请选择文件打开</span>}
      <div className="modal-file-list">
        {fileList?.map((item, index) => (
        <div key={index} className="file-item" onClick={(e) => {
          e.stopPropagation();
          openFile(item);
        }}>
          <FileTextOutlined />
          <span>{item}</span>
        </div>
      ))}
      </div>
      
    </div>
  );
}
