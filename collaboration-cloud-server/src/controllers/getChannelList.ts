import { Request, Response } from "express";
import fs from "fs";
import path from "path";

const getChannelList = (req: Request, res: Response) => {
  const userId = req.query.userId;
  
  // 读取channelList.json文件
  const filePath = path.join(__dirname, "../data/channelList.json");
  const rawData = fs.readFileSync(filePath, "utf8");
  const channelData = JSON.parse(rawData);

  // 提取所有频道的id和name
  const channelList = Object.entries(channelData).map(([id, data]: [string, any]) => ({
    id,
    name: data.channelName
  }));

  res.status(200).json({ message: "success", data: channelList });
};

export default getChannelList;