import { Request, Response } from "express";
import {
  cos,
  bucketName,
  region,
} from "../utils/cosConnect";
import { console } from "inspector";

const saveMyPlanning = async (req: Request, res: Response) => {
  try {
    // 获取文本内容
    const content = req.body.content;
    const file = req.file as Express.Multer.File;
    const userId = req.body.userId;
    console.log(
      "saveMyPlanning",
      decodeURIComponent(file.originalname),
      userId 
    )

    const fileKey = `userFiles/${userId}/myPlanning.html`;
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

export default saveMyPlanning;
