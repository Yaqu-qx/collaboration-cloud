import { Request, Response } from "express";

const getChannelMessages = (req: Request, res: Response) => {
  const channelId = req.params.channelId;
  console.log("channelId", channelId);

  res.status(200).json({
    message: "success",
    data: [
      {
        date: "2025年1月10日",
        messages: [
          {
            userName: "Yaqu",
            messages: [
              {
                messageId: "1",
                userName: "Yaqu",
                userAvatar:
                  "https://cc-bucket-1338630949.cos.ap-shanghai.myqcloud.com/user_avatar%2Fgroup-avatar%2Fgroup_avatar4.png",
                sendTime: 1736484000000,
                content: "这是一条消息",
                isFile: false,
                isImage: false,
                isFirst: true,
              },
              {
                messageId: "2",
                userName: "Yaqu",
                userAvatar:
                  "https://cc-bucket-1338630949.cos.ap-shanghai.myqcloud.com/user_avatar%2Fgroup-avatar%2Fgroup_avatar5.png",
                sendTime: 1736484500000,
                content: "这是yaqu发的图片",
                isFile: false,
                isImage: true,
                imageUrl: "https://cc-bucket-1338630949.cos.ap-shanghai.myqcloud.com/user_avatar%2Fgroup-avatar%2Fgroup_avatar3.png",
                isFirst: false,
              },
              {
                messageId: "3",
                userName: "Yaqu",
                userAvatar:
                  "https://cc-bucket-1338630949.cos.ap-shanghai.myqcloud.com/user_avatar%2Fgroup-avatar%2Fgroup_avatar4.png",
                sendTime: 1738484000000,
                content: "这是第三条消息",
                isFile: false,
                isImage: false,
                isFirst: false,
              },
            ],
          },
          {
            userName: "张三",
            messages: [
              {
                messageId: "4",
                userName: "张三",
                userAvatar:
                  "https://cc-bucket-1338630949.cos.ap-shanghai.myqcloud.com/user_avatar%2Fgroup-avatar%2Fgroup_avatar4.png",
                sendTime: 1736484000000,
                content: "这是张三的首条消息",
                isFile: false,
                isImage: false,
                isFirst: true,
              },
              {
                messageId: "5",
                userName: "张三",
                userAvatar:
                  "https://cc-bucket-1338630949.cos.ap-shanghai.myqcloud.com/user_avatar%2Fgroup-avatar%2Fgroup_avatar5.png",
                sendTime: 1736484500000,
                content: "这是张三发的文件",
                isFile: true,
                isImage: false,
                fileInfo: {
                  id: "1",
                  key: "Project 1/新建 DOCX 文档.docx",
                  size: 301794,
                  title: "新建 DOCX 文档.docx",
                },
                isFirst: false,
              },
            ],
          },
        ],
      },
      {
        date: "2025年1月11日",
        messages: [
          {
            userName: "Yaqu",
            messages: [
              {
                messageId: "6",
                userName: "Yaqu",
                userAvatar:
                  "https://cc-bucket-1338630949.cos.ap-shanghai.myqcloud.com/user_avatar%2Fgroup-avatar%2Fgroup_avatar4.png",
                sendTime: 1736484000000,
                content: "这是一条消息",
                isFile: false,
                isImage: false,
                isFirst: true,
              },
              {
                messageId: "7",
                userName: "Yaqu",
                userAvatar:
                  "https://cc-bucket-1338630949.cos.ap-shanghai.myqcloud.com/user_avatar%2Fgroup-avatar%2Fgroup_avatar5.png",
                sendTime: 1736484500000,
                content: "这是另一条消息",
                isFile: false,
                isImage: false,
                isFirst: false,
              },
              {
                messageId: "8",
                userName: "Yaqu",
                userAvatar:
                  "https://cc-bucket-1338630949.cos.ap-shanghai.myqcloud.com/user_avatar%2Fgroup-avatar%2Fgroup_avatar4.png",
                sendTime: 1738484000000,
                content: "这是第三条消息",
                isFile: false,
                isImage: false,
                isFirst: false,
              },
            ],
          },
          {
            userName: "张三",
            messages: [
              {
                messageId: "9",
                userName: "张三",
                userAvatar:
                  "https://cc-bucket-1338630949.cos.ap-shanghai.myqcloud.com/user_avatar%2Fgroup-avatar%2Fgroup_avatar4.png",
                sendTime: 1736484000000,
                content: "这是张三的消息",
                isFile: false,
                isImage: false,
                isFirst: true,
              },
              {
                messageId: "10",
                userName: "张三",
                userAvatar:
                  "https://cc-bucket-1338630949.cos.ap-shanghai.myqcloud.com/user_avatar%2Fgroup-avatar%2Fgroup_avatar5.png",
                sendTime: 1736484500000,
                content: "这是张三的另一条消息",
                isFile: false,
                isImage: false,
                isFirst: false,
              },
            ],
          },
        ],
      },
    ],
  });
};

export default getChannelMessages;
