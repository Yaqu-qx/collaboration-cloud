import { Request, Response } from "express";
import fs from "fs";
import path from "path";

const getChannelInfo = (req: Request, res: Response) => {
  const channelId = req.params.channelId;
  
  try {
    // 读取频道列表数据
    const filePath = path.join(__dirname, "../data/channelList.json");
    const rawData = fs.readFileSync(filePath, "utf8");
    const channelData = JSON.parse(rawData);
    
    const channelInfo = channelData[channelId];

    if (!channelInfo) {
      return res.status(404).json({
        message: "Channel not found",
        data: null
      });
    }

    res.status(200).json({
      message: "success",
      data: {
        ...channelInfo,
        channelId: channelId,
        memberCount: channelInfo.members?.length || 0
      }
    });
  } catch (error) {
    console.error("Error fetching channel info:", error);
    res.status(500).json({
      message: "Internal server error",
      data: null
    });
  }
};

export default getChannelInfo;
