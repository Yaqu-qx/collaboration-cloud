import { Request, Response } from "express";
import { cos, bucketName, region } from "../utils/cosConnect";

const openCollaborationFile = async (req: Request, res: Response) => {
  try {
    const { channelId, fileName } = req.query;
    const decodedFileName = decodeURIComponent(fileName as string);
    const fileKey = `channels/collabration/${channelId}/${decodedFileName}`;

    const result = await cos.getObject({
      Bucket: bucketName,
      Region: region,
      Key: fileKey,
    });

    const content = result.Body?.toString("utf-8") || "";

    res.status(200).json({
      success: true,
      data: {
        content: content,
        fileName: decodedFileName,
      },
    });
  } catch (err: any) {
    console.error("文件获取失败:", err);
    res.status(err.statusCode || 500).json({
      success: false,
      error: err.message || "文件获取失败",
    });
  }
};

export default openCollaborationFile;
