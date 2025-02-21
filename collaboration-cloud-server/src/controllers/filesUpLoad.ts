import { Request, Response } from "express";
import connection from "../database";
import multer from "multer";
import path from "path";
import fs from "fs";
import { generatePresignedUrl, bucketName, region, cos } from "../utils/cosConnect";

// export const upload = multer({ storage });
const storage = multer.memoryStorage();
export const upload = multer({ storage });

export const filesUpLoad = async (req: Request, res: Response) => {
  const { basePath, relativePath, fileName } = req.body;
  const file = req.file; 
  // windows 路径转为 linux 路径 '\' -> '/'
  const key = path.join(basePath || "", relativePath || "", fileName || "").replace(/\\/g, '/');
  console.log('basePath', basePath, 'relativePath', relativePath, 'fileName', fileName);
  console.log('key', key);
  if (!file) {
    return res.status(400).send("请选择文件");
  }
  if (!key) {
    return res.status(400).send("请提供文件路径");
  }

  // 上传文件到 COS
  cos.putObject({
    Bucket: bucketName,
    Region: region,
    Key: key,
    Body: file.buffer,
  }, async (err, data) => {
    if (err) {
      return res.status(500).send('上传到 COS 失败');
    }
    try {
      // 生成下载链接
      const presignedUrl = await generatePresignedUrl(key);
      console.log('presignedUrl', presignedUrl);
      res.status(200).json({
        key: key,
        fileName: fileName
      });
    } catch (error) {
      res.status(500).send('生成下载链接失败');
    }
  });
};
export default filesUpLoad;
