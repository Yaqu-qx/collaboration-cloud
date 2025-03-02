import { Request, Response } from "express";
import { cos, bucketName, region } from "../utils/cosConnect";

const openMyPlanning = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
    const fileKey = `userFiles/${userId}/myPlanning.html`;

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
        fileName: "myPlanning.html",
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

export default openMyPlanning;
