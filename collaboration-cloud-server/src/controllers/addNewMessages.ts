import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import {
  cos,
  bucketName,
  region,
  generatePresignedUrl,
} from "../utils/cosConnect";

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

export interface PersonalContinuousMessage {
  userName: string;
  messages: Array<MessageInfo>;
}

export interface MessageList {
  date: string;
  messages: Array<PersonalContinuousMessage>;
}

interface fileInfoSimple {
  id: string;
  key: string;
  size: number;
  title: string;
  imageUrl?: string,
};

const imgTypes = ["jpg", "jpeg", "png", "gif", "bmp"];
const isImg = (fileKey: string) => {
  const type = fileKey.split(".").pop() || "";
  return imgTypes.includes(type.toLowerCase());
};

// 新增文件上传处理
const processFileUpload = async (
  channelId: string,
  file: Express.Multer.File
) => {
  const fileName = decodeURIComponent(file.originalname);
  const fileKey = `channels/${channelId}/${fileName}`;
  console.log("fileKey", decodeURIComponent(file.originalname), fileKey);
  await cos.putObject({
    Bucket: bucketName,
    Region: region,
    Key: fileKey,
    Body: file.buffer,
  });

  if (isImg(fileKey)) {
    const presignedUrl = await generatePresignedUrl(fileKey);
    return {
      id: fileKey,
      key: fileKey,
      size: file.size,
      title: fileName,
      imageUrl: presignedUrl,
    }; 
  }

  return {
    id: fileKey,
    key: fileKey,
    size: file.size,
    title: fileName,
  };
};

const addNewMessages = async (req: Request, res: Response) => {
  const files = req.files as Express.Multer.File[];
  const { channelId, date, userName, sendTime, content } = req.body;
  console.log("files", files, "body", req.body);

  // 创建新消息信息
  const createNewMessageInfo = (
    isFirst: boolean,
    filesInfo: fileInfoSimple[],
    content = ""
  ) => {
    if (files.length <= 0 && !content) return [];
    let newMessages: MessageInfo[] = [];
    filesInfo.map((file) =>  {
      const isImage = isImg(file.key);
      // const imageUrl = isImage ? generatePresignedUrl(file.key) : undefined;
      newMessages.push({
        messageId: `${Date.now()}_${Math.random().toString(36).substring(2)}`,
        userName: userName || "Yaqu",
        userAvatar:
          "https://img2.woyaogexing.com/2022/10/21/f963f2d3645ca738!400x400.jpg",
        sendTime: Number(sendTime) || Date.now(),
        isFile: !isImage,
        isImage,
        fileInfo: !isImage ? file : undefined,
        imageUrl: file?.imageUrl,
        isFirst,
      });
      isFirst = false;
    });

    if (content) {
      newMessages.push({
        messageId: `${Date.now()}_${Math.random().toString(36).substring(2)}`,
        userName: userName || "Yaqu",
        userAvatar:
          "https://img2.woyaogexing.com/2022/10/21/f963f2d3645ca738!400x400.jpg",
        sendTime: Number(sendTime) || Date.now(),
        content,
        isFile: false,
        isImage: false,
        isFirst,
      });
    }
    return newMessages;
  };

  // 读取消息数据
  const filePath = path.join(__dirname, "../data/channelMessages.json");
  const rawData = fs.readFileSync(filePath, "utf8");
  const allMessages = JSON.parse(rawData);
  const messageData = allMessages[channelId] as MessageList[];
  // 上传文件并获取文件信息
  const fileInfoPromises = files.map((file) =>
    processFileUpload(channelId, file)
  );
  const fileInfos = (await Promise.all(fileInfoPromises)) as fileInfoSimple[];

  // const messageInfo: MessageInfo[] = await Promise.all(files.map((file) => {
  //   processFileUpload(channelId, file);
  //   const messageId = `${Date.now()}_${Math.random().toString(36).substring(2)}`;

  //   const baseInfo = {
  //     messageId,
  //     userName: userName || 'Yaqu',
  //     userAvatar: "https://img2.woyaogexing.com/2022/10/21/f963f2d3645ca738!400x400.jpg",
  //     sendTime: sendTime || Date.now()
  //   };

  //   if (item.isFile) {

  //     return {
  //       messageId: new Date().getTime().toString() + Math.random().toString(36).substring(2),
  //       userName: userName || 'Yaqu',
  //       userAvatar: "https://img2.woyaogexing.com/2022/10/21/f963f2d3645ca738!400x400.jpg", // 暂时使用默认头像
  //       sendTime: sendTime || Date.now(),
  //       isFile: item.isFile,
  //       isImage: item.isImage,
  //       fileInfo: {
  //         id: "",
  //         key: "",
  //         size: 0,
  //         title: "",
  //       },
  //       isFirst: item.isFirst,
  //     };
  //   } else if (item.isImage) {
  //     return {
  //       messageId: "",
  //       userName: userName || 'Yaqu',
  //       userAvatar: "",
  //       sendTime: sendTime,
  //       content: item.content || "",
  //       isFile: item.isFile,
  //       isImage: item.isImage,
  //       fileInfo: undefined,
  //       imageUrl: "",
  //       isFirst: item.isFirst,
  //     };
  //   } else {
  //     return {
  //       messageId: "",
  //       userName: userName || 'Yaqu',
  //       userAvatar: "",
  //       sendTime: sendTime,
  //       content: item.content || "",
  //       isFile: item.isFile,
  //       isImage: item.isImage,
  //       fileInfo: undefined,
  //       imageUrl: "",
  //       isFirst: item.isFirst,
  //     };
  //   }
  // }));

  // 查找对应日期的消息列表
  // 修正后的消息分组逻辑
  let newMessageList = [...messageData];

  // 查找或创建日期分组
  let dailyMessageExist = newMessageList.find((item) => item.date === date);
  if (!dailyMessageExist) {
    dailyMessageExist = { date, messages: [] };
    newMessageList.push(dailyMessageExist);
  }

  // 查找用户消息组
  let userMessageGroup =
    dailyMessageExist.messages[dailyMessageExist.messages.length - 1]
      ?.userName === userName
      ? dailyMessageExist.messages[dailyMessageExist.messages.length - 1]
      : undefined;
  // 创建新消息组
  if (!userMessageGroup?.messages) {
    userMessageGroup = { userName, messages: [] };
    dailyMessageExist.messages.push(userMessageGroup);
  }

  // 添加新消息到用户组
  const newMessages = createNewMessageInfo(
    (userMessageGroup.messages.length || 0) === 0, // isFirst由是否为空决定
    fileInfos,
    content
  );

  userMessageGroup.messages.push(...newMessages);
  console.log("newMessageList", newMessageList);
  const updatedData = {
    ...allMessages,
    [channelId]: newMessageList // 只更新当前频道数据
  };

  // 保存更新后的消息数据
  fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2));
  res
    .status(200)
    .json({
      message: "消息添加成功",
      data: newMessageList,
    });
};

export default addNewMessages;
