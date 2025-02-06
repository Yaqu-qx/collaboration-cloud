import e, { Request, Response } from "express";
import { generatePresignedUrl } from "../utils/cosConnect";

const filesDownload = async (req: Request, res: Response) => {
  const key = req.query.key;
  if(!key) {
    return res.status(400).json({ message: "Bad Request" });
  }

  try {
    const downloadUrl = await generatePresignedUrl(key);
    // console.log('downloadUrl',downloadUrl);
    res.status(200).json({ message: "success", data: { downloadUrl: downloadUrl } });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default filesDownload;