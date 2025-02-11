import { Request, Response } from "express";

const getChannelMessages = (req: Request, res: Response) => {
  const channelId = req.params.channelId;
  console.log("channelId", channelId);

  res.status(200).json({
    message: "success",
    data: [
      {
        messageId: "1",
        userName: "张三",
        userAvatar:
          "https://cc-bucket-1338630949.cos.ap-shanghai.myqcloud.com/user_avatar%2Fgroup-avatar%2Fgroup_avatar4.png",
        sendTime: 1736484000000,
        content: "这是一条消息",
        files: [],
        images: [],
        isFirst: true,
      },
      {
        messageId: "2",
        userName: "李四",
        userAvatar:
          "https://cc-bucket-1338630949.cos.ap-shanghai.myqcloud.com/user_avatar%2Fgroup-avatar%2Fgroup_avatar5.png",
        sendTime: 1736484500000,
        content: "这是另一条消息",
        files: [],
        images: [],
        isFirst: false,
      },
      {
        messageId: "3",
        userName: "张三",
        userAvatar:
          "https://cc-bucket-1338630949.cos.ap-shanghai.myqcloud.com/user_avatar%2Fgroup-avatar%2Fgroup_avatar4.png",
        sendTime: 1738484000000,
        content: "这是第三条消息",
        files: [],
        images: [],
        isFirst: false,
      },
    ],
  });
};

export default getChannelMessages;
