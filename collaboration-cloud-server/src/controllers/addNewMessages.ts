import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { cos, bucketName, region } from "../utils/cosConnect";

interface sendMessageExtraInfo {
  content?: string;
  isFile: boolean;
  isImage: boolean;
  isFirst: boolean;
  file?: File;
}

interface MessageInfo {
  messageId: string;
  userName: string;
  userAvatar: string;
  sendTime: number;
  content: string;
  isFile: boolean;
  isImage: boolean;
  fileInfo?: {
    id: string;
    key: string;
    size: number;
    title: string;
  };
  imageUrl?: string;
  isFirst: boolean;
}

export const addNewMessages = async (req: Request, res: Response) => {
  const { channelId, date, userName, sendTime, newMessagesInfo } = req.body;
  console.log(req.body);

  // 读取消息数据
  const filePath = path.join(__dirname, "../data/channelMessages.json");
  const rawData = fs.readFileSync(filePath, "utf8");
  const messageData = JSON.parse(rawData);

  // 转换MessageInfo
  // const messageInfo: MessageInfo = newMessagesInfo.map((item: sendMessageExtraInfo, index) => {
  //   messageId: `${Date.now()}_${Math.random().toString(36).substr(2)}`;
  //   userName;
  //   userAvatar;
  //   sendTime;
  //   content: newMessagesInfo.content || '文件消息';
  //   isFile: item.isFile;
  //   isImage: item.isImage;
  //   fileInfo: {
  //     id: fileKey,
  //     key: fileKey,
  //     size: newMessagesInfo.file.originalFile.size,
  //     title: newMessagesInfo.file.uploadName
  //   },
  //   isFirst: newMessagesInfo.isFirst
  // });

  // 查找对应日期的消息列表
  const newMessageList = [...messageData];
  const dailyMessageExist = newMessageList.find(
    (dailyItem) => dailyItem.date === date
  );
  if (dailyMessageExist) {
    // 获取最后一条用户消息项
    const lastUserMessages = dailyMessageExist.messages[dailyMessageExist.messages.length - 1];
    
    // 检查最后用户是否匹配
    if (lastUserMessages?.userName === userName) {
      // 追加到现有用户消息列表
      lastUserMessages.messages.push(...newMessagesInfo);
    } else {
      // 新建用户消息项
      dailyMessageExist.messages.push({
        userName: userName ?? 'Yaqu',
        messages: newMessagesInfo,
      });
    }
  }
  else {
    // 日期不存在
    newMessageList.push({
      date: date,
      messages: [
        {
          userName: userName || 'Yaqu',
          messages: newMessagesInfo,
        },
      ],
    });
  }

}