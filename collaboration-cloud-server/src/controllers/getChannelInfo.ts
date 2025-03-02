import { Request, Response } from "express";

const getChannelInfo = (req: Request, res: Response) => {
  const channelId = req.params.channelId;
  console.log("channelId", channelId);
  // TODO: get channel info from database and return it
  res.status(200).json({
    message: "success",
    data: {
      channelId: channelId,
      channelName: "项目1的协作频道",
      projectName: "项目1",
      theme: "软件开发",
      description:
        "这是项目1的专属频道。 这个频道适用于项目的的所有内容。与你的团队一起召开会议、共享文档和做出决策。",
      members: [
        {
          name: "Yaqu",
          avatar:
            "https://cc-bucket-1338630949.cos.ap-shanghai.myqcloud.com/user_avatar%2Fpersonal-avatar%2FavatarExample.png",
        },
        {
          name: "张三",
          avatar:
            "https://cc-bucket-1338630949.cos.ap-shanghai.myqcloud.com/user_avatar%2Fgroup-avatar%2Fgroup_avatar4.png",
        },
        {
          name: "李四",
          avatar:
            "https://cc-bucket-1338630949.cos.ap-shanghai.myqcloud.com/user_avatar%2Fgroup-avatar%2Fgroup_avatar5.png",
        },
      ],
      teachers: [
        {
          name: "Alice",
          avatar:
            "https://cc-bucket-1338630949.cos.ap-shanghai.myqcloud.com/user_avatar%2Fgroup-avatar%2Fgroup_avatar4.png",
        },
        {
          name: "Jhon",
          avatar:
            "https://cc-bucket-1338630949.cos.ap-shanghai.myqcloud.com/user_avatar%2Fgroup-avatar%2Fgroup_avatar5.png",
        },
      ],
      fileList: ['myfile', 'document', '协作记录', '协作文件1', '协作文件2'],
      createdAt: "2025年1月10日",
      createBy: "Alice",
    },
  });
};

export default getChannelInfo;
