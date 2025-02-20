import { Request, Response } from "express";
import fs from "fs";
import path from "path";

const getChannelMessages = (req: Request, res: Response) => {
  const channelId = req.params.channelId;
  console.log("channelId", channelId);
  // 读取消息数据
  const filePath = path.join(__dirname, "../data/channelMessages.json");
  const rawData = fs.readFileSync(filePath, "utf8");
  const messageData = JSON.parse(rawData);

  res.status(200).json({
    message: "success",
    data: messageData,
  });
};

export default getChannelMessages;
