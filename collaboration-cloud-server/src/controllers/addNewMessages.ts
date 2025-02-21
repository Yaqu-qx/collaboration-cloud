import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { cos, bucketName, region } from "../utils/cosConnect";
import multer from "multer";

interface sendMessageExtraInfo {
  content?: string;
  isFile: boolean;
  isImage: boolean;
  isFirst: boolean;
  file?: Express.Multer.File;
}

interface MessageInfo {
  messageId: string;
  userName: string;
  userAvatar: string;
  sendTime: number;
  content?: string;
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

const addNewMessages = async (req: Request, res: Response) => {
  const files = req.files as Express.Multer.File[];
  const { channelId, date, userName, sendTime, newMessagesInfo } = req.body;
  console.log(req.body);

  // 读取消息数据
  const filePath = path.join(__dirname, "../data/channelMessages.json");
  const rawData = fs.readFileSync(filePath, "utf8");
  const messageData = JSON.parse(rawData);
  
   // 新增文件上传处理
   const processFileUpload = async (file: Express.Multer.File) => {
    const fileKey = `channels/${channelId}/${file.originalname}`;
    await cos.putObject({
      Bucket: bucketName,
      Region: region,
      Key: fileKey,
      Body: file.buffer,
    });
    return {
      id: fileKey,
      key: fileKey,
      size: file.size,
      title: file.originalname
    };
  };

  // 转换MessageInfo
  const messageInfo: MessageInfo[] = await Promise.all(newMessagesInfo.map(async (item: any, index) => {
    const messageId = `${Date.now()}_${Math.random().toString(36).substring(2)}`;
    
    const baseInfo = {
      messageId,
      userName: userName || 'Yaqu',
      userAvatar: "https://img2.woyaogexing.com/2022/10/21/f963f2d3645ca738!400x400.jpg",
      sendTime: sendTime || Date.now(),
      isFile: item.isFile,
      isImage: item.isImage,
      isFirst: item.isFirst,
    };

    if (item.isFile) {
      
      return {
        messageId: new Date().getTime().toString() + Math.random().toString(36).substring(2),
        userName: userName || 'Yaqu',
        userAvatar: "https://img2.woyaogexing.com/2022/10/21/f963f2d3645ca738!400x400.jpg", // 暂时使用默认头像
        sendTime: sendTime || Date.now(),
        isFile: item.isFile,
        isImage: item.isImage,
        fileInfo: {
          id: "",
          key: "",
          size: 0,
          title: "",
        },
        isFirst: item.isFirst,
      };
    } else if (item.isImage) {
      return {
        messageId: "",
        userName: userName || 'Yaqu',
        userAvatar: "",
        sendTime: sendTime,
        content: item.content || "",
        isFile: item.isFile,
        isImage: item.isImage,
        fileInfo: undefined,
        imageUrl: "",
        isFirst: item.isFirst,
      };
    } else {
      return {
        messageId: "",
        userName: userName || 'Yaqu',
        userAvatar: "",
        sendTime: sendTime,
        content: item.content || "",
        isFile: item.isFile,
        isImage: item.isImage,
        fileInfo: undefined,
        imageUrl: "",
        isFirst: item.isFirst,
      };
    }
  });


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

export default addNewMessages;