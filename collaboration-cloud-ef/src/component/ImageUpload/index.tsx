import React, { useState, useEffect } from "react";
import "./index.scss";
import { Upload, message } from "antd";
import type { GetProp, UploadProps } from "antd";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";

interface Iprops {
  title: string;
  faq: string;
  imageUrl: string;
  onUrlChange: (url: string) => void;
}

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
// 上传文件类型
const beforeImgUpload = (file: FileType) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

export default function ImageUpload(props: Iprops) {
  const { title, faq, imageUrl, onUrlChange } = props;
//   const [imageUrl, setImageUrl] = useState<string>();
  const [loading, setLoading] = useState(false);

  const upLoadProps: UploadProps = {
    name: "file",
    multiple: true,
    action: "http://localhost:4000/uploadImage",
    accept: "image/*",
    maxCount: 1,
    onChange(info) {
      const { status } = info.file;
      if (status === "done") {
        message.success(`${info.file.name} 图片上传成功`);
      } else if (status === "error") {
        message.error(`${info.file.name} 图片上传失败`);
      }
    },
  };

  const handleImgUploadChange: UploadProps["onChange"] = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        onUrlChange(url);
      });
    }
  };

  // 上传图片按钮
    const uploadButton = (
        <button style={{ border: 0, background: "none" }} type="button">
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>上传图片</div>
        </button>
    );

  return (
    <div className="image-upload">
      <p className="image-upload-title">{title}</p>
      <Upload
        name="avatar"
        multiple={false}
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        {...upLoadProps}
        action="http://localhost:4000/filesUpLoad"
        beforeUpload={beforeImgUpload}
        onChange={handleImgUploadChange}
      >
        {imageUrl.trim() ? (
          <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
        ) : (
          uploadButton
        )}
      </Upload>

      <p className="image-upload-faq">{faq}</p>
    </div>
  );
}
