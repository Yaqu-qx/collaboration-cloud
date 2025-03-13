import { Request, Response } from "express";
import fs from "fs";
import path from "path";

const addChannel = (req: Request, res: Response) => {
  try {
    const channelInfo = req.body.channeInfo;
    const filePath = path.join(__dirname, "../data/channelList.json");

    // 读取现有数据
    const rawData = fs.readFileSync(filePath, "utf-8");
    const channels = JSON.parse(rawData);

    // 添加新频道
    channels[channelInfo.channelId] = {
      channelName: channelInfo.channelName,
      projectName: "新项目",
      createBy: channelInfo.createBy,
      createdAt: new Date().toLocaleDateString("zh-CN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      theme: "软件开发",
      members: channelInfo.members,
      teachers: channelInfo.teachers,
      fileList: channelInfo.fileList,
      description: channelInfo.description,
    };

    // 写回文件
    fs.writeFileSync(filePath, JSON.stringify(channels, null, 2));

    const messagesPath = path.join(__dirname, '../data/channelMessages.json');
    const messagesData = fs.readFileSync(messagesPath, "utf-8");
    const messages = JSON.parse(messagesData);
    messages[channelInfo.channelId] = []; // 空数组表示无消息
    fs.writeFileSync(messagesPath, JSON.stringify(messages, null, 2));

    res.status(200).json({
      success: true,
      data: {
        id: channelInfo.channelId,
        name: channelInfo.channelName,
      },
    });
  } catch (error) {
    console.error("添加频道失败:", error);
    res.status(500).json({
      success: false,
      message: "服务器内部错误",
    });
  }
};

export default addChannel;
