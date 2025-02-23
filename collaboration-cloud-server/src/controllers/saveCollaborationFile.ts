import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import {
  cos,
  bucketName,
  region,
  generatePresignedUrl,
} from "../utils/cosConnect";

const saveCollaborateFile = async (req: Request, res: Response) => {
  try {
    // 获取文本内容
    const content = req.body.content;
    const file = req.file as Express.Multer.File;
    const channelId = req.body.channelId;

    const fileName = decodeURIComponent(file.originalname);
    const fileKey = `channels/collabration/${channelId}/${fileName}`;
    console.log(
      "collabratefileKey",
      decodeURIComponent(file.originalname),
      fileKey
    );
    await cos.putObject({
      Bucket: bucketName,
      Region: region,
      Key: fileKey,
      Body: file.buffer,
    });

    // 返回成功响应
    res.status(200).json({
      success: true,
      fileKey: fileKey,
      contentLength: content.length,
    });
  } catch (err: any) {
    // 错误处理
    console.error("保存失败:", err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

export default saveCollaborateFile;
